import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LandingPage.css";
import text from "../../locales/text";
import ChatWidget from "../../components/widget/ChatWidget"; 
import Navbar from "../../components/navbar/Navbar";
import Hero from "../../components/hero/Hero";
import Pricing from "../../components/pricing/Pricing";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import FAQ from "../../components/faq/FAQ";

// import addImage from "../../assets/add.png";
// import scanImage from "../../assets/scan1.png";
// import dashboard1 from "../../assets/dashboard1.png";

export default function LandingPage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const priceRef = useRef(null);
  const [demoOpen, setDemoOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();
const faqRef = useRef(null);

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
        aboutRef={aboutRef}
        priceRef={priceRef}
        language={language}
        t={t}
      />

      {/* HERO */}
      <Hero heroRef={heroRef} t={t} language={language} />

      {/* About */}
      <About aboutRef={aboutRef} t={t} />

      {/* Body About */}
      <section className="section about">
        <div className="about-container">
          <div className="about-image">
            <img src="https://res.cloudinary.com/dafzliys4/image/upload/v1766223109/dashboard1_jhjnrg.png" alt="About" />
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
            <img src="https://res.cloudinary.com/dafzliys4/image/upload/v1766223109/scan1_hiy9s9.png" alt="Mission" />
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
            <img src="https://res.cloudinary.com/dafzliys4/image/upload/v1766223109/add_c6liaq.png" alt="Vision" />
          </div>
        </div>
      </section>
      {/* PRICING */}
      <Pricing priceRef={priceRef} language={language} />

      {/* FAQ */}
      <FAQ faqRef={faqRef} t={t} />

      {/* FOOTER */}
      <Footer language={language} />
      <ChatWidget />
    </div>
  );
}
