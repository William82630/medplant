from supabase import create_client, Client
import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")  # service role key

if not SUPABASE_URL:
    raise ValueError("SUPABASE_URL is missing in environment variables")

if not SUPABASE_KEY:
    raise ValueError("SUPABASE_KEY is missing in environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
