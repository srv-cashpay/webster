import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar"; // sesuaikan path sesuai posisi file Sidebar.jsx

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // AUTO COLLAPSE SAAT MASUK KE /pos
  useEffect(() => {
    if (location.pathname.startsWith("/pos")) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [location.pathname]);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Konten utama */}
      <div
        style={{
          marginLeft: collapsed ? "70px" : "250px",
          flexGrow: 1,
          transition: "margin-left 0.3s",
          background: "#f5f5f5",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        {/* Tombol toggle manual */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            position: "fixed",
            top: "10px",
            left: collapsed ? "80px" : "260px",
            transition: "left 0.3s",
            background: "#2c3e50",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 12px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          {collapsed ? "☰" : "⟨"}
        </button>

        {/* Halaman aktif dari Router */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
