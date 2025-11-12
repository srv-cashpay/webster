import React, { useEffect, useState } from "react";
import {
  fetchRoles,
  updateExistingUserMerchant,
} from "../../services/user_merchant/api";
import { toast } from "react-toastify";

const UserMerchantDetailModal = ({ user_merchant, onClose, onSuccess }) => {
  const [updatedUserMerchant, setUpdatedUserMerchant] = useState({ ...user_merchant });
  const [roleList, setRoleList] = useState([]);

  // 🔹 Ambil data role
  useEffect(() => {
    const loadDropdownData = async () => {
      try {
        const roles = await fetchRoles();
        setRoleList(Array.isArray(roles) ? roles : []);
      } catch (error) {
        console.error("Gagal memuat data role:", error);
        setRoleList([]);
      }
    };
    loadDropdownData();
  }, []);

  // 🔹 Update state ketika modal dibuka ulang
  useEffect(() => {
    setUpdatedUserMerchant({ ...user_merchant });
  }, [user_merchant]);

  // 🔹 Simpan perubahan
  const handleUpdateUserMerchant = async () => {
    if (!updatedUserMerchant.email || !updatedUserMerchant.full_name) {
      toast.warning("Harap isi semua field wajib");
      return;
    }

    try {
      const payload = {
        id: updatedUserMerchant.id,
        full_name: updatedUserMerchant.full_name,
        email: updatedUserMerchant.email,
        whatsapp: updatedUserMerchant.whatsapp,
        password: updatedUserMerchant.password,
        access_role_id: updatedUserMerchant.access_role_id || null,
        status_account:
          updatedUserMerchant.verified?.status_account === true,
        verified:
          updatedUserMerchant.verified?.verified === true,
      };

      await updateExistingUserMerchant(updatedUserMerchant.id, payload);
      toast.success("Data user agent berhasil diperbarui!");
      onClose(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Gagal memperbarui user merchant:", error);
      toast.error("Gagal memperbarui data!");
    }
  };

  // 🔹 Handler toggle boolean
  const handleToggle = (key, value) => {
    setUpdatedUserMerchant((prev) => ({
      ...prev,
      verified: {
        ...prev.verified,
        [key]: value,
      },
    }));
  };

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h2 style={modalTitle}>Detail User Agent</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateUserMerchant();
          }}
          style={formGrid}
        >
          {/* Kolom Kiri */}
          <div style={column}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              value={updatedUserMerchant.full_name || ""}
              onChange={(e) =>
                setUpdatedUserMerchant({
                  ...updatedUserMerchant,
                  full_name: e.target.value,
                })
              }
              style={inputStyle}
            />

            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={updatedUserMerchant.email || ""}
              onChange={(e) =>
                setUpdatedUserMerchant({
                  ...updatedUserMerchant,
                  email: e.target.value,
                })
              }
              style={inputStyle}
              required
            />
            <label style={labelStyle}>Whatsapp</label>
            <input
              type="text"
              value={updatedUserMerchant.whatsapp || ""}
              onChange={(e) =>
                setUpdatedUserMerchant({
                  ...updatedUserMerchant,
                  whatsapp: e.target.value,
                })
              }
              style={inputStyle}
              required
            />
            <label style={labelStyle}>Role</label>
            <select
              value={updatedUserMerchant.access_role_id || ""}
              onChange={(e) =>
                setUpdatedUserMerchant({
                  ...updatedUserMerchant,
                  access_role_id: e.target.value,
                })
              }
              style={inputSmall}
            >
              <option value="">Pilih Role</option>
              {roleList.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.Role}
                </option>
              ))}
            </select>
          </div>

          {/* Kolom Kanan */}
          <div style={column}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={updatedUserMerchant.password || ""}
              onChange={(e) =>
                setUpdatedUserMerchant({
                  ...updatedUserMerchant,
                  password: e.target.value,
                })
              }
              style={inputSmall}
              required
            />

            {/* Status Akun */}
            <label style={labelStyle}>Status Akun</label>
            <div style={optionGroup}>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="status_account"
                  checked={updatedUserMerchant.verified?.status_account === true}
                  onChange={() => handleToggle("status_account", true)}
                  style={radioBtn}
                />
                Active
              </label>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="status_account"
                  checked={updatedUserMerchant.verified?.status_account === false}
                  onChange={() => handleToggle("status_account", false)}
                  style={radioBtn}
                />
                Inactive
              </label>
            </div>

            {/* Verifikasi */}
            <label style={labelStyle}>Verifikasi</label>
            <div style={optionGroup}>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="verified"
                  checked={updatedUserMerchant.verified?.verified === true}
                  onChange={() => handleToggle("verified", true)}
                  style={radioBtn}
                />
                Verified
              </label>
              <label style={optionLabel}>
                <input
                  type="radio"
                  name="verified"
                  checked={updatedUserMerchant.verified?.verified === false}
                  onChange={() => handleToggle("verified", false)}
                  style={radioBtn}
                />
                Not Verified
              </label>
            </div>

            {/* Info Created At */}
            <div style={rowGroup3}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Dibuat Pada</label>
                <input
                  type="text"
                  value={
                    updatedUserMerchant.created_at
                      ? new Date(updatedUserMerchant.created_at).toLocaleString("id-ID")
                      : "-"
                  }
                  readOnly
                  style={{
                    ...inputSmall,
                    backgroundColor: "#f9f9f9",
                    color: "#555",
                    cursor: "not-allowed",
                    maxWidth: "200px",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Dibuat Oleh</label>
                <input
                  type="text"
                  value={updatedUserMerchant.created_by || "-"}
                  readOnly
                  style={{
                    ...inputSmall,
                    backgroundColor: "#f9f9f9",
                    color: "#555",
                    cursor: "not-allowed",
                    maxWidth: "200px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tombol */}
          <div style={buttonGroup}>
            <button type="button" onClick={() => onClose(false)} style={cancelBtn}>
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
  textAlign: "left",
  marginBottom: "10px",
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
};

const inputSmall = {
  ...inputStyle,
  padding: "8px",
  fontSize: "13px",
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

const rowGroup3 = {
  display: "flex",
  gap: "20px",
  marginTop: "10px",
  flexWrap: "wrap",
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

export default UserMerchantDetailModal;
