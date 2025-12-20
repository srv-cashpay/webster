import React from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/head.png";
import "./Hero.css";

export default function Hero({ heroRef, t, language }) {
  const navigate = useNavigate();

  return (
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
                alt="Windows"
              />
              <span>Download for Windows</span>
            </div>
          </button>
        </div>
      </div>

      <img
        src={heroImage}
        alt="Hero"
        className="hero-image"
        fetchPriority="high"
      />
    </section>
  );
}
