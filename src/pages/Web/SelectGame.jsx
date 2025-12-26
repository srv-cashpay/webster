import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SelectGame.css";

// GAME ICONS
import mlIcon from "../../assets/ml.jpg";
import ff from "../../assets/ff.jpg";
import pubg from "../../assets/pubg.jpg";
import pb from "../../assets/pb.jpg";

export default function SelectGame() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 bahasa dari URL
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  const games = [
    { id: 1, name: "Mobile Legends", icon: mlIcon, route: "mobile-legend" },
    { id: 2, name: "Free Fire", icon: ff, route: "free-fire" },
    { id: 3, name: "PUBG Mobile", icon: pubg, route: "pubg-mobile" },
    { id: 4, name: "Point Blank", icon: pb, route: "point-blank" }
  ];

  return (
    <div className="ppob-wrapper">

      {/* 🔥 HEADER */}
      <div className="ppob-header-banner3">
        <div className="banner-col">
          <img src={mlIcon} alt="MLBB" />
        </div>
        <div className="banner-col">
          <img src={ff} alt="Free Fire" />
        </div>
        <div className="banner-col">
          <img src={pubg} alt="PUBG" />
        </div>

        <div className="banner-overlay"></div>
        <h1 className="banner-title">Pilih Game</h1>
      </div>

      <div className="ppob-container">
        <div className="ppob-list">
          {games.map((g) => (
            <div
              key={g.id}
              className="ppob-game-card"
              onClick={() =>
                navigate(`${langPrefix}/topup/${g.route}`)
              }
            >
              <img src={g.icon} alt={g.name} />
              <p>{g.name}</p>
            </div>
          ))}
        </div>

        {/* 🔥 tombol kembali aman */}
        <button
          className="back-btn"
          onClick={() => navigate(`${langPrefix}/topup`)}
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
