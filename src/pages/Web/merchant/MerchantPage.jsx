import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MerchantPage.css";

const WHATSAPP_NUMBER = "6281952944296";

export default function MerchantSlugPage() {
  const { merchant_slug } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // ISI HANYA DATA YANG DIPILIH
  const [selectedProducts, setSelectedProducts] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    setLoading(true);

    fetch(
      `https://api.cashpay.co.id/web/${merchant_slug}?page=${page}&limit=10`
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setProducts(json.data.rows);
          setTotalPage(json.data.total_page);
        }
      })
      .finally(() => setLoading(false));
  }, [merchant_slug, page]);

  /* ================= TOGGLE PRODUCT ================= */
  const toggleProduct = (product) => {
    setSelectedProducts((prev) => {
      const exist = prev.find(
        (p) => p.product_id === product.product_id
      );

      if (exist) {
        // UNCHECK
        return prev.filter(
          (p) => p.product_id !== product.product_id
        );
      }

      // CHECK
      return [
        ...prev,
        {
          product_id: product.product_id,
          product_name: product.product_name,
          price: product.price,
          qty: 1,
        },
      ];
    });
  };

  /* ================= CHANGE QTY ================= */
  const changeQty = (product_id, qty) => {
    if (qty < 1) return;

    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.product_id === product_id
          ? { ...p, qty }
          : p
      )
    );
  };

  /* ================= TOTAL PRICE ================= */
  const totalPrice = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  /* ================= ORDER WA ================= */
  const orderViaWhatsapp = () => {
    let message = "Halo, saya mau pesan produk berikut:\n\n";

    selectedProducts.forEach((p, i) => {
      message += `${i + 1}. ${p.product_name}\n`;
      message += `   Qty: ${p.qty}\n`;
      message += `   Harga: Rp ${p.price.toLocaleString("id-ID")}\n`;
      message += `   Subtotal: Rp ${(p.price * p.qty).toLocaleString(
        "id-ID"
      )}\n\n`;
    });

    message += `Total: Rp ${totalPrice.toLocaleString("id-ID")}`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(waUrl, "_blank");
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="merchant-page">
      {/* ================= BANNER ================= */}
      <section className="merchant-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">
            {merchant_slug.replace(/-/g, " ").toUpperCase()}
          </h1>
          <p className="banner-subtitle">
            Temukan produk terbaik dari merchant ini
          </p>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <div className="container">
        <div className="grid">
          {products.map((item) => {
            const selected = selectedProducts.find(
              (p) => p.product_id === item.product_id
            );

            return (
              <div
                key={item.product_id}
                className={`card ${selected ? "selected" : ""}`}
              >
                <img
                  src={`https://api.cashpay.co.id/merchant/${item.image_path}`}
                  alt={item.product_name}
                  className="image"
                />

                <div className="card-body">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={Boolean(selected)}
                      onChange={() => toggleProduct(item)}
                    />
                    Pilih
                  </label>

                  <h3 className="product-name">
                    {item.product_name}
                  </h3>

                  <p className="price">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>

                  <p className="stock">
                    Stok: {item.stock}
                  </p>

                  {selected && (
                    <div className="qty">
                      <button
                        onClick={() =>
                          changeQty(
                            item.product_id,
                            selected.qty - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span>{selected.qty}</span>
                      <button
                        onClick={() =>
                          changeQty(
                            item.product_id,
                            selected.qty + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPage}
          </span>

          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

        {/* ================= WA BAR ================= */}
        {selectedProducts.length > 0 && (
          <div className="wa-bar">
            <div>
              <strong>Total:</strong>{" "}
              Rp {totalPrice.toLocaleString("id-ID")}
            </div>
            <button
              className="wa-button"
              onClick={orderViaWhatsapp}
            >
              Pesan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
