import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({
  heroRef,
  aboutRef,
  priceRef,
  language,
  t,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => scrollToSection(heroRef)}>
        CashPay
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        <div className="nav-links">
          <button onClick={() => scrollToSection(aboutRef)}>
            {t.about}
          </button>
          <button onClick={() => scrollToSection(priceRef)}>
            {t.price}
          </button>

          <button onClick={() => navigate(`/${language}/hardware`)}>
            {t.hardware}
          </button>
          <button onClick={() => navigate(`/${language}/topup`)}>
            Top Up
          </button>
          <button onClick={() => navigate(`/${language}/blog`)}>
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
  );
}
