import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MerchantPage.css";

export default function MerchantSlugPage() {
  const { merchant_slug } = useParams();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);

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
          {products.map((item, i) => (
            <div className="card" key={i}>
              <img
                src={`https://api.cashpay.co.id/merchant/${item.image_path}`}
                alt={item.product_name}
                className="image"
              />
              <div className="card-body">
                <h3 className="product-name">{item.product_name}</h3>
                <p className="price">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
                <p className="stock">Stok: {item.stock}</p>
              </div>
            </div>
          ))}
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
      </div>
    </div>
  );
}
