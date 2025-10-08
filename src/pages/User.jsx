import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa"; // ⬅️ Tambahkan import icon

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Admin" },
  { id: 5, name: "Tom Wilson", email: "tom@example.com", role: "User" },
  { id: 6, name: "Sara Lee", email: "sara@example.com", role: "User" },
  { id: 7, name: "Michael Scott", email: "michael@example.com", role: "Admin" },
  { id: 8, name: "Pam Beesly", email: "pam@example.com", role: "User" },
  { id: 9, name: "Jim Halpert", email: "jim@example.com", role: "User" },
  { id: 10, name: "Dwight Schrute", email: "dwight@example.com", role: "Admin" },
];

const DataTablePage = () => {
  const [data, setData] = useState(sampleData);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchCategory, setSearchCategory] = useState("all");

  const filteredData = data.filter((row) => {
    if (search.trim() === "") return true;

    const term = search.toLowerCase();
    if (searchCategory === "name") return row.name.toLowerCase().includes(term);
    if (searchCategory === "email") return row.email.toLowerCase().includes(term);
    if (searchCategory === "role") return row.role.toLowerCase().includes(term);
    return (
      row.name.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term) ||
      row.role.toLowerCase().includes(term)
    );
  });


  const totalPages = Math.ceil(filteredData.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const paginatedData = filteredData.slice(startIndex, startIndex + limit);

  const isAllSelected = paginatedData.every((row) =>
    selectedRows.includes(row.id)
  );

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelected = [
        ...new Set([...selectedRows, ...paginatedData.map((row) => row.id)]),
      ];
      setSelectedRows(newSelected);
    } else {
      const newSelected = selectedRows.filter(
        (id) => !paginatedData.some((row) => row.id === id)
      );
      setSelectedRows(newSelected);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const handleEdit = (row) => alert(`Edit ${row.name}`);
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setData(data.filter((d) => d.id !== row.id));
      setSelectedRows(selectedRows.filter((id) => id !== row.id));
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "13px", // ubah ukuran font
      }}
    >
    {/* Toolbar: Tambah Data + Bulk Delete + Search & Limit */}
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    position: "sticky",
    zIndex: 900,
    gap: "10px",
  }}
>
  {/* Kiri: Button Group */}
  <div style={{ display: "flex", gap: "8px" }}>
    <button
      onClick={() => alert("Tambah Data baru")}
      style={{
        padding: "7px 14px",
        borderRadius: "3px",
        backgroundColor: "#fff",
        color: "#000",
        border: "1px solid #d1d1d1",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
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
        padding: "7px 14px",
        borderRadius: "3px",
        backgroundColor: selectedRows.length === 0 ? "#f9f9f9" : "#fff",
        color: selectedRows.length === 0 ? "#aaa" : "#000",
        border: "1px solid #d1d1d1",
        cursor: selectedRows.length === 0 ? "not-allowed" : "pointer",
        fontSize: "12px",
      }}
    >
      Bulk Delete
    </button>
     <button
      onClick={() => alert("Tambah Data baru")}
      style={{
        padding: "7px 14px",
        borderRadius: "3px",
        backgroundColor: "#fff",
        color: "#000",
        border: "1px solid #d1d1d1",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
      Import
    </button>
     <button
      onClick={() => alert("Tambah Data baru")}
      style={{
        padding: "7px 14px",
        borderRadius: "3px",
        backgroundColor: "#fff",
        color: "#000",
        border: "1px solid #d1d1d1",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
      Export
    </button>
  </div>
  
  <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{
              padding: "7px",
              borderRadius: "3px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "12px",
            }}
          >
            <option value="all">Kategori</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="role">Role</option>
          </select>

  {/* Tengah: Search */}
  <input
    type="text"
    placeholder="Search by name or email"
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      padding: "8px",
      borderRadius: "3px",
      border: "1px solid #ccc",
      flex: "1",
      minWidth: "200px",
      outline: "none",
    }}
  />

  {/* Kanan: Limit */}
  <select
    value={limit}
    onChange={(e) => {
      setLimit(Number(e.target.value));
      setCurrentPage(1);
    }}
    style={{
      padding: "8px",
      borderRadius: "3px",
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "12px",
    }}
  >
    <option value={5}>5 rows</option>
    <option value={10}>10 rows</option>
    <option value={20}>20 rows</option>
  </select>
</div>
      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: "8px",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",         
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",         
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",         
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "left",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",         
                }}
              >
                Role
              </th>
              <th
                style={{
                  padding: "8px",
                  textAlign: "center",
                  borderBottom: "1px solid #ccc",
                  fontSize: "13px",         
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td style={{ padding: "8px" }}>{row.id}</td>
                  <td style={{ padding: "8px" }}>{row.name}</td>
                  <td style={{ padding: "8px" }}>{row.email}</td>
                  <td style={{ padding: "8px" }}>{row.role}</td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    <button
                      onClick={() => handleEdit(row)}
                      style={{
                        padding: "5px 8px",
                        marginRight: "6px",
                        borderRadius: "4px",
                        border: "1px solid #007bff",
                        backgroundColor: "#f8f9fa",
                        cursor: "pointer",
                      }}
                      title="Edit"
                    >
                      <FaPen size={12} color="#007bff" />
                    </button>
                    <button
                      onClick={() => handleDelete(row)}
                      style={{
                        padding: "5px 8px",
                        borderRadius: "4px",
                        border: "1px solid #dc3545",
                        backgroundColor: "#f8f9fa",
                        cursor: "pointer",
                      }}
                      title="Delete"
                    >
                      <FaTrash size={12} color="#dc3545" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  style={{ padding: "8px", textAlign: "center" }}
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "13px",
          gap: "6x",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: "5px 10px",
            borderRadius: "3px",
            border: "1px solid #ccc",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              padding: "6px 10px",
              borderRadius: "3px",
              border: page === currentPage ? "2px solid #000" : "1px solid #ccc",
              backgroundColor: page === currentPage ? "#000" : "white",
              color: page === currentPage ? "white" : "#000",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: "6px 10px",
            borderRadius: "3px",
            border: "1px solid #ccc",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTablePage;
