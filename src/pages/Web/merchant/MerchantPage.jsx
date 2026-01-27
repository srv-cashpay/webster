import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MerchantPage.css";

const WHATSAPP_NUMBER = "6281234567890"; // ganti nomor merchant

export default function MerchantSlugPage() {
  const { merchant_slug } = useParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.cashpay.co.id/web/${merchant_slug}?page=${page}&limit=10`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setProducts(json.data.rows);
          setTotalPage(json.data.total_page);
        }
      })
      .finally(() => setLoading(false));
  }, [merchant_slug, page]);

  const toggleProduct = (product) => {
    const exist = selectedProducts.find((p) => p.id === product.id);

    if (exist) {
      setSelectedProducts(
        selectedProducts.filter((p) => p.id !== product.id)
      );
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, qty: 1 },
      ]);
    }
  };

  const changeQty = (id, qty) => {
    if (qty < 1) return;

    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === id ? { ...p, qty } : p
      )
    );
  };

  const totalPrice = selectedProducts.reduce(
    (sum, p) => sum + p.price * p.qty,
    0
  );

  const orderViaWhatsapp = () => {
    const message = encodeURIComponent(
      `Halo, saya mau pesan produk berikut:%0A%0A` +
        selectedProducts
          .map(
            (p) =>
              `- ${p.product_name}%0A  Qty: ${p.qty}%0A  Harga: Rp ${p.price.toLocaleString(
                "id-ID"
              )}%0A  Subtotal: Rp ${(p.price * p.qty).toLocaleString(
                "id-ID"
              )}`
          )
          .join("%0A%0A") +
        `%0A%0ATotal: Rp ${totalPrice.toLocaleString("id-ID")}`
    );

    window.open(
      `https://wa.me/$081952944296?text=${message}`,
      "_blank"
    );
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="merchant-page">
      <section className="merchant-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">{merchant_slug}</h1>
          <p className="banner-subtitle">
            Temukan produk terbaik dari merchant ini
          </p>
        </div>
      </section>

      <div className="container">
        <div className="grid">
          {products.map((item) => {
            const selected = selectedProducts.find(
              (p) => p.id === item.id
            );

            return (
              <div className={`card ${selected ? "selected" : ""}`} key={item.id}>
                <img
                  src={`https://api.cashpay.co.id/merchant/${item.image_path}`}
                  alt={item.product_name}
                  className="image"
                />

                <div className="card-body">
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={!!selected}
                      onChange={() => toggleProduct(item)}
                    />
                    Pilih
                  </label>

                  <h3 className="product-name">{item.product_name}</h3>
                  <p className="price">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                  <p className="stock">Stok: {item.stock}</p>

                  {selected && (
                    <div className="qty">
                      <button onClick={() => changeQty(item.id, selected.qty - 1)}>-</button>
                      <span>{selected.qty}</span>
                      <button onClick={() => changeQty(item.id, selected.qty + 1)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
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

        {selectedProducts.length > 0 && (
          <div className="wa-bar">
            <div>
              <strong>Total:</strong>{" "}
              Rp {totalPrice.toLocaleString("id-ID")}
            </div>
            <button className="wa-button" onClick={orderViaWhatsapp}>
              Pesan via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
