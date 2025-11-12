import React, { useState } from "react";

const MemberModal = ({ show, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !whatsapp) {
      alert("Harap isi semua data!");
      return;
    }
    onSave({ name, whatsapp });
    setName("");
    setWhatsapp("");
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Tambah Member Baru</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={formGroup}>
            <label style={labelStyle}>Nama Lengkap</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
              style={inputStyle}
              autoFocus
            />
          </div>

          <div style={formGroup}>
            <label style={labelStyle}>WhatsApp</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Contoh: 08123456789"
              style={inputStyle}
            />
          </div>

          <div style={buttonContainer}>
            <button type="button" onClick={onClose} style={btnCancel}>
              Batal
            </button>
            <button type="submit" style={btnSave}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 🌫 Overlay (background hitam transparan)
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0, 0, 0, 0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  backdropFilter: "blur(2px)",
};

// 🪟 Modal utama
const modalStyle = {
  background: "white",
  padding: "30px 25px",
  borderRadius: "12px",
  width: "360px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
  animation: "fadeIn 0.3s ease-out",
  transition: "all 0.3s ease",
};

// 🧾 Judul modal
const titleStyle = {
  textAlign: "center",
  fontSize: "18px",
  marginBottom: "20px",
  color: "#333",
  fontWeight: "600",
};

// 📄 Form layout
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

// 📦 Wrapper tiap input
const formGroup = {
  display: "flex",
  flexDirection: "column",
};

// 🏷 Label
const labelStyle = {
  fontSize: "13px",
  color: "#666",
  marginBottom: "6px",
  fontWeight: "500",
};

// ✏️ Input
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

// Hover & focus untuk input
inputStyle[":focus"] = {
  borderColor: "#4CAF50",
};

// 🎛 Container tombol
const buttonContainer = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
  marginTop: "20px",
};

// ❌ Tombol batal
const btnCancel = {
  background: "#f0f0f0",
  color: "#333",
  border: "none",
  padding: "9px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "all 0.2s ease",
};

// ✅ Tombol simpan
const btnSave = {
  background: "#4CAF50",
  color: "#fff",
  border: "none",
  padding: "9px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 3px 8px rgba(76, 175, 80, 0.3)",
  transition: "all 0.2s ease",
};

// Hover efek
btnCancel[":hover"] = { background: "#e0e0e0" };
btnSave[":hover"] = { background: "#43A047" };

export default MemberModal;
