from fastapi import Request, HTTPException

# Dummy authentication function
# You can replace this later with real auth logic
async def verify_user(request: Request):
    # For now, return a fake user id or None
    user_id = request.headers.get("X-User-ID")

    if not user_id:
        raise HTTPException(status_code=401, detail="User not authenticated")

    return user_id
