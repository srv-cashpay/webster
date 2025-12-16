import gopayLogo from "../../assets/gopay.png";
import danaLogo from "../../assets/dana.png";
import bniLogo from "../../assets/bni.png";
import qrisLogo from "../../assets/qris.png";
import mandiriLogo from "../../assets/mandiri.png";

export default function PaymentMethod({
  selectedMethod,
  setSelectedMethod,
}) {
  const methods = [
    {
      id: 1,
      name: "Qris",
      logo: qrisLogo,
    },
    {
      id: 2,
      name: "Gopay",
      logo: gopayLogo,
    },
    {
      id: 3,
      name: "Dana",
      logo: danaLogo,
    },
    {
      id: 4,
      name: "Bni (VA)",
      logo: bniLogo,
    },
    {
      id: 5,
      name: "Mandiri (VA)",
      logo: mandiriLogo,
    },
  ];

  return (
    <>

      <div className="method-list">
        {methods.map((item) => (
          <div
            key={item.id}
            className={`method-item ${
              selectedMethod === item.name ? "selected" : ""
            }`}
            onClick={() => setSelectedMethod(item.name)}
          >
            {/* LEFT */}
            <div className="method-left">
              <img
                src={item.logo}
                alt={item.name}
                className="method-logo"
              />
              <div className="method-info">
                <p className="method-name">{item.name}</p>
                <span className="method-desc">{item.desc}</span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="method-right">
              {selectedMethod === item.name && (
                <span className="check">✔</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
