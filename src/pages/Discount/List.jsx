import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom"; // ✅ ambil param dari URL

// 🔹 Components
import Headbar from "./Headbar";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import DiscountModal from "./DiscountModal";
import DeleteModal from "./DeleteModal";
import BulkDeleteModal from "./BulkDeleteModal";
import ImageUploadModal from "./ImageUploadModal";
import DiscountDetailModal from "./DiscountDetailModal";

// 🔹 API services
import {
  fetchDiscounts,
  createDiscount,
  bulkDeleteDiscounts,
  fetchDiscountById,
} from "../../services/discount/api";

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
  const [searchDiscount, setSearchDiscount] = useState("all");
  const [totalRows, setTotalRows] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});
  const [newDiscount, setNewDiscount] = useState({
    discount_name: "",
    price: "",
  });

  // 🧭 Load data produk
  const loadDiscounts = useCallback(async () => {
    try {
      const paginationData = { page: currentPage, limit, search };
      const response = await fetchDiscounts(paginationData);
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
    loadDiscounts();
  }, [loadDiscounts]);

  // ➕ Tambah produk baru
  const handleAddDiscount = () => {
    if (!newDiscount.discount_name || !newDiscount.price) {
      alert(currentLang === "id" ? "Harap isi semua field" : "Please fill in all fields");
      return;
    }

    const newItem = {
      id: "P" + (data.length + 1),
      discount_name: newDiscount.discount_name,
      price: parseInt(newDiscount.price),
      stock: newDiscount.stock || 0,
      created_at: new Date().toISOString().split("T")[0],
      status: 1,
      image: null,
    };

    setData([newItem, ...data]);
    setNewDiscount({ discount_name: "", price: "", stock: "" });
    setShowModal(false);
  };

  // 🗑️ Hapus banyak produk sekaligus
  const confirmBulkDelete = async () => {
    try {
      if (selectedRows.length === 0) return;
      await bulkDeleteDiscounts(selectedRows);
      await loadDiscounts();
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
      const discount = await fetchDiscountById(row.id);
      if (discount) {
        setSelectedDiscount(discount);
        setShowDetailModal(true);
      } else {
        alert(currentLang === "id" ? "Gagal mengambil detail produk!" : "Failed to fetch discount details!");
      }
    } catch (error) {
      console.error(error);
      alert(currentLang === "id" ? "Terjadi kesalahan saat mengambil data produk." : "An error occurred while fetching discount data.");
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
          searchDiscount={searchDiscount}
          setSearchDiscount={setSearchDiscount}
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
        searchDiscount={searchDiscount}
        limit={limit}
        currentPage={currentPage}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        isBulkEditMode={isBulkEditMode}
        editableData={editableData}
        setEditableData={setEditableData}
        setShowDeleteModal={setShowDeleteModal}
        setShowImageModal={setShowImageModal}
        setSelectedDiscount={setSelectedDiscount}
        onDetail={handleShowDetail}
      />

      {/* 📄 Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />

      {/* 💬 Modals */}
      {showModal && (
        <DiscountModal
          lang={currentLang}
          discount={selectedDiscount}
          newDiscount={newDiscount}
          setNewDiscount={setNewDiscount}
          handleAddDiscount={handleAddDiscount}
          setShowModal={setShowModal}
        />
      )}

      {showDetailModal && (
        <DiscountDetailModal discount={selectedDiscount} onClose={() => setShowDetailModal(false)} />
      )}

      <DeleteModal
        lang={currentLang}
        show={showDeleteModal}
        discount={selectedDiscount}
        onCancel={() => setShowDeleteModal(false)}
        onDeleted={() => {
          setShowDeleteModal(false);
          loadDiscounts();
        }}
      />

      <ImageUploadModal
        lang={currentLang}
        show={showImageModal}
        discount={selectedDiscount}
        onClose={() => setShowImageModal(false)}
        onDeleted={() => {
          setShowImageModal(false);
          loadDiscounts();
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
