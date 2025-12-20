import React, { useState } from "react";
import { FaEnvelope, FaShoppingBag } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Setting from "../pages/Setting/Setting";
import OrderList from "../pages/OrderWeb/List"; // ⬅️ import komponen order list

const Topbar = ({ onToggleSidebar }) => {
  const [showSetting, setShowSetting] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

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
        {/* 🔹 Kiri: Toggle + Tombol Play Store */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={onToggleSidebar}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
            }}
            title="Toggle Sidebar"
          >
            <HiMenuAlt2 color="#000" />
          </button>
          <h6>Download Now</h6>
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
              loading="lazy"
              style={{ height: "30px", objectFit: "contain" }}
            />
          </button>
        </div>

        {/* 🔹 Kanan: Icon Order dan Settings */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Icon Order */}
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
            onClick={() => setShowOrders(true)}
          >
            <FaShoppingBag size={16} />
          </div>

          {/* Icon Settings */}
          <div
            onClick={() => setShowSetting(true)}
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
            title="Inbox"
          >
            <FaEnvelope size={16} />
          </div>
        </div>
      </div>

      {/* 🔹 Modal Setting */}
      {showSetting && (
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
          onClick={() => setShowSetting(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Setting onClose={() => setShowSetting(false)} />
          </div>
        </div>
      )}

      {/* 🔹 Modal Order List */}
      {showOrders && (
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
            padding: "20px",
          }}
          onClick={() => setShowOrders(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "800px",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}
          >
            <OrderList />
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
