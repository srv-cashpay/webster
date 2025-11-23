import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PPOB.css";

// IMPORT ASSET GAMBAR SECARA BENAR
import mlIcon from "../../assets/OIP.jpg";

export default function SelectGame() {
  const navigate = useNavigate();
  const { lang } = useParams();

  const games = [
    { id: 1, name: "Mobile Legends", icon: mlIcon, route: "mobile-legend" },
    { id: 2, name: "Free Fire", icon: "ffIcon", route: "free-fire" },
    { id: 3, name: "PUBG Mobile", icon: "pubgIcon", route: "pubg" }
  ];

  return (
    <div className="ppob-wrapper">
      <div className="ppob-container">

        <h1 className="ppob-title">Pilih Game</h1>

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
