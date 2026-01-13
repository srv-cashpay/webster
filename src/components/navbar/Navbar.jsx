import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "/android-chrome-56x56.png"; // ⬅️ import logo

export default function Navbar({
  heroRef,
  aboutRef,
  priceRef,
  t,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // 🔥 sumber kebenaran bahasa = URL
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

const goToLogin = () => {
  const consoleUrl = import.meta.env.VITE_CONSOLE_URL;

  if (!consoleUrl) {
    console.error("VITE_CONSOLE_URL is undefined");
    return;
  }

  const langPath = isEnglish ? "/en" : "";
  window.location.href = `${consoleUrl}${langPath}/login?ref=encrypt`;
};

  return (
    <nav className="navbar">
    <div className="logo-wrapper" onClick={() => scrollToSection(heroRef)}>
        <img src={logo} alt="CashPay Logo" className="logo-img" />
        <span className="logo-text">CashPay</span>
      </div>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        <div className="nav-links">
          <button onClick={() => scrollToSection(aboutRef)}>{t.about}</button>
          <button onClick={() => scrollToSection(priceRef)}>{t.price}</button>

          <button onClick={() => navigate(`${langPrefix}/hardware`)}>
            {t.hardware}
          </button>

          <button onClick={() => navigate(`${langPrefix}/topup`)}>
            Top Up
          </button>

          <button onClick={() => navigate(`${langPrefix}/blog`)}>
            Blog
          </button>
        </div>

        {/* 🌐 Toggle Bahasa */}
        <div className="language-toggle">
          <button
            className={!isEnglish ? "active-lang" : ""}
            onClick={() => {
              const path = location.pathname.replace(/^\/en/, "") || "/";
              navigate(`${path}${location.search}`);
            }}
          >
            ID
          </button>

          <button
            className={isEnglish ? "active-lang" : ""}
            onClick={() => {
              const path = location.pathname.replace(/^\/en/, "");
              navigate(`/en${path}${location.search}`);
            }}
          >
            EN
          </button>
        </div>

        {/* 🔐 LOGIN — INI YANG PALING PENTING */}
        <button
          className="btn-login"
          onClick={goToLogin}
        >
          {t.tryFree}
        </button>
      </div>
    </nav>
  );
}
