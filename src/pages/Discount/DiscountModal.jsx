import React, { useEffect, useState } from "react";
import {
  createDiscount,
} from "../../services/discount/api";
import { toast } from "react-toastify";

const DiscountModal = ({ setShowModal, onSuccess }) => {
  const [newDiscount, setNewDiscount] = useState({
    discount_name: "",
    status: "active",
  });


const handleAddDiscount = async () => {
  if (!newDiscount.discount_name) {
    toast.warning("Harap isi semua field wajib");
    return;
  }

  try {
    const payload = {
      discount_name: newDiscount.discount_name,
      description: newDiscount.description,
      status: newDiscount.status === "active" ? 1 : 2,
    };

    const res = await createDiscount(payload);

    // ❗ response backend
    if (res?.status === false) {
      toast.error(
        res?.message || res?.meta?.message );
      return;
    }

    toast.success(res?.message );
    setShowModal(false);
    onSuccess?.();

  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.meta?.message ||
      error?.message ||
      "Terjadi kesalahan";

    toast.error(msg);
  }
};


  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h2 style={modalTitle}>🛍️ Tambah Discount</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddDiscount();
          }}
          style={formGrid}
        >
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>Nama Discount</label>
            <input
              type="text"
              placeholder="Contoh: Kaos Polos Premium"
              value={newDiscount.discount_name}
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, discount_name: e.target.value })
              }
              style={inputStyle}
              required
            />         
            <label style={labelStyle}>Status</label>
            <div style={optionGroup}>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={newDiscount.status === "active"}
                  onChange={(e) =>
                    setNewDiscount({ ...newDiscount, status: e.target.value })
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
                  checked={newDiscount.status === "inactive"}
                  onChange={(e) =>
                    setNewDiscount({ ...newDiscount, status: e.target.value })
                  }
                  style={radioBtn}
                />
                Inactive
              </label>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div style={column}>
            <label style={labelStyle}>Deskripsi</label>
            <textarea
              placeholder="Tuliskan deskripsi kategori..."
              value={newDiscount.description}
              onChange={(e) =>
                setNewDiscount({ ...newDiscount, description: e.target.value })
              }
              style={textareaStyle}
            />
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

export default DiscountModal;
