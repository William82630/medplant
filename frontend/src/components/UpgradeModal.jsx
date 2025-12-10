// ========================================
// UpgradeModal.jsx — MedPlant Pro Upsell
// Final Corrected Version
// ========================================

import React from "react";
import { FaTimes } from "react-icons/fa";

export default function UpgradeModal({ open, onClose, remaining }) {
  if (!open) return null;

  return (
    <div style={backdrop} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={header}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "var(--text-primary)" }}>
            Upgrade to MedPlant Pro
          </h2>

          <button onClick={onClose} style={closeBtn}>
            <FaTimes size={18} color="var(--text-secondary)" />
          </button>
        </div>

        {/* MESSAGE */}
        <p style={subtext}>
          You’ve used all your free daily identifications.
          <br />
          Upgrade to unlock unlimited scans and advanced medicinal insights.
          <br /><br />
          🔋 <strong style={{ color: "#059669" }}>Remaining today:</strong> {remaining}
        </p>

        {/* FEATURES BOX */}
        <div style={featuresBox}>
          <h3 style={featuresTitle}>✨ Pro Features</h3>

          <ul style={featureList}>
            <li>Unlimited plant identifications</li>
            <li>Full medicinal report + dosage + toxicity</li>
            <li>AI herbal recommendations</li>
            <li>Priority analysis speed</li>
            <li>Save unlimited plants</li>
            <li>Lifetime access to all new Pro features</li>
          </ul>
        </div>

        {/* PRICING CARD */}
        <div style={pricingCard}>
          <div style={priceTop}>Lifetime Access</div>

          <div style={priceValue}>
            ₹499 <span style={priceSmall}>one-time payment</span>
          </div>

          <div style={priceDesc}>No subscription • No hidden fees</div>
        </div>

        {/* BUTTONS */}
        <div style={btnWrapper}>

          <button
            style={rzpBtn}
            onClick={() => alert("Razorpay integration will be added in next step.")}
          >
            Pay with Razorpay
          </button>

          <button
            style={paypalBtn}
            onClick={() => alert("PayPal integration coming next.")}
          >
            Pay with PayPal
          </button>
        </div>

        <div style={footnote}>
          Secure Payments • Instant Activation • 100% Safe
        </div>

      </div>
    </div>
  );
}

// ========================================
// STYLES — Dark Mode Compatible
// ========================================

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(7px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  width: "90%",
  maxWidth: "480px",
  background: "var(--card-bg)",
  borderRadius: "16px",
  padding: "26px",
  border: "1px solid var(--border-color)",
  boxShadow: "0 12px 32px rgba(0,0,0,0.25)",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
};

const closeBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 6,
};

const subtext = {
  color: "var(--text-secondary)",
  lineHeight: 1.6,
  marginBottom: 20,
  fontSize: 15,
};

const featuresBox = {
  background: "var(--highlight-bg, #ecfdf5)",
  padding: 16,
  borderRadius: 12,
  border: "1px solid #bbf7d0",
  marginBottom: 20,
};

const featuresTitle = {
  margin: 0,
  fontSize: 18,
  fontWeight: 700,
  color: "var(--text-primary)",
  marginBottom: 10,
};

const featureList = {
  margin: 0,
  paddingLeft: 18,
  lineHeight: 1.55,
  color: "#166534",
};

const pricingCard = {
  background: "var(--highlight-bg, #ecfdf5)",
  padding: 20,
  borderRadius: 14,
  border: "1px solid #34d399",
  textAlign: "center",
  marginBottom: 20,
};

const priceTop = {
  fontSize: 14,
  color: "#047857",
  fontWeight: 600,
  marginBottom: 4,
};

const priceValue = {
  fontSize: 36,
  fontWeight: 900,
  color: "#065f46",
  marginBottom: 4,
};

const priceSmall = {
  fontSize: 14,
  fontWeight: 500,
};

const priceDesc = {
  fontSize: 14,
  color: "var(--text-secondary)",
};

const btnWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: 12,
};

const rzpBtn = {
  background: "#0ea5e9",
  color: "#fff",
  padding: "12px",
  borderRadius: 10,
  border: "none",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
};

const paypalBtn = {
  background: "#003087",
  color: "white",
  padding: "12px",
  borderRadius: 10,
  fontSize: 16,
  fontWeight: 700,
  border: "none",
  cursor: "pointer",
};

const footnote = {
  textAlign: "center",
  fontSize: 12,
  color: "var(--text-secondary)",
  marginTop: 12,
};
