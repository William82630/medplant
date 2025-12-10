// src/pages/HerbalRemedies.jsx
import ArticleLayout from "../components/ArticleLayout";
import remediesHero from "../assets/images/herbal-remedies-hero.webp";

export default function HerbalRemedies() {
  return (
    <ArticleLayout
      title="Herbal Remedies: Safe Home Treatments, Traditional Healing & How MedPlant AI Helps"
      current="/herbal-remedies"
      tags={[
        "herbal remedies",
        "natural treatments",
        "home remedies",
        "ayurveda",
        "medicinal herbs",
        "healing plants",
        "traditional medicine"
      ]}
    >
      {/* HERO IMAGE */}
      <img
        src={remediesHero}
        alt="Herbal Remedies"
        className="article-img-large page-fade"
      />

      <p>
        For centuries, herbal remedies have offered safe, natural solutions for
        everyday health concerns such as colds, digestion, inflammation,
        headaches, and skin issues. These remedies draw from Ayurveda, Siddha,
        Traditional Chinese Medicine, and folk knowledge passed through
        generations.
      </p>

      <p>
        Today, people worldwide are returning to nature for healing — supported
        by scientific studies that validate the effectiveness of many herbs.
        With tools like <strong>MedPlant AI</strong>, identifying plants and
        learning remedies has never been easier or safer.
      </p>

      <h2>🌿 What Are Herbal Remedies?</h2>
      <p>
        Herbal remedies are natural preparations made from leaves, roots,
        flowers, bark, or seeds of medicinal plants. They may be used as teas,
        powders, oils, pastes, or extracts.
      </p>

      <ul>
        <li>🌱 Herbal teas for digestion, immunity, and detox</li>
        <li>🌼 Pastes and gels for skin healing</li>
        <li>🍵 Decoctions for colds, cough, and respiratory relief</li>
        <li>🛁 Herbal baths for relaxation and inflammation</li>
        <li>🌾 Powders & capsules for long-term health support</li>
      </ul>

      <h2>✨ Popular Herbal Remedies You Can Use at Home</h2>

      <h3>🌿 Ginger Tea for Digestion & Nausea</h3>
      <p>
        Ginger is a powerful anti-inflammatory herb that supports digestion,
        reduces nausea, and eases bloating.
      </p>

      <h3>🍯 Turmeric Milk (Golden Milk)</h3>
      <p>
        Turmeric is rich in curcumin, known for anti-inflammatory and immune
        boosting properties — ideal for colds, body pain, and recovery.
      </p>

      <h3>🌱 Tulsi Decoction for Cough & Immunity</h3>
      <p>
        Tulsi helps lung health, reduces stress, and strengthens immunity ― one
        of the pillars of Ayurvedic healing.
      </p>

      <h3>🌾 Fenugreek Water for Blood Sugar Balance</h3>
      <p>
        Known for regulating glucose and supporting metabolism, fenugreek is a
        trusted remedy among diabetic and pre-diabetic individuals.
      </p>

      <h2>🍵 How to Prepare Herbal Remedies Safely</h2>

      <ul>
        <li>Always identify the plant correctly</li>
        <li>Use fresh, clean ingredients</li>
        <li>Avoid excessive consumption</li>
        <li>Follow traditional or documented dosage</li>
        <li>Check interactions with medicines</li>
      </ul>

      <div className="highlight-box">
        🌱 <strong>Tip:</strong> Use MedPlant AI to analyze plant images and get
        instant guidance on safe usage, properties, and warnings.
      </div>

      <h2>⚠️ Safety & Precautions</h2>
      <p>
        Herbal medicine is natural but still powerful. Misuse can lead to side
        effects or interactions.
      </p>

      <ul>
        <li>❗ Some herbs interact with blood thinners</li>
        <li>❗ Avoid strong herbs during pregnancy</li>
        <li>❗ Children require lower or modified dosages</li>
        <li>❗ Always verify the plant before ingestion</li>
      </ul>

      <h2>📚 Final Thoughts</h2>
      <p>
        Herbal remedies offer a safe, effective, and holistic approach to
        wellbeing when used correctly. With the help of{" "}
        <strong>MedPlant AI</strong>, you can explore the healing powers of
        plants confidently and responsibly.
      </p>
    </ArticleLayout>
  );
}
