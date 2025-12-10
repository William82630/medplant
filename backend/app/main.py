import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# ----------------------------------------------------
# FORCE LOAD .env BEFORE ANY OTHER IMPORTS
# ----------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))    
ENV_PATH = os.path.join(BASE_DIR, "..", ".env")
load_dotenv(ENV_PATH)

print("DEBUG: ENV PATH =", ENV_PATH)
print("DEBUG: SUPABASE_URL from env =", os.getenv("SUPABASE_URL"))
print("DEBUG: RAZORPAY_KEY_ID from env =", os.getenv("RAZORPAY_KEY_ID"))

# ----------------------------------------------------
# NOW WE CAN SAFELY IMPORT OTHER MODULES
# (They depend on .env variables)
# ----------------------------------------------------
from app.api.razorpay_order import router as razorpay_order_router
from app.api.razorpay_webhook import router as razorpay_router
from app.api import credits
from app.utils.supabase_client import supabase
from app.utils.auth import verify_user

# ----------------------------------------------------
# FASTAPI APP INITIALIZATION
# ----------------------------------------------------
app = FastAPI(
    title="MedPlant AI Backend",
    version="1.0.0"
)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "MedPlant AI backend is running"}

@app.get("/test_supabase")
async def test_supabase():
    try:
        data = supabase.table("profiles").select("*").limit(1).execute()
        return {"success": True, "message": "Supabase connected!", "data": data.data}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/secure_test")
async def secure_test(request: Request):
    user = await verify_user(request)
    return {"success": True, "user_id": user}

# Routers
app.include_router(credits.router, prefix="/api")
app.include_router(razorpay_router, prefix="/api")
app.include_router(razorpay_order_router, prefix="/api")
