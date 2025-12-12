# app/utils/auth_helper.py

from fastapi import Request, HTTPException, Header
from typing import Optional, Dict, Any
from app.utils.supabase_client import supabase


async def get_current_user(request: Request) -> Optional[Dict[str, Any]]:
    """
    Extracts and verifies Supabase JWT from Authorization header.
    Returns:
        - user profile dict (matching user_profiles table)
        - None if no Authorization header (anonymous access allowed)
    """

    auth_header = request.headers.get("Authorization")

    # Allow anonymous access for endpoints that support it
    if not auth_header:
        return None

    if not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization format")

    token = auth_header.split(" ")[1]

    # Step 1: Ask Supabase to resolve user from JWT
    try:
        response = supabase.auth.get_user(token)

        if response is None or response.user is None:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        user_id = response.user.id

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

    # Step 2: Load user profile (credits, pro status, etc.)
    try:
        profile_resp = (
            supabase.table("user_profiles")
            .select("*")
            .eq("id", user_id)
            .single()
            .execute()
        )

        if not profile_resp or not profile_resp.data:
            raise HTTPException(status_code=404, detail="User profile not found")

        return profile_resp.data

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load user profile: {str(e)}")
