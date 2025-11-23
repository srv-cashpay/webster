// src/components/Sidebar.jsx
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBoxOpen,
  FaCashRegister,
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaFileInvoice,
  FaEnvelope,
  FaLifeRing,
  FaCog,
  FaUserCog,
  FaBell,
  FaUsersCog,
  FaTasks,
  FaFileAlt,
  FaPuzzlePiece,
  FaQuestionCircle,
  FaTags,
  FaTrademark,
  FaPercent,
  FaBalanceScale,
  FaCalendarCheck,
  FaBarcode,
} from "react-icons/fa";

import { fetchSider } from "./sidebarApi";
import SubscribeModal from "../pages/Subscribe/SubscribeModal";
import Setting from "../pages/Setting/Setting";

const iconMap = {
  Permission: <FaTasks />,
  User: <FaUser />,
  Role: <FaUsersCog />,
  "Role User": <FaUsers />,
  "Role User Permission": <FaPuzzlePiece />,
  "Payment Method": <FaMoneyBillWave />,
  "Content Setting": <FaCog />,
  Printer: <FaFileAlt />,
};

const Sidebar = ({ collapsed }) => {
  const { lang } = useParams();
  const currentLang = lang || "id";

  const [dynamicMenu, setDynamicMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // STATE MODAL
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showSetting, setShowSetting] = useState(false);

  // Static menu
  const staticMenuItems = [
    { label: "Search", to: `/${currentLang}/search`, icon: <FaSearch /> },
    { label: "Products", to: `/${currentLang}/product/list`, icon: <FaBoxOpen /> },
    { label: "Category", to: `/${currentLang}/category/list`, icon: <FaTags /> },
    { label: "Merk", to: `/${currentLang}/merk/list`, icon: <FaTrademark /> },
    { label: "Discount", to: `/${currentLang}/discount/list`, icon: <FaPercent /> },
    { label: "Tax", to: `/${currentLang}/tax/list`, icon: <FaBalanceScale /> },
    { label: "Reservation", to: `/${currentLang}/reservation`, icon: <FaCalendarCheck /> },
    { label: "Qris", to: `/${currentLang}/qris`, icon: <FaBarcode /> },
    { label: "POS", to: `/${currentLang}/pos`, icon: <FaCashRegister /> },
    { label: "Customers", to: `/${currentLang}/customers`, icon: <FaUsers /> },
    { label: "Reports", to: `/${currentLang}/reports`, icon: <FaChartLine /> },
    { label: "Finance", to: `/${currentLang}/finance`, icon: <FaMoneyBillWave /> },
    { label: "Invoices", to: `/${currentLang}/invoices`, icon: <FaFileInvoice /> },
    { label: "Messages", to: `/${currentLang}/messages`, icon: <FaEnvelope /> },
    { label: "Support", to: `/${currentLang}/support`, icon: <FaLifeRing /> },
    { label: "Users", to: `/${currentLang}/user-merchant/list`, icon: <FaUsersCog /> },
    { label: "Subscribe", action: () => setShowSubscribeModal(true), icon: <FaBell /> },
     // ➤ Divider (pemisah)
    { type: "divider" },
    { label: "Setting", action: () => setShowSetting(true), icon: <FaUserCog /> },
  ];

  useEffect(() => {
    const loadDynamicMenu = async () => {
      try {
        const rows = await fetchSider();
const formatted = rows.map((p) => ({
  label: p.label,
  to: `/${currentLang}${p.to}`,
  icon: iconMap[p.label] || <FaQuestionCircle />,
}));

        setDynamicMenu(formatted);
      } catch (err) {
        setError("Gagal memuat menu tambahan.");
      } finally {
        setLoading(false);
      }
    };

    loadDynamicMenu();
  }, [currentLang]);

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  // RENDER menu + mendukung "divider"
  const renderMenu = (items) =>
    items.map((item, index) => {
      // Divider UI
      if (item.type === "divider") {
        return (
          <li
            key={`divider-${index}`}
            style={{
              borderTop: "1px solid #ddd",
              margin: "12px 0",
            }}
          />
        );
      }

      return (
        <li key={item.label} style={{ marginBottom: "10px" }}>
          {item.to ? (
            <NavLink
              to={item.to}
              className={linkClass}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#333",
                textDecoration: "none",
                padding: "6px",
              }}
            >
              <span style={{ fontSize: "12px" }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ) : (
            <div
              onClick={item.action}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px",
                cursor: "pointer",
                color: "#333",
              }}
            >
              <span style={{ fontSize: "12px" }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </div>
          )}
        </li>
      );
    });

  return (
    <>
      {/* SIDEBAR */}
      <div
        className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}
        style={{
          position: "fixed",
          top: "50px",
          left: 0,
          padding: "2px 0",
          bottom: 0,
          width: collapsed ? "70px" : "250px",
          transition: "width 0.3s ease",
          overflowY: "auto",
          background: "#fff",
          borderRight: "1px solid #ddd",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <ul
          style={{
            padding: "10px",
            listStyle: "none",
            margin: 0,
            fontSize: collapsed ? "11px" : "14px",
            transition: "font-size 0.3s ease",
          }}
        >
          {renderMenu(staticMenuItems)}

          {!loading && dynamicMenu.length > 0 && !collapsed && (
            <li style={{ margin: "10px 0", borderTop: "1px solid #ddd" }}></li>
          )}

          {loading && (
            <li style={{ fontSize: "12px", padding: "6px" }}>Memuat menu tambahan...</li>
          )}
          {error && (
            <li style={{ fontSize: "12px", color: "red", padding: "6px" }}>{error}</li>
          )}
          {!loading && !error && renderMenu(dynamicMenu)}
        </ul>
      </div>

      {/* MODAL SUBSCRIBE */}
      {showSubscribeModal && (
        <SubscribeModal onClose={() => setShowSubscribeModal(false)} />
      )}

      {/* MODAL SETTING */}
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
    </>
  );
};

export default Sidebar;
