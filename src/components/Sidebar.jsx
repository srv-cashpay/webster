import { NavLink } from "react-router-dom";
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
  const linkClass = ({ isActive }) => (isActive ? "active" : "");

  const menuItems = [
    { label: "Search", to: "/search", icon: <FaSearch /> },
    { label: "User", to: "/user", icon: <FaUser /> },
    { label: "Orders", to: "/orders", icon: <FaShoppingCart /> },
    { label: "Products", to: "/product/list", icon: <FaBoxOpen /> },
    { label: "Pos", to: "/pos", icon: <FaCashRegister /> },
    { label: "Customers", to: "/customers", icon: <FaUsers /> },
    { label: "Reports", to: "/reports", icon: <FaChartLine /> },
    { label: "Finance", to: "/finance", icon: <FaMoneyBillWave /> },
    { label: "Invoices", to: "/invoices", icon: <FaFileInvoice /> },
    { label: "Messages", to: "/messages", icon: <FaEnvelope /> },
    { label: "Support", to: "/support", icon: <FaLifeRing /> },
    { label: "Settings", to: "/settings", icon: <FaCog /> },
    { label: "Notifications", to: "/notifications", icon: <FaBell /> },
    { label: "Users", to: "/users", icon: <FaUsersCog /> },
    { label: "Activities", to: "/activities", icon: <FaTasks /> },
    { label: "Logs", to: "/logs", icon: <FaFileAlt /> },
    { label: "Integrations", to: "/integrations", icon: <FaPuzzlePiece /> },
  ];

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}
      style={{
        position: "fixed",
        top: "50px",
        left: 0,
        padding: "2px 0", // beri padding vertikal saja
        bottom: 0,
        width: collapsed ? "70px" : "250px",
        transition: "width 0.3s",
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
