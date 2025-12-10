import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";   // ✅ FIXED PATH
import LoginModal from "./LoginModal";
import { getAnonCredits } from "../utils/credits";

export default function Navbar() {
  const [session, setSession] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [profile, setProfile] = useState(null);

  // -----------------------------------
  // Fetch user profile
  // -----------------------------------
  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)        // ✅ FIXED COLUMN
      .single();
    return error ? null : data;
  };

  // -----------------------------------
  // Transfer guest credits once
  // -----------------------------------
  const transferGuestCredits = async (userId) => {
    if (localStorage.getItem("creditsTransferred") === "yes") return;

    const guestRemaining = getAnonCredits();
    const bonus = 5;
    const total = guestRemaining + bonus;

    await supabase
      .from("user_profiles")
      .update({ credits_remaining: total })
      .eq("user_id", userId);       // ✅ FIXED COLUMN

    localStorage.removeItem("anonCredits");
    localStorage.removeItem("anonCreditsDate");

    localStorage.setItem("creditsTransferred", "yes");
  };

  // -----------------------------------
  // Auth Listener
  // -----------------------------------
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session?.user?.id) {
          const userId = session.user.id;

          let userProfile = await fetchUserProfile(userId);

          // Create profile if missing
          if (!userProfile) {
            await supabase.from("user_profiles").insert({
              user_id: userId,            // ✅ FIXED COLUMN
              credits_remaining: 15,
              is_pro: false,
            });
            userProfile = await fetchUserProfile(userId);
          }

          // Transfer guest credits only once
          if (localStorage.getItem("creditsTransferred") !== "yes") {
            await transferGuestCredits(userId);
          }

          const refreshed = await fetchUserProfile(userId);
          setProfile(refreshed);

        } else {
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // -----------------------------------
  // Logout
  // -----------------------------------
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  // -----------------------------------
  // UI
  // -----------------------------------
  return (
    <header style={navBar}>
      <div style={innerWrap}>

        {/* LOGO */}
        <a href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/assets/logo.png" alt="logo" style={{ width: 32 }} />
            <div style={logoText}>MedPlant</div>
          </div>
        </a>

        {/* NAV LINKS */}
        <nav style={navLinks}>
          <a href="/" style={link}>Home</a>
          <a href="/about" style={link}>About</a>
          <a href="/privacy" style={link}>Privacy</a>
          <a href="/terms" style={link}>Terms</a>
          <a href="/contact" style={link}>Contact</a>

          {!session ? (
            <button style={loginBtn} onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          ) : (
            <>
              <a href="/saved" style={savedBtn}>My Saved</a>

              {!profile?.is_pro && (
                <a href="/pro" style={upgradeBtn}>Upgrade</a>
              )}

              {profile?.is_pro && (
                <span style={proBadge}>PRO</span>
              )}

              <button onClick={handleLogout} style={logoutBtn}>Logout</button>
            </>
          )}
        </nav>
      </div>

      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  );
}

/* =======================
   STYLES
======================= */
const navBar = {
  background: "#000",
  position: "sticky",
  top: 0,
  zIndex: 40,
  padding: "10px 0",
};

const innerWrap = {
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
};

const logoText = { color: "#fff", fontWeight: 800, fontSize: 21 };

const navLinks = { display: "flex", gap: 20, alignItems: "center" };

const link = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 15,
};

const loginBtn = {
  background: "#059669",
  color: "#fff",
  padding: "8px 16px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

const savedBtn = {
  color: "#34d399",
  textDecoration: "none",
  fontWeight: 700,
  padding: "6px 12px",
  borderRadius: 6,
  border: "1px solid #34d399",
};

const logoutBtn = {
  background: "#dc2626",
  color: "#fff",
  padding: "8px 14px",
  borderRadius: 8,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};

const upgradeBtn = {
  background: "#fbbf24",
  color: "#111",
  padding: "8px 14px",
  borderRadius: 8,
  fontWeight: 700,
  textDecoration: "none",
  border: "1px solid #f59e0b",
};

const proBadge = {
  background: "#fbbf24",
  color: "#000",
  padding: "6px 10px",
  borderRadius: 6,
  fontWeight: 800,
  fontSize: 13,
  border: "1px solid #f59e0b",
};
