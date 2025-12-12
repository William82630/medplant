// ======================================
// MedPlantPro.jsx — FINAL FIXED VERSION
// Razorpay (India) + PayPal (International)
// ======================================
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

// -------------------------
// Detect User Country
// -------------------------
const detectCountry = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country || "IN";
  } catch {
    return "IN";
  }
};

export default function MedPlantPro() {
  const [country, setCountry] = useState("IN");
  const [loading, setLoading] = useState(true);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  // Razorpay Keys (real key goes here)
  const RAZORPAY_KEY = "YOUR_RAZORPAY_KEY";

  // Razorpay Plans (Keep your original links or replace with Orders API later)
  const RAZORPAY_MONTHLY = "https://rzp.io/l/YOUR_MONTHLY_LINK";
  const RAZORPAY_YEARLY = "https://rzp.io/l/YOUR_YEARLY_LINK";

  // PayPal Plans
  const PAYPAL_MONTHLY_PLAN = "YOUR_PAYPAL_MONTHLY_PLAN_ID";
  const PAYPAL_YEARLY_PLAN = "YOUR_PAYPAL_YEARLY_PLAN_ID";
  const PAYPAL_CLIENT_ID = "YOUR_PAYPAL_CLIENT_ID";

  // -------------------------
  // Load region + PayPal SDK + Razorpay SDK
  // -------------------------
  useEffect(() => {
    (async () => {
      const c = await detectCountry();
      setCountry(c);
      setLoading(false);

      // Load Razorpay script
      const razorScript = document.createElement("script");
      razorScript.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(razorScript);

      // Load PayPal script only for non-India
      if (c !== "IN") {
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&vault=true&intent=subscription`;
        script.onload = () => setPaypalLoaded(true);
        document.body.appendChild(script);
      }
    })();
  }, []);

  // ------------------------------------
  // HANDLE RAZORPAY CHECKOUT
  // ------------------------------------
  const openRazorpay = async (planType) => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth?.user?.id) return alert("Please log in first");

    const amountINR = planType === "monthly" ? 79 * 100 : 799 * 100;

    const options = {
      key: RAZORPAY_KEY,
      amount: amountINR,
      currency: "INR",
      name: "MedPlant Pro",
      description: planType === "monthly" ? "Monthly Subscription" : "Annual Subscription",
      handler: async () => {
        await supabase
          .from("user_profiles")
          .update({ is_pro: true })
          .eq("id", auth.user.id);

        alert("Subscription activated successfully!");
      },
      prefill: {
        email: auth.user.email,
      },
      theme: {
        color: "#059669",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ------------------------------------
  // PAYPAL MONTHLY
  // ------------------------------------
  useEffect(() => {
    if (country === "IN" || !paypalLoaded) return;
    if (!document.getElementById("paypal-monthly")) return;

    if (!window.paypal) return;

    window.paypal.Buttons({
      style: { label: "subscribe", color: "gold" },
      createSubscription: (data, actions) =>
        actions.subscription.create({ plan_id: PAYPAL_MONTHLY_PLAN }),

      onApprove: async () => {
        const { data: auth } = await supabase.auth.getUser();
        if (auth?.user?.id) {
          await supabase.from("user_profiles").update({ is_pro: true }).eq("id", auth.user.id);
        }
        alert("Monthly Subscription Activated!");
      },

      onError: () => alert("Payment failed"),
    }).render("#paypal-monthly");
  }, [paypalLoaded, country]);

  // ------------------------------------
  // PAYPAL YEARLY
  // ------------------------------------
  useEffect(() => {
    if (country === "IN" || !paypalLoaded) return;
    if (!document.getElementById("paypal-yearly")) return;

    if (!window.paypal) return;

    window.paypal.Buttons({
      style: { label: "subscribe", color: "gold" },
      createSubscription: (data, actions) =>
        actions.subscription.create({ plan_id: PAYPAL_YEARLY_PLAN }),

      onApprove: async () => {
        const { data: auth } = await supabase.auth.getUser();
        if (auth?.user?.id) {
          await supabase.from("user_profiles").update({ is_pro: true }).eq("id", auth.user.id);
        }
        alert("Yearly Subscription Activated!");
      },

      onError: () => alert("Payment failed"),
    }).render("#paypal-yearly");
  }, [paypalLoaded, country]);

  // ------------------------------------
  // Loading state
  // ------------------------------------
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 60, fontSize: 20 }}>
        Detecting your region…
      </div>
    );
  }

  const isIndia = country === "IN";

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <h1 style={{ fontSize: 40, fontWeight: 800, textAlign: "center", color: "#064e3b" }}>
        MedPlant Pro
      </h1>

      <p style={{ textAlign: "center", color: "#555", fontSize: 18, marginBottom: 30 }}>
        Unlock unlimited medicinal plant knowledge — safely, instantly, and affordably.
      </p>

      {/* ------------------------------------ */}
      {/* Pricing Grid */}
      {/* ------------------------------------ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        {/* MONTHLY */}
        <div style={planBox}>
          <h2 style={planTitle}>Monthly Plan</h2>
          <div style={priceText}>{isIndia ? "₹79 / month" : "$2 / month"}</div>

          <ul style={featureList}>
            <li>Unlimited plant scans</li>
            <li>Full medicinal reports</li>
            <li>PDF export</li>
            <li>Save unlimited plants</li>
            <li>Priority support</li>
          </ul>

          {isIndia ? (
            <button onClick={() => openRazorpay("monthly")} style={btnPrimary}>
              Pay with Razorpay
            </button>
          ) : (
            <div id="paypal-monthly" style={{ marginTop: 10 }} />
          )}
        </div>

        {/* YEARLY */}
        <div style={planBox}>
          <h2 style={planTitle}>Annual Plan</h2>
          <div style={priceText}>{isIndia ? "₹799 / year" : "$20 / year"}</div>

          <div style={saveTag}>Save 2 Months!</div>

          <ul style={featureList}>
            <li>Unlimited plant scans</li>
            <li>Full medicinal reports</li>
            <li>PDF export</li>
            <li>Save unlimited plants</li>
            <li>Priority support</li>
          </ul>

          {isIndia ? (
            <button onClick={() => openRazorpay("yearly")} style={btnPrimary}>
              Pay with Razorpay
            </button>
          ) : (
            <div id="paypal-yearly" style={{ marginTop: 10 }} />
          )}
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* What You Get */}
      {/* ------------------------------------ */}
      <h2 style={{ marginTop: 60, fontSize: 28, fontWeight: 700 }}>What You Get With MedPlant Pro</h2>

      <ul style={bigList}>
        <li>Unlimited AI-powered identification</li>
        <li>Complete medicinal data & evidence</li>
        <li>Preparation + dosage + toxicity + interactions</li>
        <li>Unlimited saved plants</li>
        <li>PDF / MD / Image export</li>
        <li>No scan limits</li>
        <li>Priority email support (info@willsblogger.com)</li>
        <li>Helps support future MedPlant development</li>
      </ul>
    </div>
  );
}

/* ====================
   STYLES
==================== */
const planBox = {
  background: "white",
  borderRadius: 14,
  padding: 25,
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};

const planTitle = {
  fontSize: 24,
  fontWeight: 700,
  color: "#064e3b",
};

const priceText = {
  fontSize: 32,
  fontWeight: 800,
  margin: "6px 0 12px",
};

const featureList = {
  paddingLeft: 20,
  marginBottom: 20,
  lineHeight: 1.6,
  fontSize: 15,
};

const saveTag = {
  background: "#d1fae5",
  padding: "6px 10px",
  borderRadius: 8,
  fontSize: 14,
  color: "#047857",
  fontWeight: 600,
  display: "inline-block",
  marginBottom: 10,
};

const bigList = {
  paddingLeft: 25,
  lineHeight: 1.7,
  fontSize: 17,
};

const btnPrimary = {
  display: "inline-block",
  width: "100%",
  textAlign: "center",
  background: "#059669",
  color: "white",
  padding: "12px 0",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 16,
  marginTop: 10,
};
