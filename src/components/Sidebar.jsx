import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed }) => {
  const linkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}
      style={{
        position: "fixed",
        top: "50px", // di bawah topbar
        left: 0,
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
          fontSize: collapsed ? "11px" : "14px", // ukuran font disesuaikan
          transition: "font-size 0.3s ease",
        }}
      >
        <li><NavLink to="/search" className={linkClass}>Search</NavLink></li>
        <li><NavLink to="/user" className={linkClass}>User</NavLink></li>
        <li><NavLink to="/orders" className={linkClass}>Orders</NavLink></li>
        <li><NavLink to="/product/list" className={linkClass}>Products</NavLink></li>
        <li><NavLink to="/customers" className={linkClass}>Customers</NavLink></li>
        <li><NavLink to="/reports" className={linkClass}>Reports</NavLink></li>
        <li><NavLink to="/finance" className={linkClass}>Finance</NavLink></li>
        <li><NavLink to="/invoices" className={linkClass}>Invoices</NavLink></li>
        <li><NavLink to="/messages" className={linkClass}>Messages</NavLink></li>
        <li><NavLink to="/support" className={linkClass}>Support</NavLink></li>
        <li><NavLink to="/settings" className={linkClass}>Settings</NavLink></li>
        <li><NavLink to="/notifications" className={linkClass}>Notifications</NavLink></li>
        <li><NavLink to="/users" className={linkClass}>Users</NavLink></li>
        <li><NavLink to="/activities" className={linkClass}>Activities</NavLink></li>
        <li><NavLink to="/logs" className={linkClass}>Logs</NavLink></li>
        <li><NavLink to="/integrations" className={linkClass}>Integrations</NavLink></li>
      </ul>
    </div>
  );
};

export default Sidebar;
