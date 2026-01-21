import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import logo from "/2.png";

export default function Navbar({
  heroRef,
  aboutRef,
  priceRef,
  t,
}) {
  // ===============================
  // SERVICE LIST (single source)
  // ===============================
  const services = [
    {
      key: "kirim_paket",
      label: { id: "Kirim Paket", en: "Kirim Paket" },
      path: "/kirim-paket",
    },
    {
      key: "kirim_pindahan",
      label: { id: "Kirim Pindahan", en: "Kirim Pindahan" },
      path: "/kirim-pindahan",
    },
    {
      key: "kirim_bantuan",
      label: { id: "Kirim Bantuan", en: "Kirim Bantuan" },
      path: "/kirim-barang",
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const dropdownRef = useRef(null);

  // ===============================
  // LANGUAGE FROM URL
  // ===============================
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  // ===============================
  // HELPERS
  // ===============================
  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const goToService = (path) => {
    navigate(`${langPrefix}${path}`);
    setServiceOpen(false);
    setMenuOpen(false);
  };

  const goToLogin = () => {
    const consoleUrl = import.meta.env.VITE_CONSOLE_URL;
    if (!consoleUrl) {
      console.error("VITE_CONSOLE_URL is undefined");
      return;
    }

    const langPath = isEnglish ? "/en" : "";
    window.location.href = `${consoleUrl}${langPath}/login`;
  };

  // ===============================
  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  // ===============================
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServiceOpen(false);
      }
    };

 document.addEventListener("click", handleClickOutside);
    return () =>
   document.removeEventListener("click", handleClickOutside);
  }, []);

  // ===============================
  // RENDER
  // ===============================
  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo-wrapper" onClick={() => scrollToSection(heroRef)}>
        <img
          src="/56x56.png"
          srcSet="/36x36.png 36w, /56x56.png 56w"
          sizes="(max-width: 768px) 36px, 56px"
          width="56"
          height="56"
          alt="Kirim Logo"
          className="logo-img"
        />
        <span className="logo-text">Kirim</span>
      </div>

      {/* MOBILE TOGGLE */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✖" : "☰"}
      </div>

      {/* RIGHT MENU */}
      <div className={`nav-right ${menuOpen ? "active" : ""}`}>
        <div className="nav-links">
          {/* SERVICE DROPDOWN */}
          <div
            className="service-dropdown"
            ref={dropdownRef}
          >
            <button
              className="dropdown-trigger"
              onClick={() => setServiceOpen(!serviceOpen)}
            >
              {t.service} ▾
            </button>

            {serviceOpen && (
              <div className="dropdown-menu">
                {services.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => goToService(item.path)}
                  >
                    {isEnglish ? item.label.en : item.label.id}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate(`${langPrefix}/topup`)}>
            Top Up
          </button>

          <button onClick={() => navigate(`${langPrefix}/blog`)}>
            Blog
          </button>
        </div>

        {/* LANGUAGE TOGGLE */}
        <div className="language-toggle">
          <button
            className={!isEnglish ? "active-lang" : ""}
            onClick={() => {
              const path = location.pathname.replace(/^\/en/, "") || "/";
              navigate(`${path}${location.search}`);
            }}
          >
            ID
          </button>

          <button
            className={isEnglish ? "active-lang" : ""}
            onClick={() => {
              const path = location.pathname.replace(/^\/en/, "");
              navigate(`/en${path}${location.search}`);
            }}
          >
            EN
          </button>
        </div>

        {/* LOGIN */}
        <button className="btn-login" onClick={goToLogin}>
          {t.login}
        </button>
      </div>
    </nav>
  );
}
