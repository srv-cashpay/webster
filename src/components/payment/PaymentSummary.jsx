export default function PaymentSummary({ harga }) {
  return (
    <div className="summary-box">
      <h3>Ringkasan Pembayaran</h3>

      <div className="summary-row">
        <span>Produk</span>
        <span>Mobile Legends 86 Diamonds</span>
      </div>

      <div className="summary-row total">
        <span>Total</span>
        <span>Rp {harga.toLocaleString()}</span>
      </div>
    </div>
  );
}
