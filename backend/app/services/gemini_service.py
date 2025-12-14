import base64
import requests
import os
from fastapi import HTTPException

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL = "gemini-2.5-flash-preview-09-2025"

def identify_plant_with_image(image_bytes: bytes, mime_type: str) -> str:
    if not GEMINI_API_KEY:
        raise HTTPException(500, "GEMINI_API_KEY missing")

    prompt = """
Identify this medicinal plant.
Structure the response with these Markdown headers:

## Plant Identification Overview
## Medicinal Benefits (Numbered List)
## Side Effects (Numbered List)
## Safety and Toxicity Warnings
## How to Prepare
## Where Found
## Detail Explanation & Sources (Include links)
"""

    image_base64 = base64.b64encode(image_bytes).decode("utf-8")

    payload = {
        "contents": [{
            "parts": [
                { "text": prompt },
                {
                    "inlineData": {
                        "mimeType": mime_type,
                        "data": image_base64
                    }
                }
            ]
        }],
        "tools": [{ "google_search": {} }]
    }

    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODEL}:generateContent?key={GEMINI_API_KEY}"
    )

    r = requests.post(url, json=payload, timeout=60)
    data = r.json()

    if not r.ok:
        raise HTTPException(500, data.get("error", {}).get("message", "Gemini error"))

    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return text.strip()
