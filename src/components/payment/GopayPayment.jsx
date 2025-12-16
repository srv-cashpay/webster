export default function GopayPayment({ data }) {
  const getAction = (name) =>
    data.actions.find((a) => a.name === name)?.url;

  return (
    <div className="gopay-box">
      <h2>Scan QR GoPay</h2>

      <img
        src={getAction("generate-qr-code-v2")}
        alt="QR GoPay"
        className="gopay-qr"
      />

      <a
        href={getAction("deeplink-redirect")}
        target="_blank"
        rel="noreferrer"
        className="gopay-button"
      >
        Buka GoPay App
      </a>

      <p className="expiry">
        Berlaku sampai <br />
        <b>{data.expiry_time}</b>
      </p>

      <span className="status pending">
        Status: {data.transaction_status}
      </span>
    </div>
  );
}
