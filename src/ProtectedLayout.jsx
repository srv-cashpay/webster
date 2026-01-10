import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { useEffect } from "react";

function ProtectedLayout({ onLogout, sidebarCollapsed, onToggleSidebar, setSidebarCollapsed }) {
  const location = useLocation();

  useEffect(() => {
    setSidebarCollapsed(location.pathname.includes("/pos"));
  }, [location.pathname, setSidebarCollapsed]);

  return (
    <div className="app-container">
      <Topbar onLogout={onLogout} onToggleSidebar={onToggleSidebar} />
      <Sidebar collapsed={sidebarCollapsed} />
      <div
        className="content"
        style={{
          marginLeft: sidebarCollapsed ? "70px" : "250px",
          paddingTop: "50px",
        }}
      >
        <Outlet /> {/* ✅ Ini penting */}
      </div>
    </div>
  );
}

export default ProtectedLayout;
