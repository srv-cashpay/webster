import React, { useState, useEffect } from "react";
import { FaThLarge, FaList, FaExpand, FaCompress } from "react-icons/fa";

const Headbar = ({search, setSearch, barcode, setBarcode, searchCategory, setSearchCategory, limit, setLimit,
  selectedRows, setData, data, setSelectedRows, onAddNew, viewMode, setViewMode }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 🔹 Deteksi perubahan fullscreen (ESC, klik luar, dll)
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
        <button onClick={onAddNew} style={btnStyle}>
          + New
        </button>

        <button
          onClick={() => {
            if (selectedRows.length === 0) {
              alert("Tidak ada data yang dipilih!");
              return;
            }
            if (window.confirm(`Delete ${selectedRows.length} selected data?`)) {
              setData(data.filter((d) => !selectedRows.includes(d.id)));
              setSelectedRows([]);
            }
          }}
          disabled={selectedRows.length === 0}
          style={{
            ...btnStyle,
            backgroundColor: selectedRows.length === 0 ? "#f9f9f9" : "#fff",
            color: selectedRows.length === 0 ? "#aaa" : "#000",
            cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Bulk Delete
        </button>

        <button style={btnStyle} onClick={() => alert("Import Data")}>
          Import
        </button>
        <button style={btnStyle} onClick={() => alert("Export Data")}>
          Export
        </button>
      </div>

      {/* 🔹 Dropdown kategori + mode */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <select value={searchCategory} onChange={handleCategoryChange} style={selectStyle}>
          <option value="all">Kategori</option>
          <option value="grid">🟦 Grid View</option>
          <option value="list">📋 List View</option>
        </select>

        {/* 🔹 Toggle View Mode */}
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          style={btnStyle}
        >
          {viewMode === "grid" ? <FaList /> : <FaThLarge />}
        </button>
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
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
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
