import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
  ];

  const styles = {
    header: {
      position: "fixed",
      top: 0,
      width: "100%",
      backgroundColor: "#1a1a1a",
      color: "#fff",
      display: "flex",
      justifyContent: "center", // center container
      alignItems: "center",
      padding: isMobile ? "12px 15px" : "15px 20px",
      zIndex: 1000,
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    container: {
      width: "100%",
      maxWidth: "1200px", // container maksimal agar tidak melebar di layar besar
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      fontWeight: "bold",
    },
    nav: {
      display: "flex",
      listStyle: "none",
      gap: isMobile ? "20px" : "30px",
      fontSize: isMobile ? "0.95rem" : "1rem",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      transition: "color 0.3s",
      padding: "5px 0",
    },
    hamburger: {
      fontSize: "1.8rem",
      cursor: "pointer",
    },
    mobileMenu: {
      position: "absolute",
      top: "60px",
      left: 0,
      right: 0,
      backgroundColor: "#333",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      transition: "max-height 0.3s ease-in-out",
      overflow: "hidden",
      gap: "15px",
      alignItems: "center",
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>MyLogo</div>

        {/* Navigation Desktop */}
        {!isMobile && (
          <nav>
            <ul style={styles.nav}>
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={styles.link}
                    onMouseOver={(e) => (e.target.style.color = "#FFD700")}
                    onMouseOut={(e) => (e.target.style.color = "#fff")}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Hamburger */}
        {isMobile && (
          <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <nav
          style={{
            ...styles.mobileMenu,
            maxHeight: menuOpen ? "500px" : "0px",
          }}
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{ ...styles.link, fontSize: "1rem" }}
              onClick={() => setMenuOpen(false)}
              onMouseOver={(e) => (e.target.style.color = "#FFD700")}
              onMouseOut={(e) => (e.target.style.color = "#fff")}
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
