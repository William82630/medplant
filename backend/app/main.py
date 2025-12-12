import os
import sys
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# ====================================================
# LOAD .env BEFORE ANY OTHER IMPORTS
# ====================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(BASE_DIR, "..", ".env")
load_dotenv(ENV_PATH)

print("DEBUG: ENV PATH =", ENV_PATH)
print("DEBUG: SUPABASE_URL =", os.getenv("SUPABASE_URL"))
print("DEBUG: RAZORPAY_KEY_ID =", os.getenv("RAZORPAY_KEY_ID"))

# ====================================================
# CRITICAL KEY CHECKS
# ====================================================
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
if not SUPABASE_KEY:
    print("\nFATAL ERROR: SUPABASE_KEY missing in .env")
    print("Use the SERVICE_ROLE key and make sure its name is SUPABASE_KEY.\n")
    sys.exit(1)
else:
    print("DEBUG: SUPABASE_KEY loaded successfully.")

# ====================================================
# IMPORT MODULES AFTER ENV IS LOADED
# ====================================================
from app.utils.supabase_client import supabase
from app.utils.auth import verify_user

from app.api import credits
from app.api.identify import router as identify_router
from app.api.razorpay_webhook import router as razorpay_webhook_router
from app.api.razorpay_order import router as razorpay_order_router

# ====================================================
# FASTAPI INITIALIZATION
# ====================================================
app = FastAPI(
    title="MedPlant AI Backend",
    version="1.0.0"
)

# ----------------------------------------------------
# CORS
# ----------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ====================================================
# BASIC ROUTES
# ====================================================
@app.get("/")
def root():
    return {"message": "MedPlant AI backend is running"}

@app.get("/test_supabase")
async def test_supabase():
    try:
        resp = supabase.table("user_profiles").select("*").limit(1).execute()
        return {"success": True, "data": resp.data}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/secure_test")
async def secure_test(request: Request):
    user_id = await verify_user(request)
    return {"success": True, "user_id": user_id}

# ====================================================
# ROUTERS
# ====================================================
app.include_router(credits.router, prefix="/api")
app.include_router(identify_router, prefix="/api")
app.include_router(razorpay_order_router, prefix="/api")
app.include_router(razorpay_webhook_router, prefix="/api")
