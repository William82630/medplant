// ===============================================
//  PREMIUM OPTION — PictureThis-Style Upload Box
//  Headings refined (no thick fonts)
//  Nothing else modified unnecessarily
// ===============================================

import { useState } from "react";
import { Link } from "react-router-dom";
import { usePlants } from "../context/PlantsContext";

// Components
import NewsletterSection from "../components/NewsletterSection";
import QRCodePhoneSection from "../components/QRCodePhoneSection";

// Assets
import heroImg from "../assets/images/home-hero.webp";
import articlePreview from "../assets/images/medicinal-plants-hero.webp";
import herbalRemediesHero from "../assets/images/herbal-remedies-hero.webp";
import ayurvedicHero from "../assets/images/ayurvedic-uses-hero.webp";
import decorativePlant from "../assets/images/decorative-plant.png";

export default function Home() {
  const { plants = [], loading } = usePlants();
  const [query, setQuery] = useState("");

  const featured = plants.slice(0, 6);

  const primaryGreen = "#059669";
  const deepGreen = "#064e3b";

  return (
    <div
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
      }}
    >
      {/* ============================================================
          HERO SECTION (kept, but heading weight fixed)
      ============================================================ */}
      <section
        style={{
          width: "100vw",
          margin: "0 calc(-50vw + 50%)",
          padding: "80px 20px",
          background:
            "radial-gradient(at 10% 10%, rgba(5,150,105,0.06), transparent 60%), linear-gradient(180deg,#f6fff9,#edfbf2)",
        }}
      >
        <div
          style={{
            maxWidth: 1250,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 480px",
            gap: 40,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div style={{ maxWidth: 700 }}>
            <h1
              style={{
                fontSize: 46,
                fontWeight: 600,
                lineHeight: 1.1,
                marginBottom: 18,
                color: "#063b2d",
              }}
            >
              Discover medicinal plants with AI —
              <br />
              fast, accurate & research-backed.
            </h1>

            <p
              style={{
                fontSize: 17,
                lineHeight: 1.65,
                color: "#345548",
                marginBottom: 26,
                fontWeight: 400,
              }}
            >
              Identify any plant instantly and explore its healing uses,
              preparation methods, benefits, and scientific references.
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link
                to="/search"
                style={{
                  padding: "14px 26px",
                  background: primaryGreen,
                  color: "#fff",
                  borderRadius: 12,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: 16,
                  boxShadow: "0 12px 28px rgba(5,150,105,0.20)",
                }}
              >
                Identify a Plant
              </Link>

              <Link
                to="/medicinal-plants"
                style={{
                  padding: "14px 22px",
                  background: "rgba(6,78,59,0.07)",
                  color: deepGreen,
                  borderRadius: 12,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Explore Database
              </Link>
            </div>

            {/* trust badges */}
            <div
              style={{
                marginTop: 28,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {[
                "✔ 3000+ plant profiles",
                "✔ Trusted references",
                "✔ Evidence-backed data",
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    background: "#fff",
                    padding: "10px 14px",
                    borderRadius: 12,
                    fontSize: 14,
                    color: "#345548",
                    boxShadow: "0 6px 20px rgba(5,60,40,0.06)",
                    fontWeight: 500,
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT HERO IMAGE */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={heroImg}
              alt="MedPlant App"
              style={{
                width: "100%",
                maxWidth: 480,
                borderRadius: 28,
                boxShadow: "0 20px 60px rgba(6,78,59,0.12)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          *** PREMIUM++ PICTURETHIS STYLE UPLOAD BOX ***
      ============================================================ */}
      <section
        style={{
          width: "100vw",
          margin: "0 calc(-50vw + 50%)",
          padding: "90px 20px",
          background: "linear-gradient(180deg,#f4fcf5,#eaf7ee)",
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 44,
              borderRadius: 26,
              maxWidth: 540,
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 50px rgba(6,78,59,0.12)",
            }}
          >
            {/* Heading */}
            <h2
              style={{
                fontSize: 30,
                fontWeight: 600,
                color: deepGreen,
                marginBottom: 10,
              }}
            >
              Identify Plants Instantly
            </h2>

            <p
              style={{
                fontSize: 16,
                color: "#4e6053",
                marginBottom: 30,
                fontWeight: 400,
                maxWidth: 420,
                marginInline: "auto",
              }}
            >
              Upload a clear photo or use your mobile camera to identify any
              plant in seconds using advanced AI.
            </p>

            {/* Icon */}
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: 20,
                background: "#eef7f2",
                margin: "0 auto 24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg width="48" height="48" fill="#3d6b57">
                <rect x="6" y="18" width="36" height="18" rx="4" />
                <rect x="12" y="10" width="24" height="10" rx="3" />
              </svg>
            </div>

            {/* Upload Button */}
            <label
              htmlFor="fileInput"
              style={{
                background: primaryGreen,
                color: "#fff",
                padding: "15px 32px",
                borderRadius: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-block",
                fontSize: 17,
                marginBottom: 12,
                boxShadow: "0 14px 36px rgba(5,150,105,0.25)",
              }}
            >
              Upload Image
            </label>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => console.log("Uploaded:", e.target.files[0])}
            />

            <div style={{ color: "#7a7a7a", fontSize: 14, marginTop: 8 }}>
              or drag & drop an image here
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY MEDPLANT (unchanged except font-weight tuned)
      ============================================================ */}
      <section style={{ maxWidth: 1200, margin: "60px auto", padding: "0 20px" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: 30,
            color: deepGreen,
            marginBottom: 40,
            fontWeight: 600,
          }}
        >
          Why Choose MedPlant?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              title: "Instant AI Identification",
              desc: "Snap a photo and identify plants with high-accuracy AI.",
            },
            {
              title: "Research-Backed Data",
              desc: "Verified information from ICMR, AYUSH, PubMed, WHO & more.",
            },
            {
              title: "Explore Herbal Knowledge",
              desc: "Learn healing uses, preparation, benefits, and Ayurvedic insights.",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: 26,
                borderRadius: 18,
                boxShadow: "0 14px 40px rgba(5,60,40,0.07)",
              }}
            >
              <h3
                style={{
                  color: deepGreen,
                  marginBottom: 8,
                  fontWeight: 600,
                  fontSize: 20,
                }}
              >
                {card.title}
              </h3>
              <p style={{ color: "#4b5b50", fontWeight: 400 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          TOP PLANTS (unchanged except minor font weight)
      ============================================================ */}
      <section
        style={{ maxWidth: 1200, margin: "70px auto", padding: "0 20px" }}
      >
        <h2
          style={{
            color: deepGreen,
            fontSize: 28,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          Popular Medicinal Plants
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
            }}
          >
            {featured.map((p) => (
              <Link
                key={p.id}
                to={`/plant/${p.slug}`}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  textDecoration: "none",
                  color: "#000",
                  boxShadow: "0 12px 36px rgba(6,78,59,0.06)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={p.image || articlePreview}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                  }}
                />
                <div style={{ padding: 14 }}>
                  <strong style={{ fontWeight: 600 }}>{p.name}</strong>
                  <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
                    {p.scientificName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ============================================================
          ARTICLES (unchanged except fonts refined)
      ============================================================ */}
      <section
        style={{ maxWidth: 1200, margin: "60px auto", padding: "0 20px" }}
      >
        <h2
          style={{
            color: deepGreen,
            fontSize: 28,
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          Learn More
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
          }}
        >
          {[
            {
              title: "Medicinal Plants",
              img: articlePreview,
              link: "/medicinal-plants",
            },
            {
              title: "Herbal Remedies",
              img: herbalRemediesHero,
              link: "/herbal-remedies",
            },
            {
              title: "Ayurvedic Uses",
              img: ayurvedicHero,
              link: "/ayurvedic-uses",
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#fff",
                borderRadius: 18,
                overflow: "hidden",
                textDecoration: "none",
                color: "#000",
                boxShadow: "0 14px 40px rgba(6,78,59,0.06)",
              }}
            >
              <img
                src={item.img}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "cover",
                }}
              />
              <div style={{ padding: 16 }}>
                <h3
                  style={{
                    margin: 0,
                    color: deepGreen,
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    marginTop: 8,
                    color: "#4e6053",
                    fontWeight: 400,
                  }}
                >
                  Explore detailed insights and evidence-backed knowledge.
                </p>
                <div
                  style={{
                    marginTop: 10,
                    color: primaryGreen,
                    fontWeight: 600,
                  }}
                >
                  Learn more →
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============================================================
          EVIDENCE SECTION (minor typography improvements)
      ============================================================ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "90px auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "1fr 360px",
          gap: 40,
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 32,
              color: deepGreen,
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Trusted by scientists, herbalists & researchers
          </h2>

          <p style={{ color: "#425347", lineHeight: 1.7, fontWeight: 400 }}>
            MedPlant uses verified references from ICMR, AYUSH, CCRAS, CSIR,
            NMPB, PubMed, WHO, and more.
          </p>

          <p
            style={{
              marginTop: 12,
              color: "#6b6b6b",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            This information is for educational purposes, not medical advice.
          </p>
        </div>

        <div>
          <img
            src={decorativePlant}
            alt="Decorative Plant"
            style={{
              width: "100%",
              borderRadius: 20,
              boxShadow: "0 14px 36px rgba(6,78,59,0.08)",
            }}
          />
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS (left mostly unchanged)
      ============================================================ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "60px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            fontSize: 28,
            color: deepGreen,
            marginBottom: 30,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Loved by plant enthusiasts worldwide
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
          }}
        >
          {[
            "“A must-have app for anyone exploring herbal medicine.”",
            "“Accurate results and beautifully designed plant pages.”",
            "“Better than any plant app I used before — highly recommended!”",
          ].map((t, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: 24,
                borderRadius: 18,
                boxShadow: "0 14px 40px rgba(6,60,50,0.06)",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#444",
                fontWeight: 400,
              }}
            >
              ⭐⭐⭐⭐⭐  
              <br />
              <br />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          ADVANCED SEARCH (unchanged except headings refined)
      ============================================================ */}
      <section
        style={{
          maxWidth: 1200,
          margin: "80px auto",
          padding: "40px 20px",
          borderRadius: 20,
          background: "linear-gradient(135deg,#f4fcf6,#ebf8f1)",
        }}
      >
        <h2
          style={{ color: deepGreen, fontSize: 26, marginBottom: 12, fontWeight: 600 }}
        >
          Advanced Medicinal Plant Search
        </h2>
        <p
          style={{ color: "#4e6053", marginBottom: 20, fontWeight: 400 }}
        >
          Search by plant names, ailments, benefits, or Ayurvedic uses.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <input
            type="text"
            placeholder="e.g., headache, neem, fever, aloe vera…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "16px 18px",
              borderRadius: 14,
              border: "1px solid rgba(6,78,59,0.10)",
              fontSize: 16,
              background: "#fff",
            }}
          />

          <button
            onClick={() => {
              const q = encodeURIComponent(query.trim());
              if (q) window.location.href = `/search?query=${q}`;
            }}
            style={{
              background: primaryGreen,
              color: "#fff",
              padding: "14px 28px",
              border: "none",
              borderRadius: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </section>

      {/* ============================================================
          NEWSLETTER
      ============================================================ */}
      <NewsletterSection />

      {/* ============================================================
          QR SECTION
      ============================================================ */}
      <QRCodePhoneSection />
    </div>
  );
}
