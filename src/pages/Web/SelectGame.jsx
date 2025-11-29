import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PPOB.css";

// IMPORT ASSET GAMBAR HEADER
import headerImage from "../../assets/head.png";

// IMPORT GAME ICONS
import mlIcon from "../../assets/OIP.jpg";
import ff from "../../assets/ff.jpg";
import pubg from "../../assets/pubg.jpg";
import pb from "../../assets/pb.jpg";

export default function SelectGame() {
  const navigate = useNavigate();
  const { lang } = useParams();

  const games = [
    { id: 1, name: "Mobile Legends", icon: mlIcon, route: "mobile-legend" },
    { id: 2, name: "Free Fire", icon: ff, route: "free-fire" },
    { id: 3, name: "PUBG Mobile", icon: pubg, route: "pubg" },
    { id: 4, name: "Point Blank", icon: pb, route: "pb" }

  ];

  return (
    <div className="ppob-wrapper">

      {/* 🔥 HEADER DENGAN GAMBAR */}
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
              onClick={() => navigate(`/${lang}/topup/${g.route}`)}
            >
              <img src={g.icon} alt={g.name} />
              <p>{g.name}</p>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={() => navigate(`/${lang}/ppob`)}>
          Kembali
        </button>

      </div>
    </div>
  );
}
