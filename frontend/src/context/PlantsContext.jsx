// src/context/PlantsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const PlantsContext = createContext();
export const usePlants = () => useContext(PlantsContext);

function makeSlug(english, scientific, id) {
  const base = (english || scientific || `plant-${id}`).toString();
  return base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeRow(r) {
  return {
    id: r.id,
    englishName: r.english_name || "",
    scientificName: r.scientific_name || "",
    type: r.type || "",
    region: r.region_found || "",
    benefits: r.medicinal_benefits || "",
    sideEffects: r.common_side_effects || "",
    preparation: r.preparation || "",
    detail: r.detail_explanation || "",
    imageUrl: r.plant_image_url || "",
    slug: r.slug || makeSlug(r.english_name, r.scientific_name, r.id),
    raw: r,
  };
}

export function PlantsProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPlants() {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("plants")
        .select(
          `
            id,
            english_name,
            scientific_name,
            type,
            region_found,
            medicinal_benefits,
            common_side_effects,
            preparation,
            detail_explanation,
            plant_image_url,
            slug
          `
        )
        .order("english_name", { ascending: true });

      if (error) throw error;

      const normalized = (data || []).map(normalizeRow);
      setPlants(normalized);

      console.log("Loaded plants:", normalized.length);

    } catch (err) {
      console.error("Plants load error:", err);
      setError(err);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlants();
  }, []);

  function findBySlug(slug) {
    return plants.find((p) => p.slug === slug);
  }

  function search(query) {
    if (!query) return [];
    const q = query.toLowerCase();
    return plants.filter(
      (p) =>
        p.englishName.toLowerCase().includes(q) ||
        p.scientificName.toLowerCase().includes(q) ||
        (p.benefits || "").toLowerCase().includes(q)
    );
  }

  return (
    <PlantsContext.Provider
      value={{ plants, loading, error, reload: loadPlants, findBySlug, search }}
    >
      {children}
    </PlantsContext.Provider>
  );
}
