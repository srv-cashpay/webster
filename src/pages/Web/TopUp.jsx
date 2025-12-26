import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TopUp.css";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

import slider from "../../assets/design.png";
import ml from "../../assets/ml.jpg";
import xl from "../../assets/xl.png";
import pubg from "../../assets/pubg.jpg";
import pb from "../../assets/pb.jpg";

export default function TopUp() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 bahasa dari URL (AMAN)
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  const categories = [
    { id: 1, name: "Pulsa", icon: "📱", route: "pulsa" },
    { id: 2, name: "Paket Data", icon: "🌐", route: "paket-data" },
    { id: 3, name: "Game", icon: "🎮", route: "games" },
    { id: 4, name: "PLN", icon: "⚡", route: "pln" },
    { id: 5, name: "Voucher", icon: "🎟️", route: "voucher" },
  ];

  const best = [
    { id: 1, name: "Mobile Legend", icon: ml, route: "mobile-legend" },
    { id: 2, name: "XL Axiata", icon: xl, route: "pulsa-telkomsel" },
    { id: 3, name: "PUBG Mobile", icon: pubg, route: "pubg-mobile" },
    { id: 4, name: "Point Blank", icon: pb, route: "point-blank" },
  ];

  const slides = [slider];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="ppob-wrapper">
      <div className="ppob-container">

        <button className="ppob-check btn">Cek Transaksi</button>
        <button className="ppob-check btn">News</button>

        {/* ================= SLIDER ================= */}
        <div className="slider-wrapper">
          <div className="slider-arrow left" onClick={prev}>❮</div>
          <div className="slider-arrow right" onClick={next}>❯</div>

          <div
            className="slider"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div className="slide" key={i}>
                <img src={src} alt={`slide-${i}`} />
              </div>
            ))}
          </div>

          <div className="slider-dots">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`dot ${current === i ? "active" : ""}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div className="ppob-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="ppob-card"
              onClick={() => navigate(`${langPrefix}/topup/${cat.route}`)}
            >
              <div className="ppob-icon">{cat.icon}</div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <p>Best Seller</p>

        <div className="ppob-grid-game">
          {best.map((item) => (
            <div
              key={item.id}
              className="ppob-best-card"
              onClick={() => navigate(`${langPrefix}/topup/${item.route}`)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="footer">
          <div className="footer-top">
            <span>© {new Date().getFullYear()} CashPay. All rights reserved.</span>
          </div>

          <button
            onClick={() => navigate(`${langPrefix}/privacy`)}
            className="privacy-link"
          >
            Privacy Policy
          </button>

          <div className="footer-social">
            <a href="https://instagram.com/cashpay" target="_blank" rel="noreferrer">
              <FaInstagram size={26} />
            </a>
            <a href="https://www.facebook.com/share/1AqYgAzggh/" target="_blank" rel="noreferrer">
              <FaFacebook size={26} />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <FaYoutube size={26} />
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}
