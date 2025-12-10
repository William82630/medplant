export default function TermsAndConditions() {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ color: "#0a5328" }}>Terms & Conditions</h1>
      <p>Last updated: {new Date().getFullYear()}</p>

      <p>
        By using the MedPlant Identifier App, you agree to the terms outlined
        below. If you do not agree, please discontinue use of the application.
      </p>

      <h2>1. Purpose of the App</h2>
      <p>
        MedPlant provides plant identification and information for educational
        purposes only. It is NOT a substitute for professional medical advice.
      </p>

      <h2>2. User Responsibilities</h2>
      <ul>
        <li>Do not upload harmful, illegal, or unrelated content.</li>
        <li>
          Do not rely solely on the app for medical treatment or consumption of
          plants.
        </li>
        <li>You must use the app responsibly and at your own risk.</li>
      </ul>

      <h2>3. Accuracy Disclaimer</h2>
      <p>
        While the AI strives to be accurate, plant identification results may
        not always be perfect. Always double-check with qualified experts.
      </p>

      <h2>4. Limitation of Liability</h2>
      <p>
        We are not liable for any harm, loss, or damages resulting from the use
        or misuse of the app, including incorrect plant identification.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>All content, UI designs, and app assets belong to the MedPlant team.</p>

      <h2>6. Changes to Terms</h2>
      <p>
        These Terms may be updated occasionally. Continued use of the app means
        you accept any updated terms.
      </p>
    </div>
  );
}
