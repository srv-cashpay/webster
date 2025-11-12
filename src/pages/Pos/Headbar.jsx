import React, { useState, useEffect } from "react";
import { FaThLarge, FaList, FaExpand, FaCompress, FaCog } from "react-icons/fa";

const Headbar = ({
  search,
  setSearch,
  barcode,
  setBarcode,
  searchCategory,
  setSearchCategory,
  limit,
  setLimit,
  onAddNew,
  onAddMember,
  onViewProducts,
  viewMode,
  setViewMode,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  // 🔹 Ubah kategori / mode tampilan
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSearchCategory(value);
    if (value === "grid" || value === "list") setViewMode(value);
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

      {/* 🔹 Dropdown kategori + mode */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <select value={searchCategory} onChange={handleCategoryChange} style={selectStyle}>
          <option value="all">Kategori</option>
          <option value="grid">🟦 Grid View</option>
          <option value="list">📋 List View</option>
        </select>
      </div>

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
