import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./LandingPage.css";
import text from "../../locales/text";
import ChatWidget from "./ChatWidget"; 
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

import heroImage from "../../assets/head.png";
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
             <button onClick={() => scrollToSection(priceRef)}>
              {t.price}
            </button>
            {/* 🔥 MENU TopUp */}
            <button onClick={() => navigate(`/${language}/hardware`)}>
              {t.hardware}
            </button>
             <button onClick={() => navigate(`/${language}/topup`)}>
              Top Up
            </button>
             <button onClick={() => navigate(`/${language}/topup`)}>
              Blog
            </button>
          </div>

          <div className="language-toggle">
            <button
              className={language === "id" ? "active-lang" : ""}
              onClick={() => navigate("/")}
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

        <img src={heroImage} alt="Hero" className="hero-image"  fetchpriority="high" />
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
      {/* PRICING */}
      <section ref={priceRef} className="section pricing">
        <h2 className="pricing-title">{language === "id" ? "Harga Paket" : "Pricing Plans"}</h2>

        <div className="pricing-container">

          {/* Paket Basic */}
          <div className="pricing-card">
            <h3>Basic</h3>
            <p className="price">Rp 0<span>/bulan</span></p>
            <ul>
              <li>• 1 Device</li>
              <li>• Fitur Kasir Dasar</li>
              <li>• Riwayat Transaksi</li>
              <li>• Support Chat</li>
            </ul>
            <button
              onClick={() => navigate(`/${language}/auth?ref=encrypt`)}
              className="pricing-btn"
            >
              {language === "id" ? "Mulai Gratis" : "Start Free"}
            </button>
          </div>

          {/* Paket Pro */}
          <div className="pricing-card highlight">
            <h3>Pro</h3>
            <p className="price">Rp 49.000<span>/bulan</span></p>
            <ul>
              <li>• Unlimited Device</li>
              <li>• Semua Fitur Premium</li>
              <li>• Laporan & Grafik</li>
              <li>• Support Prioritas</li>
            </ul>
            <button
              onClick={() => navigate(`/${language}/auth?ref=encrypt`)}
              className="pricing-btn"
            >
              {language === "id" ? "Pilih Pro" : "Choose Pro"}
            </button>
          </div>

          {/* Paket Enterprise */}
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">Konsultasi Harga</p>
            <ul>
              <li>• Integrasi API</li>
              <li>• Dukungan 24/7</li>
              <li>• Training Tim</li>
              <li>• SLA Khusus</li>
            </ul>
            <button
              onClick={() => navigate(`/${language}/contact`)}
              className="pricing-btn"
            >
              {language === "id" ? "Hubungi Kami" : "Contact Us"}
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <span>© {new Date().getFullYear()} CashPay. All rights reserved.</span>

        </div>
          <button
            onClick={() => navigate(`/${language}/privacy`)}
            className="privacy-link"
          >
            Privacy Policy
          </button>

        <div className="footer-social">
          <a
          href="https://instagram.com/cashpay"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaInstagram size={26} />
        </a>
        <a
          href="https://www.facebook.com/share/1AqYgAzggh/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaFacebook size={26} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaYoutube size={26} />
        </a>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
