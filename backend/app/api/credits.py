from fastapi import APIRouter, Depends, HTTPException
from datetime import date
from app.utils.supabase_client import supabase
from app.api.auth import get_current_user

router = APIRouter(prefix="/credits", tags=["credits"])

FREE_TIER_LIMIT = 10

def _extract_user_id(user):
    """
    get_current_user may return either:
    - a plain user_id string
    - an object/dict containing 'id' or 'user' keys
    This helper normalizes to the user_id string.
    """
    if not user:
        return None
    # If it's already a string, assume it's the id
    if isinstance(user, str):
        return user
    # If it's a dict-like with 'id'
    try:
        if isinstance(user, dict) and "id" in user:
            return user["id"]
        # supabase client sometimes returns an object with .user.id
        uid = getattr(user, "id", None)
        if uid:
            return uid
        inner = getattr(user, "user", None)
        if inner:
            # inner might be dict-like or object
            if isinstance(inner, dict) and "id" in inner:
                return inner["id"]
            return getattr(inner, "id", None)
    except Exception:
        return None
    return None

@router.get("/")
async def get_credits(user=Depends(get_current_user)):
    user_id = _extract_user_id(user)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    today_str = date.today().isoformat()

    try:
        res = supabase.table("daily_credits") \
            .select("used") \
            .eq("user_id", user_id) \
            .eq("date", today_str) \
            .limit(1) \
            .execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    credits_used = 0
    if res and getattr(res, "data", None):
        row = res.data[0]
        # handle different key names defensively
        credits_used = int(row.get("used", row.get("creditsUsed", 0)))

    remaining = max(0, FREE_TIER_LIMIT - credits_used)

    # Check premium status from profiles (optional)
    try:
        profile_res = supabase.table("profiles").select("is_premium").eq("id", user_id).limit(1).execute()
        is_premium = False
        if profile_res and getattr(profile_res, "data", None) and profile_res.data:
            is_premium = bool(profile_res.data[0].get("is_premium", False))
    except Exception:
        is_premium = False

    return {
        "is_premium": is_premium,
        "credits_used": credits_used,
        "remaining": "Unlimited" if is_premium else remaining
    }


@router.post("/deduct")
async def deduct_credit(user=Depends(get_current_user)):
    user_id = _extract_user_id(user)
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    today_str = date.today().isoformat()

    try:
        res = supabase.table("daily_credits") \
            .select("used") \
            .eq("user_id", user_id) \
            .eq("date", today_str) \
            .limit(1) \
            .execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")

    credits_used = 0
    exists = False
    if res and getattr(res, "data", None) and len(res.data) > 0:
        exists = True
        row = res.data[0]
        credits_used = int(row.get("used", row.get("creditsUsed", 0)))

    # Check premium status
    try:
        profile_res = supabase.table("profiles").select("is_premium").eq("id", user_id).limit(1).execute()
        is_premium = False
        if profile_res and getattr(profile_res, "data", None) and profile_res.data:
            is_premium = bool(profile_res.data[0].get("is_premium", False))
    except Exception:
        is_premium = False

    if not is_premium and credits_used >= FREE_TIER_LIMIT:
        raise HTTPException(status_code=403, detail="Daily limit reached")

    new_value = credits_used + 1 if not is_premium else credits_used

    try:
        if exists:
            # update
            supabase.table("daily_credits") \
                .update({"used": new_value}) \
                .eq("user_id", user_id) \
                .eq("date", today_str) \
                .execute()
        else:
            # insert
            supabase.table("daily_credits") \
                .insert({
                    "user_id": user_id,
                    "date": today_str,
                    "used": 1
                }).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB write error: {e}")

    return {"success": True, "used": new_value, "is_premium": is_premium}
