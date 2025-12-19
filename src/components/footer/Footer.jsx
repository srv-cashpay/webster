import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import "./Footer.css";

export default function Footer({ language }) {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-top">
        <span>
          © {new Date().getFullYear()} CashPay. All rights reserved.
        </span>
      </div>

      <button
        onClick={() => navigate(`/${language}/privacy`)}
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
        >
          <FaInstagram size={26} />
        </a>

        <a
          href="https://www.facebook.com/share/1AqYgAzggh/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaFacebook size={26} />
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icon"
        >
          <FaYoutube size={26} />
        </a>
      </div>
    </footer>
  );
}
