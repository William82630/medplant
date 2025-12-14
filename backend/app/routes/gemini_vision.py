# app/routes/gemini_vision.py

from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.gemini_service import identify_plant_with_image

router = APIRouter(prefix="/api/gemini", tags=["Gemini"])


@router.post("/identify")
async def identify_plant(image: UploadFile = File(...)):
    """
    Identify a plant from an uploaded image using Gemini Vision.
    """

    try:
        # Validate content type
        if not image.content_type or not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

        image_bytes = await image.read()

        if not image_bytes:
            raise HTTPException(status_code=400, detail="Empty image file")

        result = identify_plant_with_image(
            image_bytes=image_bytes,
            mime_type=image.content_type or "image/jpeg"
        )

        return {
            "success": True,
            "response": result
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing image: {str(e)}"
        )
