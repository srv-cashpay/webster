import React, { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import heroImage from "../../assets/head.png";
import addImage from "../../assets/add.png";
import scanImage from "../../assets/scan1.png";
import dashboard1 from "../../assets/dashboard1.png";

export default function LandingPage() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref"); // "generate"

  useEffect(() => {
    if (ref === "auth") {
      console.log("✅ Parameter 'generate' terdeteksi!");
      // Bisa ditambahkan aksi lain di sini
      // contoh: tampilkan popup promosi, otomatis scroll, dsb.
    }
  }, [ref]);

  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo" onClick={() => scrollToSection(heroRef)}>
          CashPay
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection(featuresRef)}>Features</button>
          <button onClick={() => scrollToSection(aboutRef)}>About</button>
          <button onClick={() => scrollToSection(contactRef)}>Contact</button>
          <button
              className="btn-login"
              onClick={() => navigate("/login?ref=auth")}
            >
              Login
            </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="hero">
        <div className="hero-text">
          <h1>
            Power your <span>future</span> with Cashier Payment
          </h1>
          <p>
            Smart, Secure, Simple Point Of Sale. Simplifying payments one transaction at a time.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.app.cashpay",
                  "_blank"
                )
              }
            >
              Download
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate("/signup")}
            >
              Try for Free 3 months
            </button>
          </div>
        </div>
        <img src={heroImage} alt="Hero" width="400" height="400" />
      </section>

      {/* Features */}
      <section ref={featuresRef} className="section features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>⚡ Fast Performance</h3>
            <p>Optimized systems that run efficiently and sustainably.</p>
          </div>
          <div className="feature-card">
            <h3>🌱 Eco-Friendly Tech</h3>
            <p>We use green hosting and sustainable digital practices.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Reliable</h3>
            <p>Data protection with next-gen encryption standards.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="section about">
        <div className="about-container">
          <div className="about-image">
            <img src={dashboard1} alt="About" />
          </div>
          <div className="about-text">
            <h2>Smart Dashboard</h2>
            <p>
              We are a team of innovators building technology with a purpose — to make digital
              transformation greener and more efficient.
            </p>
            <p>
              Our vision is to combine sustainability with performance, empowering companies to grow responsibly.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission">
        <div className="mission-container">
          <div className="mission-image">
            <img src={scanImage} alt="Mission" />
          </div>
          <div className="mission-text">
            <h2>Self Order</h2>
            <p>
              At CashPay, our mission is to simplify payment processes while promoting innovation,
              transparency, and efficiency.
            </p>
            <p>
              We aim to empower every business to manage transactions seamlessly with cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section vision">
        <div className="vision-container">
          <div className="vision-text">
            <h2>Inventory Management</h2>
            <p>
              We envision a future where every business can access smart, secure, and sustainable payment solutions.
            </p>
            <p>
              CashPay strives to be at the forefront of digital transformation by providing tools that help businesses grow effortlessly.
            </p>
          </div>
          <div className="vision-image">
            <img src={addImage} alt="Vision" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CashPay. All rights reserved.</p>
        <button
          onClick={() => navigate("/privacy")}
          className="privacy-link"
        >
          Privacy Policy
        </button>
      </footer>
    </div>
  );
}
