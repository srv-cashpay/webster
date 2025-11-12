import React from "react";
import "./PaymentMethodModal.css";

export default function PaymentMethodModal({ show, onClose, onSelect }) {
  if (!show) return null;

  const methods = [
    { name: "QRIS", color: "#2196F3" },
    { name: "Kartu Debit", color: "#9C27B0" },
    { name: "Transfer Bank", color: "#FF9800" },
    { name: "E-Wallet", color: "#009688" },
  ];

  return (
    <div className="modal-overlay">
      <div className="payment-method-modal">
        <h2>Pilih Metode Pembayaran</h2>
        <div className="method-grid">
          {methods.map((m) => (
            <button
              key={m.name}
              className="method-btn"
              style={{ backgroundColor: m.color }}
              onClick={() => onSelect(m.name)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <button className="cancel-method" onClick={onClose}>Batal</button>
      </div>
    </div>
  );
}
