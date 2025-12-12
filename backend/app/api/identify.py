# app/api/identify.py

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.services.gemini_service import GeminiService
from app.utils.supabase_client import supabase
from app.utils.auth_helper import get_current_user
import os

router = APIRouter()

# Initialize Gemini service
gemini = GeminiService(api_key=os.getenv("GEMINI_API_KEY"))


@router.post("/identify")
async def identify_plant(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user)  # Returns user profile dict or None
):
    """
    Full plant identification flow:
    - Validate image
    - Check credits (if user is logged in)
    - Call Gemini
    - Deduct credit
    - Return AI result
    """

    # ------------------------------------------------------
    # 1. Validate image
    # ------------------------------------------------------
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image format")

    image_bytes = await file.read()

    # ------------------------------------------------------
    # 2. Handle logged-in and anonymous users
    # ------------------------------------------------------
    is_logged_in = user is not None

    # Logged-in user → check credits
    if is_logged_in:
        is_pro = user.get("is_pro", False)
        credits_remaining = user.get("credits_remaining", 0)

        if not is_pro and credits_remaining <= 0:
            raise HTTPException(status_code=402, detail="No credits left. Upgrade required.")
    else:
        # Anonymous user → allowed, no credit deduction done
        is_pro = False
        credits_remaining = None

    # ------------------------------------------------------
    # 3. Call Gemini AI
    # ------------------------------------------------------
    try:
        ai_output = await gemini.identify_plant(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")

    # ------------------------------------------------------
    # 4. Deduct credit for logged-in non-Pro users
    # ------------------------------------------------------
    if is_logged_in and not is_pro:
        supabase.table("user_profiles").update(
            {"credits_remaining": max(credits_remaining - 1, 0)}
        ).eq("user_id", user["id"]).execute()

    # ------------------------------------------------------
    # 5. Return response to frontend
    # ------------------------------------------------------
    return {
        "success": True,
        "analysis": ai_output,
        "remaining_credits": (
            max(credits_remaining - 1, 0)
            if is_logged_in and not is_pro
            else None
        ),
        "is_pro": is_pro
    }
