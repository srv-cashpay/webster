import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Telkomsel.css";

export default function Telkomsel() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 bahasa dari URL
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const closePopup = () => setApiResponse(null);

  const pulsaList = [
    { id: 1, amount: "Pulsa 5.000", price: 7000, sku: "tsel5" },
    { id: 2, amount: "Pulsa 10.000", price: 12000, sku: "tsel10" },
    { id: 3, amount: "Pulsa 20.000", price: 22000, sku: "tsel20" },
    { id: 4, amount: "Pulsa 25.000", price: 27000, sku: "tsel25" },
    { id: 5, amount: "Pulsa 50.000", price: 52000, sku: "tsel50" },
    { id: 6, amount: "Pulsa 100.000", price: 102000, sku: "tsel100" }
  ];

  const handleChoose = async (item) => {
    if (!phone.trim()) {
      alert("Nomor Telkomsel wajib diisi!");
      return;
    }

    const payload = {
      buyer_sku_code: item.sku,
      customer_no: phone
    };

    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch(
        "https://cashpay.co.id/api/product/topup/pulsa",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();
      setApiResponse(data);

      // ✅ redirect payment ikut bahasa
      if (data.data?.status === "Sukses") {
        navigate(`${langPrefix}/payment/${data.data.ref_id}`);
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
          <h1>Pengisian Pulsa Telkomsel</h1>
        </div>

        <p>Masukkan nomor Telkomsel untuk melanjutkan</p>

        <div className="topup-form">
          <input
            type="text"
            placeholder="08xxxxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <h2>Pilih Nominal Pulsa</h2>

        <div className="diamond-grid">
          {pulsaList.map((item) => (
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

        {apiResponse?.data && (
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
                {apiResponse.data.status === "Sukses"
                  ? "Berhasil"
                  : "Gagal"}
              </h3>
              <p>{apiResponse.data.message}</p>
              <button className="popup-btn" onClick={closePopup}>
                OK
              </button>
            </div>
          </div>
        )}

        {/* 🔥 tombol kembali aman */}
        <button
          className="back-btn"
          onClick={() => navigate(`${langPrefix}/topup`)}
        >
          Kembali
        </button>

      </div>
    </div>
  );
}
