import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../../services/product/api";

const ProductViewModal = ({ show, onClose, onSelect }) => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show) loadProducts();
  }, [show]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchProducts({ page: 1, limit: 100, sort: "created_at desc" });

      if (Array.isArray(data)) setProducts(data);
      else if (Array.isArray(data?.rows)) setProducts(data.rows);
      else if (Array.isArray(data?.data?.rows)) setProducts(data.data.rows);
      else setProducts([]);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Gagal memuat data produk.");
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  const filteredProducts = Array.isArray(products)
    ? products.filter((p) =>
        p.product_name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>📦 Daftar Barang</h2>
          <button onClick={onClose} style={btnClose}>
            ✕
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Cari produk berdasarkan nama atau barcode..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        {/* Table */}
        <div style={tableContainer}>
          {loading ? (
            <p style={loadingText}>⏳ Memuat data...</p>
          ) : error ? (
            <p style={errorText}>{error}</p>
          ) : filteredProducts.length === 0 ? (
            <p style={emptyText}>😕 Tidak ada produk ditemukan</p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Produk</th>
                  <th>Barcode</th>
                  <th>Harga</th>
                  <th>Stok</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, index) => (
                  <tr key={p.id}>
                    <td>{index + 1}</td>
                    <td style={{ textAlign: "left" }}>{p.product_name}</td>
                    <td>{p.barcode || "-"}</td>
                    <td>Rp {Number(p.price || 0).toLocaleString()}</td>
                    <td>{p.stock}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: p.status === 1 ? "#d4edda" : "#f8d7da",
                          color: p.status === 1 ? "#155724" : "#721c24",
                          padding: "2px 6px",
                          borderRadius: "10px",
                          fontSize: "11px",
                        }}
                      >
                        {p.status === 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      {p.status === 1 ? (
                        <button onClick={() => onSelect(p)} style={btnSelect}>
                          Pilih
                        </button>
                      ) : (
                        <span style={{ color: "#bbb", fontSize: "12px" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

/* ====================== STYLE ======================= */
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

const modalStyle = {
  background: "#fff",
  padding: "18px",
  borderRadius: "10px",
  width: "90%",
  maxWidth: "950px",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
  fontFamily: "Segoe UI, sans-serif",
  fontSize: "13px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
  borderBottom: "1px solid #eee",
  paddingBottom: "8px",
};

const titleStyle = {
  fontSize: "17px",
  fontWeight: 600,
  color: "#333",
  margin: 0,
};

const btnClose = {
  background: "transparent",
  border: "none",
  fontSize: "20px",
  cursor: "pointer",
  color: "#777",
  transition: "0.2s",
};

const searchInput = {
  marginBottom: "10px",
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "13px",
  width: "100%",
  boxSizing: "border-box",
};

const tableContainer = {
  flex: 1,
  overflowY: "auto",
  borderRadius: "6px",
  border: "1px solid #ddd",
  background: "#fff",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
  fontSize: "13px",
};

const btnSelect = {
  background: "#0d9488",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  padding: "4px 8px",
  cursor: "pointer",
  fontSize: "12px",
};

/* Table detail */
tableStyle.thead = {
  background: "#f5f5f5",
};

const loadingText = { textAlign: "center", padding: "20px", color: "#666" };
const errorText = { textAlign: "center", color: "red", padding: "20px" };
const emptyText = { textAlign: "center", color: "#777", padding: "20px" };

/* Tambahkan efek zebra dan hover */
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.innerHTML = `
    table th {
      background-color: #f5f5f5;
      padding: 8px;
      border-bottom: 1px solid #ddd;
      font-weight: 600;
    }
    table td {
      padding: 6px 8px;
      border-bottom: 1px solid #eee;
      vertical-align: middle;
    }
    table tbody tr:nth-child(even) {
      background-color: #fafafa;
    }
    table tbody tr:hover {
      background-color: #e9f5f3;
    }
  `;
  document.head.appendChild(style);
});

export default ProductViewModal;
