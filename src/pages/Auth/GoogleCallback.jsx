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
      navigate(`${langPrefix}/auth?error=google`, { replace: true });
      return;
    }

    axios
      .post("https://cashpay.co.id/api/auth/web/google", { code })
      .then((res) => {
        const data = res.data.data;

        Cookies.set("token", data.token);
        Cookies.set("refresh_token", data.refresh_token);
        localStorage.setItem("token", data.merchant_id || data.token);

        navigate(`${langPrefix}/harbour`, { replace: true });
      })
      .catch(() => {
        navigate(`${langPrefix}/auth?ref=encrypt`, { replace: true });
      });
  }, [navigate, langPrefix]);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
