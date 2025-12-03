import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LandingPage.css";
import text from "../../locales/text";
import ChatWidget from "./ChatWidget"; 

import heroImage from "../../assets/head.png";
import addImage from "../../assets/add.png";
import scanImage from "../../assets/scan1.png";
import dashboard1 from "../../assets/dashboard1.png";

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const language = lang === "id" ? "id" : "en";

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  useEffect(() => {
    if (ref === "encrypt") {
      console.log("Parameter 'auth' terdeteksi!");
    }
  }, [ref]);

  const scrollToSection = (ref) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

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
            <button onClick={() => scrollToSection(featuresRef)}>
              {t.features}
            </button>
            <button onClick={() => scrollToSection(aboutRef)}>
              {t.about}
            </button>

            {/* 🔥 MENU TopUp */}
            <button onClick={() => navigate(`/${language}/hardware`)}>
              {t.hardware}
            </button>
             <button onClick={() => navigate(`/${language}/topup`)}>
              Top Up
            </button>
          </div>

          <div className="language-toggle">
            <button
              className={language === "id" ? "active-lang" : ""}
              onClick={() => navigate("/id")}
            >
              ID
            </button>
            <button
              className={language === "en" ? "active-lang" : ""}
              onClick={() => navigate("/en")}
            >
              EN
            </button>
          </div>

          <button
            className="btn-login"
            onClick={() => navigate(`/${language}/auth?ref=encrypt`)}
          >
            {t.tryFree}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="hero">
        <div className="hero-text">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>

          <div className="hero-buttons">
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

            <button
              className="btn-windows"
              onClick={() => navigate(`/${language}/download`)}
            >
              <div className="btn-windows-content">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg"
                  alt="Windows Logo"
                />
                <span>Download for Windows</span>
              </div>
            </button>
          </div>
        </div>

        <img src={heroImage} alt="Hero" className="hero-image" />
      </section>

      {/* FEATURES */}
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
        <div className="feature-grid">
          <div className="feature-card">
            <h3>{t.f4}</h3>
            <p>{t.f1desc}</p>
          </div>
          <div className="feature-card">
            <h3>{t.f5}</h3>
            <p>{t.f2desc}</p>
          </div>
          <div className="feature-card">
            <h3>{t.f6}</h3>
            <p>{t.f3desc}</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
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

      {/* MISSION */}
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

      {/* VISION */}
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

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CashPay. All rights reserved.</p>
        <button
          onClick={() => navigate(`/${language}/privacy`)}
          className="privacy-link"
        >
          {t.privacy}
        </button>
      </footer>

      <ChatWidget />
    </div>
  );
}
