export default function Blank({ title, content }) {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ color: "#0a5328", marginBottom: "20px" }}>{title}</h1>

      <div
        style={{
          fontSize: "16px",
          lineHeight: "1.7",
          color: "#333",
          whiteSpace: "pre-line",
        }}
      >
        {content}
      </div>
    </div>
  );
}
