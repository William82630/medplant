// ======================================
// SavedPlants.jsx — Premium Version (Upgraded Final Version)
// Improved Share Button Styling + Pro Lock + Clean UI + Dark Mode Support
// ======================================

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";   // <-- FIXED PATH
import ReportViewer from "../components/ReportViewer";
import { FaWhatsapp, FaShareAlt, FaLink, FaTrash } from "react-icons/fa";

export default function SavedPlants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  // ----------------------------
  // Load User + Saved Plants
  // ----------------------------
  useEffect(() => {
    const loadData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setPlants("NOT_LOGGED_IN");
        setLoading(false);
        return;
      }

      // Check Pro subscription
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("is_pro")
        .eq("user_id", user.id)
        .single();

      setIsPro(profile?.is_pro || false);

      // Load saved plants
      const { data, error } = await supabase
        .from("saved_plants")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      setPlants(data || []);

      setLoading(false);
    };

    loadData();
  }, []);

  // ----------------------------
  // Delete a Saved Plant
  // ----------------------------
  const deletePlant = async (id) => {
    if (!confirm("Delete this saved identification?")) return;

    const { error } = await supabase
      .from("saved_plants")
      .delete()
      .eq("id", id);

    if (!error) {
      setPlants(plants.filter((p) => p.id !== id));
    }
  };

  // ----------------------------
  // SHARE FUNCTIONS
  // ----------------------------

  const copyText = async (text) => {
    await navigator.clipboard.writeText(text);
    setShareMessage("Copied!");
    setTimeout(() => setShareMessage(""), 2000);
  };

  const generateTempLink = (content) => {
    const blob = new Blob([content], { type: "text/markdown" });
    return URL.createObjectURL(blob);
  };

  const shareWhatsApp = (plant) => {
    const link = generateTempLink(plant.markdown_report);
    const msg = encodeURIComponent(`Plant Report: ${plant.plant_name}\n${link}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const shareNative = async (plant) => {
    const link = generateTempLink(plant.markdown_report);

    if (navigator.share) {
      await navigator.share({
        title: plant.plant_name,
        text: plant.markdown_report.slice(0, 300) + "...",
        url: link,
      });
    } else {
      copyText(plant.markdown_report);
    }
  };

  // ----------------------------
  // UI
  // ----------------------------

  return (
    <div style={{ maxWidth: 1100, margin: "40px auto", padding: 20 }}>
      <h1
        style={{
          fontSize: 34,
          fontWeight: 800,
          marginBottom: 6,
          color: "var(--text-primary)",
        }}
      >
        ⭐ My Saved Plants
      </h1>

      <p style={{ color: "var(--text-secondary)", marginBottom: 30, fontSize: 16 }}>
        Your saved plant identifications appear here.
      </p>

      {/* Loading */}
      {loading && <p style={{ fontSize: 18 }}>Loading...</p>}

      {/* Not logged in */}
      {!loading && plants === "NOT_LOGGED_IN" && (
        <p style={{ color: "red" }}>Please log in to view saved plants.</p>
      )}

      {/* Empty */}
      {!loading && Array.isArray(plants) && plants.length === 0 && (
        <p style={{ marginTop: 40, fontSize: 20, color: "var(--text-secondary)" }}>
          🌱 No saved plants.
        </p>
      )}

      {/* Saved Plants Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 25,
        }}
      >
        {Array.isArray(plants) &&
          plants.map((plant) => (
            <div
              key={plant.id}
              style={{
                borderRadius: 14,
                background: "var(--card-bg)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                border: "1px solid var(--border-color)",
                overflow: "hidden",
                transition: "0.25s ease",
              }}
            >
              <div style={{ position: "relative" }}>
                {plant.image_url ? (
                  <img
                    src={plant.image_url}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      background: "#ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No Image
                  </div>
                )}

                {!isPro && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.45)",
                      backdropFilter: "blur(3px)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      fontWeight: "700",
                      fontSize: 18,
                      letterSpacing: 0.5,
                    }}
                  >
                    🔒 Pro Required
                  </div>
                )}
              </div>

              <div style={{ padding: 15 }}>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    color: "var(--text-primary)",
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {plant.plant_name}
                </h3>

                <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 13 }}>
                  Saved on {new Date(plant.created_at).toLocaleDateString()}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>

                  <button
                    onClick={() =>
                      isPro
                        ? setSelectedReport(plant.markdown_report)
                        : alert("Unlock full report with MedPlant Pro.")
                    }
                    style={btnGreen}
                  >
                    {isPro ? "View Full Report" : "Unlock Full Report (Pro)"}
                  </button>

                  <div style={{ display: "flex", gap: 10 }}>

                    <button style={shareBtn} onClick={() => shareWhatsApp(plant)}>
                      <FaWhatsapp size={18} />
                    </button>

                    <button style={shareBtn} onClick={() => copyText(plant.markdown_report)}>
                      <FaLink size={16} />
                    </button>

                    <button style={shareBtn} onClick={() => shareNative(plant)}>
                      <FaShareAlt size={16} />
                    </button>
                  </div>

                  <button style={btnDelete} onClick={() => deletePlant(plant.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {shareMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 25,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#059669",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {shareMessage}
        </div>
      )}

      {selectedReport && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            zIndex: 1000,
          }}
          onClick={() => setSelectedReport(null)}
        >
          <div
            style={{
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              borderRadius: 12,
              padding: 20,
              maxWidth: 900,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: "1px solid var(--border-color)",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ReportViewer markdown={selectedReport} />

            <button
              onClick={() => setSelectedReport(null)}
              style={{
                marginTop: 20,
                background: "#444",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------
// Button Styles
// ----------------------------
const btnGreen = {
  background: "#059669",
  color: "white",
  padding: "10px",
  borderRadius: 8,
  border: "none",
  fontSize: 15,
  cursor: "pointer",
  transition: "0.2s ease",
};

const shareBtn = {
  background: "var(--share-btn-bg, #e2e8f0)",
  border: "1px solid var(--border-color)",
  padding: 10,
  borderRadius: 10,
  fontSize: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 42,
  height: 42,
  transition: "0.2s ease",
};

const btnDelete = {
  background: "#dc2626",
  color: "white",
  padding: "10px",
  borderRadius: 8,
  border: "none",
  fontSize: 15,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
  transition: "0.2s ease",
};
