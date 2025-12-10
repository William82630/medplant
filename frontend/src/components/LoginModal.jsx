// =====================================
// LoginModal.jsx — Fixed Supabase Import
// Supabase Google Login + Email Login
// =====================================
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";   // ✅ FIXED PATH

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [message, setMessage] = useState("");

  if (!open) return null;

  // -----------------------------
  // GOOGLE LOGIN
  // -----------------------------
  const signInWithGoogle = async () => {
    setLoadingGoogle(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // redirect back to site
      },
    });

    if (error) {
      setMessage(error.message);
      setLoadingGoogle(false);
    }
  };

  // -----------------------------
  // EMAIL LOGIN (Magic Link)
  // -----------------------------
  const sendMagicLink = async () => {
    if (!email) return setMessage("Enter a valid email.");

    setLoadingEmail(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoadingEmail(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login link sent! Check your email.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: "95%",
          maxWidth: 420,
          background: "#fff",
          padding: "26px",
          borderRadius: "14px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ margin: "0 0 16px", fontSize: 24 }}>Login Required</h2>

        <p style={{ marginBottom: 20, color: "#666" }}>
          Login to save your plant identifications.
        </p>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          onClick={signInWithGoogle}
          disabled={loadingGoogle}
          style={{
            width: "100%",
            background: "#4285F4",
            color: "#fff",
            padding: "12px",
            borderRadius: 10,
            border: "none",
            fontSize: 16,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          {loadingGoogle ? "Connecting…" : "Continue with Google"}
        </button>

        {/* EMAIL LOGIN */}
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #ccc",
              marginBottom: 10,
              fontSize: 15,
            }}
          />

          <button
            onClick={sendMagicLink}
            disabled={loadingEmail}
            style={{
              width: "100%",
              background: "#059669",
              color: "white",
              padding: "12px",
              borderRadius: 10,
              border: "none",
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            {loadingEmail ? "Processing…" : "Login with Email"}
          </button>
        </div>

        {/* STATUS MESSAGE */}
        {message && (
          <p style={{ marginTop: 12, color: "#444", fontSize: 14 }}>
            {message}
          </p>
        )}

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            marginTop: 20,
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            background: "#ddd",
            border: "none",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
