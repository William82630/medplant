import { useState, useEffect } from "react";

function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // cleanup object URL if used (not used here, but safe)
    return () => {
      setPreview(null);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onImageSelect(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div style={styles.box}>
      <label style={styles.uploadLabel}>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div style={styles.uploadInner}>
          <div style={styles.cameraEmoji}>📁</div>
          <div style={styles.uploadText}>Choose Image</div>
        </div>
      </label>

      {preview ? (
        <img src={preview} alt="preview" style={styles.preview} />
      ) : (
        <div style={styles.placeholder}>
          <div style={{fontWeight:600}}>No image selected</div>
          <div style={{color:"#666", fontSize:13}}>Upload or capture an image to get started</div>
        </div>
      )}
    </div>
  );
}

const styles = {
  box: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  uploadLabel: {
    cursor: "pointer",
    borderRadius: 10,
    border: "1px dashed #cfd8d4",
    padding: "10px 14px",
    minWidth: 220,
    display: "inline-block",
    background: "#fff"
  },
  uploadInner: { display: "flex", alignItems: "center", gap: 10 },
  cameraEmoji: { fontSize: 20 },
  uploadText: { fontSize: 15, fontWeight: 600, color: "#0A6847" },
  preview: { width: 260, height: "auto", borderRadius: 12, boxShadow: "0 6px 18px rgba(0,0,0,0.08)" },
  placeholder: {
    width: 260,
    padding: 18,
    borderRadius: 12,
    border: "1px solid #f0f0f0",
    textAlign: "center",
    color: "#888",
    background: "#fafafa"
  }
};

export default ImageUpload;
