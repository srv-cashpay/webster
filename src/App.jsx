import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Product from "./pages/Product/List";
import LandingPage from "./pages/Web/Landing";
import PrivacyPolicy from "./pages/Web/PrivacyPolicy";
import SignupForm from "./pages/SignupForm";

import "./App.css";
import MenuList from "./pages/Web/order/MenuList";

function ProtectedLayout({ onLogout, sidebarCollapsed, onToggleSidebar }) {
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
          <Route path="/harbour" element={<Dashboard onLogout={onLogout} />} />
          <Route path="/user" element={<User onLogout={onLogout} />} />
          <Route path="/search" element={<Search />} />
          <Route path="/product/list" element={<Product />} />
          {/* Default redirect jika route tidak dikenal */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Login route */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/harbour" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/signup/form" element={<SignupForm />} />
        <Route path="/menu" element={<MenuList />} />

        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/harbour" replace />
            ) : (
              <Signup />
            )
          }
        />
        {/* Protected routes */}
        {isLoggedIn ? (
          <Route
            path="*"
            element={
              <ProtectedLayout
                onLogout={handleLogout}
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebar={handleToggleSidebar}
              />
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
