import React from "react";
import { FaTrash } from "react-icons/fa";
import { thStyle, tdText, tdCenter, inputEdit, btnDelete, btnUpload } from "./styles";

const DataTable = ({
  data,
  setData,
  search,
  searchTax,
  limit,
  currentPage,
  selectedRows,
  setSelectedRows,
  isBulkEditMode,
  editableData,
  setEditableData,
  setShowDeleteModal,
  setSelectedTax,
  onDetail
}) => {
  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    if (searchTax === "name")
      return row.tax.toLowerCase().includes(term);
    if (searchTax === "id") return row.id.toLowerCase().includes(term);
    return (
      row.tax.toLowerCase().includes(term) ||
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
    setSelectedTax(row);
    setShowDeleteModal(true);
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
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Percent</th>
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
                 <td style={tdText}>
                    {isEditable ? (
                      <input
                        type="text"
                        value={editableData[row.id]?.tax || row.tax}
                        onChange={(e) =>
                          handleBulkEditChange(row.id, "tax", e.target.value)
                        }
                        style={inputEdit}
                      />
                    ) : (
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => onDetail(row)}
                      >
                        {row.tax}
                      </span>
                    )}
                  </td>
                  <td style={tdCenter}>{row.tax_percentage}</td>
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
