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
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      navigate(`${langPrefix}/login?error=google`);
      return;
    }

    axios
      .post("https://cashpay.co.id/api/auth/web/google", { code })
      .then((res) => {
        const data = res.data.data;

        Cookies.set("token", data.token);
        Cookies.set("refresh_token", data.refresh_token);

        // ✅ FIX DI SINI
        navigate(`${langPrefix}/harbour`, { replace: true });
      })
      .catch((err) => {
        console.error("Google login error:", err);
        navigate(`${langPrefix}/login?error=google`);
      });
  }, [navigate, langPrefix]);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
