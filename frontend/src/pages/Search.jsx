// ==========================================
// Search.jsx — Beautiful MedPlant Search UI
// ==========================================

import { useState } from "react";
import { usePlants } from "../context/PlantsContext";

export default function Search() {
  const { search, plants, loading } = usePlants();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [touched, setTouched] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  // ----------------------------
  // Perform Search
  // ----------------------------
  const handleSearch = () => {
    setTouched(true);
    const r = search(query);

    const sorted =
      sortOrder === "asc"
        ? r.sort((a, b) => a.englishName.localeCompare(b.englishName))
        : r.sort((a, b) => b.englishName.localeCompare(a.englishName));

    setResults(sorted);
  };

  return (
    <div style={{ paddingBottom: 60 }}>

      {/* =======================
          HERO SECTION
      ======================== */}
      <section
        style={{
          width: "100%",
          background: "linear-gradient(135deg, #022c22, #064e3b)",
          padding: "60px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            marginBottom: 15,
          }}
        >
          Search Medicinal Plants
        </h1>

        <p
          style={{
            maxWidth: 680,
            margin: "0 auto",
            fontSize: 18,
            lineHeight: 1.6,
            color: "#d1fae5",
          }}
        >
          Search by plant name, scientific name, ailments, preparation, or medicinal benefits.
          <br />
          Try: <em>aloe vera, headache, antibacterial, fever…</em>
        </p>
      </section>

      {/* =======================
          SEARCH BAR
      ======================== */}
      <div
        style={{
          maxWidth: 900,
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="🔍  Search plants or medicinal uses…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{
              flex: 1,
              padding: "16px 18px",
              fontSize: 16,
              borderRadius: 12,
              border: "2px solid var(--border-color)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              outline: "none",
            }}
          />

          <button
            onClick={handleSearch}
            style={{
              background: "#059669",
              color: "white",
              padding: "14px 22px",
              borderRadius: 12,
              border: "none",
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Search
          </button>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: "14px",
              borderRadius: 12,
              border: "2px solid var(--border-color)",
              background: "var(--card-bg)",
              color: "var(--text-primary)",
              fontSize: 15,
            }}
          >
            <option value="asc">Sort: A → Z</option>
            <option value="desc">Sort: Z → A</option>
          </select>
        </div>
      </div>

      {/* =======================
          RESULTS SECTION
      ======================== */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>

        {/* BEFORE SEARCH */}
        {!touched && (
          <p
            style={{
              textAlign: "center",
              marginTop: 10,
              color: "var(--text-secondary)",
            }}
          >
            Type a query and press Search
          </p>
        )}

        {/* NO RESULTS */}
        {touched && results.length === 0 && (
          <p
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 18,
              color: "var(--text-secondary)",
            }}
          >
            No results found.
          </p>
        )}

        {/* GRID RESULTS */}
        <div
          style={{
            marginTop: 30,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 25,
          }}
        >
          {results.map((p) => (
            <a
              key={p.id}
              href={`/plant/${p.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "0.25s",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                }}
              >
                <img
                  src={p.imageUrl || "/assets/placeholder.jpg"}
                  alt={p.englishName}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: 15 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 20,
                      color: "var(--text-primary)",
                    }}
                  >
                    {p.englishName}
                  </h3>

                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "var(--text-secondary)",
                      fontSize: 14,
                      fontStyle: "italic",
                    }}
                  >
                    {p.scientificName}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
