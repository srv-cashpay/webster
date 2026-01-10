import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Pointblank.css";

export default function Pointblank() {
  const navigate = useNavigate();
  const { lang } = useParams();

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
const closePopup = () => setApiResponse(null);

  const diamondList = [
    { id: 1, amount: "86 Diamonds", price: 20000, sku: "ml50" },
    { id: 2, amount: "172 Diamonds", price: 40000, sku: "ml100" },
    { id: 3, amount: "257 Diamonds", price: 60000, sku: "ml150" },
    { id: 4, amount: "344 Diamonds", price: 80000, sku: "ml200" },
    { id: 5, amount: "514 Diamonds", price: 120000, sku: "ml300" },
    { id: 6, amount: "706 Diamonds", price: 160000, sku: "ml400" },
    { id: 7, amount: "878 Diamonds", price: 200000, sku: "ml500" },
    { id: 8, amount: "963 Diamonds", price: 220000, sku: "ml600" },
    { id: 9, amount: "1412 Diamonds", price: 320000, sku: "ml800" }
  ];

  const handleChoose = async (item) => {
  if (!userId.trim()) {
    alert("User ID wajib diisi!");
    return;
  }

  const payload = {
    buyer_sku_code: item.sku,
    user_id: userId,
  };

  setLoading(true);
  setApiResponse(null);

  try {
    const response = await fetch(
      "https://cashpay.co.id/api/product/topup/mobilelegend",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    const data = await response.json();
    setApiResponse(data);

    // 🔥 Jika sukses → langsung redirect ke payment gateway
    if (data.data && data.data.status === "Gagal") {
      navigate(`/payment/${data.data.ref_id}`);
    }

  } catch (err) {
    setApiResponse({ error: err.message });
  }

  setLoading(false);
};



  return (
    <div className="topup-wrapper">
      <div className="topup-container">
        <div className="mlbb-header">
          <h1>TopUp Pointblank</h1>
        </div>

        <p>Masukkan User ID untuk melanjutkan topup</p>

        <div className="topup-form">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <h2>Pilih Jumlah Diamonds</h2>

        <div className="diamond-grid">
          {diamondList.map((item) => (
            <div
              key={item.id}
              className="diamond-card"
              onClick={() => handleChoose(item)}
            >
              <h3>{item.amount}</h3>
              <p>Rp {item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {loading && <p className="loading">Memproses transaksi...</p>}

        {apiResponse && apiResponse.data && (
  <div className="popup-overlay" onClick={closePopup}>
    <div
      className={`popup-box ${
        apiResponse.data.status === "Sukses"
          ? "popup-success"
          : "popup-failed"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <h3>
        {apiResponse.data.status === "Sukses" ? "Berhasil" : "Gagal"}
      </h3>
      <p>{apiResponse.data.message}</p>

      <button className="popup-btn" onClick={closePopup}>
        OK
      </button>
    </div>
  </div>
)}



        <button className="back-btn" onClick={() => navigate(`/${lang}`)}>
          Kembali
        </button>
      </div>
    </div>
  );
}
