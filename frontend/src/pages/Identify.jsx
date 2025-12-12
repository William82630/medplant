// ==============================
// Identify.jsx — MedPlant (Backend AI Version — FINAL FIXED)
// ==============================
import { useState, useRef } from "react";
import ReportViewer from "../components/ReportViewer";
import LoginModal from "../components/LoginModal";
import ReportModal from "../components/ReportModal";
import UpgradeModal from "../components/UpgradeModal";
import { supabase } from "../lib/supabaseClient";

export default function Identify() {
  const [imagePreview, setImagePreview] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Modals
  const [showReportModal, setShowReportModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("Medicinal Plant Report");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const uploadRef = useRef(null);

  // Extract report title
  const extractTitle = (md) => {
    if (!md) return "Medicinal Plant Report";
    const firstLine = md.split("\n")[0];
    const cleaned = firstLine.replace("#", "").replace("🌿", "").trim();
    return cleaned.length > 2 ? cleaned : "Medicinal Plant Report";
  };

  // -------------------------------------------------
  // HANDLE FILE + BACKEND AI ANALYSIS (CLEAN VERSION)
  // -------------------------------------------------
  const handleFile = async (file) => {
    if (!file) return;

    setMarkdown("");
    setErrorMsg("");
    setLoading(true);

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    try {
      // Get session token
      let session = null;
      try {
        const { data: { session: s } } = await supabase.auth.getSession();
        session = s;
      } catch (e) {
        console.error("Supabase session error:", e);
        // Continue without auth for anonymous users
      }

      const formData = new FormData();
      formData.append("file", file);

      const headers = {};

      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      // Call backend
      const res = await fetch("http://127.0.0.1:8000/api/identify", {
        method: "POST",
        headers,
        body: formData,
      });

      // Auth required
      if (res.status === 401) {
        setShowLoginModal(true);
        setLoading(false);
        return;
      }

      // No credits
      if (res.status === 402) {
        setShowUpgradeModal(true);
        setLoading(false);
        return;
      }

      const data = await res.json();
console.log("BACKEND RESPONSE:", data);

      if (data.error) {
        setErrorMsg(data.error);
      } else if (data.analysis) {
        setMarkdown(data.analysis);
        setModalTitle(extractTitle(data.analysis));
      } else {
        setErrorMsg("MedPlant AI could not generate a report.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("AI failed to analyze the plant.");
    }

    setLoading(false);
  };

  // -------------------------------------------------
  // SAVE REPORT
  // -------------------------------------------------
  const saveReport = async () => {
    const { data: user } = await supabase.auth.getUser();

    if (!user?.user) {
      setShowLoginModal(true);
      return;
    }

    const plantName = extractTitle(markdown);

    const { error } = await supabase.from("saved_plants").insert({
      user_id: user.user.id,
      plant_name: plantName,
      markdown_report: markdown,
      image_url: imagePreview,
    });

    if (error) alert("Error saving.");
    else alert("Saved!");
  };

  // -------------------------------------------------
  // UI
  // -------------------------------------------------
  return (
    <div
      style={{
        maxWidth: 950,
        margin: "40px auto",
        padding: 20,
        color: "var(--text-primary)",
      }}
    >
      <h1
        style={{
          fontSize: 38,
          fontWeight: 800,
          textAlign: "center",
          marginBottom: 25,
        }}
      >
        Identify a Medicinal Plant
      </h1>

      {/* Upload Box */}
      <div
        style={{
          padding: 40,
          borderRadius: 20,
          border: "2px dashed var(--border-color)",
          background: "var(--card-bg)",
          textAlign: "center",
          cursor: "pointer",
        }}
        onClick={() => uploadRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        <div style={{ fontSize: 50, marginBottom: 10 }}>📤</div>
        <div style={{ fontSize: 20, fontWeight: 600 }}>
          Click or Drag & Drop an image
        </div>
        <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          JPG / PNG — Clear leaf, flower, or branch recommended
        </div>

        <input
          type="file"
          accept="image/*"
          ref={uploadRef}
          style={{ display: "none" }}
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <img
            src={imagePreview}
            alt="preview"
            style={{
              width: "100%",
              maxHeight: 420,
              objectFit: "cover",
              borderRadius: 20,
            }}
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div
          style={{
            marginTop: 35,
            textAlign: "center",
            fontSize: 18,
            color: "#059669",
          }}
        >
          <div
            className="spin-leaf"
            style={{ fontSize: 40, animation: "spin 1.4s linear infinite" }}
          >
            🍃
          </div>
          <div style={{ marginTop: 10 }}>Analyzing with MedPlant AI…</div>
        </div>
      )}

      {/* Error */}
      {errorMsg && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#fee2e2",
            color: "#b91c1c",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Report */}
      {markdown && !loading && (
        <div
          style={{
            marginTop: 40,
            background: "var(--card-bg)",
            padding: 25,
            borderRadius: 18,
            border: "1px solid var(--border-color)",
          }}
        >
          <ReportViewer markdown={markdown} />

          {/* Buttons */}
          <div
            style={{
              marginTop: 25,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setShowReportModal(true)}
              style={{
                background: "#0f766e",
                color: "white",
                padding: "14px 28px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              🔍 Open Full Report
            </button>

            <button
              onClick={saveReport}
              style={{
                background: "#059669",
                color: "white",
                padding: "14px 28px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ⭐ Save Identification
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <ReportModal
        open={showReportModal}
        onClose={() => setShowReportModal(false)}
        markdown={markdown}
        title={modalTitle}
      />

      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <UpgradeModal
        open={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        remaining={0}
      />
    </div>
  );
}
