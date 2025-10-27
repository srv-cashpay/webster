import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Forgot from "./pages/Auth/Forgot/ForgotPassword";
import VerifyOtp from "./pages/Auth/Forgot/VerifyReset";
import ResetPassword from "./pages/Auth/Forgot/ResetPassword";
import Search from "./pages/Search";
import Product from "./pages/Product/List";
import Category from "./pages/Category/List";
import Merk from "./pages/Merk/List";
import Discount from "./pages/Discount/List";
import Tax from "./pages/Tax/List";

import RoleUserPermission from "./pages/RoleUserPermission/List";
import RoleUser from "./pages/RoleUser/List";
import Role from "./pages/Role/List";
import Permission from "./pages/Permission/List";
import UserList from "./pages/User/List";
import Cms from "./pages/Web/Cms";

import Pos from "./pages/Pos/Pos";
import LandingPage from "./pages/Web/Landing";
import PrivacyPolicy from "./pages/Web/PrivacyPolicy";
import SignupForm from "./pages/Auth/SignupForm";
import OtpForm from "./pages/Auth/OtpForm";
import MenuList from "./pages/Web/order/MenuList";
import Setting from "./pages/Setting/Setting";
import Reservation from "./pages/Reservation/TableReservation";
import OrderWeb from "./pages/OrderWeb/List";
import Cookies from "js-cookie";
import "./App.css";
import RoleUserPermissionDetailModal from "./pages/RoleUserPermission/RoleUserPermissionDetailModal";

function ProtectedLayout({
  onLogout,
  sidebarCollapsed,
  onToggleSidebar,
  setSidebarCollapsed,
}) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/pos")) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
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
          transition: "margin-left 0.3s ease",
        }}
      >
        <Routes>
          <Route path="/:lang/harbour" element={<Dashboard />} />
          <Route path="/:lang/setting" element={<Setting />} />
          <Route path="/:lang/search" element={<Search />} />
          <Route path="/:lang/product/list" element={<Product />} />
          <Route path="/:lang/category/list" element={<Category />} />
          <Route path="/:lang/merk/list" element={<Merk />} />
          <Route path="/:lang/discount/list" element={<Discount />} />
          <Route path="/:lang/tax/list" element={<Tax />} />
          <Route path="/:lang/permission/list" element={<Permission />} />
          <Route path="/:lang/role/list" element={<Role />} />
          <Route path="/:lang/role_user/list" element={<RoleUser />} />
          <Route path="/:lang/role_user_permission/list" element={<RoleUserPermission />} />
          <Route path="/:lang/user/list" element={<UserList />} />
          <Route path="/:lang/content_setting" element={<Cms />} />
          <Route path="/:lang/reservation" element={<Reservation />} />
          <Route path="/:lang/order-web" element={<OrderWeb />} />
          <Route path="/:lang/pos" element={<Pos />} />
          <Route path="/" element={<Navigate to="/id/harbour" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // ambil lang dari URL (default ke id)
  const currentLang = location.pathname.split("/")[1] || "id";

  useEffect(() => {
    const accessToken = Cookies.get("token");
    const refreshToken = Cookies.get("refresh_token");
    if (accessToken || refreshToken) {
      setToken(accessToken || refreshToken);
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    const accessToken = Cookies.get("token");
    const refreshToken = Cookies.get("refresh_token");
    if (accessToken || refreshToken) {
      setToken(accessToken || refreshToken);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    localStorage.clear();
    setToken(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* 🟢 Jika buka root "/" */}
      <Route
        path="/"
        element={
          token ? (
            // jika sudah login, arahkan ke dashboard default
            <Navigate to={`/${currentLang}/harbour`} replace />
          ) : (
            // jika belum login, arahkan ke landing page
            <Navigate to="/id" replace />
          )
        }
      />

      {/* 🌍 Public Routes */}
      <Route path="/:lang" element={<LandingPage />} />
      <Route path="/:lang/privacy" element={<PrivacyPolicy />} />
      <Route path="/:lang/signup/form" element={<SignupForm />} />
      <Route path="/:lang/signup/otp" element={<OtpForm />} />
      <Route path="/:lang/forgot-password" element={<Forgot />} />
      <Route path="/:lang/verify-reset" element={<VerifyOtp />} />
      <Route path="/:lang/reset-password" element={<ResetPassword />} />
      <Route path="/:lang/menu" element={<MenuList />} />

      {/* 🔐 Auth Routes */}
      <Route
        path="/:lang/auth"
        element={
          token ? (
            <Navigate to={`/${currentLang}/harbour`} replace />
          ) : (
            <Login onLogin={handleLoginSuccess} />
          )
        }
      />
      <Route
        path="/:lang/signup"
        element={
          token ? (
            <Navigate to={`/${currentLang}/harbour`} replace />
          ) : (
            <Signup />
          )
        }
      />

      {/* 🔒 Protected Routes */}
      {token ? (
        <Route
          path="*"
          element={
            <ProtectedLayout
              onLogout={handleLogout}
              sidebarCollapsed={sidebarCollapsed}
              onToggleSidebar={() => setSidebarCollapsed((prev) => !prev)}
              setSidebarCollapsed={setSidebarCollapsed}
            />
          }
        />
      ) : (
        // kalau belum login dan buka route yang tidak dikenal
        <Route
          path="*"
          element={
            location.pathname === "/" ? (
              <Navigate to="/id" replace />
            ) : (
              <Navigate to={`/${currentLang}/auth?ref=encrypt`} replace />
            )
          }
        />
      )}
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
