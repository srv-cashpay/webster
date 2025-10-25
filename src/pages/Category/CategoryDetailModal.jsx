import React, { useEffect, useState } from "react";
import {
  fetchMerkData,
  fetchCategoryData,
  updateExistingCategory
} from "../../services/category/api";
import { toast } from "react-toastify";

const CategoryDetailModal = ({ category, onClose, onSuccess }) => {
  const [updatedCategory, setUpdatedCategory] = useState({ ...category });
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

  useEffect(() => {
    setUpdatedCategory({ ...category });
  }, [category]);

  const handleUpdateCategory = async () => {
    if (!updatedCategory.category_name || !updatedCategory.price) {
      toast.warning("Harap isi semua field wajib");
      return;
    }

    try {
      const payload = {
        id: updatedCategory.id,
        barcode: updatedCategory.barcode,
        sku: updatedCategory.sku,
        category_name: updatedCategory.category_name,
        price: parseInt(updatedCategory.price) || 0,
        stock: parseInt(updatedCategory.stock) || 0,
        min_stock: parseInt(updatedCategory.min_stock) || 0,
        description: updatedCategory.description,
        status: updatedCategory.status === "active" ? 1 : 2,
        merk_id: updatedCategory.merk_id || null,
        category_id: updatedCategory.category_id || null,
      };

      await updateExistingCategory(updatedCategory.id, payload);
      toast.success("✅ Produk berhasil diperbarui!");
      onClose(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal memperbarui produk:", error);
      toast.error("❌ Gagal memperbarui produk!");
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h2 style={modalTitle}>✏️ Edit Produk</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateCategory();
          }}
          style={formGrid}
        >
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>Barcode</label>
            <input
              type="text"
              value={updatedCategory.barcode || ""}
              onChange={(e) =>
                setUpdatedCategory({ ...updatedCategory, barcode: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>SKU / Kode Produk</label>
            <input
              type="text"
              value={updatedCategory.sku || ""}
              onChange={(e) =>
                setUpdatedCategory({ ...updatedCategory, sku: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>Nama Produk</label>
            <input
              type="text"
              value={updatedCategory.category_name || ""}
              onChange={(e) =>
                setUpdatedCategory({
                  ...updatedCategory,
                  category_name: e.target.value,
                })
              }
              style={inputStyle}
              required
            />

            {/* Merek & Kategori */}
            <div style={rowGroup}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Merek</label>
                <select
                  value={updatedCategory.merk_id || ""}
                  onChange={(e) =>
                    setUpdatedCategory({
                      ...updatedCategory,
                      merk_id: e.target.value,
                    })
                  }
                  style={inputSmall}
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
                  value={updatedCategory.category_id || ""}
                  onChange={(e) =>
                    setUpdatedCategory({
                      ...updatedCategory,
                      category_id: e.target.value,
                    })
                  }
                  style={inputSmall}
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

            {/* Harga, Stok, Minimal Stok */}
            <div style={rowGroup3}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Harga (Rp)</label>
                <input
                  type="number"
                  value={updatedCategory.price || ""}
                  onChange={(e) =>
                    setUpdatedCategory({
                      ...updatedCategory,
                      price: e.target.value,
                    })
                  }
                  style={inputSmall}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Stok</label>
                <input
                  type="number"
                  value={updatedCategory.stock || ""}
                  onChange={(e) =>
                    setUpdatedCategory({
                      ...updatedCategory,
                      stock: e.target.value,
                    })
                  }
                  style={inputSmall}
                  required
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Minimal Stok</label>
                <input
                  type="number"
                  value={updatedCategory.min_stock || ""}
                  onChange={(e) =>
                    setUpdatedCategory({
                      ...updatedCategory,
                      min_stock: e.target.value,
                    })
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
              value={updatedCategory.description || ""}
              onChange={(e) =>
                setUpdatedCategory({
                  ...updatedCategory,
                  description: e.target.value,
                })
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
                  checked={updatedCategory.status === "active" || updatedCategory.status === 1}
                  onChange={(e) =>
                    setUpdatedCategory({ ...updatedCategory, status: e.target.value })
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
                  checked={updatedCategory.status === "inactive" || updatedCategory.status === 2}
                  onChange={(e) =>
                    setUpdatedCategory({ ...updatedCategory, status: e.target.value })
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
              onClick={() => onClose(false)}
              style={cancelBtn}
            >
              Batal
            </button>
            <button type="submit" style={saveBtn}>
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 🎨 Styles sama persis dengan CategoryModal */
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

export default CategoryDetailModal;
