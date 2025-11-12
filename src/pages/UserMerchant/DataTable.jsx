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
  setSelectedUserMerchant,
  setShowImageModal,
  onDetail
}) => {
  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    if (searchCategory === "name")
      return row.user_merchant_name.toLowerCase().includes(term);
    if (searchCategory === "id") return row.id.toLowerCase().includes(term);
    return (
      row.user_merchant_name.toLowerCase().includes(term) ||
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
    setSelectedUserMerchant(row);
    setShowDeleteModal(true);
  };

  const handleImageUpload = async (file) => {
    setSelectedUserMerchant(file);
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
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Whatsapp</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Account</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

       <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((row, index) => (
      <tr key={row.id}>
        <td style={tdCenter}>
          <input
            type="checkbox"
            checked={selectedRows.includes(row.id)}
            onChange={() => handleSelectRow(row.id)}
          />
        </td>
        <td style={tdCenter}>{(currentPage - 1) * limit + index + 1}</td>
        <td style={tdText}>{row.full_name}</td>
        <td style={tdText}>{row.role_name}</td>
        <td style={tdText}>{row.email}</td>
        <td style={tdText}>{row.whatsapp}</td>
        <td style={tdText}>{row.verified.verified}</td>
        <td style={tdText}>{row.verified.status_account}</td>
        <td style={tdCenter}>
          <button onClick={() => onDetail(row)} style={btnUpload}>
            Detail
          </button>
          <button onClick={() => handleDeleteClick(row)} style={btnDelete}>
            <FaTrash size={12} color="#dc3545" />
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={7} style={{ textAlign: "center", padding: "10px" }}>
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
