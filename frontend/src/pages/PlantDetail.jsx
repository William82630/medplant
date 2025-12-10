// src/pages/PlantDetail.jsx
// Premium Plant Detail page — visually refined + functional
import { useParams, Link } from "react-router-dom";
import { usePlants } from "../context/PlantsContext";

/**
 * This component:
 * - reads slug from URL
 * - finds plant in context
 * - displays premium header, image, evidence, benefits, preparation, warnings
 * - shows a small similar plants panel (by type + benefit overlap)
 */

export default function PlantDetail() {
  const { slug } = useParams();
  const { plants = [], loading } = usePlants();

  if (loading) return <div style={{ padding: 28 }}>Loading plant…</div>;

  const plant = plants.find((p) => p.slug === slug);

  if (!plant) {
    return (
      <div style={{ padding: 28 }}>
        <h2>Plant not found</h2>
        <p>No plant matches <strong>{slug}</strong>.</p>
        <Link to="/search" style={{ textDecoration: "none", color: "#059669" }}>← Back to Search</Link>
      </div>
    );
  }

  // Compute similar plants (same type or overlapping benefit words)
  const similar = plants
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;
      if (p.type && plant.type && p.type === plant.type) score += 3;

      const a = (plant.benefits || "").toLowerCase().split(/\W+/).filter(Boolean);
      const b = (p.benefits || "").toLowerCase().split(/\W+/).filter(Boolean);
      const overlap = a.filter((w) => b.includes(w)).length;
      score += overlap;
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.p);

  return (
    <main style={{ fontFamily: "Inter, system-ui, sans-serif", padding: 20, maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap", marginBottom: 18 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: 30, color: "#064e3b" }}>{plant.englishName}</h1>
          <div style={{ marginTop: 6, color: "#6b6b6b" }}><em>{plant.scientificName}</em></div>
        </div>

        <div style={{ minWidth: 160, textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#666" }}>Region</div>
          <div style={{ fontWeight: 700, marginTop: 6 }}>{plant.region || "Not documented"}</div>
        </div>
      </div>

      {/* Hero card */}
      <section style={{ background: "#fff", borderRadius: 16, padding: 18, boxShadow: "0 12px 36px rgba(6,78,59,0.06)", display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, alignItems: "start" }}>
        <div>
          <h3 style={{ marginTop: 0, color: "#064e3b" }}>Overview</h3>
          <p style={{ color: "#444", lineHeight: 1.7 }}>{plant.detail || "No detailed explanation available."}</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div>
              <h4 style={{ marginBottom: 8 }}>Medicinal Benefits</h4>
              <p style={{ margin: 0 }}>{plant.benefits || "Not documented."}</p>
            </div>

            <div>
              <h4 style={{ marginBottom: 8 }}>Preparation & Usage</h4>
              <p style={{ margin: 0 }}>{plant.preparation || "No preparation details."}</p>
            </div>
          </div>

          <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <h4 style={{ marginBottom: 8 }}>Mechanism</h4>
              <p style={{ margin: 0 }}>{plant.mechanism || "Not explained."}</p>
            </div>

            <div>
              <h4 style={{ marginBottom: 8 }}>Evidence Level</h4>
              <p style={{ margin: 0 }}>{plant.evidence || "Not evaluated."}</p>
            </div>
          </div>
        </div>

        <aside>
          {plant.imageUrl ? (
            <img src={plant.imageUrl} alt={plant.englishName} style={{ width: "100%", borderRadius: 12, objectFit: "cover", maxHeight: 520 }} />
          ) : (
            <div style={{ width: "100%", height: 240, borderRadius: 12, background: "#f3f3f3", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>No Image</div>
          )}

          <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ background: "#eef8ef", padding: "8px 12px", borderRadius: 10, fontWeight: 700, color: "#064e3b" }}>
              {plant.type || "Type"}
            </div>
            <div style={{ marginLeft: "auto", color: "#666", fontSize: 13 }}>ID: {plant.id || "-"}</div>
          </div>

          {/* Warnings */}
          <div style={{ marginTop: 14 }}>
            <h4 style={{ marginBottom: 8 }}>⚠️ Side Effects</h4>
            <p style={{ margin: 0 }}>{plant.sideEffects || "No known side effects when used responsibly."}</p>
          </div>

          <div style={{ marginTop: 12 }}>
            <h4 style={{ marginBottom: 8 }}>💊 Drug Interactions</h4>
            <p style={{ margin: 0 }}>{plant.interactions || "None reported."}</p>
          </div>
        </aside>
      </section>

      {/* Similar plants */}
      <section style={{ marginTop: 22 }}>
        <h3 style={{ color: "#064e3b", marginBottom: 12 }}>Similar Plants</h3>

        {similar.length === 0 ? (
          <p style={{ color: "#666" }}>No similar plants found.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 12 }}>
            {similar.map((s) => (
              <Link key={s.slug} to={`/plant/${s.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ display: "flex", gap: 12, padding: 12, borderRadius: 12, background: "#fff", border: "1px solid #eef6ef", alignItems: "center" }}>
                  <div style={{ width: 84, height: 64, borderRadius: 8, overflow: "hidden", flex: "0 0 auto" }}>
                    {s.imageUrl ? <img src={s.imageUrl} alt={s.englishName} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", background: "#f3f3f3" }} />}
                  </div>

                  <div>
                    <div style={{ fontWeight: 700 }}>{s.englishName}</div>
                    <div style={{ fontSize: 13, color: "#6b6b6b" }}>{s.scientificName}</div>
                    <div style={{ marginTop: 6, fontSize: 13, color: "#4b5b50" }}>{(s.benefits || "").split(",").slice(0, 2).join(", ")}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <div style={{ marginTop: 24 }}>
        <Link to="/search" style={{ textDecoration: "none" }}>
          <button style={{ background: "#059669", color: "#fff", padding: "10px 16px", borderRadius: 10, border: "none", fontWeight: 700 }}>← Back to Search</button>
        </Link>
      </div>
    </main>
  );
}
