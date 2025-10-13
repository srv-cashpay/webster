import React from "react";

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h2 style={modalTitle}>🛒 Detail Produk</h2>

        <div style={formGrid}>
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>ID Produk</label>
            <input type="text" value={product.id} readOnly style={inputStyle} />

            <label style={labelStyle}>Nama Produk</label>
            <input type="text" value={product.product_name} readOnly style={inputStyle} />

            <label style={labelStyle}>Merek</label>
            <input type="text" value={product.merk_name || "-"} readOnly style={inputStyle} />

            <label style={labelStyle}>Kategori</label>
            <input type="text" value={product.category_name || "-"} readOnly style={inputStyle} />

            <label style={labelStyle}>Stok</label>
            <input type="number" value={product.stock} readOnly style={inputSmall} />

            <label style={labelStyle}>Minimal Stok</label>
            <input type="number" value={product.min_stock || 0} readOnly style={inputSmall} />
          </div>

          {/* Kolom Kanan */}
          <div style={column}>
            <label style={labelStyle}>Harga (Rp)</label>
            <input
              type="text"
              value={product.price?.toLocaleString("id-ID")}
              readOnly
              style={inputSmall}
            />

            <label style={labelStyle}>Status</label>
            <input
              type="text"
              value={product.status === 1 ? "Available" : "Unavailable"}
              readOnly
              style={inputStyle}
            />

            <label style={labelStyle}>Barcode</label>
            <input type="text" value={product.barcode || "-"} readOnly style={inputStyle} />

            <label style={labelStyle}>SKU</label>
            <input type="text" value={product.sku || "-"} readOnly style={inputStyle} />

            <label style={labelStyle}>Deskripsi</label>
            <textarea value={product.description || "-"} readOnly style={textareaStyle} />
          </div>
        </div>

        {/* Tombol Close */}
        <div style={buttonGroup}>
          <button onClick={onClose} style={cancelBtn}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

/* 🎨 Styles sama persis dengan ProductModal */
const modalOverlay = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
  padding: "10px",
};

const modalBox = {
  backgroundColor: "#fff",
  borderRadius: "12px",
  width: "90%",
  maxWidth: "800px",
  maxHeight: "90vh",
  overflowY: "auto",
  padding: "30px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
};

const modalTitle = {
  textAlign: "center",
  marginBottom: "15px",
  color: "#222",
  fontSize: "18px",
  fontWeight: "600",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px 40px",
};

const column = {
  display: "flex",
  flexDirection: "column",
};

const labelStyle = {
  marginTop: "10px",
  fontWeight: "600",
  color: "#333",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
  backgroundColor: "#f5f5f5",
};

const inputSmall = {
  ...inputStyle,
  padding: "8px",
  fontSize: "13px",
};

const textareaStyle = {
  ...inputStyle,
  height: "100px",
  resize: "vertical",
};

const buttonGroup = {
  gridColumn: "1 / span 2",
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "25px",
};

const cancelBtn = {
  backgroundColor: "#ddd",
  color: "#333",
  border: "none",
  padding: "10px 16px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

export default ProductDetailModal;
