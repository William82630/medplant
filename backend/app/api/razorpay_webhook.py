from fastapi import APIRouter, Request, HTTPException
import hmac
import hashlib
import json
from supabase import create_client
import os

# Initialize FastAPI Router
router = APIRouter()

# Supabase client
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_ANON_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Webhook endpoint
@router.post("/razorpay/webhook")
async def razorpay_webhook(request: Request):
    webhook_secret = os.getenv("RAZORPAY_WEBHOOK_SECRET")

    if not webhook_secret:
        raise HTTPException(status_code=500, detail="Webhook secret missing")

    raw_body = await request.body()
    signature = request.headers.get("x-razorpay-signature")

    # Verify signature
    expected_signature = hmac.new(
        webhook_secret.encode("utf-8"),
        raw_body,
        hashlib.sha256
    ).hexdigest()

    if signature != expected_signature:
        print("❌ Invalid Razorpay signature")
        raise HTTPException(status_code=400, detail="Invalid signature")

    payload = json.loads(raw_body)
    event = payload.get("event")

    print("🔔 Webhook Event Received:", event)

    # Process only successful captured payments
    if event != "payment.captured":
        return {"status": "ignored"}

    payment_entity = payload["payload"]["payment"]["entity"]
    order_id = payment_entity.get("order_id")

    if not order_id:
        raise HTTPException(status_code=400, detail="order_id missing")

    # Look up order in Supabase to find user
    order_lookup = supabase.table("orders").select("user_id").eq("order_id", order_id).single().execute()

    if not order_lookup.data:
        raise HTTPException(status_code=404, detail="Order not found in database")

    user_id = order_lookup.data["user_id"]

    # Update user to Pro
    update_user = supabase.table("user_profiles").update({"is_pro": True}).eq("user_id", user_id).execute()

    print("🎉 User upgraded to Pro:", user_id)

    return {"status": "success"}
