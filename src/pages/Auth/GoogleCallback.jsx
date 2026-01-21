import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const GoogleCallback = () => {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          window.location.replace("/login");
          return;
        }

        const res = await axios.post(
          "https://api.cashpay.co.id/auth/web/google",
          { code },
          { withCredentials: true }
        );

        const data = res.data?.data;
        if (!data?.token || !data?.refresh_token) throw new Error("Token tidak ditemukan");

        // ❌ Tanpa HttpOnly → bisa diakses JS
        Cookies.set("token", data.token, {
          domain: ".cashpay.co.id",
          path: "/",
          secure: true,
          sameSite: "None",
        });

        Cookies.set("refresh_token", data.refresh_token, {
          domain: ".cashpay.co.id",
          path: "/",
          secure: true,
          sameSite: "None",
        });

        window.location.replace("https://console.cashpay.co.id/harbour");
      } catch (err) {
        console.error(err);
        window.location.replace("/login");
      }
    };

    handleGoogleCallback();
  }, []);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
