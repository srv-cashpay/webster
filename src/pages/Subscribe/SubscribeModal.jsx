import React, { useState } from "react";
import { FaCreditCard, FaTimes, FaWallet } from "react-icons/fa";
import "./SubscribeModal.css";
import { chargeGopaySubscription } from "../../services/subscribe/api"; // <= IMPORT API

const plans = [
  {
    id: 1,
    name: "Basic Plan",
    price: 50000,
    features: ["1 Outlet", "Support Chat", "Akses Fitur Dasar"],
  },
  {
    id: 2,
    name: "Pro Plan",
    price: 100000,
    features: ["3 Outlet", "Support Premium", "Akses Semua Fitur"],
  },
];

const paymentGroups = [
  {
    title: "e-Wallet",
    items: [
      { label: "GoPay", desc: "Pembayaran cepat via aplikasi Gojek" },
      { label: "DANA", desc: "Pembayaran via aplikasi DANA" },
      { label: "Akulaku PayLater", desc: "Bayar nanti dengan Akulaku" },
    ],
  },
  {
    title: "Bank Virtual Account",
    items: [
      { label: "BNI", desc: "Virtual Account BNI" },
      { label: "BRI", desc: "Virtual Account BRI" },
      { label: "Bank Mandiri", desc: "Virtual Account Mandiri" },
      { label: "PermataBank", desc: "Virtual Account Permata" },
      { label: "Danamon", desc: "Virtual Account Danamon" },
      { label: "CIMB Niaga", desc: "Virtual Account CIMB Niaga" },
    ],
  },
  {
    title: "QRIS",
    items: [
      { label: "GoPay Static QRIS", desc: "QRIS statis untuk pembayaran mudah" },
      { label: "GoPay Dynamic QRIS", desc: "QRIS dinamis untuk transaksi langsung" },
    ],
  },
  {
    title: "Google Pay",
    items: [
      { label: "Google Pay", desc: "Pembayaran dengan Google Wallet" },
    ],
  },
];

export default function SubscribeModal({ onClose }) {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [paymentData, setPaymentData] = useState(null); // <= SIMPAN DATA API

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // ==========================
  // 🔵 HANDLE BAYAR GOPAY
  // ==========================
  const handlePay = async (method) => {
    if (method !== "GoPay") {
      alert(`Metode ${method} belum terhubung API.`);
      return;
    }

    try {
      const res = await chargeGopaySubscription(selectedPlan.price);

      setPaymentData(res); // simpan response API
      } catch (e) {
        if (e.error) {
            alert(e.error);  // <= KELUAR PERSIS SESUAI JSON
        } else {
            alert("Gagal membuat transaksi GoPay");
        }
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  // ==========================
  // 🔵 AMBIL QR CODE + DEEPLINK
  // ==========================
  const qr1 = paymentData?.actions?.find(a => a.name === "generate-qr-code")?.url;
  const qr2 = paymentData?.actions?.find(a => a.name === "generate-qr-code-v2")?.url;
  const deepLink = paymentData?.actions?.find(a => a.name === "deeplink-redirect")?.url;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="subscribe-modal">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-content">

          {/* KIRI */}
          <div className="left-section">
            <h2>Paket Langganan</h2>

            <select
              value={selectedPlan.id}
              onChange={(e) =>
                setSelectedPlan(plans.find((p) => p.id === parseInt(e.target.value)))
              }
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - Rp {p.price.toLocaleString()}
                </option>
              ))}
            </select>

            <ul className="feature-list">
              {selectedPlan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>

            <p className="plan-price">
              Total: <strong>Rp {selectedPlan.price.toLocaleString()}</strong>
            </p>
          </div>

          {/* KANAN */}
          <div className="right-section">

            {/* Jika PAYMENT SUDAH TERBUAT → Tampilkan QR */}
            {paymentData ? (
              <div className="payment-result">
                <h3>Scan untuk Membayar</h3>

                {/* QR Code */}
                {qr2 || qr1 ? (
                  <img
                    src={qr2 || qr1}
                    alt="QR Payment"
                    className="qr-image"
                  />
                ) : (
                  <p>QR tidak ditemukan.</p>
                )}

                {/* Deeplink */}
                {deepLink && (
                  <a href={deepLink} className="deeplink-btn">
                    Bayar via GoPay App
                  </a>
                )}

                <p>Status: <strong>{paymentData.transaction_status}</strong></p>
                <p>Expired: {paymentData.expiry_time}</p>

              </div>
            ) : (
              <>
                <h3>Pilih Metode Pembayaran</h3>
                {paymentGroups.map((group, idx) => (
                  <div key={idx} className="accordion-section">
                    <div
                      className="accordion-header"
                      onClick={() => toggleAccordion(idx)}
                    >
                      <strong>{group.title}</strong>
                      <span>{openAccordion === idx ? "▲" : "▼"}</span>
                    </div>

                    {openAccordion === idx && (
                      <div className="accordion-body">
                        {group.items.map((pm, i) => (
                          <div
                            key={i}
                            className="payment-method"
                            onClick={() => handlePay(pm.label)}
                          >
                            <FaWallet className="icon" />
                            <div>
                              <strong>{pm.label}</strong>
                              <p>{pm.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
