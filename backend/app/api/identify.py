# app/api/identify.py

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.services.gemini_service import GeminiService
from app.utils.supabase_client import supabase
from app.utils.auth_helper import get_current_user_optional
import os

router = APIRouter()

gemini = GeminiService(api_key=os.getenv("GEMINI_API_KEY"))


@router.post("/identify")
async def identify_plant(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user_optional)  # anonymous allowed
):
    """
    Unified credit system:
    - Anonymous users → frontend tracks credits (localStorage)
    - Logged-in users → backend checks/deducts credits
    """

    # 1. Validate image
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid image format")

    image_bytes = await file.read()

    # 2. Determine auth state
    is_logged_in = user is not None
    is_pro = False
    credits_remaining = None

    if is_logged_in:
        is_pro = user.get("is_pro", False)
        credits_remaining = user.get("credits_remaining", 0)

        if not is_pro and credits_remaining <= 0:
            raise HTTPException(status_code=402, detail="No credits left")

    # 3. Call Gemini Vision
    try:
        ai_output = await gemini.identify_plant(image_bytes)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini error: {str(e)}")

    # 4. Deduct credit for logged-in free users
    if is_logged_in and not is_pro:
        supabase.table("user_profiles").update(
            {"credits_remaining": credits_remaining - 1}
        ).eq("user_id", user["id"]).execute()

    # 5. Return response
    return {
        "success": True,
        "analysis": ai_output,
        "remaining_credits": (
            credits_remaining - 1 if is_logged_in and not is_pro else None
        ),
        "is_pro": is_pro,
        "logged_in": is_logged_in
    }

