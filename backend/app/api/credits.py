from fastapi import APIRouter, Depends, HTTPException
from app.utils.supabase_client import supabase
from app.utils.auth import verify_user

router = APIRouter(prefix="/credits", tags=["credits"])

FREE_TIER_LIMIT = 10


# -------------------------------
# GET REMAINING CREDITS
# -------------------------------
@router.get("/")
async def get_credits(user_id=Depends(verify_user)):
    try:
        result = supabase.table("user_profiles").select("credits_remaining, is_pro").eq("user_id", user_id).single().execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    if not result or not result.data:
        raise HTTPException(status_code=404, detail="User profile not found")

    credits = result.data["credits_remaining"]
    is_pro = result.data.get("is_pro", False)

    remaining = "Unlimited" if is_pro else credits

    return {
        "user_id": user_id,
        "is_pro": is_pro,
        "remaining": remaining
    }


# -------------------------------
# DEDUCT 1 CREDIT
# -------------------------------
@router.post("/deduct")
async def deduct_credit(user_id=Depends(verify_user)):
    # Fetch current credits
    try:
        profile = supabase.table("user_profiles").select("credits_remaining, is_pro").eq("user_id", user_id).single().execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

    if not profile or not profile.data:
        raise HTTPException(status_code=404, detail="User profile not found")

    credits = profile.data["credits_remaining"]
    is_pro = profile.data.get("is_pro", False)

    # Pro users have unlimited credits
    if not is_pro:
        if credits <= 0:
            raise HTTPException(status_code=402, detail="No credits remaining")
        new_credits = credits - 1
    else:
        new_credits = credits  # unchanged

    # Update DB
    try:
        supabase.table("user_profiles").update({"credits_remaining": new_credits}).eq("user_id", user_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database write error: {e}")

    return {
        "success": True,
        "remaining": "Unlimited" if is_pro else new_credits,
        "is_pro": is_pro
    }
