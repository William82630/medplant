// src/pages/AyurvedicUses.jsx
import ArticleLayout from "../components/ArticleLayout";
import ayurvedicHero from "../assets/images/ayurvedic-uses-hero.webp";

export default function AyurvedicUses() {
  return (
    <ArticleLayout
      title="Ayurvedic Uses of Medicinal Plants: Doshas, Preparations & Practical Guidance"
      current="/ayurvedic-uses"
      tags={[
        "Ayurveda",
        "Ayurvedic herbs",
        "dosha balance",
        "Vata Pitta Kapha",
        "herbal remedies",
        "traditional medicine",
        "plant medicine",
      ]}
    >
      {/* HERO */}
      <img
        src={ayurvedicHero}
        alt="Ayurvedic Uses"
        className="article-img-large page-fade"
      />

      <p>
        Ayurveda is an ancient Indian system of medicine that integrates herbs,
        lifestyle, and diet to restore balance and promote long-term health. At
        the heart of Ayurveda is the understanding that each person has a unique
        constitution (prakriti) determined by three fundamental forces called
        doshas: Vata, Pitta, and Kapha.
      </p>

      <p>
        This article explains how Ayurvedic practitioners use medicinal plants
        to correct imbalances, practical ways to prepare herbs, and how tools
        like <strong>MedPlant</strong> can help you safely apply Ayurvedic
        principles in everyday life.
      </p>

      <h2>🌿 What Are the Doshas?</h2>

      <p>
        The three doshas represent combinations of elemental qualities:
      </p>

      <ul>
        <li>
          <strong>Vata</strong> (air + ether) — movement, creativity, circulation.
          Excess Vata causes dryness, anxiety, bloating, and irregular digestion.
        </li>
        <li>
          <strong>Pitta</strong> (fire + water) — digestion, metabolism, intellect.
          Excess Pitta causes inflammation, acidity, anger, and skin rashes.
        </li>
        <li>
          <strong>Kapha</strong> (earth + water) — structure, stability, immunity.
          Excess Kapha causes congestion, sluggishness, weight gain, and mucus.
        </li>
      </ul>

      <h2>🌱 How Herbs Are Classified in Ayurveda</h2>

      <p>
        Ayurveda classifies herbs by taste (rasa), potency (virya), post-digestive
        effect (vipaka), and their influence on doshas. Knowing these categories
        helps choose the right herb for a person’s condition.
      </p>

      <h3>Rasa — Taste</h3>
      <p>
        Sweet, sour, salty, pungent, bitter, and astringent tastes directly
        affect digestion and dosha balance.
      </p>

      <h3>Virya — Energy</h3>
      <p>
        Herbs are warming or cooling in their energetic effects — essential when
        balancing Pitta (cooling herbs) or Vata (warming herbs).
      </p>

      <h3>Vipaka — Post-digestive Effect</h3>
      <p>
        The long-term metabolic effect after digestion. For example, some
        herbs may taste sweet but act bitter post-digestion.
      </p>

      <div className="highlight-box">
        🌟 <strong>Quick Tip:</strong> Dosha imbalance is treated by using herbs
        that oppose the aggravating qualities — e.g., cooling herbs for excess
        Pitta, grounding herbs for excess Vata.
      </div>

      <h2>🌺 Key Ayurvedic Herbs & Their Uses</h2>

      <h3>Ashwagandha</h3>
      <p>
        Adaptogenic root that reduces stress, supports strength, and calms Vata.
      </p>

      <h3>Triphala</h3>
      <p>
        A three-fruit formula (Amalaki, Bibhitaki, Haritaki) used for digestion,
        detoxification, and gentle bowel regulation.
      </p>

      <h3>Brahmi (Bacopa monnieri)</h3>
      <p>Supports cognition, memory, and calm focus — prized in brain tonics.</p>

      <h3>Shatavari</h3>
      <p>Female tonic supporting reproductive health and hormonal balance.</p>

      <h3>Neem</h3>
      <p>Purifying and cooling — supports skin health and reduces excess Pitta.</p>

      <h2>🍵 Ayurvedic Preparations & How to Use Herbs</h2>

      <p>
        Ayurveda uses specific preparations that change the herb’s potency and
        suitability for conditions:
      </p>

      <ul>
        <li>
          <strong>Infusion</strong> — steeping leaves/flowers in hot water (gentle).
        </li>
        <li>
          <strong>Decoction (Kadha)</strong> — boiling harder parts like roots and bark for stronger extraction.
        </li>
        <li>
          <strong>Tincture</strong> — concentrated alcohol-based extracts for long-term use.
        </li>
        <li>
          <strong>Ghee/Oil Infusion (Snehapaka)</strong> — fat-based extraction for nourishing herbs.
        </li>
        <li>
          <strong>Powders (Churna)</strong> — ground herbs taken with honey, water, or warm milk.
        </li>
      </ul>

      <h2>💡 Dosage & Safety in Ayurveda</h2>

      <p>
        Ayurveda emphasizes individualized dosing. A gentle starting dose,
        observing effects, and modifying based on response are core practices.
        Below are general safety rules:
      </p>

      <ul>
        <li>Start with small doses and increase gradually.</li>
        <li>Prefer prepared formulations from trusted sources.</li>
        <li>Pregnant or breastfeeding women should consult a qualified practitioner.</li>
        <li>Check interactions if you take modern medicines (e.g., anticoagulants).</li>
      </ul>

      <div className="highlight-box">
        ⚠️ <strong>Important:</strong> Ayurvedic herbs are powerful—always confirm
        identity and consider a professional consultation for serious conditions.
      </div>

      <h2>🔍 How MedPlant Helps with Ayurvedic Practice</h2>

      <ul>
        <li>📸 Accurate plant identification through AI image recognition</li>
        <li>📚 Ayurvedic profiles: rasa, virya, vipaka where available</li>
        <li>⚠ Safety flags: pregnancy, interactions, toxicity</li>
        <li>🧾 Preparation tips and traditional use-cases</li>
      </ul>

      <h2>🌼 Practical Ayurvedic Routines</h2>
      <p>Sample ideas to balance doshas with herbs and lifestyle:</p>

      <ul>
        <li><strong>Vata-soothing morning:</strong> warm sesame oil massage (Abhyanga) and warm ginger tea</li>
        <li><strong>Pitta-cooling:</strong> cooling foods, coriander/tulsi infusion, avoid excess heat</li>
        <li><strong>Kapha-reducing:</strong> light breakfast, ginger–turmeric water, invigorating exercise</li>
      </ul>

      <h2>🌿 Closing Thoughts</h2>
      <p>
        Ayurveda pairs beautifully with modern scientific methods. With careful
        identification and responsible preparation, medicinal plants provide a
        rich, individualized path to health. Tools like <strong>MedPlant</strong>
        make it far safer and more accessible to use Ayurvedic wisdom in
        everyday life.
      </p>
    </ArticleLayout>
  );
}
