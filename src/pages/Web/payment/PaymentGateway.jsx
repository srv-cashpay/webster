import React, { useState } from "react";
import "./PaymentGateway.css";

import PaymentSummary from "../../../components/payment/PaymentSummary";
import PaymentMethod from "../../../components/payment/PaymentMethod";
import GopayPayment from "../../../components/payment/GopayPayment";
import DanaPayment from "../../../components/payment/DanaPayment";
import { chargeGopay, chargeDana } from "../../../services/paymentService";

export default function PaymentGateway() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const harga = 20000;

  const handlePay = async () => {
    if (!selectedMethod) {
      alert("Pilih metode pembayaran");
      return;
    }

    try {
      setLoading(true);
      let data;

      if (selectedMethod === "Gopay") {
        data = await chargeGopay(harga);
      } else if (selectedMethod === "Dana") {
        data = await chargeDana(harga);
      }

      setPaymentData(data);
    } catch {
      alert("Gagal membuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-layout">

        {/* LEFT - CONTENT */}
        <div className="checkout-content">
          <h1>Checkout</h1>
        

          <PaymentSummary harga={harga} />

          <div className="info-box">
            <h4>Informasi</h4>
            <p>
              Setelah pembayaran berhasil, pesanan akan diproses otomatis
              tanpa perlu konfirmasi manual. Pastikan data transaksi kamu sudah benar sebelum membayar
            </p>
          </div>
        </div>

        {/* RIGHT - PAYMENT */}
        <div className="pay-container">
          <p className="subtitle">Pilih metode pembayaran</p>

          {!paymentData && (
            <>
              <PaymentMethod
                selectedMethod={selectedMethod}
                setSelectedMethod={setSelectedMethod}
              />

              <button
                className="pay-button"
                onClick={handlePay}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </>
          )}

          {paymentData && selectedMethod === "Gopay" && (
            <GopayPayment data={paymentData} />
          )}

          {paymentData && selectedMethod === "Dana" && (
            <DanaPayment data={paymentData} />
          )}
        </div>

      </div>
    </div>
  );
}

