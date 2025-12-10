// src/pages/Contact.jsx
import React from "react";
import contactHero from "../assets/images/contact-hero.webp";

function ShareButtons({ url, text }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const xShare = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  const whatsapp = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const instagram = `https://www.instagram.com/`;

  return (
    <div className="share-buttons">
      <a href={facebook} target="_blank" rel="noreferrer" className="share-btn">Facebook</a>
      <a href={xShare} target="_blank" rel="noreferrer" className="share-btn">X</a>
      <a href={instagram} target="_blank" rel="noreferrer" className="share-btn">Instagram</a>
      <a href={whatsapp} target="_blank" rel="noreferrer" className="share-btn">WhatsApp</a>
    </div>
  );
}

export default function Contact() {
  const shareUrl =
    typeof window !== "undefined" ? window.location.origin : "https://your-site.com";
  const shareText = "Check out MedPlant - identify plants quickly and safely!";

  return (
    <div className="container page-fade" style={{ paddingTop: 40, paddingBottom: 60 }}>
      
      {/* ⭐ HERO IMAGE */}
      <img
        src={contactHero}
        alt="Contact MedPlant"
        className="page-hero-img"
      />

      <h1>Contact</h1>

      <div className="contact-section">
        <p><strong>Email:</strong> info@willsblogger.com</p>
        <p><strong>Phone:</strong> +91-9862377115</p>
        <p>
          <strong>Address:</strong><br />
          Thingkangphai B, Kawnpui, Churachandpur, Manipur<br />
          PIN: 795128
        </p>

        {/* Social Share */}
        <h2>Share MedPlant</h2>
        <p>Help others discover MedPlant — share the app on social media:</p>
        <ShareButtons url={shareUrl} text={shareText} />

        {/* App Download Section */}
        <h2 style={{ marginTop: 30 }}>App Download & QR</h2>
        <p>
          If you want, replace the placeholders below with your mobile image,
          Android/iOS badges, and QR codes you already created.
        </p>

        <div className="contact-download-box">
          <div className="qr-box">
            <div className="qr-placeholder">
              <span className="placeholder-text">Mobile image placeholder</span>
            </div>
            <div className="qr-inner">
              <div className="qr-small-box">
                <span className="placeholder-text">QR code placeholder</span>
              </div>
              <p className="qr-note">Scan to install (Android / iOS)</p>
            </div>
          </div>

          <div className="download-links">
            <h3>Download Links</h3>
            <p>
              Android and iOS links will go here. If you have store URLs,
              paste them as:
              <br />
              <code>&lt;a href="..."&gt;Download on Google Play&lt;/a&gt;</code>
            </p>

            <div style={{ marginTop: 12 }}>
              <a href="#" className="share-btn" style={{ marginRight: 8 }}>
                Google Play
              </a>
              <a href="#" className="share-btn">
                App Store
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
