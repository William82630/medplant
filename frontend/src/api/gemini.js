// src/api/gemini.js

export async function identifyPlant(imageFile) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=" +
    apiKey;

  const base64Image = await toBase64(imageFile);

  const body = {
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: imageFile.type,
              data: base64Image,
            },
          },
          {
            text: `Analyze this plant image and provide:

1. Plant name (common + scientific)
2. Medicinal uses (verified)
3. Active phytochemicals
4. Traditional uses (tribal/ayurvedic)
5. Preparation methods (paste, decoction, etc.)
6. Toxicity and safety notes
7. Identification confidence (0–100%)`
          }
        ]
      }
    ],

    // ✅ CORRECT SEARCH GROUNDING FORMAT
    tools: [
      {
        google_search: {}
      }
    ],

    // Optional — improves factual quality
    safetySettings: [
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("Gemini Error Response:", txt);
    throw new Error("Gemini API error");
  }

  const data = await res.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
