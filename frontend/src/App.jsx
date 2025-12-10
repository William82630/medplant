// =============================
// IMPORTS
// =============================
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./styles/global.css";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import MedicinalPlants from "./pages/MedicinalPlants";
import HerbalRemedies from "./pages/HerbalRemedies";
import AyurvedicUses from "./pages/AyurvedicUses";
import PlantDetail from "./pages/PlantDetail";
import Search from "./pages/Search";
import SavedPlants from "./pages/SavedPlants"; // ⭐ Correct one
import Login from "./pages/Login";
import Identify from "./pages/Identify";
import FAQ from "./pages/FAQ";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


// =============================
// ⭐ Smooth scroll on route change
// =============================
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// =============================
// ⭐ Floating Back-to-Top Button
// =============================
function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 350);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        padding: "12px 16px",
        borderRadius: "50%",
        background: "#059669",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        fontSize: "18px",
        zIndex: 999,
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}


// =============================
// ⭐ MAIN APP — FINAL VERSION
// =============================
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <div className="page-fade">
        <Routes>

          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Tools */}
          <Route path="/search" element={<Search />} />
          <Route path="/identify" element={<Identify />} />
          <Route path="/saved" element={<SavedPlants />} />
          <Route path="/login" element={<Login />} />

          {/* Legal */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Articles */}
          <Route path="/medicinal-plants" element={<MedicinalPlants />} />
          <Route path="/herbal-remedies" element={<HerbalRemedies />} />
          <Route path="/ayurvedic-uses" element={<AyurvedicUses />} />

          {/* Plant Details */}
          <Route path="/plant/:slug" element={<PlantDetail />} />

        </Routes>
      </div>

      <Footer />
      <BackToTopButton />
    </>
  );
}
