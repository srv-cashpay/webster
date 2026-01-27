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
import GoogleCallback from "./pages/Auth/GoogleCallback";
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
import Users from "./pages/UserMerchant/List";
import TransactionMethode from "./pages/TransactionMethode/Qris/List";
import RoleUserPermission from "./pages/RoleUserPermission/List";
import RoleUser from "./pages/RoleUser/List";
import Role from "./pages/Role/List";
import Permission from "./pages/Permission/List";
import UserList from "./pages/User/List";
import Cms from "./pages/Web/Cms";
import Pos from "./pages/Pos/Pos";
import LandingPage from "./pages/Web/Landing";
import PrivacyPolicy from "./pages/Web/PrivacyPolicy";
import Download from "./pages/Web/download/Download";
import SignupForm from "./pages/Auth/SignupForm";
import OtpForm from "./pages/Auth/OtpForm";
import MenuList from "./pages/Web/order/MenuList";
import Setting from "./pages/Setting/Setting";
import Reservation from "./pages/Reservation/TableReservation";
import OrderWeb from "./pages/OrderWeb/List";
import Subscribe from "./pages/Subscribe/SubscribeModal";
import Hardware from "./pages/Web/hardware/Hardware";
import MerchantPage from "./pages/Web/merchant/MerchantPage";
import TopupML from "./pages/Web/topup/game/ml/TopupML";
import Pubg from "./pages/Web/topup/game/pubg/Pubg";
import Pointblank from "./pages/Web/topup/game/pointblank/Pointblank";
import Telkomsel from "./pages/Web/topup/pulsa/telkomsel/Telkomsel";
import TopUp from "./pages/Web/TopUp";
import SelectGame  from "./pages/Web/SelectGame";
import PaymentPage from "./pages/Web/payment/PaymentGateway";
import BlogList from "./pages/Web/blog/BlogList";
import BlogDetail from "./pages/Web/blog/BlogDetail";
import NotFound from "./pages/Web/NotFound";
import Cookies from "js-cookie";
import "./App.css";

function ProtectedLayout({ onLogout, sidebarCollapsed, onToggleSidebar, setSidebarCollapsed }) {
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
          {/* Default Indonesia routes */}
          <Route path="/d/harbour" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user-merchant/list" element={<Users />} />
          <Route path="/product/list" element={<Product />} />
          <Route path="/category/list" element={<Category />} />
          <Route path="/merk/list" element={<Merk />} />
          <Route path="/transaction-methode/qris/list" element={<TransactionMethode />} />
          <Route path="/discount/list" element={<Discount />} />
          <Route path="/tax/list" element={<Tax />} />
          <Route path="/permission/list" element={<Permission />} />
          <Route path="/role/list" element={<Role />} />
          <Route path="/role_user/list" element={<RoleUser />} />
          <Route path="/role_user_permission/list" element={<RoleUserPermission />} />
          <Route path="/user/list" element={<UserList />} />
          <Route path="/content_setting" element={<Cms />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/order-web" element={<OrderWeb />} />
          <Route path="/subscribe/list" element={<Subscribe />} />
          <Route path="/pos" element={<Pos />} />

          {/* ... semua route lainnya tanpa /id */}

          {/* English routes */}
          <Route path="/en/d/harbour" element={<Dashboard />} />
          <Route path="/en/setting" element={<Setting />} />
          <Route path="/en/search" element={<Search />} />
          <Route path="/en/user-merchant/list" element={<Users />} />
          <Route path="/en/product/list" element={<Product />} />
          <Route path="/en/category/list" element={<Category />} />
          <Route path="/en/merk/list" element={<Merk />} />
          <Route path="/en/transaction-methode/list" element={<TransactionMethode />} />
          <Route path="/en/discount/list" element={<Discount />} />
          <Route path="/en/tax/list" element={<Tax />} />
          <Route path="/en/permission/list" element={<Permission />} />
          <Route path="/en/role/list" element={<Role />} />
          <Route path="/en/role_user/list" element={<RoleUser />} />
          <Route path="/en/role_user_permission/list" element={<RoleUserPermission />} />
          <Route path="/en/user/list" element={<UserList />} />
          <Route path="/en/content_setting" element={<Cms />} />
          <Route path="/en/reservation" element={<Reservation />} />
          <Route path="/en/order-web" element={<OrderWeb />} />
          <Route path="/en/subscribe/list" element={<Subscribe />} />
          <Route path="/en/pos" element={<Pos />} />

          {/* ... semua route English dengan /en */}

          {/* Redirect default root */}
          <Route path="/" element={<Navigate to="/d/harbour" replace />} />
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

  // default language = id
  const currentLang = location.pathname.startsWith("/en") ? "en" : "id";

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
      {/* Root */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/d/harbour" replace />
          ) : (
            <LandingPage />
          )
        }
      />

      {/* Public routes */}
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
    <Route path="/en/auth/google/callback" element={<GoogleCallback />} />
    
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/download" element={<Download />} />
      <Route path="/signup/form" element={<SignupForm />} />
      <Route path="/signup/otp" element={<OtpForm />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route path="/verify-reset" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/menu" element={<MenuList />} />
      <Route path="/topup" element={<TopUp />} />
      <Route path="/hardware" element={<Hardware />} />
      <Route path="/topup/games" element={<SelectGame />} />
      <Route path="/topup/mobile-legend" element={<TopupML />} />
      <Route path="/topup/pubg-mobile" element={<Pubg />} />
      <Route path="/topup/point-blank" element={<Pointblank />} />
      <Route path="/topup/pulsa-telkomsel" element={<Telkomsel />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogDetail />} />
      <Route path="/payment/:ref" element={<PaymentPage />} />
      <Route path="/:merchant_slug" element={<MerchantPage />} />

      {/* English routes */}
      <Route path="/en" element={<LandingPage />} />
      <Route path="/en/privacy" element={<PrivacyPolicy />} />
      <Route path="/en/download" element={<Download />} />
      <Route path="/en/signup/form" element={<SignupForm />} />
      <Route path="/en/signup/otp" element={<OtpForm />} />
      <Route path="/en/forgot-password" element={<Forgot />} />
      <Route path="/en/verify-reset" element={<VerifyOtp />} />
      <Route path="/en/reset-password" element={<ResetPassword />} />
      <Route path="/en/menu" element={<MenuList />} />
      <Route path="/en/topup" element={<TopUp />} />
      <Route path="/en/hardware" element={<Hardware />} />
      <Route path="/en/topup/games" element={<SelectGame />} />
      <Route path="/en/topup/mobile-legend" element={<TopupML />} />
      <Route path="/en/topup/pubg-mobile" element={<Pubg />} />
      <Route path="/en/topup/point-blank" element={<Pointblank />} />
      <Route path="/en/topup/pulsa-telkomsel" element={<Telkomsel />} />
      <Route path="/en/blog" element={<BlogList />} />
      <Route path="/en/blog/:slug" element={<BlogDetail />} />
      <Route path="/en/:merchant_slug" element={<MerchantPage />} />

      {/* Auth routes */}
      <Route
        path="/login"
        element={token ? <Navigate to="/d/harbour" replace /> : <Login onLogin={handleLoginSuccess} />}
      />
      <Route
    path="/en/login"
    element={
      token ? <Navigate to="/end/d/harbour" replace /> : <Login onLogin={handleLoginSuccess} />
    }
  />
      <Route
        path="/signup"
        element={token ? <Navigate to="/d/harbour" replace /> : <Signup />}
      />
      <Route
        path="/en/signup"
        element={token ? <Navigate to="/en/harbour" replace /> : <Signup />}
      />

      {/* Protected routes */}
      {token && <Route path="*" element={<ProtectedLayout onLogout={() => {Cookies.remove("token"); setToken(null)}} sidebarCollapsed={sidebarCollapsed} onToggleSidebar={() => setSidebarCollapsed(prev => !prev)} setSidebarCollapsed={setSidebarCollapsed} />} />}


      {/* Jika user belum login dan buka route protected */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <main id="main-content">
        <App />
      </main>
    </Router>
  );
}
