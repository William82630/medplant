// =====================================
// Login.jsx — Google + Email Login
// =====================================
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";  // <-- FIXED PATH
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ------------------------------
  // Google Login
  // ------------------------------
  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/identify" },
    });

    if (error) setMessage(error.message);
    setLoading(false);
  };

  // ------------------------------
  // Email Login (Magic Link)
  // ------------------------------
  const sendMagicLink = async () => {
    if (!email) return setMessage("Enter your email first.");

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + "/identify",
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login link sent! Check your email.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "60px auto", padding: 20 }}>
      <h1 style={{ fontSize: 32, marginBottom: 20 }}>Login to MedPlant</h1>

      {message && (
        <p style={{ color: "red", marginBottom: 20, fontWeight: 600 }}>
          {message}
        </p>
      )}

      {/* Google Login */}
      <button
        onClick={signInWithGoogle}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 0",
          background: "#4285F4",
          color: "white",
          fontSize: 16,
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        {loading ? "Connecting..." : "Continue with Google"}
      </button>

      {/* Divider */}
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          color: "#888",
        }}
      >
        — or continue with email —
      </div>

      {/* Email Login Input */}
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: 8,
          border: "1px solid #ccc",
          marginBottom: 12,
        }}
      />

      {/* Updated Email Login Button */}
      <button
        onClick={sendMagicLink}
        disabled={loading}
        style={{
          width: "100%",
          padding: "14px 0",
          background: "#059669",
          color: "white",
          fontSize: 16,
          fontWeight: 600,
          border: "none",
          borderRadius: 8,
        }}
      >
        {loading ? "Processing..." : "Login with Email"}
      </button>
    </div>
  );
}
