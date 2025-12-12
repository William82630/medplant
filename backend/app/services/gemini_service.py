# app/services/gemini_service.py

from google import genai
from google.genai.types import Part
from fastapi import HTTPException


class GeminiService:
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("Gemini API key missing in environment variables")

        # initialize Google GenAI client
        self.client = genai.Client(api_key=api_key)

    async def identify_plant(self, image_bytes: bytes) -> str:
        """
        Sends a plant image to Gemini and returns structured text output.
        """

        try:
            # IMPORTANT — fixed model name
            response = self.client.models.generate_content(
                model="gemini-1.5-pro-latest",
                contents=[
                    Part.from_bytes(
                        data=image_bytes,
                        mime_type="image/jpeg"
                    ),
                    (
                        "Analyze this plant image and respond ONLY with structured text:\n"
                        "- English name\n"
                        "- Scientific name\n"
                        "- Key medicinal benefits\n"
                        "- Risks or side effects\n"
                        "- Additional important notes"
                    )
                ],
            )

            return response.text.strip()

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Gemini API error: {str(e)}"
            )
