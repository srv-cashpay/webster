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

        const data = res.data?.data;
        if (!data?.token || !data?.refresh_token) {
          throw new Error("Token / refresh_token tidak ada");
        }

        // ✅ COOKIE GLOBAL (PENTING)
        Cookies.set("token", data.token, {
          domain: ".cashpay.co.id",
          path: "/",
          secure: true,
          sameSite: "Lax",
        });

        Cookies.set("refresh_token", data.refresh_token, {
          domain: ".cashpay.co.id",
          path: "/",
          secure: true,
          sameSite: "Lax",
        });

        // (opsional)
        localStorage.setItem("token", data.token);

        // ✅ LANGSUNG KE CONSOLE
        window.location.replace(
          `https://console.cashpay.co.id${langPrefix}/harbour`
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
