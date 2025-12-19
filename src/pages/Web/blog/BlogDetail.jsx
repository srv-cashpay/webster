import { useNavigate, useParams } from "react-router-dom";
import "./Blog.css";
import React, { useRef } from "react";
import text from "../../../locales/text";
import Navbar from "../../../components/navbar/Navbar";

export default function BlogDetail() {
  const { id } = useParams();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang === "en" ? "en" : "id";
    const t = text[language];
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const aboutRef = useRef(null);
    const priceRef = useRef(null);
    
    return (
    <div className="blog-detail">
      <Navbar
              heroRef={heroRef}
              featuresRef={featuresRef}
              aboutRef={aboutRef}
              priceRef={priceRef}
              language={language}
              t={t}
            />
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Kembali
      </button>

      <img
        src="https://source.unsplash.com/800x400/?technology"
        alt="Blog"
        className="blog-detail-img"
      />

      <h1>Judul Blog #{id}</h1>
      <span className="blog-date">18 Des 2025</span>

      <p>
        Ini adalah contoh konten blog. Nantinya isi artikel bisa diambil dari API
        backend dan dirender secara dinamis di halaman ini.
      </p>

      <p>
        Blog ini cocok untuk artikel promo, tutorial top up, berita game, dan
        update fitur CashPay.
      </p>
    </div>
  );
}
