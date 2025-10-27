import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"; // ✅ ambil param dari URL

// 🔹 Components
import Headbar from "./Headbar";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import TaxModal from "./TaxModal";
import DeleteModal from "./DeleteModal";
import BulkDeleteModal from "./BulkDeleteModal";
import ImageUploadModal from "./ImageUploadModal";
import TaxDetailModal from "./TaxDetailModal";

// 🔹 API services
import {
  fetchTaxs,
  createTax,
  bulkDeleteTaxs,
  fetchTaxById,
} from "../../services/tax/api";

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
  const [searchTax, setSearchTax] = useState("all");
  const [totalRows, setTotalRows] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);
  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [newTax, setNewTax] = useState({
    tax: "",
    price: "",
  });

  // 🧭 Load data tax
  const loadTaxs = useCallback(async () => {
    try {
      const paginationData = { page: currentPage, limit, search };
      const response = await fetchTaxs(paginationData);
      if (response && response.rows) {
        setData(response.rows);
        setTotalRows(response.total_rows || 0);
      } else {
        setData([]);
        setTotalRows(0);
      }
    } catch (error) {
      console.error("Gagal mengambil data tax:", error);
      setData([]);
      setTotalRows(0);
    }
  }, [currentPage, limit, search]);

  useEffect(() => {
    loadTaxs();
  }, [loadTaxs]);

  // ➕ Tambah tax baru
  const handleAddTax = () => {
    if (!newTax.tax || !newTax.price) {
      alert(currentLang === "id" ? "Harap isi semua field" : "Please fill in all fields");
      return;
    }

    const newItem = {
      id: "P" + (data.length + 1),
      tax: newTax.tax,
      price: parseInt(newTax.price),
      stock: newTax.stock || 0,
      created_at: new Date().toISOString().split("T")[0],
      status: 1,
      image: null,
    };

    setData([newItem, ...data]);
    setNewTax({ tax: "", price: "", stock: "" });
    setShowModal(false);
  };

  // 🗑️ Hapus banyak tax sekaligus
  const confirmBulkDelete = async () => {
    try {
      if (selectedRows.length === 0) return;
      await bulkDeleteTaxs(selectedRows);
      await loadTaxs();
      setSelectedRows([]);
      setShowBulkDeleteModal(false);
    } catch (error) {
      console.error("Bulk delete gagal:", error);
      alert(currentLang === "id" ? "Gagal menghapus data!" : "Failed to delete data!");
    }
  };

  // 🔍 Lihat detail tax
  const handleShowDetail = async (row) => {
    try {
      const tax = await fetchTaxById(row.id);
      if (tax) {
        setSelectedTax(tax);
        setShowDetailModal(true);
      } else {
        alert(currentLang === "id" ? "Gagal mengambil detail tax!" : "Failed to fetch tax details!");
      }
    } catch (error) {
      console.error(error);
      alert(currentLang === "id" ? "Terjadi kesalahan saat mengambil data tax." : "An error occurred while fetching tax data.");
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
          searchTax={searchTax}
          setSearchTax={setSearchTax}
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

      {/* 📋 Tabel tax */}
      <DataTable
        lang={currentLang}
        data={data}
        setData={setData}
        search={search}
        searchTax={searchTax}
        limit={limit}
        currentPage={currentPage}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isBulkEditMode={isBulkEditMode}
        editableData={editableData}
        setEditableData={setEditableData}
        setShowDeleteModal={setShowDeleteModal}
        setShowImageModal={setShowImageModal}
        setSelectedTax={setSelectedTax}
        onDetail={handleShowDetail}
      />

      {/* 📄 Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      {/* 💬 Modals */}
      {showModal && (
        <TaxModal
          lang={currentLang}
          tax={selectedTax}
          newTax={newTax}
          setNewTax={setNewTax}
          handleAddTax={handleAddTax}
          setShowModal={setShowModal}
        />
      )}

      {showDetailModal && (
        <TaxDetailModal tax={selectedTax} onClose={() => setShowDetailModal(false)} />
      )}

      <DeleteModal
        lang={currentLang}
        show={showDeleteModal}
        tax={selectedTax}
        onCancel={() => setShowDeleteModal(false)}
        onDeleted={() => {
          setShowDeleteModal(false);
          loadTaxs();
        }}
      />

      <ImageUploadModal
        lang={currentLang}
        show={showImageModal}
        tax={selectedTax}
        onClose={() => setShowImageModal(false)}
        onDeleted={() => {
          setShowImageModal(false);
          loadTaxs();
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
