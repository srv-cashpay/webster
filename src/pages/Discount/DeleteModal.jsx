// src/components/discount/DeleteModal.jsx
import React, { useState } from "react";
import { deleteDiscount } from "../../services/discount/api";
import { toast } from "react-toastify";

const DeleteModal = ({ show, discount, onCancel, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  if (!show) return null;

  const handleDelete = async () => {
    if (!discount?.id) return;
    setLoading(true);
    try {
      await deleteDiscount(discount.id);
      toast.success(`Produk "${discount.discount_name}" berhasil dihapus`);
      onDeleted && onDeleted(); // callback refresh list
    } catch (error) {
      toast.error("Gagal menghapus produk");
      console.error("Delete error:", error);
    } finally {
      setLoading(false);
    }
  };

  const modalOverlay = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const deleteModalContent = {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  };

  const cancelBtn = {
    backgroundColor: "#ccc",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const deleteBtn = {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={modalOverlay}>
      <div style={deleteModalContent}>
        <h3 style={{ marginTop: 0 }}>Konfirmasi Hapus</h3>
        <p>
          Apakah Anda yakin ingin menghapus produk{" "}
          <strong>{discount?.discount_name}</strong>?
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button style={cancelBtn} onClick={onCancel} disabled={loading}>
            Batal
          </button>
          <button style={deleteBtn} onClick={handleDelete} disabled={loading}>
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
