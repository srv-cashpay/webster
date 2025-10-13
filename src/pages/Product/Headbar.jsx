import React from "react";

const Headbar = ({
  search,
  setSearch,
  searchCategory,
  setSearchCategory,
  limit,
  setLimit,
  selectedRows,
  setData,
  data,
  setSelectedRows,
  onAddNew,
  isBulkEditMode,
  setIsBulkEditMode,
  handleSaveBulkEdit,
  onBulkDelete, // ✅ Tambahkan ini!
}) => {
  const handleBulkEditClick = () => {
    if (isBulkEditMode) {
      handleSaveBulkEdit();
    } else {
      if (selectedRows.length === 0) {
        alert("Tidak ada data yang dipilih!");
        return;
      }
      setIsBulkEditMode(true);
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
      }}
    >
      {/* 🔹 Kiri: tombol aksi */}
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={onAddNew} style={btnStyle}>
          + New
        </button>

        <button
          onClick={() => {
            if (selectedRows.length === 0) {
              alert("Tidak ada data yang dipilih!");
              return;
            }
            // ✅ Ganti confirm jadi modal
            if (typeof onBulkDelete === "function") onBulkDelete();
          }}
          disabled={selectedRows.length === 0}
          style={{
            ...btnStyle,
            backgroundColor:
              selectedRows.length === 0 ? "#f9f9f9" : "#fff",
            color: selectedRows.length === 0 ? "#aaa" : "#000",
            cursor:
              selectedRows.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          Bulk Delete
        </button>

        <button onClick={handleBulkEditClick} style={btnStyle}>
          {isBulkEditMode ? "Save Changes" : "Bulk Edit"}
        </button>

        <button style={btnStyle} onClick={() => alert("Import Data")}>
          Import
        </button>
        <button style={btnStyle} onClick={() => alert("Export Data")}>
          Export
        </button>
      </div>

      {/* 🔹 Filter Kategori */}
      <select
        value={searchCategory}
        onChange={(e) => setSearchCategory(e.target.value)}
        style={selectStyle}
      >
        <option value="all">Kategori</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="role">Role</option>
      </select>

      {/* 🔹 Search Input */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          borderRadius: "3px",
          border: "1px solid #ccc",
          flex: "1",
          minWidth: "200px",
          outline: "none",
        }}
      />

      {/* 🔹 Limit per halaman */}
      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        style={selectStyle}
      >
        <option value={5}>5 rows</option>
        <option value={10}>10 rows</option>
        <option value={20}>20 rows</option>
      </select>
    </div>
  );
};

const btnStyle = {
  padding: "7px 14px",
  borderRadius: "3px",
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #d1d1d1",
  cursor: "pointer",
  fontSize: "12px",
};

const selectStyle = {
  padding: "7px",
  borderRadius: "3px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "12px",
};

export default Headbar;
