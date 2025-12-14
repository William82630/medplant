# app/api/payments.py
# ==========================================
# Razorpay Order Creation (FINAL FIXED)
# ==========================================

import os
import razorpay
from fastapi import APIRouter, HTTPException, Request
from app.utils.supabase_client import supabase

router = APIRouter()

# ---------------------------------------------------------
# Load Razorpay credentials from environment
# ---------------------------------------------------------
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")

if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
    raise RuntimeError("Razorpay keys are missing. Check your .env file.")

client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# ---------------------------------------------------------
# Create Razorpay Order
# ---------------------------------------------------------
@router.post("/razorpay/create-order")
async def create_razorpay_order(request: Request):
    """
    Creates a Razorpay order and stores it in Supabase.
    Expected payload:
    {
        "amount": 199,
        "user_id": "uuid-from-supabase"
    }
    """

    try:
        body = await request.json()

        amount = body.get("amount")
        user_id = body.get("user_id")

        if not amount or not user_id:
            raise HTTPException(
                status_code=400,
                detail="Missing required fields: amount or user_id"
            )

        # Razorpay works in paise
        amount_paise = int(amount) * 100

        # Create Razorpay order
        order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "payment_capture": 1
        })

        order_id = order.get("id")
        if not order_id:
            raise HTTPException(status_code=500, detail="Failed to create Razorpay order")

        # Store order in Supabase
        supabase.table("orders").insert({
            "user_id": user_id,
            "order_id": order_id,
            "amount": amount,
            "status": "created"
        }).execute()

        return {
            "success": True,
            "order_id": order_id,
            "razorpay_key": RAZORPAY_KEY_ID
        }

    except HTTPException:
        raise

    except Exception as e:
        print("❌ Razorpay create-order error:", str(e))
        raise HTTPException(
            status_code=500,
            detail="Internal error while creating Razorpay order"
        )
