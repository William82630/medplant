// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebook,
  FaPinterestP,
} from "react-icons/fa6";
import logo from "../assets/images/medplant-log1.png";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        background: "linear-gradient(180deg,#0d0d0d,#060606)",
        color: "#e8e8e8",
        padding: "90px 0 50px 0",
        marginTop: "120px",
        fontFamily: "Inter, Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Soft Glow Background */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          background: "rgba(0,255,170,0.06)",
          filter: "blur(90px)",
          top: -80,
          right: -60,
          borderRadius: "50%",
        }}
      ></div>

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "0 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "58px",
          animation: "fadeUp 1s ease-out",
        }}
      >
        {/* BRAND + ABOUT */}
        <div>
          {/* Logo Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <img
              src={logo}
              alt="MedPlant Logo"
              style={{
                width: "58px",
                height: "58px",
                objectFit: "contain",
                filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))",
              }}
            />

            <div>
              <h2
                style={{
                  fontSize: "28px",
                  margin: 0,
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.5px",
                }}
              >
                MedPlant
              </h2>
              <p style={{ margin: 0, color: "#e6e6e6", fontSize: "14px" }}>
                AI-powered herbal intelligence
              </p>
            </div>
          </div>

          <p
            style={{
              color: "#e0e0e0",
              lineHeight: 1.7,
              maxWidth: 330,
              fontSize: "15px",
            }}
          >
            MedPlant blends AI with botanical science to deliver accurate
            identification, medicinal insights, and evidence-based natural
            healing knowledge.
          </p>

          {/* SOCIAL ICONS */}
          <p
            style={{
              marginTop: "32px",
              marginBottom: "12px",
              fontWeight: 700,
              color: "#f8f8f8",
              fontSize: "17px",
            }}
          >
            Follow Us
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "14px",
              fontSize: "28px",
            }}
          >
            {[
              {
                href: "https://www.instagram.com/wills_blogger/",
                icon: <FaInstagram />,
              },
              { href: "https://x.com/jimsmedia82", icon: <FaXTwitter /> },
              { href: "https://www.facebook.com/willsthiek", icon: <FaFacebook /> },
              { href: "https://in.pinterest.com/willsblogger", icon: <FaPinterestP /> },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#ffffff",
                  opacity: 0.85,
                  transition: "0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.textShadow =
                    "0 0 8px rgba(0,255,170,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 style={footerHeading}>Categories</h3>
          <ul style={listStyle}>
            {[
              { text: "Medicinal Plants", link: "/medicinal-plants" },
              { text: "Herbal Remedies", link: "/herbal-remedies" },
              { text: "Ayurvedic Uses", link: "/ayurvedic-uses" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={premiumLink}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h3 style={footerHeading}>About</h3>
          <ul style={listStyle}>
            {[
              { text: "Privacy Policy", link: "/privacy" },
              { text: "Terms & Conditions", link: "/terms" },
              { text: "About MedPlant", link: "/about" },
            ].map((item, i) => (
              <li key={i}>
                <Link
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={premiumLink}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: "rgba(255,255,255,0.12)",
          marginTop: 60,
        }}
      ></div>

      {/* Copyright */}
      <div
        style={{
          textAlign: "center",
          marginTop: "28px",
          opacity: 0.75,
          color: "#cfcfcf",
          fontSize: "14px",
        }}
      >
        © {new Date().getFullYear()} MedPlant — All Rights Reserved.
      </div>

      {/* Animations */}
      <style>
        {`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(25px); }
          to { opacity:1; transform:translateY(0); }
        }
      `}
      </style>
    </footer>
  );
}

/* Shared Styles */
const footerHeading = {
  fontSize: "20px",
  fontWeight: "700",
  marginBottom: "18px",
  color: "#ffffff",
};

const listStyle = {
  lineHeight: 2,
  listStyleType: "none",
  padding: 0,
};

/* ⭐ PREMIUM LINK STYLE */
const premiumLink = {
  color: "#cccccc",
  textDecoration: "none",
  fontSize: "15px",
  display: "inline-block",
  position: "relative",
  paddingBottom: "2px",
  transition: "color 0.3s ease, transform 0.3s ease",
};

premiumLink.onMouseEnter = function (e) {
  e.target.style.color = "#ffffff";
  e.target.style.transform = "translateX(4px)";
  e.target.style.textShadow = "0 0 6px rgba(0,255,170,0.6)";
};

premiumLink.onMouseLeave = function (e) {
  e.target.style.color = "#cccccc";
  e.target.style.transform = "translateX(0)";
  e.target.style.textShadow = "none";
};

