import React, { useState, useEffect } from "react";
import "./Pos.css";
import Headbar from "./Headbar";
import { getProducts, getProductCategories } from "../../services/pos/get_product";
import PaymentModal from "./PaymentModal/PaymentModal";
import MemberModal from "./MemberModal";
import ProductViewModal from "./ProductModal/ProductModal";

const POS = () => {
  const [cart, setCart] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [barcode, setBarcode] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
const [categories, setCategories] = useState([]);
const [activeCategory, setActiveCategory] = useState("all");

  // Ambil data produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts(limit, 1);
      setProducts(data);
    };
    fetchProducts();
  }, [limit]);

  // Filter produk
  const filteredProducts = products.filter((product) => {
  const keyword = search.toLowerCase();

  const matchCategory =
    activeCategory === "all" ||
    product.category_name === activeCategory;

  const matchSearch =
    product.product_name?.toLowerCase().includes(keyword) ||
    product.barcode?.toLowerCase().includes(keyword) ||
    product.price?.toString().includes(keyword);

  return matchCategory && matchSearch;
});

useEffect(() => {
  const fetchCategories = async () => {
    const data = await getProductCategories();
    setCategories(data);
  };
  fetchCategories();
}, []);

    const handleSaveMember = (memberData) => {
    console.log("Member baru:", memberData);
    // 🔹 Di sini kamu bisa panggil API atau simpan ke database
  };

  // Tambah produk ke cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, qty: 1 }];
      }
    });
  };

  // Ubah qty di cart
  const changeQty = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, qty: item.qty + delta }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Scan barcode
  useEffect(() => {
    if (viewMode === "list" && barcode.trim() !== "") {
      const found = products.find((p) => p.barcode === barcode.trim());
      if (found) {
        addToCart(found);
      } else {
        alert("Produk dengan barcode tidak ditemukan!");
      }
      setBarcode("");
    }
  }, [barcode, viewMode, products]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.qty,
    0
  );

  return (
    <div className="pos-container">
      <Headbar
        search={search}
        setSearch={setSearch}
        limit={limit}
        setLimit={setLimit}
        selectedRows={[]}
        data={[]}
        setData={() => {}}
        setSelectedRows={() => {}}
        onAddNew={() => alert("Tambah produk baru")}
        viewMode={viewMode}
        setViewMode={setViewMode}
        barcode={barcode}
        setBarcode={setBarcode}
        onAddMember={() => setShowMemberModal(true)}
        onViewProducts={() => setShowProductModal(true)}
        categories={categories}            // 👈 NEW
        activeCategory={activeCategory}    // 👈 NEW
        setActiveCategory={setActiveCategory}
      />

      <div className="pos-content">
        {/* Produk */}
        <div className="products-container">
          {viewMode === "grid" ? (
            <div className="products-grid">
              {filteredProducts.length === 0 ? (
                <p style={{ textAlign: "center", color: "#777" }}>
                  Tidak ada produk ditemukan.
                </p>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <img
                      src={`https://cashpay.co.id/api/merchant/${product.image?.file_path}`}
                      alt={product.product_name}
                      className="product-image"
                    />
                    <h3>{product.product_name}</h3>
                    <p>Rp {product.price?.toLocaleString()}</p>
                    <button onClick={() => addToCart(product)}>Tambah</button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="products-list-container">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Nama Produk</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center", color: "#777" }}>
                        Silakan scan barcode produk...
                      </td>
                    </tr>
                  ) : (
                    cart.map((item) => (
                      <tr key={item.product.id}>
                        <td>{item.product.product_name}</td>
                        <td>Rp {item.product.price.toLocaleString()}</td>
                        <td>{item.qty}</td>
                        <td>
                          <button onClick={() => changeQty(item.product.id, 1)}>+</button>
                          <button
                            onClick={() => changeQty(item.product.id, -1)}
                            style={{ marginLeft: 5 }}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Keranjang */}
<div className="cart">
  {viewMode === "grid" ? (
    <>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p style={{ color: "#777" }}>Keranjang kosong</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <span>{item.product.product_name}</span>
              <span>Rp {item.product.price.toLocaleString()}</span>
              <span>Qty: {item.qty}</span>
              <div>
                <button onClick={() => changeQty(item.product.id, 1)}>+</button>
                <button
                  onClick={() => changeQty(item.product.id, -1)}
                  style={{ marginLeft: 5 }}
                >
                  -
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <h3>Total: Rp {totalPrice.toLocaleString()}</h3>
      <button disabled={cart.length === 0} style={{ marginTop: "10px" }}
                  onClick={() => setShowPaymentModal(true)}>
        Checkout
      </button>
    </>
  ) : (
    <>
      <h3>Total: Rp {totalPrice.toLocaleString()}</h3>
      <button disabled={cart.length === 0}>Checkout</button>
    </>
  )}
</div>
      </div>
            {/* Modal Pembayaran */}
            {showPaymentModal && (
              <PaymentModal
                total={totalPrice}
                onClose={() => setShowPaymentModal(false)}
                onSuccess={() => {
                  alert("Pembayaran berhasil!");
                  setCart([]);
                  setShowPaymentModal(false);
                }}
              />
            )}
        <MemberModal
        show={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        onSave={handleSaveMember}
      />
      <ProductViewModal
        show={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSelect={(product) => {
          addToCart(product); // 👈 tambahkan produk ke keranjang
          setShowProductModal(false); // 👈 tutup modal otomatis
        }}
      />

    </div>
  );
};

export default POS;
