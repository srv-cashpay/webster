import "./Pricing.css";
import { useNavigate } from "react-router-dom";

export default function Pricing({ priceRef, language }) {
  const navigate = useNavigate();

  return (
    <section ref={priceRef} className="section pricing">
      <h2 className="pricing-title">
        {language === "id" ? "Harga Paket" : "Pricing Plans"}
      </h2>

      <div className="pricing-container">

        {/* BASIC */}
        <div className="pricing-card">
          <h3>Basic</h3>
          <p className="price">Rp 0<span>/bulan</span></p>
          <ul>
            <li>• 1 Device</li>
            <li>• Fitur Kasir Dasar</li>
            <li>• Riwayat Transaksi</li>
            <li>• Support Chat</li>
          </ul>
          <button
            className="pricing-btn"
            onClick={() => navigate(`/${language}/auth?ref=encrypt`)}
          >
            {language === "id" ? "Mulai Gratis" : "Start Free"}
          </button>
        </div>

        {/* PRO */}
        <div className="pricing-card highlight">
          <h3>Pro</h3>
          <p className="price">Rp 49.000<span>/bulan</span></p>
          <ul>
            <li>• Unlimited Device</li>
            <li>• Semua Fitur Premium</li>
            <li>• Laporan & Grafik</li>
            <li>• Support Prioritas</li>
          </ul>
          <button
            className="pricing-btn"
            onClick={() => navigate(`/${language}/auth?ref=encrypt`)}
          >
            {language === "id" ? "Pilih Pro" : "Choose Pro"}
          </button>
        </div>

        {/* ENTERPRISE */}
        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p className="price">Konsultasi Harga</p>
          <ul>
            <li>• Integrasi API</li>
            <li>• Dukungan 24/7</li>
            <li>• Training Tim</li>
            <li>• SLA Khusus</li>
          </ul>
          <button
            className="pricing-btn"
            onClick={() => navigate(`/${language}/contact`)}
          >
            {language === "id" ? "Hubungi Kami" : "Contact Us"}
          </button>
        </div>

      </div>
    </section>
  );
}
