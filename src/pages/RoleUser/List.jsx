import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"; // ✅ ambil param dari URL

// 🔹 Components
import Headbar from "./Headbar";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import RoleUserModal from "./RoleUserModal";
import DeleteModal from "./DeleteModal";
import BulkDeleteModal from "./BulkDeleteModal";
import ImageUploadModal from "./ImageUploadModal";
import RoleUserDetailModal from "./RoleUserDetailModal";

// 🔹 API services
import {
  fetchRoleUsers,
  createRoleUser,
  bulkDeleteRoleUsers,
  fetchRoleUserById,
} from "../../services/roleuser/api";

const List = () => {
  // 🟢 Ambil parameter bahasa dari URL (misal: /id/dashboard atau /en/dashboard)
  const { lang } = useParams();
  const currentLang = lang || "id";

  // 🧠 State management
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchCategory, setSearchCategory] = useState("all");
  const [totalRows, setTotalRows] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedRoleUser, setSelectedRoleUser] = useState(null);
  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [newRoleUser, setNewRoleUser] = useState({
    product_name: "",
    price: "",
    stock: "",
  });

  // 🧭 Load data produk
  const loadRoleUsers = useCallback(async () => {
    try {
      const paginationData = { page: currentPage, limit, search };
      const response = await fetchRoleUsers(paginationData);
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
  }, [currentPage, limit, search]);

  useEffect(() => {
    loadRoleUsers();
  }, [loadRoleUsers]);

  // ➕ Tambah produk baru
  const handleAddRoleUser = () => {
    if (!newRoleUser.product_name || !newRoleUser.price) {
      alert(currentLang === "id" ? "Harap isi semua field" : "Please fill in all fields");
      return;
    }

    const newItem = {
      id: "P" + (data.length + 1),
      product_name: newRoleUser.product_name,
      price: parseInt(newRoleUser.price),
      stock: newRoleUser.stock || 0,
      created_at: new Date().toISOString().split("T")[0],
      status: 1,
      image: null,
    };

    setData([newItem, ...data]);
    setNewRoleUser({ product_name: "", price: "", stock: "" });
    setShowModal(false);
  };

  // 🗑️ Hapus banyak produk sekaligus
  const confirmBulkDelete = async () => {
    try {
      if (selectedRows.length === 0) return;
      await bulkDeleteRoleUsers(selectedRows);
      await loadRoleUsers();
      setSelectedRows([]);
      setShowBulkDeleteModal(false);
    } catch (error) {
      console.error("Bulk delete gagal:", error);
      alert(currentLang === "id" ? "Gagal menghapus data!" : "Failed to delete data!");
    }
  };

  // 🔍 Lihat detail produk
  const handleShowDetail = async (row) => {
    try {
      const product = await fetchRoleUserById(row.id);
      if (product) {
        setSelectedRoleUser(product);
        setShowDetailModal(true);
      } else {
        alert(currentLang === "id" ? "Gagal mengambil detail produk!" : "Failed to fetch product details!");
      }
    } catch (error) {
      console.error(error);
      alert(currentLang === "id" ? "Terjadi kesalahan saat mengambil data produk." : "An error occurred while fetching product data.");
    }
  };

  const totalPages = Math.ceil(totalRows / limit);

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: "13px",
      }}
    >
      {/* 🔝 Header */}
      <div style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
        <Headbar
          lang={currentLang}
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
          onAddNew={() => setShowModal(true)}
          isBulkEditMode={isBulkEditMode}
          setIsBulkEditMode={setIsBulkEditMode}
          handleSaveBulkEdit={() => {
            const updatedData = data.map((row) =>
              editableData[row.id] ? { ...row, ...editableData[row.id] } : row
            );
            setData(updatedData);
            setEditableData({});
            setIsBulkEditMode(false);
          }}
          onBulkDelete={() => setShowBulkDeleteModal(true)}
        />
      </div>

      {/* 📋 Tabel Produk */}
      <DataTable
        lang={currentLang}
        data={data}
        setData={setData}
        search={search}
        searchCategory={searchCategory}
        limit={limit}
        currentPage={currentPage}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isBulkEditMode={isBulkEditMode}
        editableData={editableData}
        setEditableData={setEditableData}
        setShowDeleteModal={setShowDeleteModal}
        setShowImageModal={setShowImageModal}
        setSelectedRoleUser={setSelectedRoleUser}
        onDetail={handleShowDetail}
      />

      {/* 📄 Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      {/* 💬 Modals */}
      {showModal && (
        <RoleUserModal
          lang={currentLang}
          product={selectedRoleUser}
          newRoleUser={newRoleUser}
          setNewRoleUser={setNewRoleUser}
          handleAddRoleUser={handleAddRoleUser}
          setShowModal={setShowModal}
        />
      )}

      {showDetailModal && (
        <RoleUserDetailModal product={selectedRoleUser} onClose={() => setShowDetailModal(false)} />
      )}

      <DeleteModal
        lang={currentLang}
        show={showDeleteModal}
        product={selectedRoleUser}
        onCancel={() => setShowDeleteModal(false)}
        onDeleted={() => {
          setShowDeleteModal(false);
          loadRoleUsers();
        }}
      />

      <ImageUploadModal
        lang={currentLang}
        show={showImageModal}
        product={selectedRoleUser}
        onClose={() => setShowImageModal(false)}
        onDeleted={() => {
          setShowImageModal(false);
          loadRoleUsers();
        }}
      />

      <BulkDeleteModal
        lang={currentLang}
        show={showBulkDeleteModal}
        count={selectedRows.length}
        onCancel={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
};

export default List;
