import React from "react";
import { FaTrash, FaImage } from "react-icons/fa";
import { thStyle, tdText, tdCenter, inputEdit, btnDelete, btnUpload } from "./styles";

const DataTable = ({
  data,
  setData,
  search,
  searchCategory,
  limit,
  currentPage,
  selectedRows,
  setSelectedRows,
  isBulkEditMode,
  editableData,
  setEditableData,
  setShowDeleteModal,
  setSelectedCategory,
  setShowImageModal,
  onDetail
}) => {
  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    if (searchCategory === "name")
      return row.category_name.toLowerCase().includes(term);
    if (searchCategory === "id") return row.id.toLowerCase().includes(term);
    return (
      row.category_name.toLowerCase().includes(term) ||
      row.id.toLowerCase().includes(term)
    );
  });

  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedRows([...new Set([...selectedRows, ...filteredData.map((r) => r.id)])]);
    else
      setSelectedRows(selectedRows.filter((id) => !filteredData.some((r) => r.id === id)));
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id))
      setSelectedRows(selectedRows.filter((r) => r !== id));
    else setSelectedRows([...selectedRows, id]);
  };

  const handleBulkEditChange = (id, field, value) => {
    setEditableData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleDeleteClick = (row) => {
    setSelectedCategory(row);
    setShowDeleteModal(true);
  };

  const handleImageUpload = async (file) => {
    setSelectedCategory(file);
    setShowImageModal(true);
  };

  const isAllSelected = filteredData.every((row) => selectedRows.includes(row.id));

  return (
    <div style={{ overflow: "auto", maxHeight: "80vh" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>
              <input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} />
            </th>
            <th style={thStyle}>No</th>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => {
              const isEditable = isBulkEditMode && selectedRows.includes(row.id);
              return (
                <tr key={row.id}>
                  <td style={tdCenter}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td style={tdCenter}>{(currentPage - 1) * limit + index + 1}</td>
                  <td style={tdCenter}>
                    <img
                      src={
                        row.image?.file_path
                          ? `https://cashpay.my.id:2388/api/merchant/${row.image.file_path}`
                          : "https://via.placeholder.com/40"
                      }
                      alt={row.category_name}
                      style={{ width: "40px", height: "40px", borderRadius: "4px" }}
                    />
                  </td>
                  <td style={tdText}>{row.id}</td>
                 <td style={tdText}>
                    {isEditable ? (
                      <input
                        type="text"
                        value={editableData[row.id]?.category_name || row.category_name}
                        onChange={(e) =>
                          handleBulkEditChange(row.id, "category_name", e.target.value)
                        }
                        style={inputEdit}
                      />
                    ) : (
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => onDetail(row)}
                      >
                        {row.category_name}
                      </span>
                    )}
                  </td>
                  <td style={tdCenter}>{row.created_at}</td>
                  <td style={tdCenter}>
                    {isEditable ? (
                      <input
                        type="number"
                        value={editableData[row.id]?.stock ?? row.stock}
                        onChange={(e) =>
                          handleBulkEditChange(row.id, "stock", e.target.value)
                        }
                        style={inputEdit}
                      />
                    ) : (
                      row.stock
                    )}
                  </td>
                  <td style={tdCenter}>
                    {isEditable ? (
                      <input
                        type="number"
                        value={editableData[row.id]?.price ?? row.price}
                        onChange={(e) =>
                          handleBulkEditChange(row.id, "price", e.target.value)
                        }
                        style={inputEdit}
                      />
                    ) : (
                      `Rp ${parseInt(row.price).toLocaleString("id-ID")}`
                    )}
                  </td>
                  <td style={tdCenter}>
                    <span
                      style={{
                        backgroundColor: row.status === 1 ? "#d4edda" : "#f8d7da",
                        color: row.status === 1 ? "#155724" : "#721c24",
                        padding: "3px 8px",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                    >
                      {row.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={tdCenter}>
                    {!isBulkEditMode && (
                      <>
                        <button
                          onClick={() => handleImageUpload(row)}
                          style={btnUpload}
                        >
                          <FaImage size={12} color="#000" />
                        </button>

                        <button
                          onClick={() => handleDeleteClick(row)}
                          style={btnDelete}
                        >
                          <FaTrash size={12} color="#dc3545" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} style={{ textAlign: "center", padding: "10px" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
