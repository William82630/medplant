export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ color: "#0a5328" }}>Privacy Policy</h1>
      <p>Last updated: {new Date().getFullYear()}</p>

      <p>
        This Privacy Policy explains how the MedPlant Identifier App collects,
        uses, and protects your information. By using this application, you
        consent to the practices described below.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We may collect images you upload for plant identification, device
        metadata, and usage statistics to improve service accuracy.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>Your information is used solely for:</p>
      <ul>
        <li>Plant identification processing</li>
        <li>Improving AI accuracy</li>
        <li>Maintaining service functionality</li>
      </ul>

      <h2>3. Data Storage</h2>
      <p>
        Uploaded images are processed temporarily and not stored permanently
        unless required for debugging or improvement (securely and anonymously).
      </p>

      <h2>4. Third-Party Services</h2>
      <p>
        The AI identification feature uses Google Gemini API. Your data is
        processed according to Google's privacy standards.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You may request deletion of your temporary data or inquire how data is
        used at any time.
      </p>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy when necessary. Changes will be posted
        on this page.
      </p>

      <p>If you have any questions, contact us at: support@medplant.app</p>
    </div>
  );
}
