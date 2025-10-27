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
  FaBell,
  FaUsersCog,
  FaTasks,
  FaFileAlt,
  FaPuzzlePiece,
  FaQuestionCircle,
  FaTags,        // Category
  FaTrademark,   // Merk
  FaPercent,     // Discount
  FaBalanceScale, // Tax
  FaCalendarCheck, // Reservation
} from "react-icons/fa";
import { fetchMerchantData } from "./sidebarApi";

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

  // ✅ Static menu (dengan Category, Merk, Discount, Tax, Reservation)
  const staticMenuItems = [
    { label: "Search", to: `/${currentLang}/search`, icon: <FaSearch /> },
    { label: "User", to: `/${currentLang}/user`, icon: <FaUser /> },
    { label: "Products", to: `/${currentLang}/product/list`, icon: <FaBoxOpen /> },

    // 🔹 Tambahan baru
    { label: "Category", to: `/${currentLang}/category/list`, icon: <FaTags /> },
    { label: "Merk", to: `/${currentLang}/merk/list`, icon: <FaTrademark /> },
    { label: "Discount", to: `/${currentLang}/discount/list`, icon: <FaPercent /> },
    { label: "Tax", to: `/${currentLang}/tax/list`, icon: <FaBalanceScale /> },
    { label: "Reservation", to: `/${currentLang}/reservation`, icon: <FaCalendarCheck /> },

    { label: "POS", to: `/${currentLang}/pos`, icon: <FaCashRegister /> },
    { label: "Customers", to: `/${currentLang}/customers`, icon: <FaUsers /> },
    { label: "Reports", to: `/${currentLang}/reports`, icon: <FaChartLine /> },
    { label: "Finance", to: `/${currentLang}/finance`, icon: <FaMoneyBillWave /> },
    { label: "Invoices", to: `/${currentLang}/invoices`, icon: <FaFileInvoice /> },
    { label: "Messages", to: `/${currentLang}/messages`, icon: <FaEnvelope /> },
    { label: "Support", to: `/${currentLang}/support`, icon: <FaLifeRing /> },
    { label: "Users", to: `/${currentLang}/users`, icon: <FaUsersCog /> },
  ];

  useEffect(() => {
    const loadDynamicMenu = async () => {
      try {
        const rows = await fetchMerchantData();
        const formatted = rows.map((item) => ({
          label: item.label,
          to: `/${currentLang}${item.to}`,
          icon: iconMap[item.label] || <FaQuestionCircle />,
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

  const renderMenu = (items) =>
    items.map((item) => (
      <li key={item.to} style={{ marginBottom: "10px" }}>
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
      </li>
    ));

  return (
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
  );
};

export default Sidebar;
