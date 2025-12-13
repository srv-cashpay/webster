import React, { useState } from "react";
import "./PaymentGateway.css";

export default function PaymentGateway() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { id: 1, name: "Dana", icon: "💙" },
    { id: 2, name: "OVO", icon: "🟣" },
    { id: 3, name: "Gopay", icon: "💠" },
    { id: 4, name: "Bank Transfer", icon: "🏦" },
    { id: 5, name: "ShopeePay", icon: "🟧" },
  ];

  const handlePay = () => {
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu!");
      return;
    }

    alert("Pembayaran diproses via : " + selectedMethod);
  };

  return (
    <div className="pay-wrapper">
      <div className="pay-container">

        <h1>Payment Gateway</h1>
        <p className="subtitle">Pilih metode pembayaran untuk melanjutkan transaksi</p>

        {/* Summary */}
        <div className="summary-box">
          <h3>Ringkasan Pembayaran</h3>
          <div className="summary-row">
            <span>Produk</span>
            <span>Mobile Legends 86 Diamonds</span>
          </div>
          <div className="summary-row">
            <span>Harga</span>
            <span>Rp 20.000</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rp 20.000</span>
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="method-title">Metode Pembayaran</h2>

        <div className="method-grid">
          {paymentMethods.map((item) => (
            <div
              key={item.id}
              className={`method-card ${
                selectedMethod === item.name ? "selected" : ""
              }`}
              onClick={() => setSelectedMethod(item.name)}
            >
              <div className="method-icon">{item.icon}</div>
              <p>{item.name}</p>
            </div>
          ))}
        </div>

        <button className="pay-button" onClick={handlePay}>
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
}
