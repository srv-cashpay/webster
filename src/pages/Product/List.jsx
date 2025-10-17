import React, { useState, useEffect, useCallback } from "react";
import Headbar from "./Headbar";
import { fetchProducts, createProduct, bulkDeleteProducts, fetchProductById  } from "../../services/product/api";
import ProductModal from "./ProductModal";
import DeleteModal from "./DeleteModal";
import BulkDeleteModal from "./BulkDeleteModal"; // 🔹 Tambah import
import Pagination from "./Pagination";
import DataTable from "./DataTable"; 
import ImageUploadModal from "./ImageUploadModal"; // 🔹 import modal baru
import ProductDetailModal from "./ProductDetailModal"; // 🔹 import

const List = () => {
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_name: "",
    price: "",
    stock: "",
  });

  const [isBulkEditMode, setIsBulkEditMode] = useState(false);
  const [editableData, setEditableData] = useState({});

  const loadProducts = useCallback(async () => {
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
  }, [currentPage, limit, search]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = () => {
    if (!newProduct.product_name || !newProduct.price) {
      alert("Harap isi semua field");
      return;
    }

    const newItem = {
      id: "P" + (data.length + 1),
      product_name: newProduct.product_name,
      price: parseInt(newProduct.price),
      stock: newProduct.stock || 0,
      created_at: new Date().toISOString().split("T")[0],
      status: 1,
      image: null,
    };

    setData([newItem, ...data]);
    setNewProduct({ product_name: "", price: "", stock: "" });
    setShowModal(false);
  };

  const confirmBulkDelete = async () => {
    try {
      if (selectedRows.length === 0) return;
      await bulkDeleteProducts(selectedRows);
      await loadProducts();
      setSelectedRows([]);
      setShowBulkDeleteModal(false);
    } catch (error) {
      console.error("Bulk delete gagal:", error);
      alert("Gagal menghapus data! Silakan coba lagi.");
    }
  };

const handleShowDetail = async (row) => {
  try {
    const product = await fetchProductById(row.id); // API call
    if (product) {
      setSelectedProduct(product);
      setShowDetailModal(true);
    } else {
      alert("Gagal mengambil detail produk!");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat mengambil data produk.");
  }
};


  const totalPages = Math.ceil(totalRows / limit);

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

      <DataTable
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
        setSelectedProduct={setSelectedProduct}
        onDetail={handleShowDetail}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      {showModal && (
        <ProductModal
          product={selectedProduct} 
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddProduct={handleAddProduct}
          setShowModal={setShowModal}
        />
      )}
      
      {showDetailModal && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      <DeleteModal
        show={showDeleteModal}
        product={selectedProduct}
        onCancel={() => setShowDeleteModal(false)}
        onDeleted={() => {
          setShowDeleteModal(false);
          loadProducts();
        }}
      />

      <ImageUploadModal
        show={showImageModal}
        product={selectedProduct}
        onClose={() => setShowImageModal(false)}
        onDeleted={() => {
          setShowImageModal(false);
          loadProducts();
        }}
      />

      <BulkDeleteModal
        show={showBulkDeleteModal}
        count={selectedRows.length}
        onCancel={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
      />
    </div>
  );
};

export default List;
