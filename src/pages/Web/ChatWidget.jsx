import { useState } from "react";
import { useParams } from "react-router-dom";
import text from "../../locales/text";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState(null);

  const { lang } = useParams();
  const language = lang === "id" ? "id" : "en";
  const t = text[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiMessage(null);

    const formData = {
      full_name: e.target.full_name.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
      business_name: e.target.business_name.value,
    };

    try {
      const res = await fetch("https://cashpay.co.id:2369/api/widget/create/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status) {
        // sukses
        setApiMessage(data.message || "Chat sent successfully!");
      } else if (data.meta?.status === false) {
        // gagal
        setApiMessage(data.meta?.message || "Something went wrong");
      } else {
        setApiMessage("Unknown response from server");
      }

      setShowChatRoom(true);
    } catch (err) {
      console.error(err);
      setApiMessage("Network error, try again!");
      setShowChatRoom(true);
    } finally {
      setLoading(false);
    }
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
          {showChatRoom ? (
            <div style={{ height: "250px", display: "flex", flexDirection: "column" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "700" }}>Chat Room</h3>
              <div
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  overflowY: "auto",
                  marginBottom: "10px",
                }}
              >
                <p style={{ fontSize: "14px" }}>👋 {apiMessage || t.weWillContactYouSoon}</p>
              </div>
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
                <input name="full_name" type="text" placeholder={t.fullName} style={inputStyle} required />
                <input name="email" type="email" placeholder="Email" style={inputStyle} required />
                <input name="whatsapp" type="text" placeholder="WhatsApp" style={inputStyle} required />
                <input name="business_name" type="text" placeholder={t.businessName} style={inputStyle} required />

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
                  disabled={loading}
                >
                  {loading ? "Sending..." : t.send}
                </button>

                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  Powered by <span style={{ fontWeight: "700" }}>Scrumly</span>
                </h3>
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
