import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TopUp.css";

export default function TopUp() {
  const navigate = useNavigate();
  const { lang } = useParams();

  const categories = [
    { id: 1, name: "Games", icon: "🎮", route: "games" },
    { id: 2, name: "Pulsa", icon: "📱" },
  ];

  return (
    <div className="ppob-wrapper">
      <div className="ppob-container">

        <h1 className="ppob-title">TopUp CashPay</h1>
        <p className="ppob-subtitle">Pilih kategori untuk mulai transaksi</p>

        <div className="ppob-grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="ppob-card"
              onClick={() => cat.route && navigate(`/${lang}/topup/${cat.route}`)}
            >
              <div className="ppob-icon">{cat.icon}</div>
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
