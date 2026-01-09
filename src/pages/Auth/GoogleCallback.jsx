import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      .post("https://cashpay.co.id:2356/api/auth/web/google", {
        code: code, // ⬅️ MASUK KE req.Code
      })
      .then((res) => {
        const data = res.data;

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("refresh_token", data.refreshToken);

        navigate("/dashboard");
      })
      .catch(() => {
        navigate("/login?error=google");
      });
  }, [navigate]);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
