// src/pages/About.jsx
import React from "react";

export default function About() {
  return (
    <div className="container page-fade" style={{ paddingTop: "40px", paddingBottom: "60px" }}>

      {/* PAGE TITLE */}
      <h1>About MedPlant</h1>

      {/* INTRO PARAGRAPH */}
      <p>
        <strong>MedPlant</strong> is an easy-to-use plant identification app
        built to bring the knowledge of medicinal and potentially dangerous
        plants into everyone’s hands. Our mission is simple: empower people to
        discover, learn, and safely use plant-based knowledge — whether for
        learning, wellbeing, or simply curiosity.
      </p>

      {/* SECTION 1 */}
      <h2>Our Origins</h2>
      <p>
        MedPlant grew from a few simple ideas: that local plant knowledge is
        precious, much of it is threatened or forgotten, and accessible tools
        can reconnect people with safe, traditional wisdom. We combined modern
        AI (for fast identification) with carefully curated reference data so
        users get clear, actionable, and trustworthy information.
      </p>

      {/* SECTION 2 */}
      <h2>What We Aim to Achieve</h2>
      <ul>
        <li><strong>Accessibility:</strong> Make botanical knowledge available to everyone.</li>
        <li><strong>Safety:</strong> Help users identify dangerous plants and avoid accidental poisoning.</li>
        <li><strong>Education:</strong> Provide concise summaries of traditional uses and precautions.</li>
        <li><strong>Preservation:</strong> Support the preservation of local ethnobotanical knowledge.</li>
      </ul>

      {/* SECTION 3 */}
      <h2>Why Plant Identification Matters</h2>
      <p>
        Nature contains remedies that have supported human health for millennia.
        Many herbal remedies offer benefits with fewer side effects than some
        synthetic medicines — but that does not mean they are always safe.
        Correct identification is crucial: many edible or medicinal plants have
        look-alikes that are toxic. Identifying plants carefully helps protect
        both people and pets from accidental poisoning and enables safe,
        informed use.
      </p>

      {/* SECTION 4 */}
      <h2>Natural ≠ Always Safe</h2>
      <p>
        While many natural remedies are gentle and effective, some plants contain
        powerful compounds that can harm humans or animals. MedPlant emphasizes
        clear safety warnings and encourages users to consult experts for any
        treatment decisions. Never consume or use a plant medicinally unless
        you are sure of its identity and safe dosage.
      </p>

      {/* SECTION 5 */}
      <h2>Protecting Pets & The Environment</h2>
      <p>
        Pets are often more sensitive to certain plant toxins than humans.
        Identifying potentially dangerous plants in and around the home can
        prevent tragic accidents. Our app highlights common toxic species and
        suggests when to seek veterinary help.
      </p>

      {/* SECTION 6 */}
      <h2>How We Work</h2>
      <p>
        You upload a clear photo — MedPlant sends it to our AI engine which
        compares the image to verified botanical sources and returns:
      </p>
      <ul>
        <li>Likely plant names</li>
        <li>Traditional uses and preparation notes</li>
        <li>Warnings and toxicity information</li>
        <li>Suggested trusted references</li>
      </ul>

      {/* SECTION 7 */}
      <h2>Our Promise</h2>
      <p>
        We aim to be accurate, transparent, and helpful. The app is educational
        and not a substitute for professional medical or veterinary advice.
        Where possible we indicate confidence levels, sources, and when to seek
        specialist opinion.
      </p>

      {/* SECTION 8 */}
      <h2>Join Our Community</h2>
      <p>
        If you spot missing information or have local knowledge to share, we
        welcome contributions and corrections. Together we can build a safer,
        better-informed relationship with the plants around us.
      </p>

      <p style={{ marginTop: 28, color: "#555" }}>
        — The MedPlant Team
      </p>

    </div>
  );
}
