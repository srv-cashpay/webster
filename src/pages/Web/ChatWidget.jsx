import { useState } from "react";
import { useParams } from "react-router-dom";
import text from "../../locales/text";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const { lang } = useParams(); // ambil bahasa dari url
  const language = lang === "id" ? "id" : "en"; 
  const t = text[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);

    setTimeout(() => {
      setOpen(false);
      setSent(false);
    }, 3000);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
          background: "#000",
          color: "#fff",
          border: "none",
          padding: "14px 20px",
          borderRadius: "50px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        Schedule Demo
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "24px",
            width: "300px",
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.15)",
            zIndex: 1000,
          }}
        >
          {sent ? (
            <div
              style={{
                padding: "15px",
                background: "#e0f2fe",
                borderRadius: "12px",
                color: "#075985",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              {t.requestSend}
            </div>
          ) : (
            <>
              <h3 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "700" }}>
                  {t.scheduleDemo}
              </h3>
              <h3 style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: "600" }}>
                  {t.weWillContactYouSoon}
              </h3>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <input type="text" placeholder={t.fullName} style={inputStyle} />
                <input type="email" placeholder="Email" style={inputStyle} />
                <input type="text" placeholder="WhatsApp" style={inputStyle} />
                <input type="text" placeholder={t.businessName} style={inputStyle} />

                <button
                  type="submit"
                  style={{
                    background: "#000",
                    color: "white",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {t.send}
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  background: "#ffffff",
  color: "#000000",
  fontSize: "14px",
};
