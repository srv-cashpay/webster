import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 bahasa ditentukan dari URL
  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  return (
    <footer className="footer">
      <div className="footer-top">
        <span>
          © {new Date().getFullYear()} PT Pembayaran Integrasi Digital.
        </span>
      </div>

      <button
        onClick={() => navigate(`${langPrefix}/privacy`)}
        className="privacy-link"
      >
        Privacy Policy
      </button>

      <div className="footer-social">
        <a
          href="https://instagram.com/cashpay"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
          aria-label="Instagram Cashpay"
        >
          <FaInstagram size={26} />
        </a>

        <a
          href="https://www.facebook.com/share/1AqYgAzggh/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
          aria-label="Facebook Cashpay"
        >
          <FaFacebook size={26} />
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
          aria-label="YouTube Cashpay"
        >
          <FaYoutube size={26} />
        </a>

        <a
          href="https://www.linkedin.com/company/cashpay-link"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
          aria-label="LinkedIn Cashpay"
        >
          <FaLinkedin size={26} />
        </a>
      </div>
    </footer>
  );
}
