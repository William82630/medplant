import { useRef } from "react";

function CameraCapture({ onCapture }) {
  const inputRef = useRef();

  const openCamera = () => inputRef.current?.click();

  const handleCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) onCapture(file);
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.btn} onClick={openCamera} type="button">
        📷 Capture
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleCapture}
      />
    </div>
  );
}

const styles = {
  wrapper: { display: "flex", justifyContent: "center" },
  btn: {
    padding: "12px 18px",
    borderRadius: 10,
    border: "none",
    background: "#0A6847",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 200
  }
};

export default CameraCapture;
