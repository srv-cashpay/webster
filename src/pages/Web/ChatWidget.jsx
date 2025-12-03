import { color } from "framer-motion";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // tampilkan pesan sukses
    setSent(true);

    // auto close setelah 3 detik
    setTimeout(() => {
      setOpen(false);
      setSent(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating Button */}
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

      {/* Popup */}
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
            animation: "slideUp 0.3s ease",
          }}
        >
          {/* Jika SUDAH DIKIRIM → tampilkan pesan balasan */}
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
              Permintaan terkirim
            </div>
          ) : (
            <>
              <h3 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "700" }}>
                Jadwalkan Demo
              </h3>
              <h3 style={{ margin: "0 0 12px", fontSize: "12px", fontWeight: "600" }}>
                Kami Akan Segera Menghubungi anda
              </h3>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              >
                <input type="text" placeholder="Nama Lengkap" style={inputStyle} />
                <input type="email" placeholder="Email" style={inputStyle} />
                <input type="text" placeholder="WhatsApp" style={inputStyle} />
                <input type="text" placeholder="Business Name" style={inputStyle} />

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
                  Kirim
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
  color: "#fff",
  fontSize: "14px",
};
