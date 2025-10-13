import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Product from "./pages/Product/List";
import Pos from "./pages/Pos/Pos";
import LandingPage from "./pages/Web/Landing";
import PrivacyPolicy from "./pages/Web/PrivacyPolicy";
import SignupForm from "./pages/SignupForm";
import MenuList from "./pages/Web/order/MenuList";
import Setting from "./pages/Setting/Setting";
import Cookies from "js-cookie";
import "./App.css";

// ====================== PROTECTED LAYOUT ======================
function ProtectedLayout({ onLogout, sidebarCollapsed, onToggleSidebar, setSidebarCollapsed }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/pos")) {
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
          <Route path="/harbour" element={<Dashboard />} />
          <Route path="/user" element={<User />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/list" element={<Product />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/" element={<Navigate to="/harbour" replace />} />
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
        <Route path="/menu" element={<MenuList />} />

        {/* Auth */}
        <Route
          path="/login"
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
          <Route path="*" element={<Navigate to="/login?ref=auth" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
