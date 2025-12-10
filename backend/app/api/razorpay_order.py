import os
import razorpay
from fastapi import APIRouter, HTTPException, Request
from supabase import create_client

router = APIRouter()

# ---------------------------------------------------------
# 🔥 Load Razorpay credentials from .env
# ---------------------------------------------------------
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    print("❌ Razorpay keys missing in .env")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# ---------------------------------------------------------
# 🔥 Load Supabase credentials from .env
# MUST use correct variable names
# ---------------------------------------------------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY") or
    os.getenv("SUPABASE_ANON_KEY")
)

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Supabase credentials missing in .env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# ---------------------------------------------------------
# Create Razorpay Order Route
# ---------------------------------------------------------
@router.post("/razorpay/create-order")
async def create_order(request: Request):
    try:
        body = await request.json()

        amount = body.get("amount")
        user_id = body.get("user_id")

        if not amount or not user_id:
            raise HTTPException(status_code=400, detail="Missing amount or user_id")

        amount_paise = int(amount) * 100  # Razorpay uses paise

        # Create order in Razorpay
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1
        })

        order_id = order.get("id")

        # Save order in Supabase
        supabase.table("orders").insert({
            "user_id": user_id,
            "order_id": order_id
        }).execute()

        return {
            "success": True,
            "order_id": order_id,
            "razorpay_key": RAZORPAY_KEY_ID
        }

    except Exception as e:
        print("❌ Error creating order:", str(e))
        raise HTTPException(status_code=500, detail="Failed to create order")
