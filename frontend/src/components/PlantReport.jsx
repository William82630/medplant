import React from "react";
import ReactMarkdown from "react-markdown";

export default function PlantReport({ text }) {
  if (!text) return null;

  return (
    <div
      style={{
        background: "white",
        padding: "24px",
        borderRadius: 12,
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        maxWidth: 900,
        margin: "40px auto",
        lineHeight: 1.7,
        fontSize: "17px",
      }}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 style={{ fontSize: "32px", marginBottom: "12px", color: "#166534" }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontSize: "26px", marginTop: "28px", color: "#166534" }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontSize: "22px", marginTop: "20px", color: "#14532d" }}>
              {children}
            </h3>
          ),
          p: ({ children }) => <p style={{ margin: "12px 0" }}>{children}</p>,

          ul: ({ children }) => (
            <ul style={{ paddingLeft: "20px", marginTop: "10px" }}>{children}</ul>
          ),

          table: ({ children }) => (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "16px",
              }}
            >
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                background: "#f3f4f6",
                textAlign: "left",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{children}</td>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}
