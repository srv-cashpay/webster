import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LandingPage.css";
import text from "../../locales/text";
import ChatWidget from "../../components/widget/ChatWidget"; 
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Pricing from "../../components/pricing/Pricing";

import Footer from "../../components/footer/Footer";

import addImage from "../../assets/add.png";
import scanImage from "../../assets/scan1.png";
import dashboard1 from "../../assets/dashboard1.png";

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const priceRef = useRef(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const language = lang === "en" ? "en" : "id";

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  useEffect(() => {
    if (ref === "encrypt") {
      console.log("Parameter 'auth' terdeteksi!");
    }
  }, [ref]);

  const t = text[language];

  return (
    <div className="landing-container">
      {/* Navbar */}
      <Navbar
        heroRef={heroRef}
        featuresRef={featuresRef}
        aboutRef={aboutRef}
        priceRef={priceRef}
        language={language}
        t={t}
      />

      {/* HERO */}
      <Hero heroRef={heroRef} t={t} language={language} />

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
      {/* PRICING */}
      <Pricing priceRef={priceRef} language={language} />

      {/* FOOTER */}
      <Footer language={language} />
      <ChatWidget />
    </div>
  );
}
