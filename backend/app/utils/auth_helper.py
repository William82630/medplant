# app/utils/auth_helper.py

from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.utils.supabase_client import supabase

# Custom optional HTTP bearer (doesn't force token)
class OptionalHTTPBearer(HTTPBearer):
    async def __call__(self, request: Request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None
        return await super().__call__(request)

optional_security = OptionalHTTPBearer()
required_security = HTTPBearer()


# ----------------------------------------------------
# OPTIONAL USER FETCH — returns None if no token
# ----------------------------------------------------
async def get_current_user_optional(
    credentials: HTTPAuthorizationCredentials = Depends(optional_security)
):
    if not credentials:
        return None

    token = credentials.credentials

    try:
        user = supabase.auth.get_user(token)
        if user and user.user:
            profile = (
                supabase.table("user_profiles")
                .select("*")
                .eq("user_id", user.user.id)
                .single()
                .execute()
            )

            return {
                "id": user.user.id,
                "email": user.user.email,
                **(profile.data or {})
            }
    except Exception:
        return None

    return None


# ----------------------------------------------------
# REQUIRED USER FETCH — raises 401 if invalid
# ----------------------------------------------------
async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(required_security)
):
    user = await get_current_user_optional(credentials)

    if not user:
        raise HTTPException(status_code=401, detail="Authentication required.")

    return user
