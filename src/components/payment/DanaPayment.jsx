export default function DanaPayment({ data }) {
  const getAction = (name) =>
    data.actions.find((a) => a.name === name)?.url;

  return (
    <div className="gopay-box">
      <h2>Scan QR Dana</h2>

      <img
        src={getAction("generate-qr-code")}
        alt="QR Dana"
        className="gopay-qr"
      />

      <a
        href={getAction("deeplink-redirect")}
        target="_blank"
        rel="noreferrer"
        className="gopay-button"
      >
        Buka Dana App
      </a>

      <span className="status pending">
        Status: {data.transaction_status}
      </span>
    </div>
  );
}
