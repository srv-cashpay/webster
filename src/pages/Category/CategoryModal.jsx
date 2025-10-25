import React, { useEffect, useState } from "react";
import {
  fetchMerkData,
  fetchCategoryData,
  createCategory,
} from "../../services/category/api";
import { toast } from "react-toastify";

const CategoryModal = ({ setShowModal, onSuccess }) => {
  const [newCategory, setNewCategory] = useState({
    barcode: "",
    sku: "",
    category_name: "",
    price: "",
    stock: "",
    min_stock: "",
    description: "",
    status: "active",
    merk_id: "",
    category_id: "",
  });

  const [merkList, setMerkList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const merkRes = await fetchMerkData();
        const categoryRes = await fetchCategoryData();
        setMerkList(merkRes?.data || merkRes || []);
        setCategoryList(categoryRes?.data || categoryRes || []);
      } catch (error) {
        console.error("Gagal memuat data dropdown:", error);
      }
    };
    loadDropdownData();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.category_name || !newCategory.price) {
      toast.warning("Harap isi semua field wajib");
      return;
    }

    try {
      const payload = {
        barcode: newCategory.barcode,
        sku: newCategory.sku,
        category_name: newCategory.category_name,
        price: parseInt(newCategory.price) || 0,
        stock: parseInt(newCategory.stock) || 0,
        min_stock: parseInt(newCategory.min_stock) || 0,
        description: newCategory.description,
        status: newCategory.status === "active" ? 1 : 2,
        merk_id: newCategory.merk_id || null,
        category_id: newCategory.category_id || null,

      };

      await createCategory(payload);
      toast.success("✅ Produk berhasil ditambahkan!");
      setShowModal(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      toast.error("❌ Gagal menambahkan produk!");
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h2 style={modalTitle}>🛍️ Tambah Produk Baru</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCategory();
          }}
          style={formGrid}
        >
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>Barcode</label>
            <input
              type="text"
              placeholder="Contoh: 8991234567890"
              value={newCategory.barcode}
              onChange={(e) =>
                setNewCategory({ ...newCategory, barcode: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>SKU / Kode Produk</label>
            <input
              type="text"
              placeholder="SKU12345"
              value={newCategory.sku}
              onChange={(e) =>
                setNewCategory({ ...newCategory, sku: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>Nama Produk</label>
            <input
              type="text"
              placeholder="Contoh: Kaos Polos Premium"
              value={newCategory.category_name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, category_name: e.target.value })
              }
              style={inputStyle}
              required
            />

            {/* Merek & Kategori */}
           <div style={rowGroup}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Merek</label>
                <select
                  value={newCategory.merk_id}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, merk_id: e.target.value })
                  }
                  style={inputSmall}
                  required
                >
                  <option value="">Pilih Merek</option>
                  {merkList.map((merk) => (
                    <option key={merk.id} value={merk.id}>
                      {merk.merk_name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Kategori</label>
                <select
                  value={newCategory.category_id}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, category_id: e.target.value })
                  }
                  style={inputSmall}
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categoryList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Harga, Stok, Minimal Stok (3 sejajar) */}
            <div style={rowGroup3}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Harga (Rp)</label>
                <input
                  type="number"
                  placeholder="150000"
                  value={newCategory.price}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, price: e.target.value })
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
                  value={newCategory.stock}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, stock: e.target.value })
                  }
                  style={inputSmall}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Minimal Stok</label>
                <input
                  type="number"
                  placeholder="5"
                  value={newCategory.min_stock}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, min_stock: e.target.value })
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
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
              style={textareaStyle}
            />

            <label style={labelStyle}>Status Produk</label>
            <div style={optionGroup}>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={newCategory.status === "active"}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, status: e.target.value })
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
                  checked={newCategory.status === "inactive"}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, status: e.target.value })
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

const rowGroup3 = {
  display: "flex",
  gap: "20px",
  marginTop: "10px",
  flexWrap: "wrap",
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
  accentColor: "#007bff",
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

export default CategoryModal;
