import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import Headbar from "./Headbar";
import { fetchProducts } from '../../services/product/api';

const List = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchCategory, setSearchCategory] = useState("all");
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const paginationData = { page: currentPage, limit, search };
        const response = await fetchProducts(paginationData);

        if (response && response.rows) {
          setData(response.rows);
          setTotalRows(response.total_rows || 0);
        } else {
          setData([]);
          setTotalRows(0);
        }
      } catch (error) {
        console.error("Gagal mengambil data produk:", error);
        setData([]);
        setTotalRows(0);
      }
    };

    loadProducts();
  }, [currentPage, limit, search]);

  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    if (searchCategory === "name") return row.product_name.toLowerCase().includes(term);
    if (searchCategory === "id") return row.id.toLowerCase().includes(term);
    return row.product_name.toLowerCase().includes(term) || row.id.toLowerCase().includes(term);
  });

  const totalPages = Math.ceil(totalRows / limit);
  const isAllSelected = filteredData.every((row) => selectedRows.includes(row.id));

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows([...new Set([...selectedRows, ...filteredData.map(r => r.id)])]);
    } else {
      setSelectedRows(selectedRows.filter(id => !filteredData.some(r => r.id === id)));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) setSelectedRows(selectedRows.filter(r => r !== id));
    else setSelectedRows([...selectedRows, id]);
  };

  const handleEdit = (row) => alert(`Edit data ${row.product_name}`);
  const handleDelete = (row) => {
    if (window.confirm(`Hapus data ${row.product_name}?`)) {
      setData(data.filter(d => d.id !== row.id));
      setSelectedRows(selectedRows.filter(id => id !== row.id));
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "13px" }}>
      <div style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <Headbar
          search={search}
          setSearch={setSearch}
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          limit={limit}
          setLimit={setLimit}
          selectedRows={selectedRows}
          data={data}
          setData={setData}
          setSelectedRows={setSelectedRows}
        />
      </div>

      <div style={{ overflow: "auto", maxHeight: "80vh" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>
                <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
              </th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>No</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Image</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>ID</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Name</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Date</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Stock</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Price</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Status</th>
              <th style={{ ...thStyle, position: "sticky", top: 0, zIndex: 5 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <tr key={row.id}>
                  <td style={tdCenter}>
                    <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                  </td>
                  <td style={tdCenter}>{(currentPage - 1) * limit + index + 1}</td>
                  <td style={tdCenter}>
                    <img src={row.image?.file_path ? `https://cashpay.my.id:2358/${row.image.file_path}` : "https://via.placeholder.com/40"} 
                      alt={row.product_name} style={{ width: "40px", height: "40px", borderRadius: "4px" }} />
                  </td>
                  <td style={tdText}>{row.id}</td>
                  <td style={tdText}>{row.product_name}</td>
                  <td style={tdCenter}>{row.created_at}</td>
                  <td style={tdCenter}>{row.stock}</td>
                  <td style={tdCenter}>Rp {parseInt(row.price).toLocaleString("id-ID")}</td>
                  <td style={tdCenter}>
                    <span style={{
                      backgroundColor: row.status === 1 ? "#d4edda" : "#f8d7da",
                      color: row.status === 1 ? "#155724" : "#721c24",
                      padding: "3px 8px",
                      borderRadius: "10px",
                      fontSize: "12px"
                    }}>
                      {row.status === 1 ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td style={tdCenter}>
                    <button onClick={() => handleEdit(row)} style={btnEdit}><FaPen size={12} color="#007bff" /></button>
                    <button onClick={() => handleDelete(row)} style={btnDelete}><FaTrash size={12} color="#dc3545" /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} style={{ textAlign: "center", padding: "10px" }}>No data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "13px", gap: "6px", flexWrap: "wrap" }}>
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} style={pageBtn}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button key={page} onClick={() => setCurrentPage(page)}
            style={{
              ...pageBtn,
              backgroundColor: page === currentPage ? "#000" : "#fff",
              color: page === currentPage ? "#fff" : "#000",
              border: page === currentPage ? "2px solid #000" : "1px solid #ccc"
            }}>{page}</button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} style={pageBtn}>Next</button>
      </div>
    </div>
  );
};

/* Styles */
const thStyle = { padding: "8px", textAlign: "center", borderBottom: "1px solid #ccc", fontWeight: "bold", fontSize: "13px", backgroundColor: "#f9f9f9" };
const tdText = { padding: "8px", textAlign: "left" };
const tdCenter = { padding: "8px", textAlign: "center" };
const btnEdit = { padding: "5px 8px", marginRight: "6px", borderRadius: "4px", border: "1px solid #007bff", backgroundColor: "#f8f9fa", cursor: "pointer" };
const btnDelete = { padding: "5px 8px", borderRadius: "4px", border: "1px solid #dc3545", backgroundColor: "#f8f9fa", cursor: "pointer" };
const pageBtn = { padding: "6px 10px", borderRadius: "3px", border: "1px solid #ccc", cursor: "pointer" };

export default List;
