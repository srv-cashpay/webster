import React, { useState, useEffect } from "react";
import { FaThLarge, FaList, FaExpand, FaCompress, FaCog } from "react-icons/fa";

const Headbar = ({
  search,
  setSearch,
  barcode,
  setBarcode,
  limit,
  setLimit,
  onAddNew,
  onAddMember,
  onViewProducts,
  viewMode,
  setViewMode,
  categories = [],
  activeCategory,
  setActiveCategory,
}) => {

  const [isFullScreen, setIsFullScreen] = useState(false);
const categoryBtn = {
  padding: "6px 14px",
  borderRadius: "20px",
  border: "1px solid #d1d5db",
  fontSize: "12px",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

  // 🔹 Deteksi perubahan fullscreen
  useEffect(() => {
    const handleChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  // 🔹 Toggle fullscreen
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 15px",
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 900,
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      {/* 🔹 Tombol kiri */}
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* 🔧 Ganti + New dengan ikon gear */}
        <button onClick={onAddNew} style={btnStyle}>
          <FaCog />
        </button>

        {/* ✅ Tombol Tambah Member */}
        <button
          onClick={onAddMember}
          style={{ ...btnStyle, backgroundColor: "#4CAF50", color: "#fff" }}
        >
          + Member
        </button>

        {/* ✅ Tombol Lihat Barang */}
        <button
          onClick={onViewProducts || (() => alert("warehouse"))}
          style={{ ...btnStyle, backgroundColor: "#2196F3", color: "#fff" }}
        >
          warehouse
        </button>
      </div>

      {/* 🔽 DROPDOWN KATEGORI */}
      <select
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
        style={selectStyle}
      >
        <option value="all">Semua Kategori</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.category_name}>
            {cat.category_name}
          </option>
        ))}
      </select>

      {/* 🔹 Search utama + barcode + limit + fullscreen */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ccc",
            flex: 1,
            minWidth: "200px",
            outline: "none",
          }}
        />

        <input
          type="text"
          placeholder="Scan / Input Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "3px",
            border: "1px solid #ccc",
            width: "180px",
            outline: "none",
          }}
        />

        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={selectStyle}
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={20}>20 rows</option>
        </select>

        {/* 🔹 Toggle View Mode */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          style={btnStyle}
        >
          {viewMode === "grid" ? <FaList /> : <FaThLarge />}
        </button>

        {/* 🔹 Tombol Fullscreen */}
        <button onClick={toggleFullScreen} style={btnStyle}>
          {isFullScreen ? <FaCompress /> : <FaExpand />}
        </button>
      </div>
    </div>
  );
};

// 🔹 Gaya tombol standar
const btnStyle = {
  padding: "7px 14px",
  borderRadius: "3px",
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #d1d1d1",
  cursor: "pointer",
  fontSize: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5px",
};

// 🔹 Gaya select standar
const selectStyle = {
  padding: "7px",
  borderRadius: "3px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "12px",
};

export default Headbar;
