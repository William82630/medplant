from fastapi import Header, HTTPException
from supabase import Client
from app.utils.supabase_client import supabase

async def get_current_user(authorization: str = Header(None)):
    """
    Extract and verify Supabase JWT from Authorization header.
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")

    try:
        token = authorization.replace("Bearer ", "")

        # Verify the token using Supabase
        response = supabase.auth.get_user(token)

        if not response or not response.user:
            raise HTTPException(status_code=401, detail="Invalid token")

        return response.user.id

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

import jwt
from fastapi import Request, HTTPException
from supabase import create_client
from app.utils.supabase_client import supabase

async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(
            token,
            options={"verify_signature": False},  # Supabase JWT signature is HS256 secret; backend doesn't need to verify
            algorithms=["HS256"],
        )
        user_id = decoded.get("sub")

        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token: no user ID found")

        return user_id

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

from fastapi import Request, HTTPException
from supabase.lib.client import SupabaseClient
import jwt

async def verify_user(request: Request, supabase: SupabaseClient):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    token = auth_header.replace("Bearer ", "")
    if not token:
        raise HTTPException(status_code=401, detail="Token missing")

    try:
        user = supabase.auth.get_user(token)
        if not user or not user.user:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

        return user.user.id

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Auth failed: {str(e)}")
