import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          navigate(`${langPrefix}/login`, { replace: true });
          return;
        }

        const res = await axios.post(
          "https://api.cashpay.co.id/auth/web/google",
          { code }
        );

        const data = res.data.data;

        if (!data.token) {
          throw new Error("Token tidak ditemukan");
        }

        Cookies.set("token", data.token);
        Cookies.set("refresh_token", data.refresh_token);
        localStorage.setItem("token", data.merchant_id || data.token);

        window.location.replace(
          `https://console.cashpay.co.id/${langPrefix}/harbour`
        );
      } catch (error) {
        console.error("Google OAuth failed:", error);
        navigate(`${langPrefix}/login`, { replace: true });
      }
    };

    handleGoogleCallback();
  }, [navigate, langPrefix]);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
