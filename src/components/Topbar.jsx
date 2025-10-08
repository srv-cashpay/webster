import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Topbar = ({ onToggleSidebar }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");

      // Hit API logout
      await axios.post(
        "https://cashpay.my.id:2356/api/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Bersihkan token
      Cookies.remove("token");
      Cookies.remove("refresh_token");
      localStorage.removeItem("token");

      toast.success("Logout successful!", { autoClose: 1500 });

      // Redirect / reload page atau callback
      setTimeout(() => {
        window.location.href = "/login"; // ganti sesuai routing
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.meta?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

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
        {/* Kiri: Toggle + Logo + Judul */}
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
            <HiMenuAlt2 />
          </button>

          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            Cashier Dashboard
          </div>
        </div>

        {/* Kanan: User icon + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
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
            }}
          >
            <FaUser size={16} />
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              border: "1px solid #000",
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "13px",
              transition: "0.2s ease",
              opacity: loading ? 0.6 : 1,
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = "#222")}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = "#000")}
          >
            <FiLogOut size={14} />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Topbar;
