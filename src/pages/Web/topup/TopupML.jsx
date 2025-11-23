import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TopupML.css";

export default function TopupML() {
  const navigate = useNavigate();
  const { lang } = useParams();

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");

  const diamondList = [
    { id: 1, amount: "86 Diamonds", price: 20000 },
    { id: 2, amount: "172 Diamonds", price: 40000 },
    { id: 3, amount: "257 Diamonds", price: 60000 },
    { id: 4, amount: "344 Diamonds", price: 80000 },
    { id: 5, amount: "514 Diamonds", price: 120000 },
    { id: 6, amount: "706 Diamonds", price: 160000 },
    { id: 7, amount: "878 Diamonds", price: 200000 },
    { id: 8, amount: "963 Diamonds", price: 220000 },
    { id: 9, amount: "1412 Diamonds", price: 320000 }
  ];

  const handleChoose = (item) => {
    if (!userId.trim() || !zoneId.trim()) {
      alert("User ID dan Zone ID wajib diisi!");
      return;
    }

    navigate(
      `/${lang}/topup/mobile-legend/checkout?uid=${userId}&zone=${zoneId}&diamond=${item.amount}&price=${item.price}`
    );
  };

  return (
    <div className="topup-wrapper">
      <div className="topup-container">
        <div className="mlbb-header">
          <h1>TopUp Mobile Legends</h1>
        </div>

        <p>Masukkan User ID dan Zone ID untuk melanjutkan topup</p>

        <div className="topup-form">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Zone ID"
            value={zoneId}
            onChange={(e) => setZoneId(e.target.value)}
          />
        </div>

        <h2>Pilih Jumlah Diamonds</h2>

        <div className="diamond-grid">
          {diamondList.map((item) => (
            <div
              key={item.id}
              className="diamond-card"
              onClick={() => handleChoose(item)}
            >
              <h3>{item.amount}</h3>
              <p>Rp {item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <button className="back-btn" onClick={() => navigate(`/${lang}`)}>
          Kembali
        </button>
      </div>
    </div>
  );
}
