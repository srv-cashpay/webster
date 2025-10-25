import React, { useEffect, useState } from "react";
import {
  fetchMerkData,
  fetchCategoryData,
  createRoleUser,
} from "../../services/roleuser/api";
import { toast } from "react-toastify";

const RoleUserModal = ({ setShowModal, onSuccess }) => {
  const [newRoleUser, setNewRoleUser] = useState({
    barcode: "",
    sku: "",
    roleuser_name: "",
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

  const handleAddRoleUser = async () => {
    if (!newRoleUser.roleuser_name || !newRoleUser.price) {
      toast.warning("Harap isi semua field wajib");
      return;
    }

    try {
      const payload = {
        barcode: newRoleUser.barcode,
        sku: newRoleUser.sku,
        roleuser_name: newRoleUser.roleuser_name,
        price: parseInt(newRoleUser.price) || 0,
        stock: parseInt(newRoleUser.stock) || 0,
        min_stock: parseInt(newRoleUser.min_stock) || 0,
        description: newRoleUser.description,
        status: newRoleUser.status === "active" ? 1 : 2,
        merk_id: newRoleUser.merk_id || null,
        category_id: newRoleUser.category_id || null,

      };

      await createRoleUser(payload);
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
            handleAddRoleUser();
          }}
          style={formGrid}
        >
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>Barcode</label>
            <input
              type="text"
              placeholder="Contoh: 8991234567890"
              value={newRoleUser.barcode}
              onChange={(e) =>
                setNewRoleUser({ ...newRoleUser, barcode: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>SKU / Kode Produk</label>
            <input
              type="text"
              placeholder="SKU12345"
              value={newRoleUser.sku}
              onChange={(e) =>
                setNewRoleUser({ ...newRoleUser, sku: e.target.value })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>Nama Produk</label>
            <input
              type="text"
              placeholder="Contoh: Kaos Polos Premium"
              value={newRoleUser.roleuser_name}
              onChange={(e) =>
                setNewRoleUser({ ...newRoleUser, roleuser_name: e.target.value })
              }
              style={inputStyle}
              required
            />

            {/* Merek & Kategori */}
           <div style={rowGroup}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Merek</label>
                <select
                  value={newRoleUser.merk_id}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, merk_id: e.target.value })
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
                  value={newRoleUser.category_id}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, category_id: e.target.value })
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
                  value={newRoleUser.price}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, price: e.target.value })
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
                  value={newRoleUser.stock}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, stock: e.target.value })
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
                  value={newRoleUser.min_stock}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, min_stock: e.target.value })
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
              value={newRoleUser.description}
              onChange={(e) =>
                setNewRoleUser({ ...newRoleUser, description: e.target.value })
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
                  checked={newRoleUser.status === "active"}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, status: e.target.value })
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
                  checked={newRoleUser.status === "inactive"}
                  onChange={(e) =>
                    setNewRoleUser({ ...newRoleUser, status: e.target.value })
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

export default RoleUserModal;
