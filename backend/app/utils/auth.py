import os
import httpx
from fastapi import Request, HTTPException

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

AUTH_URL = f"{SUPABASE_URL}/auth/v1/user"


async def verify_user(request: Request):
    """Verify Supabase JWT by calling GoTrue REST API."""
    
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization format")

    token = auth_header.replace("Bearer ", "").strip()

    async with httpx.AsyncClient() as client:
        resp = await client.get(
            AUTH_URL,
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": SUPABASE_ANON_KEY,
            },
            timeout=10,
        )

    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    data = resp.json()
    user_id = data.get("id")

    if not user_id:
        raise HTTPException(status_code=401, detail="User ID missing in response")

    return user_id
