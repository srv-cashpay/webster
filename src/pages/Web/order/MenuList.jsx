import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MenuList.css";

const MenuList = () => {
  const [merchantId, setMerchantId] = useState(null);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [customerName, setCustomerName] = useState("");

  // Ambil merchant_id dari URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("merchant_id");
    if (!id) {
      alert("merchant_id tidak ditemukan di URL!");
      setLoading(false);
      return;
    }
    setMerchantId(id);
  }, []);

  // Ambil data menu dari backend
  useEffect(() => {
    if (!merchantId) return;

    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.cashpay.co.id/product/menu?merchant_id=${merchantId}`
        );

        if (res.data?.success) {
          const rows = res.data.data.rows || [];
          const data = rows.map((row) => ({
            id: row.id,
            name: row.product_name,
            price: row.price,
            image: row.image
              ? `https://api.cashpay.co.id/merchant/${row.image.file_path}`
              : "https://via.placeholder.com/300x200?text=No+Image",
          }));
          setFoods(data);
        } else {
          alert(res.data.message || "Gagal memuat menu");
        }
      } catch (err) {
        console.error("Error fetching menu:", err);
        alert("Terjadi kesalahan saat mengambil menu");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [merchantId]);

  // Tambah ke keranjang
  const handleOrder = (food) => {
    const existing = cart.find((item) => item.id === food.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === food.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...food, qty: 1 }]);
    }
  };

  // Hapus dari keranjang
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleCheckout = () => {
    setShowCart(false);
    setShowModal(true);
  };

  // 🔹 POST pesanan ke backend (versi axios.post seperti Next.js)
  const handleSubmitOrder = async () => {
    if (!merchantId) {
      alert("Merchant ID tidak ditemukan");
      return;
    }
    if (!customerName.trim()) {
      alert("Nama pemesan harus diisi!");
      return;
    }
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    const orderPayload = {
      order_name: customerName,
      product: cart.map((item) => ({
        product_name: item.name,
        price: item.price,
        quantity: item.qty,
      })),
    };

    try {
      const response = await axios.post(
        `https://api.cashpay.co.id/merchant/menu/order?merchant_id=${merchantId}`,
        orderPayload
      );

      if (response.data?.status === true) {
        alert(
          response.data.message ||
            `Pesanan atas nama: ${customerName} berhasil disimpan.`
        );
        setCart([]);
        setCustomerName("");
        setShowModal(false);
       } else {
      console.error(err);
      alert("Terjadi kesalahan tidak terduga");
    }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.message || "Terjadi kesalahan saat memesan");
      } else {
        console.error(err);
        alert("Terjadi kesalahan tidak terduga");
      }
    }
  };

  return (
    <div className="menu-wrapper">
      <h2 className="menu-title">🍱 Web Order</h2>

      {loading ? (
        <p className="loading-text">Loading menu...</p>
      ) : (
        <div className="menu-grid">
          {foods.map((item) => (
            <div key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} className="menu-image" />
              <div className="menu-info">
                <h3 className="menu-name">{item.name}</h3>
                <p className="menu-price">Rp {item.price?.toLocaleString()}</p>
              </div>
              <button className="menu-btn" onClick={() => handleOrder(item)}>
                Pesan
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Footer ringkas */}
      {cart.length > 0 && (
        <footer
          className="cart-footer-fixed"
          onClick={() => setShowCart(true)}
        >
          <div className="cart-summary">
            <div className="cart-left">
              <span className="cart-icon">🛒</span>
              <span className="cart-info">
                {totalQty} item • Rp {totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              className="checkout-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCheckout();
              }}
            >
              Checkout
            </button>
          </div>
        </footer>
      )}

      {/* Panel cart detail */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h3>🛍️ Daftar Pesanan</h3>
              <button className="close-btn" onClick={() => setShowCart(false)}>
                ✕
              </button>
            </div>

            <div className="cart-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <div className="cart-item-right">
                    <span>x{item.qty}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <strong>Total:</strong> Rp {totalPrice.toLocaleString()}
            </div>

            <button className="checkout-btn full" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Modal input nama pemesan */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>🧾 Nama Pemesan</h3>
            <input
              type="text"
              placeholder="Masukkan nama pemesan..."
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="btn-submit" onClick={handleSubmitOrder}>
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
