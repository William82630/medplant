from supabase import create_client
import os

# Load Supabase credentials from .env
SUPABASE_URL = os.getenv("SUPABASE_URL")

# Prefer service role → fallback to anon key
SUPABASE_KEY = (
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    or os.getenv("SUPABASE_ANON_KEY")
)

if not SUPABASE_URL:
    print("❌ ERROR: SUPABASE_URL is missing in .env")

if not SUPABASE_KEY:
    print("❌ ERROR: SUPABASE_ANON_KEY or SERVICE_ROLE_KEY is missing in .env")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
