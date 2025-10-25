import React, { useEffect, useState } from "react";
import { FaSearch, FaSyncAlt, FaEye, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getOrders, updateOrderStatus } from "../../services/orderweb/api";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [confirmAction, setConfirmAction] = useState(null);
  const [viewOrder, setViewOrder] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // 🚀 Ambil data dari API
  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const fetchOrders = async (pageNum = 1) => {
    try {
      const res = await getOrders(pageNum, 10);
      if (res.success && res.data?.rows) {
        const data = res.data.rows.map((o) => ({
          id: o.id,
          customer: o.order_name || "Tanpa Nama",
          date: new Date(o.created_at).toLocaleDateString("id-ID"),
          total: o.product_parsed.reduce((sum, p) => sum + p.price * p.quantity, 0),
          items: o.product_parsed.map((p) => `${p.product_name} x${p.quantity}`),
          status:
            o.status === 0
              ? "Pending"
              : o.status === 1
              ? "Processing"
              : "Completed",
        }));
        setOrders(data);
        setTotalPage(res.data.total_page);
      }
    } catch (err) {
      console.error("❌ Gagal fetch order:", err);
    }
  };

  // 🔄 Dapatkan status berikutnya
  const getNextStatus = (status) => {
    switch (status) {
      case "Pending":
        return "Processing";
      case "Processing":
        return "Completed";
      default:
        return null;
    }
  };

  // ✅ Konfirmasi update status
  const handleConfirm = async () => {
    if (!confirmAction) return;
    const { id, nextStatus } = confirmAction;
    try {
      await updateOrderStatus(id, nextStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: nextStatus } : o))
      );
    } catch (err) {
      console.error("Gagal update status:", err);
    }
    setConfirmAction(null);
  };

  // 🔍 Filter pencarian & status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);
    const matchesStatus =
      filterStatus === "All" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // === Styles ===
  const container = { background: "#fff", minHeight: "100vh", padding: "20px 30px", fontFamily: "'Segoe UI', sans-serif", color: "#333" };
  const header = { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginBottom: "10px" };
  const title = { fontSize: "16px", fontWeight: "600" };
  const filterBar = { display: "flex", gap: "6px", alignItems: "center" };
  const searchBox = { position: "relative" };
  const searchInput = { padding: "4px 6px 4px 24px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "12px", width: "140px" };
  const searchIcon = { position: "absolute", top: "6px", left: "7px", color: "#999", fontSize: "10px" };
  const select = { padding: "4px 8px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "12px" };
  const table = { width: "100%", borderCollapse: "collapse", borderTop: "1px solid #ddd", fontSize: "12px" };
  const th = { textAlign: "left", padding: "6px 8px", borderBottom: "1px solid #ddd", background: "#fafafa", fontWeight: "600" };
  const td = { padding: "6px 8px", borderBottom: "1px solid #eee", fontSize: "12px" };
  const badge = (status) => {
    const base = { padding: "2px 6px", borderRadius: "8px", fontSize: "10px", fontWeight: "600" };
    switch (status) {
      case "Pending": return { ...base, background: "#fff7e6", color: "#a87400" };
      case "Processing": return { ...base, background: "#e6f0ff", color: "#2457d6" };
      case "Completed": return { ...base, background: "#e6f7ed", color: "#0a6331" };
      default: return base;
    }
  };
  const button = (color) => ({
    background: color,
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    padding: "3px 6px",
    cursor: "pointer",
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  });
  const btnGroup = { display: "flex", justifyContent: "center", gap: "4px" };
  const modalOverlay = {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 1000,
  };
  const modalBox = { background: "#fff", padding: "15px", borderRadius: "6px", width: "280px", textAlign: "left", position: "relative" };
  const modalBtn = (bg) => ({
    background: bg, border: "none", color: "#fff", padding: "5px 10px",
    borderRadius: "4px", margin: "4px", cursor: "pointer", fontSize: "12px",
  });
  const closeBtn = {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "transparent",
    border: "none",
    color: "#888",
    cursor: "pointer",
    fontSize: "14px",
  };
  const pagination = { display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "12px" };
  const pageBtn = (active) => ({
    background: active ? "#007bff" : "#f1f1f1",
    color: active ? "#fff" : "#333",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
  });

  return (
    <div style={container}>
      <div style={header}>
        <h2 style={title}>📦 Order List</h2>
        <div style={filterBar}>
          <div style={searchBox}>
            <FaSearch style={searchIcon} />
            <input
              type="text"
              placeholder="Cari..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInput}
            />
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={select}>
            <option value="All">Semua</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Pelanggan</th>
            <th style={th}>Tanggal</th>
            <th style={th}>Total</th>
            <th style={th}>Status</th>
            <th style={{ ...th, textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ ...td, textAlign: "center", color: "#888", padding: "12px" }}>
                Tidak ada data
              </td>
            </tr>
          ) : (
            filteredOrders.map((order) => {
              const nextStatus = getNextStatus(order.status);
              return (
                <tr key={order.id}>
                  <td style={td}>{order.id}</td>
                  <td style={{ ...td, display: "flex", alignItems: "center", gap: "6px" }}>
                    <button
                      style={{
                        background: "#2ecc71",
                        border: "none",
                        borderRadius: "3px",
                        color: "#fff",
                        padding: "3px 6px",
                        cursor: "pointer",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                      onClick={() => setViewOrder(order)}
                    >
                      <FaEye /> Detail
                    </button>
                    <span>{order.customer}</span>
                  </td>
                  <td style={td}>{order.date}</td>
                  <td style={td}>Rp {order.total.toLocaleString()}</td>
                  <td style={td}>
                    <span style={badge(order.status)}>{order.status}</span>
                  </td>
                  <td style={{ ...td, textAlign: "center" }}>
                    <div style={btnGroup}>
                      <button
                        style={button(nextStatus ? "#3498db" : "#ccc")}
                        disabled={!nextStatus}
                        onClick={() => nextStatus && setConfirmAction({ id: order.id, nextStatus })}
                      >
                        <FaSyncAlt />
                        {nextStatus || "Selesai"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div style={pagination}>
        <button
          style={pageBtn(false)}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <FaArrowLeft /> Prev
        </button>
        {[...Array(totalPage)].map((_, i) => (
          <button
            key={i}
            style={pageBtn(page === i + 1)}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          style={pageBtn(false)}
          onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
          disabled={page === totalPage}
        >
          Next <FaArrowRight />
        </button>
      </div>

      {/* Modal Konfirmasi */}
      {confirmAction && (
        <div style={modalOverlay}>
          <div style={{ ...modalBox, textAlign: "center" }}>
            <h4>Konfirmasi</h4>
            <p style={{ fontSize: "12px" }}>
              Ubah status order #{confirmAction.id} ke{" "}
              <strong>{confirmAction.nextStatus}</strong>?
            </p>
            <div>
              <button style={modalBtn("#28a745")} onClick={handleConfirm}>Ya</button>
              <button style={modalBtn("#6c757d")} onClick={() => setConfirmAction(null)}>Batal</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail */}
      {viewOrder && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button style={closeBtn} onClick={() => setViewOrder(null)}>
              <FaTimes />
            </button>

            <h4 style={{ marginBottom: "8px" }}>Detail Pesanan #{viewOrder.id}</h4>
            <p><strong>Pelanggan:</strong> {viewOrder.customer}</p>
            <p><strong>Tanggal:</strong> {viewOrder.date}</p>
            <p><strong>Total:</strong> Rp {viewOrder.total.toLocaleString()}</p>
            <p><strong>Status:</strong> {viewOrder.status}</p>
            <p><strong>Item:</strong></p>
            <ul style={{ fontSize: "12px", marginTop: "4px", marginLeft: "18px" }}>
              {viewOrder.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
