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
} from "react-icons/fa";

const Sidebar = ({ collapsed }) => {
  // 🟢 Ambil parameter bahasa dari URL (/id/... atau /en/...)
  const { lang } = useParams();
  const currentLang = lang || "id"; // fallback ke 'id' kalau tidak ada param

  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  // 🔹 Semua path dikombinasikan dengan prefix bahasa
  const menuItems = [
    { label: "Search", to: `/${currentLang}/search`, icon: <FaSearch /> },
    { label: "User", to: `/${currentLang}/user`, icon: <FaUser /> },
    { label: "Orders", to: `/${currentLang}/orders`, icon: <FaShoppingCart /> },
    { label: "Products", to: `/${currentLang}/product/list`, icon: <FaBoxOpen /> },
    { label: "POS", to: `/${currentLang}/pos`, icon: <FaCashRegister /> },
    { label: "Customers", to: `/${currentLang}/customers`, icon: <FaUsers /> },
    { label: "Reports", to: `/${currentLang}/reports`, icon: <FaChartLine /> },
    { label: "Finance", to: `/${currentLang}/finance`, icon: <FaMoneyBillWave /> },
    { label: "Invoices", to: `/${currentLang}/invoices`, icon: <FaFileInvoice /> },
    { label: "Messages", to: `/${currentLang}/messages`, icon: <FaEnvelope /> },
    { label: "Support", to: `/${currentLang}/support`, icon: <FaLifeRing /> },
    { label: "Settings", to: `/${currentLang}/settings`, icon: <FaCog /> },
    { label: "Notifications", to: `/${currentLang}/notifications`, icon: <FaBell /> },
    { label: "Users", to: `/${currentLang}/users`, icon: <FaUsersCog /> },
    { label: "Activities", to: `/${currentLang}/activities`, icon: <FaTasks /> },
    { label: "Logs", to: `/${currentLang}/logs`, icon: <FaFileAlt /> },
    { label: "Integrations", to: `/${currentLang}/integrations`, icon: <FaPuzzlePiece /> },
  ];

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
        {menuItems.map((item) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
