// src/pages/FAQ.jsx
import React, { useState, useEffect } from "react";
import ArticleLayout from "../components/ArticleLayout";

const faqData = [
  {
    section: "Using MedPlant (General)",
    items: [
      {
        q: "What is MedPlant?",
        a: `MedPlant is an AI-powered tool that identifies medicinal plants and provides trusted Ayurveda-backed and scientific information, including uses, warnings, and preparation methods.`,
      },
      {
        q: "How accurate is MedPlant?",
        a: `MedPlant uses Google's Gemini model combined with curated medicinal datasets. Accuracy is highest when photos are well-lit, clear, and show the plant from multiple angles.`,
      },
      {
        q: "How does MedPlant work?",
        a: `Upload a plant photo → AI identifies it → MedPlant generates a structured medicinal report with uses, dosage, toxicity, and scientific references.`,
      },
      {
        q: "Is MedPlant free?",
        a: `Yes. Free users get 10 identifications per day. MedPlant Pro unlocks unlimited scans, full medicinal reports, advanced warnings, and PDF export.`,
      },
      {
        q: "Can I trust the medicinal information?",
        a: `Yes — medicinal data comes from verified Ayurvedic sources, AYUSH documentation, and peer-reviewed botanical and pharmacological studies.`,
      },
      {
        q: "Why is my identification inaccurate?",
        a: `AI accuracy depends on photo quality. Ensure the plant is centered, bright, and not blocked by background objects or shadows.`,
      },
      {
        q: "Can MedPlant identify non-medicinal plants?",
        a: `Yes. Identification works for most plants, but medicinal data only appears if verified references exist.`,
      },
      {
        q: "Can I use MedPlant offline?",
        a: `Yes, you can upload images offline. Identification begins automatically once you reconnect.`,
      },
      {
        q: "Why is medicinal information missing for some plants?",
        a: `We only display medicinal details that are scientifically verified. If no trusted data exists, the medicinal block remains hidden to avoid misinformation.`,
      },
      {
        q: "How do I share a plant identification?",
        a: `You can share via WhatsApp, Facebook, LinkedIn, or Twitter using the built-in share buttons, or export a full PDF report.`,
      },
    ],
  },

  {
    section: "Medicinal Use & Safety",
    items: [
      {
        q: "Does MedPlant provide dosage and preparation?",
        a: `Yes — especially in MedPlant Pro. Includes dosage ranges, preparation methods, parts used, contraindications, and toxicity details.`,
      },
      {
        q: "Does MedPlant warn about toxicity or drug interactions?",
        a: `Yes. We display toxicity warnings, pregnancy risks, allergy notes, skin-irritant alerts, and known drug interactions when applicable.`,
      },
      {
        q: "Is MedPlant medical advice?",
        a: `No. MedPlant is strictly educational. Always consult a licensed healthcare provider before using herbs medicinally.`,
      },
    ],
  },

  {
    section: "Accounts & Subscription",
    items: [
      {
        q: "Do I need an account to use MedPlant?",
        a: `No. Basic features work without an account. Signing in enables syncing saved plants and restoring Pro purchases.`,
      },
      {
        q: "What is included in MedPlant Pro?",
        a: `Unlimited scans, full medicinal data, PDF report export, AI herb recommendations, syncing across devices, and priority support.`,
      },
      {
        q: "How many free scans do I get?",
        a: `Free users receive 10 identifications per day. This resets every 24 hours.`,
      },
      {
        q: "How do I upgrade to Pro?",
        a: `You can subscribe using Razorpay, PayPal, UPI, or card payments. The subscription syncs automatically via Supabase.`,
      },
    ],
  },

  {
    section: "Technical Issues & Troubleshooting",
    items: [
      {
        q: "Why is identification slow?",
        a: `Slow uploads can be caused by large photos, slow internet, or heavy browser activity. Try compressing the image or refreshing the page.`,
      },
      {
        q: "Why does image upload fail?",
        a: `This usually means poor connection, unsupported formats, or extremely large file sizes. Try another image or smaller file.`,
      },
      {
        q: "Is my data safe?",
        a: `Yes. Uploaded images are used only for identification (with consent). MedPlant does not sell your data and allows deleting saved plants anytime.`,
      },
      {
        q: "How do I report bugs or request features?",
        a: `Email us at info@willsblogger.com with screenshots and details. We respond as quickly as possible.`,
      },
    ],
  },
];

export default function FAQ() {
  const [openMap, setOpenMap] = useState({});
  const toggle = (key) =>
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <ArticleLayout title="Frequently Asked Questions" current="/faq" tags={["faq", "medplant", "help"]}>
      <div style={{ marginTop: 20, marginBottom: 40 }}>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "18px",
            marginBottom: "25px",
          }}
        >
          Find answers about plant identification, medicinal safety, account
          settings, subscriptions, and troubleshooting.
        </p>

        {faqData.map((section, sIdx) => (
          <section key={sIdx} style={{ marginBottom: 35 }}>
            <h2
              style={{
                marginBottom: "15px",
                fontSize: "26px",
                fontWeight: "700",
                color: "var(--text-main)",
              }}
            >
              {section.section}
            </h2>

            {section.items.map((item, iIdx) => {
              const key = `${sIdx}-${iIdx}`;
              const isOpen = openMap[key];

              return (
                <div
                  key={key}
                  style={{
                    border: "1px solid var(--border-default)",
                    borderRadius: 12,
                    marginBottom: 12,
                    overflow: "hidden",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  <button
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "var(--bg-box)",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "var(--text-main)",
                    }}
                  >
                    {item.q}
                    <span
                      style={{
                        fontSize: "24px",
                        color: "var(--accent-green)",
                        fontWeight: "700",
                      }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "14px 20px 20px",
                        fontSize: "17px",
                        lineHeight: 1.7,
                        color: "var(--text-body)",
                        background: "var(--bg-box)",
                        animation: "faqOpen 0.25s ease",
                      }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </ArticleLayout>
  );
}
