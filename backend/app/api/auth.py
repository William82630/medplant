from fastapi import Request, HTTPException
from app.utils.supabase_client import supabase

async def get_current_user(request: Request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    try:
        token = auth_header.split("Bearer ")[1]
    except:
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    # Validate token via Supabase
    try:
        user = supabase.auth.get_user(token)
        if user is None or user.user is None:
            raise HTTPException(status_code=401, detail="Invalid or expired token")
        return {"id": user.user.id}
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Auth failed: {str(e)}")
