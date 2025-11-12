import React, { useState, useEffect, useRef } from "react";
import "./PaymentModal.css";
import PaymentMethodModal from "../PaymentMethod/PaymentMethodModal";
import { FaTimes } from "react-icons/fa";

export default function PaymentModal({ total, onClose, onSuccess }) {
  const [cash, setCash] = useState("");
  const [change, setChange] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [discountedTotal, setDiscountedTotal] = useState(total);
  const [showMethodModal, setShowMethodModal] = useState(false);
  const [showMemberInput, setShowMemberInput] = useState(false);
  const [memberWhatsapp, setMemberWhatsapp] = useState("");

  const inputRef = useRef(null);
  const discountOptions = [0, 5, 10, 15, 20];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleConfirm = () => {
    if (parseFloat(cash) < discountedTotal) {
      alert("Uang konsumen kurang!");
      return;
    }
    setShowMethodModal(true);
  };

  useEffect(() => {
    const discount = (total * (selectedDiscount || 0)) / 100;
    setDiscountedTotal(total - discount);
  }, [selectedDiscount, total]);

  useEffect(() => {
    const val = parseFloat(cash || 0);
    setChange(val - discountedTotal);
  }, [cash, discountedTotal]);

  const handleKeypad = (val) => {
    if (val === "C") return setCash("");
    if (val === "⌫") return setCash((prev) => prev.slice(0, -1));
    setCash((prev) => prev + val);
  };

  const keypadButtons = ["1","2","3","4","5","6","7","8","9","0","⌫","C"];
  const isConfirmDisabled = parseFloat(cash || 0) < discountedTotal;

  return (
    <>
      <div className="modal-overlay">
        <div className="payment-modal">
          {/* Tombol X di pojok kiri atas */}
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>

          {/* BAGIAN KIRI */}
          <div className="payment-left">
            <div className="total-row">
              <span>Total Belanja:</span>
              {selectedDiscount ? (
                <span>
                  <span className="strike">Rp {total.toLocaleString()}</span>
                  <span className="discounted">
                    Rp {discountedTotal.toLocaleString()}
                  </span>
                </span>
              ) : (
                <b>Rp {total.toLocaleString()}</b>
              )}
            </div>

            {/* Pilih Diskon */}
            <div className="discount-section">
              <p>Pilih Diskon:</p>
              <div className="discount-options">
                {discountOptions.map((opt) => (
                  <label key={opt} className="discount-option">
                    <input
                      type="checkbox"
                      checked={selectedDiscount === opt}
                      onChange={() =>
                        setSelectedDiscount(selectedDiscount === opt ? null : opt)
                      }
                    />
                    {opt}%
                  </label>
                ))}
              </div>
            </div>

            {/* Input Uang Konsumen */}
            <input
              ref={inputRef}
              type="number"
              className="payment-input"
              value={cash}
              onChange={(e) => setCash(e.target.value)}
              placeholder="Cash Payment"
            />

            {/* Kembalian */}
            <p>
              Kembalian: <b>Rp {change >= 0 ? change.toLocaleString() : 0}</b>
            </p>

            {/* Member + Input WhatsApp di samping kanan */}
            <div className="member-row">
              <div
                className="other-method-label"
                onClick={() => setShowMemberInput(!showMemberInput)}
                style={{ color: showMemberInput ? "#007bff" : "#333" }}
              >
                Member
              </div>

              {showMemberInput && (
                <input
                  type="number"
                  className="member-input"
                  placeholder="Nomor WhatsApp"
                  value={memberWhatsapp}
                  onChange={(e) => setMemberWhatsapp(e.target.value)}
                />
              )}
            </div>

            {/* Label pembayaran lain */}
            <div
              className="other-method-label"
              onClick={() => setShowMethodModal(true)}
            >
              Gunakan metode pembayaran lain
            </div>

            {/* Tombol Konfirmasi */}
            <div className="payment-actions">
              <button
                className="confirm-btn"
                onClick={handleConfirm}
                disabled={isConfirmDisabled}
                style={{
                  opacity: isConfirmDisabled ? 0.6 : 1,
                  cursor: isConfirmDisabled ? "not-allowed" : "pointer",
                }}
              >
                Konfirmasi
              </button>
            </div>
          </div>

          {/* BAGIAN KANAN */}
          <div className="payment-right">
            {keypadButtons.map((val) => (
              <button
                key={val}
                onClick={() => handleKeypad(val)}
                className="keypad-btn"
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Pilih Metode Pembayaran */}
      {showMethodModal && (
        <PaymentMethodModal
          show={showMethodModal}
          onClose={() => setShowMethodModal(false)}
          onSelect={(method) => {
            alert(`Pembayaran via ${method} berhasil!`);
            setShowMethodModal(false);
            onSuccess();
          }}
        />
      )}
    </>
  );
}
