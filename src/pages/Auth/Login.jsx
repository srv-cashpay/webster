  import { useState, useEffect } from "react";
  import { FcGoogle } from "react-icons/fc";
  import { FaEye, FaEyeSlash } from "react-icons/fa";
  import { ToastContainer, toast } from "react-toastify";
  import { useNavigate, useLocation } from "react-router-dom";
  import "react-toastify/dist/ReactToastify.css";
  // import { useGoogleLogin } from "@react-oauth/google";
  import loginLocales from "../../locales/loginLocales";
  import TurnstileComponent from "./TurnstileComponent";

  import {
    loginUser,
    loginWithGoogle,
    saveTokens,
  } from "../../services/auth/login";

  const Login = ({ onLogin }) => {
    // -----------------------------
    // 🌐 LOKASI & BAHASA
    // -----------------------------
    const navigate = useNavigate();
    const location = useLocation();

    // Deteksi bahasa dari prefix URL

  const isEnglish = location.pathname.startsWith("/en");
  const langPrefix = isEnglish ? "/en" : "";
  const t = loginLocales[isEnglish ? "en" : "id"];
  const [cfToken, setCfToken] = useState("");

    // -----------------------------
    // 🔹 STATE MANAGEMENT
    // -----------------------------
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginWithWhatsapp, setLoginWithWhatsapp] = useState(false);
    const [countryCode, setCountryCode] = useState("+62");

    // -----------------------------
    // ✉️ HANDLE EMAIL SUBMIT
    // -----------------------------
    const handleEmailSubmit = (e) => {
      e.preventDefault();
      if (identifier.trim()) {
        setShowPassword(true);
        toast.info(t.enterPassword, { autoClose: 1800 });
      } else {
        toast.warn(
          loginWithWhatsapp ? t.emptyWhatsappWarning : t.emptyEmailWarning
        );
      }
    };

    // -----------------------------
    // 🔑 HANDLE LOGIN
    // -----------------------------
    const handleLogin = async (e) => {
      e.preventDefault();
        if (!cfToken) {
      toast.warn("Harap verifikasi Cloudflare sebelum login");
      return;
    }

      if (!password.trim()) {
        toast.warn(t.emptyPasswordWarning);
        return;
      }

      setLoading(true);
      try {
        const payload = loginWithWhatsapp
          ? { whatsapp: countryCode + identifier }
          : { email: identifier };
        payload.password = password;

        const data = await loginUser(payload);

        if (data.status) {
          saveTokens(data.data);
          toast.success(t.loginSuccess, { autoClose: 1500 });
          setTimeout(() => onLogin && onLogin(), 1500);
        } else {
          toast.error(data.meta?.message || t.loginFailed);
        }
      } catch (error) {
        toast.error(error.meta?.message || error.message || t.serverError);
      } finally {
        setLoading(false);
      }
    };

    // -----------------------------
    // 🔹 LOGIN DENGAN GOOGLE
    // -----------------------------
  const handleGoogleLogin = () => {
    const clientId = "424973742981-7g8kjb308peguc13kebh526f2nii37c5.apps.googleusercontent.com";

    const redirectUri = `https://cashpay.co.id/auth/google/callback`;

    const scope = "openid email profile";

    const googleAuthUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +     // ⬅️ INI PENTING
      `&scope=${encodeURIComponent(scope)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    window.location.href = googleAuthUrl;
  };


    // -----------------------------
    // 🌐 HANDLE GANTI BAHASA
    // -----------------------------
  const handleLanguageToggle = () => {
    const newPath = isEnglish
      ? location.pathname.replace(/^\/en/, "") || "/"
      : `/en${location.pathname}`;

    navigate(`${newPath}${location.search}`, { replace: true });
  };

    // -----------------------------
    // 🧩 UI LOGIN PAGE
    // -----------------------------
    const elementStyle = {
      width: "320px",
      maxWidth: "100%",
      padding: "14px",
      borderRadius: "30px",
      border: "1px solid #ccc",
      fontSize: "15px",
      outline: "none",
      transition: "0.2s",
      marginBottom: "20px",
      boxSizing: "border-box",
      textAlign: "center",
    };

    const buttonStyle = {
      ...elementStyle,
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#52796f",
      transition: "0.3s",
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#fff",
          flexDirection: "column",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <ToastContainer
          position="top-right"
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
          style={{ fontSize: "14px" }}
        />

        <h2 style={{ color: "#333", fontWeight: "bold", marginBottom: "5px" }}>
          {t.title}
        </h2>
        <h4
          style={{ marginBottom: "30px", color: "#333", fontWeight: "normal" }}
        >
          {t.subtitle}
        </h4>

        {/* 🔹 Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          style={{
            ...elementStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            color: "#555",
            marginBottom: "20px",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
        >
          <FcGoogle
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
          {t.google}
        </button>

        {/* 🔸 Separator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "320px",
            marginBottom: "20px",
          }}
        >
          <hr
            style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }}
          />
          <span style={{ margin: "0 10px", color: "#999", fontSize: "14px" }}>
            {t.or}
          </span>
          <hr
            style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }}
          />
        </div>

        {/* 🔹 Form Login */}
        <form
          onSubmit={showPassword ? handleLogin : handleEmailSubmit}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {loginWithWhatsapp ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "320px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "30px",
                overflow: "hidden",
              }}
            >
              <select
                style={{
                  border: "none",
                  outline: "none",
                  background: "white",
                  padding: "0 10px",
                  fontSize: "15px",
                  height: "48px",
                  cursor: "pointer",
                  color: "#333",
                  borderRight: "1px solid #ccc",
                }}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+62">+62</option>
                <option value="+60">+60</option>
                <option value="+65">+65</option>
              </select>

              <input
                type="tel"
                placeholder={t.whatsappPlaceholder}
                value={identifier
                  .replace(/\D/g, "")
                  .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
                  .substring(0, 13)}
                onChange={(e) =>
                  setIdentifier(e.target.value.replace(/\D/g, ""))
                }
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "14px 16px",
                  fontSize: "15px",
                  backgroundColor: "white",
                  color: "#555",
                }}
              />
            </div>
          ) : (
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={{
                ...elementStyle,
                textAlign: "left",
                backgroundColor: "white",
                color: "#555",
              }}
            />
          )}

          {/* 🔹 Password */}
          {showPassword && (
            <div style={{ position: "relative", width: "320px", maxWidth: "100%" }}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  ...elementStyle,
                  paddingRight: "40px",
                  textAlign: "left",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              />
              <span
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "35%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#999",
                  fontSize: "18px",
                }}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
          {/* Turnstile Verification */}
          <div style={{ marginBottom: "20px" }}>
            <TurnstileComponent onVerify={(token) => setCfToken(token)} />
          </div>

          {/* 🔹 Forgot Password */}
          <p
            onClick={() => navigate(`${langPrefix}/forgot-password`)}
            style={{
              alignSelf: "flex-end",
              width: "130px",
              textAlign: "right",
              color: "#2a9d8f",
              fontSize: "15px",
              fontWeight: "500",
              marginTop: "5px",
              marginBottom: "20px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {t.forgot}
          </p>

          {/* 🔹 Tombol Submit */}
          <button
            type="submit"
            style={{
              ...buttonStyle,
              opacity: loading || (!showPassword && !identifier.trim()) ? 0.5 : 1,
              cursor:
                loading || (!showPassword && !identifier.trim())
                  ? "not-allowed"
                  : "pointer",
            }}
            disabled={loading || (!showPassword && !identifier.trim())}
          >
            {showPassword ? (loading ? t.loggingIn : t.signIn) : t.continue}
          </button>
        </form>

        {/* 🔁 Toggle Login Mode */}
        <p style={{ marginTop: "15px", fontSize: "14px", color: "#333" }}>
          {loginWithWhatsapp ? (
            <span
              onClick={() => {
                setLoginWithWhatsapp(false);
                setIdentifier("");
                setShowPassword(false);
              }}
              style={{
                color: "#2a9d8f",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {t.loginWithEmail}
            </span>
          ) : (
            <span
              onClick={() => {
                setLoginWithWhatsapp(true);
                setIdentifier("");
                setShowPassword(false);
              }}
              style={{
                color: "#2a9d8f",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {t.loginWithWhatsapp}
            </span>
          )}
        </p>

        {/* 🆕 Signup */}
        <p style={{ marginTop: "10px", color: "#333", fontSize: "14px" }}>
          {t.noAccount}{" "}
          <span
            onClick={() => navigate(`${langPrefix}/signup`)}
            style={{
              color: "#2a9d8f",
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {t.createOne}
          </span>
        </p>

        {/* 🌐 Bahasa */}
        <div
          style={{
            marginTop: "25px",
            fontSize: "15px",
            color: "#2a9d8f",
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={handleLanguageToggle}
        >
        {isEnglish ? "EN | ID" : "ID | EN"}
        </div>
      </div>
    );
  };

  export default Login;
