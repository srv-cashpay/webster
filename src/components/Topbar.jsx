import React, { useState } from "react";
import { FaUserCog, FaShoppingBag } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Setting from "../pages/Setting/Setting";

const Topbar = ({ onToggleSidebar }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ fontSize: "14px" }}
      />

      <div
        style={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid #ddd",
          backgroundColor: "#fff",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {/* Kiri: Toggle + Tombol Play Store */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={onToggleSidebar}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}
            title="Toggle Sidebar"
          >
            <HiMenuAlt2 color="#000" />
          </button>
          <h6>Download Now</h6>
          {/* 🔹 Tombol Play Store (lebih kecil) */}
          <button
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.app.cashpay",
                "_blank"
              )
            }
            style={{
              background: "none",
              border: "none",
              padding: "0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            title="Get on Google Play"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              style={{
                height: "30px", // 🔹 lebih kecil
                objectFit: "contain",
              }}
            />
          </button>
        </div>

        {/* Kanan: Icon Order dan Settings */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              color: "#333",
              cursor: "pointer",
            }}
            title="Pesanan Masuk"
            onClick={() => alert("Pesanan masuk clicked!")}
          >
            <FaShoppingBag size={16} />
          </div>

          <div
            onClick={() => setShowModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
              border: "1px solid #ccc",
              color: "#333",
              cursor: "pointer",
            }}
            title="Settings"
          >
            <FaUserCog size={16} />
          </div>
        </div>
      </div>

      {/* Modal Settings */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Setting onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
