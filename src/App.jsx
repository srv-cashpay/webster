import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Forgot from "./pages/Auth/Forgot/ForgotPassword";
import VerifyOtp from "./pages/Auth/Forgot/VerifyReset";
import ResetPassword from "./pages/Auth/Forgot/ResetPassword";
import Search from "./pages/Search";
import Product from "./pages/Product/List";
import Pos from "./pages/Pos/Pos";
import LandingPage from "./pages/Web/Landing";
import PrivacyPolicy from "./pages/Web/PrivacyPolicy";
import SignupForm from "./pages/Auth/SignupForm";
import OtpForm from "./pages/Auth/OtpForm";
import MenuList from "./pages/Web/order/MenuList";
import Setting from "./pages/Setting/Setting";
import Cookies from "js-cookie";
import "./App.css";

// ====================== PROTECTED LAYOUT ======================
function ProtectedLayout({ onLogout, sidebarCollapsed, onToggleSidebar, setSidebarCollapsed }) {
  const location = useLocation();
  const { lang } = useParams(); 
  useEffect(() => {
    if (location.pathname.startsWith(`/${lang}/pos`)) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  }, [location.pathname, lang, setSidebarCollapsed]);

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
          <Route path={`/${lang}/harbour`} element={<Dashboard />} />
          <Route path={`/${lang}/user`} element={<User />} />
          <Route path={`/${lang}/setting`} element={<Setting />} />
          <Route path={`/${lang}/search`} element={<Search />} />
          <Route path={`/${lang}/product/list`} element={<Product />} />
          <Route path={`/${lang}/pos`} element={<Pos />} />
          <Route path={`/${lang}`} element={<Navigate to={`/${lang}/harbour`} replace />} />
        </Routes>
      </div>
    </div>
  );
}

// ====================== APP ROOT ======================
function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // 🟢 Cek token dari cookie setiap kali aplikasi dibuka / di-refresh
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

  const handleToggleSidebar = () => setSidebarCollapsed((prev) => !prev);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/signup/form" element={<SignupForm />} />
        <Route path="/signup/otp" element={<OtpForm />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/verify-reset" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/menu" element={<MenuList />} />

        {/* Auth */}
        <Route
          path="/auth"
          element={
            token ? (
              <Navigate to="/harbour" replace />
            ) : (
              <Login onLogin={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/harbour" replace /> : <Signup />}
        />

        {/* Protected */}
        {token ? (
          <Route
            path="*"
            element={
              <ProtectedLayout
                onLogout={handleLogout}
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebar={handleToggleSidebar}
                setSidebarCollapsed={setSidebarCollapsed}
              />
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/auth?ref=encrypt" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
