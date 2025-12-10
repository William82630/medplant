// src/components/ArticleLayout.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/article.css";
import editorialAvatar from "../assets/images/editorial-avatar.webp";

export default function ArticleLayout({ title, children, current, tags = [] }) {
  const [darkMode, setDarkMode] = useState(false);

  // Related articles
  const related = [
    { path: "/medicinal-plants", title: "Medicinal Plants" },
    { path: "/herbal-remedies", title: "Herbal Remedies" },
    { path: "/ayurvedic-uses", title: "Ayurvedic Uses" },
  ].filter((a) => a.path !== current);

  // SEO meta tags
  useEffect(() => {
    if (title) document.title = title;

    const desc = document.querySelector('meta[name="description"]');
    const keywords = document.querySelector('meta[name="keywords"]');

    if (desc)
      desc.setAttribute(
        "content",
        `${title} - Learn uses, remedies, and benefits.`
      );
    if (keywords) keywords.setAttribute("content", tags.join(", "));
  }, [title, tags]);

  // Dark mode toggle
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark-article");
    else html.classList.remove("dark-article");
  }, [darkMode]);

  // Current URL
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      {/* DARK MODE TOGGLE */}
      <button
        className="article-theme-toggle"
        onClick={() => setDarkMode((s) => !s)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* SOCIAL SHARE BAR */}
      <div className="floating-share-bar">
        <a
          className="share-btn"
          href={`https://wa.me/?text=${encodeURIComponent(
            title + " - " + currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/images/whatsapp.png"
            alt="WhatsApp"
            className="share-icon"
          />
        </a>

        <a
          className="share-btn"
          href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/images/facebook.png"
            alt="Facebook"
            className="share-icon"
          />
        </a>

        <a
          className="share-btn"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title + " " + currentUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/images/twitter.png"
            alt="Twitter"
            className="share-icon"
          />
        </a>

        <a
          className="share-btn"
          href={`https://linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            currentUrl
          )}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/src/assets/images/linkedin.png"
            alt="LinkedIn"
            className="share-icon"
          />
        </a>
      </div>

      {/* HEADER IMAGE */}
      <div className="article-header-banner" aria-hidden="true"></div>

      {/* BREADCRUMBS */}
      <nav className="article-breadcrumbs">
        <Link to="/">Home</Link> › <Link to="/medicinal-plants">Articles</Link> ›{" "}
        <span>{title}</span>
      </nav>

      {/* MAIN CONTAINER */}
      <div className="article-wrapper">
        <div className="article-box">
          {/* TITLE */}
          <h1 className="article-title">{title}</h1>

          {/* TAGS */}
          <div className="article-tags">
            {tags.map((tag) => (
              <span key={tag} className="article-tag">
                #{tag}
              </span>
            ))}
          </div>

          {/* ARTICLE CONTENT */}
          <div className="article-content">{children}</div>

          {/* AUTHOR BOX */}
          <div className="author-box">
            <div className="author-avatar">
              <img src={editorialAvatar} alt="MedPlant Editorial Team" />
            </div>

            <div className="author-info">
              <h4>MedPlant Editorial Team</h4>
              <p>
                We research medicinal plants, herbal remedies, and Ayurveda to
                provide trusted, evidence-based natural wellness knowledge.
              </p>
            </div>
          </div>

          {/* RELATED ARTICLES */}
          <section className="related-articles">
            <h2>Related Articles</h2>

            <div className="related-grid">
              {related.map((r) => (
                <Link key={r.path} to={r.path} className="related-card">
                  <div className="related-title">{r.title}</div>
                  <div className="related-desc">
                    Learn more about this topic in our detailed guide.
                  </div>
                  <div className="related-link">Read article →</div>
                </Link>
              ))}
            </div>
          </section>

          {/* NAVIGATION */}
          <div className="nav-buttons">
            {current !== "/medicinal-plants" && (
              <Link className="nav-btn" to="/medicinal-plants">
                ← Previous
              </Link>
            )}
            {current !== "/ayurvedic-uses" && (
              <Link className="nav-btn" to="/ayurvedic-uses">
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* BACK TO TOP */}
      <button
        className="back-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Top
      </button>
    </>
  );
}
