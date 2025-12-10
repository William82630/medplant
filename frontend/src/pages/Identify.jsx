// ==============================
// Identify.jsx — Premium MedPlant UI (Fixed Final Version)
// ==============================
import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReportViewer from "../components/ReportViewer";
import LoginModal from "../components/LoginModal";
import ReportModal from "../components/ReportModal";
import UpgradeModal from "../components/UpgradeModal";
import { supabase } from "../lib/supabaseClient";   // <-- FIXED
import { getAnonCredits, useAnonCredit } from "../utils/credits";

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
  const [upgradeRemaining, setUpgradeRemaining] = useState(0);

  const uploadRef = useRef(null);

  const fileToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });

  const extractTitle = (md) => {
    if (!md) return "Medicinal Plant Report";
    const firstLine = md.split("\n")[0];
    const cleaned = firstLine.replace("#", "").replace("🌿", "").trim();
    return cleaned.length > 2 ? cleaned : "Medicinal Plant Report";
  };

  // -------------------------------------------------
  // HANDLE FILE + ANALYSIS
  // -------------------------------------------------
  const handleFile = async (file) => {
    if (!file) return;

    setMarkdown("");
    setErrorMsg("");
    setLoading(true);

    // preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // credit check
    const { data: auth } = await supabase.auth.getUser();
    const loggedIn = !!auth?.user;

    if (!loggedIn) {
      const left = getAnonCredits();
      if (left <= 0) {
        setUpgradeRemaining(left);
        setShowUpgradeModal(true);
        setLoading(false);
        return;
      }
      useAnonCredit();
    } else {
      // fetch profile (FIXED user_id column)
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("credits_remaining, is_pro")
        .eq("user_id", auth.user.id)
        .single();

      if (!profile?.is_pro) {
        const left = Number(profile?.credits_remaining ?? 0);
        if (left <= 0) {
          setUpgradeRemaining(left);
          setShowUpgradeModal(true);
          setLoading(false);
          return;
        }

        await supabase
          .from("user_profiles")
          .update({ credits_remaining: Math.max(left - 1, 0) })
          .eq("user_id", auth.user.id);   // <-- FIXED
      }
    }

    // call Gemini
    try {
      const base64 = await fileToBase64(file);
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are MedPlant AI. Produce a structured medicinal plant report in Markdown.
Include:
- Identification (with confidence)
- Medicinal Uses
- Preparation & Dosage
- Toxicity & Warnings
- Drug Interactions
- Evidence summary
`;

      const response = await model.generateContent([
        { inlineData: { data: base64, mimeType: "image/jpeg" } },
        { text: prompt },
      ]);
      const text = await response.text();

      setMarkdown(text);
      setModalTitle(extractTitle(text));
    } catch (err) {
      console.error(err);
      setErrorMsg("AI failed to analyze the plant. Try another image.");
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
        <div style={{ fontSize: 20, fontWeight: 600 }}>Click or Drag & Drop an image</div>
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
        remaining={upgradeRemaining}
      />
    </div>
  );
}
