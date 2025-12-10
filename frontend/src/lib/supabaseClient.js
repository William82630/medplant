// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase env vars: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

const SUPABASE_KEY = "supabase_client_singleton_v1";

// attach to window in dev to preserve singleton across HMR
const _global = typeof window !== "undefined" ? window : globalThis;

if (!_global[SUPABASE_KEY]) {
  _global[SUPABASE_KEY] = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = _global[SUPABASE_KEY];
export default supabase;
