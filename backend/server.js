require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "MedPlant backend running" });
});

app.post("/api/gemini/generate", (req, res) => {
  res.json({
    ok: true,
    result: "Mock Gemini response",
    creditsLeft: 9
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
