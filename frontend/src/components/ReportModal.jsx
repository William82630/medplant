// =======================================
// ReportModal.jsx — Full Report Viewer Modal
// Matches dark mode + smooth animations
// =======================================

import React from "react";
import { FaTimes } from "react-icons/fa";
import ReportViewer from "./ReportViewer";

export default function ReportModal({ open, onClose, markdown, title = "Medicinal Plant Report" }) {
  if (!open) return null;

  return (
    <div style={backdrop} onClick={onClose}>
      <div style={modal} onClick={(e) => e.stopPropagation()}>

        {/* HEADER */}
        <div style={header}>
          <h2 style={{ margin: 0, fontSize: 22, color: "var(--text-primary)" }}>
            {title}
          </h2>

          <button onClick={onClose} style={closeBtn} aria-label="Close report modal">
            <FaTimes size={18} color="var(--text-secondary)" />
          </button>
        </div>

        {/* CONTENT */}
        <div style={contentBox}>
          <ReportViewer markdown={markdown} />
        </div>

        {/* CLOSE BUTTON */}
        <button style={closeBtnFooter} onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

// =======================================
// STYLES (Matches UpgradeModal and Dark Mode)
// =======================================

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(8px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal = {
  width: "95%",
  maxWidth: "900px",
  maxHeight: "92vh",
  background: "var(--card-bg)",
  borderRadius: "14px",
  padding: "22px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
  border: "1px solid var(--border-color)",
  display: "flex",
  flexDirection: "column",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
};

const closeBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 6,
  borderRadius: 6,
};

const contentBox = {
  flex: 1,
  overflowY: "auto",
  paddingRight: 10,
};

const closeBtnFooter = {
  marginTop: 18,
  width: "100%",
  padding: "12px",
  borderRadius: 10,
  border: "none",
  background: "#444",
  color: "#fff",
  cursor: "pointer",
  fontSize: 16,
  fontWeight: 600,
};
