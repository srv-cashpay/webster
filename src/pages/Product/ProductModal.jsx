import React from "react";

const ProductModal = ({
  newProduct,
  setNewProduct,
  handleAddProduct,
  setShowModal,
}) => {
  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h2 style={modalTitle}>🛍️ Tambah Produk Baru</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddProduct();
          }}
          style={formGrid}
        >
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>SKU / Kode Produk</label>
            <input
              type="text"
              placeholder="SKU12345"
              value={newProduct.sku || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, sku: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>Nama Produk</label>
            <input
              type="text"
              placeholder="Contoh: Kaos Polos Premium"
              value={newProduct.product_name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, product_name: e.target.value })
              }
              style={inputStyle}
              required
            />

            {/* Merek & Kategori sejajar */}
            <div style={rowGroup}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Merek</label>
                <input
                  type="text"
                  placeholder="Contoh: Adidas"
                  value={newProduct.brand || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, brand: e.target.value })
                  }
                  style={inputSmall}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Kategori</label>
                <select
                  value={newProduct.category || ""}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                  style={inputSmall}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="fashion">Fashion</option>
                  <option value="elektronik">Elektronik</option>
                  <option value="makanan">Makanan</option>
                  <option value="aksesoris">Aksesoris</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>
            </div>

            {/* Harga & Stok sejajar */}
            <div style={rowGroup}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Harga (Rp)</label>
                <input
                  type="number"
                  placeholder="150000"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  style={inputSmall}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Stok</label>
                <input
                  type="number"
                  placeholder="50"
                  value={newProduct.stock}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                  style={inputSmall}
                  required
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div style={column}>
            <label style={labelStyle}>Deskripsi</label>
            <textarea
              placeholder="Tuliskan deskripsi produk..."
              value={newProduct.description || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              style={textareaStyle}
            />

            {/* Status Produk (Option Button) */}
            <label style={labelStyle}>Status Produk</label>
            <div style={optionGroup}>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={newProduct.status === "active"}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, status: e.target.value })
                  }
                  style={radioBtn}
                />
                Active
              </label>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={newProduct.status === "inactive"}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, status: e.target.value })
                  }
                  style={radioBtn}
                />
                Inactive
              </label>
            </div>
          </div>

          {/* Tombol */}
          <div style={buttonGroup}>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              style={cancelBtn}
            >
              Batal
            </button>
            <button type="submit" style={saveBtn}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 🎨 Styles */
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

const rowGroup = {
  display: "flex",
  gap: "30px",
  marginTop: "10px",
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

/* ⚙️ Option Button */
const optionGroup = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginTop: "8px",
};

const optionLabel = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  color: "#333",
  cursor: "pointer",
};

const radioBtn = {
  width: "16px",
  height: "16px",
  accentColor: "#007bff", // warna biru elegan
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

const saveBtn = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px 18px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
};

export default ProductModal;
