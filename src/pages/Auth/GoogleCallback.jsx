import { useEffect } from "react";
import axios from "axios";

export default function GoogleCallback() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      window.location.replace("/auth");
      return;
    }

    axios
      .post("https://cashpay.co.id:2356/api/auth/web/google", { code }, {
        withCredentials: true, // kalau backend set HttpOnly cookie
      })
      .then((res) => {
        // Bisa redirect sesuai data backend
        const data = res.data;
        const redirectUrl = data.whatsapp === "/bvTmYgHVZjVt85fktdsXA==" 
          ? "/input-whatsapp-google" 
          : "/harbour";
        window.location.replace(redirectUrl);
      })
      .catch((err) => {
        console.error("Google login failed", err);
        window.location.replace("/auth?error=google");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <p>Signing in with Google…</p>
    </div>
  );
}
