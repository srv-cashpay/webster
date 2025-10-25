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
  setSelectedPermission,
  setShowImageModal,
  onDetail
}) => {
  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    if (searchCategory === "name")
      return row.label.toLowerCase().includes(term);
    if (searchCategory === "id") return row.id.toLowerCase().includes(term);
    return (
      row.label.toLowerCase().includes(term) ||
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
    setSelectedPermission(row);
    setShowDeleteModal(true);
  };

  const handleImageUpload = async (file) => {
    setSelectedPermission(file);
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
            <th style={thStyle}>Role User ID</th>
            <th style={thStyle}>Role User Permission</th>
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
                  <td style={tdCenter}>{row.role_id}</td>
                  
                 <td style={tdCenter}>
                    {isEditable ? (
                      <input
                        type="text"
                        value={editableData[row.id]?.label || row.label}
                        onChange={(e) =>
                          handleBulkEditChange(row.permission_id, "label", e.target.value)
                        }
                        style={inputEdit}
                      />
                    ) : (
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => onDetail(row)}
                      >
                        {row.permission_id}
                      </span>
                    )}
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
