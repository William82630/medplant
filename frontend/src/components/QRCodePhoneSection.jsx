// src/components/QRCodePhoneSection.jsx
import React from "react";
import phoneMockup from "../assets/images/medplant-mobile.png";

export default function QRCodePhoneSection() {
  const targetUrl = "https://willsblogger.com/medplant/download";

  const qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=240x240&chl=${encodeURIComponent(
    targetUrl
  )}`;

  return (
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        padding: "100px 20px",
        background:
          "radial-gradient(circle at top left, #e8fdf4 0%, #f3faf6 40%, #f7fffb 100%)",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SOFT BACKGROUND DECOR */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          background: "rgba(0,150,80,0.08)",
          borderRadius: "50%",
          top: -60,
          left: -60,
          filter: "blur(60px)",
        }}
      ></div>

      <div
        style={{
          width: "100%",
          maxWidth: 1250,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 50,
          alignItems: "center",
          animation: "fadeIn 1s ease-out",
        }}
      >
        {/* ============= LEFT CONTENT ============= */}
        <div style={{ animation: "fadeUp 1.2s ease-out" }}>
          <h1
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: "#064e3b",
              marginBottom: 6,
              letterSpacing: "-0.5px",
            }}
          >
            MedPlant
          </h1>

          <h2
            style={{
              fontSize: 26,
              fontWeight: 500,
              color: "#0a3d2a",
              marginBottom: 18,
            }}
          >
            Your AI Herbal Expert
          </h2>

          <p
            style={{
              fontSize: 17,
              color: "#444",
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 34,
            }}
          >
            Instantly identify medicinal plants and unlock verified healing
            uses, Ayurvedic insights, preparation methods, and botanical
            research — all powered by advanced AI and traditional knowledge.
          </p>

          {/* QR + BADGES */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {/* QR BOX WITH GLOW */}
            <div
              style={{
                background: "#ffffff",
                padding: 16,
                borderRadius: 16,
                boxShadow: "0 12px 32px rgba(0,0,0,0.10)",
                position: "relative",
                animation: "fadeUp 1.3s ease-out",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: -15,
                  background: "rgba(0,150,80,0.10)",
                  borderRadius: 20,
                  zIndex: -1,
                  filter: "blur(30px)",
                }}
              ></div>
              <img
                src={qrSrc}
                alt="MedPlant QR"
                style={{
                  width: 180,
                  height: 180,
                  display: "block",
                }}
              />
            </div>

            {/* BADGES (PREMIUM++) */}
            <div style={{ animation: "fadeUp 1.4s ease-out" }}>
              {/* SHARED BADGE STYLE */}
              {[
                { label: "App Store", icon: "" },
                {
                  label: "Google Play",
                  icon: (
                    <span
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "8px solid transparent",
                        borderBottom: "8px solid transparent",
                        borderLeft: "14px solid #34a853",
                        display: "inline-block",
                      }}
                    ></span>
                  ),
                },
              ].map((b, i) => (
                <div
                  key={i}
                  style={{
                    background: "#111",
                    color: "#fff",
                    padding: "12px 22px",
                    borderRadius: 14,
                    fontSize: 16,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                    width: 210,
                    height: 50,
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span
                    style={{
                      fontSize: b.label === "App Store" ? 22 : 0,
                    }}
                  >
                    {b.icon}
                  </span>
                  <span>{b.label}</span>
                </div>
              ))}

              {/* COMING SOON */}
              <div
                style={{
                  marginTop: 4,
                  color: "#555",
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                Coming soon for iOS & Android
              </div>
            </div>
          </div>
        </div>

        {/* ============= RIGHT CONTENT (PHONE MOCKUP) ============= */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            animation: "fadeUp 1.5s ease-out",
          }}
        >
          <img
            src={phoneMockup}
            alt="MedPlant App"
            style={{
              width: 360,
              height: "auto",
              filter: "drop-shadow(0 22px 45px rgba(0,0,0,0.25))",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-10px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          />
        </div>
      </div>

      {/* KEYFRAME ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
}
