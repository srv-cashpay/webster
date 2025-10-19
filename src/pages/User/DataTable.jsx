import React, { useState } from "react";
import { FaTrash, FaImage, FaChevronDown, FaChevronRight } from "react-icons/fa";
import {
  thStyle,
  tdText,
  tdCenter,
  inputEdit,
  btnDelete,
  btnUpload,
} from "./styles";

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
  setSelectedUser,
  setShowImageModal,
  onDetail,
}) => {
  const [expandedRows, setExpandedRows] = useState([]); // ✅ Track expanded rows

  // 🔍 Filter data by search
  const filteredData = data.filter((row) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    if (searchCategory === "name")
      return row.full_name?.toLowerCase().includes(term);
    if (searchCategory === "id") return row.id?.toLowerCase().includes(term);
    return (
      row.full_name?.toLowerCase().includes(term) ||
      row.id?.toLowerCase().includes(term)
    );
  });

  // ✅ Select all handler
  const handleSelectAll = (e) => {
    if (e.target.checked)
      setSelectedRows([
        ...new Set([...selectedRows, ...filteredData.map((r) => r.id)]),
      ]);
    else
      setSelectedRows(
        selectedRows.filter((id) => !filteredData.some((r) => r.id === id))
      );
  };

  // ✅ Select single row
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id))
      setSelectedRows(selectedRows.filter((r) => r !== id));
    else setSelectedRows([...selectedRows, id]);
  };

  // ✅ Expand / Collapse toggle
  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // ✅ Handle inline edit
  const handleBulkEditChange = (id, field, value) => {
    setEditableData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // ✅ Delete & Upload
  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setShowDeleteModal(true);
  };

  const handleImageUpload = async (file) => {
    setSelectedUser(file);
    setShowImageModal(true);
  };

  const isAllSelected = filteredData.every((row) =>
    selectedRows.includes(row.id)
  );

  return (
    <div style={{ overflow: "auto", maxHeight: "80vh" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th style={thStyle}>No</th>
            <th style={thStyle}></th>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Whatsapp</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => {
              const isEditable =
                isBulkEditMode && selectedRows.includes(row.id);
              const isExpanded = expandedRows.includes(row.id);

              return (
                <React.Fragment key={row.id}>
                  {/* 🔹 Main row */}
                  <tr>
                    <td style={tdCenter}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </td>

                    <td style={tdCenter}>
                      {(currentPage - 1) * limit + index + 1}
                    </td>

                    {/* 🔽 Expand button */}
                    <td
                      style={{ ...tdCenter, cursor: "pointer" }}
                      onClick={() => toggleExpand(row.id)}
                    >
                      {isExpanded ? (
                        <FaChevronDown size={12} />
                      ) : (
                        <FaChevronRight size={12} />
                      )}
                    </td>

                    <td style={tdText}>{row.id}</td>

                    <td style={tdText}>
                      {isEditable ? (
                        <input
                          type="text"
                          value={
                            editableData[row.id]?.full_name || row.full_name
                          }
                          onChange={(e) =>
                            handleBulkEditChange(
                              row.id,
                              "full_name",
                              e.target.value
                            )
                          }
                          style={inputEdit}
                        />
                      ) : (
                        <span
                          style={{ color: "blue", cursor: "pointer" }}
                          onClick={() => onDetail(row)}
                        >
                          {row.full_name}
                        </span>
                      )}
                    </td>

                    <td style={tdCenter}>{row.whatsapp || "-"}</td>
                    <td style={tdCenter}>{row.email || "-"}</td>

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

                  {/* 🔻 Expandable detail */}
                  {isExpanded && (
                    <tr style={{ backgroundColor: "#f9f9f9" }}>
                      <td colSpan={8} style={{ padding: "10px 20px" }}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "1rem",
                            fontSize: "13px",
                            color: "#333",
                          }}
                        >
                          {/* Verified Info */}
                          <div>
                            <div
                              style={{ fontWeight: "bold", marginBottom: 4 }}
                            >
                              Verification
                            </div>
                            <div>ID: {row.verified?.id || "-"}</div>
                            <div>OTP: {row.verified?.otp || "-"}</div>
                            <div>
                              Verified:{" "}
                              {row.verified?.verified ? "Yes" : "No"}
                            </div>
                            <div>
                              Expired:{" "}
                              {row.verified?.expired_at
                                ? new Date(
                                    row.verified.expired_at
                                  ).toLocaleString()
                                : "-"}
                            </div>
                          </div>

                          {/* Merchant Info */}
                          <div>
                            <div
                              style={{ fontWeight: "bold", marginBottom: 4 }}
                            >
                              Merchant Info
                            </div>
                            <div>ID: {row.merchant?.merchant_id || "-"}</div>
                            <div>
                              Name: {row.merchant?.merchant_name || "-"}
                            </div>
                            <div>City: {row.merchant?.city || "-"}</div>
                            <div>Address: {row.merchant?.address || "-"}</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
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
