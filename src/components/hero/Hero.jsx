import React, { useState } from "react";
import "./Hero.css";

export default function Hero({ heroRef, t, onTrack }) {
  const [resi, setResi] = useState("");
  const [showCourier, setShowCourier] = useState(false);

  const couriers = [
    { key: "jne", label: "JNE" },
    { key: "pos", label: "POS Indonesia" },
    { key: "jnt", label: "J&T" },
    { key: "jnt_cargo", label: "J&T Cargo" },
    { key: "sicepat", label: "SiCepat" },
    { key: "tiki", label: "TIKI" },
    { key: "anteraja", label: "AnterAja" },
    { key: "wahana", label: "Wahana" },
    { key: "ninja", label: "Ninja Express" },
    { key: "lion", label: "Lion Parcel" },
    { key: "pcp", label: "PCP Express" },
    { key: "jet", label: "JET Express" },
    { key: "rex", label: "REX Express" },
    { key: "first", label: "First Logistics" },
    { key: "idexpress", label: "ID Express" },
    { key: "shopee", label: "Shopee Express" },
    { key: "kgx", label: "KGXpress" },
    { key: "sap", label: "SAP Express" },
    { key: "jx", label: "JX Express" },
    { key: "rpx", label: "RPX" },
    { key: "lazada", label: "Lazada Express" },
    { key: "indah", label: "Indah Cargo" },
    { key: "dakota", label: "Dakota Cargo" },
  ];

  const handleCekResi = () => {
    if (!resi.trim()) return;
    setShowCourier(true);
  };

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-text">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroDesc}</p>

        <div className="resi-box">
          <input
            type="text"
            placeholder="Masukkan nomor resi"
            value={resi}
            onChange={(e) => {
              setResi(e.target.value);
              setShowCourier(false);
            }}
          />
          <button onClick={handleCekResi}>Cek Resi</button>
        </div>

        {showCourier && (
          <div className="courier-list">
            {couriers.map((c) => (
              <button
                key={c.key}
                onClick={() => onTrack({ courier: c.key, resi })}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ✅ HERO IMAGE — LCP SAFE */}
      <img
        src="/assets/mobile.webp"
        srcSet="
          /assets/mobile.webp 420w,
          /assets/web.webp 560w
        "
        sizes="
          (max-width: 768px) 100vw,
          420px
        "
        width="420"
        height="280"
        alt="Cek resi pengiriman cepat"
        className="hero-image"
        loading="eager"
        fetchPriority="high"
      />
    </section>
  );
}
