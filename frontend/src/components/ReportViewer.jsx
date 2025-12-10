// =======================================
// ReportViewer.jsx — Markdown Renderer
// With Copy / Download actions
// =======================================

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaClipboard, FaDownload } from "react-icons/fa";
import "../styles/report.css";

export default function ReportViewer({ markdown }) {
  if (!markdown) {
    return (
      <div className="report-empty card">
        <p>No report available. Identify a plant to generate a medicinal report.</p>
      </div>
    );
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert("Report copied to clipboard.");
    } catch {
      alert("Failed to copy text.");
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "medplant-report.md";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <article className="report-wrapper card">
      {/* HEADER */}
      <div className="report-header">
        <h2 style={{ color: "var(--text-primary)" }}>Medicinal Plant Report</h2>

        <div className="report-actions">
          <button className="icon-btn" onClick={copyToClipboard} title="Copy to clipboard">
            <FaClipboard size={16} /> Copy
          </button>

          <button className="icon-btn" onClick={downloadMarkdown} title="Download report">
            <FaDownload size={16} /> Download
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="report-content" style={{ color: "var(--text-primary)" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>

      {/* FOOTER */}
      <div className="report-footer">
        <small style={{ color: "var(--text-secondary)" }}>
          Disclaimer: This report is for educational purposes only.  
          Consult a licensed healthcare provider before using any medicinal plant.
        </small>
      </div>
    </article>
  );
}
