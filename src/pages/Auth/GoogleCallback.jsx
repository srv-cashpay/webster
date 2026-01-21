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
          { withCredentials: true } // 🔥 WAJIB
        );

        const data = res.data?.data;
        if (!data?.token) throw new Error("Token tidak ditemukan");

        // 🔑 COOKIE HARUS SHARED
        Cookies.set("token", data.token, {
          domain: ".cashpay.co.id",
          secure: true,
          sameSite: "None",
        });

        Cookies.set("refresh_token", data.refresh_token, {
          domain: ".cashpay.co.id",
          secure: true,
          sameSite: "None",
        });

        // 🚀 PINDAH KE CONSOLE
        window.location.replace(
          "https://console.cashpay.co.id/harbour"
        );
      } catch (error) {
        console.error("Google OAuth failed:", error);
        window.location.replace("/login");
      }
    };

    handleGoogleCallback();
  }, []);

  return <p>Signing in with Google...</p>;
};

export default GoogleCallback;
