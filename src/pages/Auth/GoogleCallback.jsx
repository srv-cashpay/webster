import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      navigate("/login?error=google");
      return;
    }

    axios
      .post("https://cashpay.co.id/api/auth/web/google", { code }) // ✅ BENAR
      .then((res) => {
        const data = res.data.data;

        Cookies.set("token", data.token);
        Cookies.set("refresh_token", data.refresh_token);

        window.location.href = "/";

      })
      .catch((err) => {
        console.error("Google login error:", err);
        navigate("/login?error=google");
      });
  }, [navigate]);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
