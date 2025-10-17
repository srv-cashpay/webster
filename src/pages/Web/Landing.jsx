import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import text from "../../locales/text";

import heroImage from "../../assets/head.png";
import addImage from "../../assets/add.png";
import scanImage from "../../assets/scan1.png";
import dashboard1 from "../../assets/dashboard1.png";

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en"); // ✅ definisi bahasa

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  useEffect(() => {
    if (ref === "encrypt") {
      console.log("✅ Parameter 'auth' terdeteksi!");
    }
  }, [ref]);

  const scrollToSection = (ref) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ✅ semua teks bilingual
  const t = text[language];

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection(heroRef)}>
          CashPay
        </div>

        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </div>

        <div className={`nav-right ${menuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <button onClick={() => scrollToSection(featuresRef)}>{t.features}</button>
            <button onClick={() => scrollToSection(aboutRef)}>{t.about}</button>
          </div>

          {/* 🔤 Tombol Bahasa */}
          <div className="language-toggle">
            <button
              className={language === "id" ? "active-lang" : ""}
              onClick={() => setLanguage("id")}
            >
              ID
            </button>
            <button
              className={language === "en" ? "active-lang" : ""}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>

          <button className="btn-login" onClick={() => navigate("/auth?ref=encrypt")}>
            {t.tryFree}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="hero">
        <div className="hero-text">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>

          <div className="hero-buttons">
            <button
              className="btn-appstore"
              onClick={() => window.open("https://apps.apple.com/app/idXXXXXXXXX", "_blank")}
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </button>

            <button
              className="btn-playstore"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.app.cashpay",
                  "_blank"
                )
              }
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
              />
            </button>
          </div>
        </div>

        <img src={heroImage} alt="Hero" className="hero-image" />
      </section>

      {/* Features */}
      <section ref={featuresRef} className="section features">
        <h2>{t.ourFeatures}</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>{t.f1}</h3>
            <p>{t.f1desc}</p>
          </div>
          <div className="feature-card">
            <h3>{t.f2}</h3>
            <p>{t.f2desc}</p>
          </div>
          <div className="feature-card">
            <h3>{t.f3}</h3>
            <p>{t.f3desc}</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="section about">
        <div className="about-container">
          <div className="about-image">
            <img src={dashboard1} alt="About" />
          </div>
          <div className="about-text">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutP1}</p>
            <p>{t.aboutP2}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission">
        <div className="mission-container">
          <div className="mission-image">
            <img src={scanImage} alt="Mission" />
          </div>
          <div className="mission-text">
            <h2>{t.missionTitle}</h2>
            <p>{t.missionP1}</p>
            <p>{t.missionP2}</p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section vision">
        <div className="vision-container">
          <div className="vision-text">
            <h2>{t.visionTitle}</h2>
            <p>{t.visionP1}</p>
            <p>{t.visionP2}</p>
          </div>
          <div className="vision-image">
            <img src={addImage} alt="Vision" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CashPay. All rights reserved.</p>
        <button onClick={() => navigate("/privacy")} className="privacy-link">
          {t.privacy}
        </button>
      </footer>
    </div>
  );
}
