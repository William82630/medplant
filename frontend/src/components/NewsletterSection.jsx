// src/components/NewsletterSection.jsx

export default function NewsletterSection() {
  return (
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        padding: "70px 20px",
        background: "#f1faf5",
        borderTop: "1px solid #d8e7df",
        borderBottom: "1px solid #d8e7df",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#064e3b",
          marginBottom: "12px",
        }}
      >
        Join Our Herbal Newsletter
      </h2>

      <p
        style={{
          fontSize: 17,
          color: "#444",
          maxWidth: 620,
          margin: "0 auto 28px",
          lineHeight: 1.6,
        }}
      >
        Get plant wisdom, natural remedies & AI-powered medicinal insights
        delivered weekly — straight to your inbox.
      </p>

      {/* ConvertKit Inline Form Embed */}
      <div
        style={{
          maxWidth: 420,
          margin: "0 auto",
          textAlign: "left",
          background: "#ffffff",
          padding: "25px 28px",
          borderRadius: 14,
          boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
        }}
        dangerouslySetInnerHTML={{
          __html: `
            <script async src="https://app.convertkit.com/forms/8856220/js"></script>
            <form action="https://app.convertkit.com/forms/8856220/subscriptions" method="post">
              <input 
                type="email" 
                name="email_address" 
                placeholder="Enter your email"
                required
                style="width:100%; padding:14px; border-radius:8px; border:1px solid #cce3d8; margin-bottom:12px; font-size:16px;"
              />
              <button 
                type="submit"
                style="
                  width:100%;
                  background:#059669;
                  color:white;
                  padding:14px;
                  border-radius:8px;
                  border:none;
                  font-size:17px;
                  cursor:pointer;
                  font-weight:600;
                "
              >
                Subscribe
              </button>
            </form>
          `,
        }}
      />
    </section>
  );
}
