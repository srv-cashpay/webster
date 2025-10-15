import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState(""); // email atau whatsapp
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginWithWhatsapp, setLoginWithWhatsapp] = useState(false); // toggle
  const [countryCode, setCountryCode] = useState("+62"); // 🔹 default Indonesia

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  // 🔒 Hanya boleh diakses dari ?ref=auth
  useEffect(() => {
    if (ref !== "auth") {
      toast.warn("Akses tidak diizinkan", { autoClose: 1800 });
      setTimeout(() => navigate("/", { replace: true }), 1500);
    }
  }, [ref, navigate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (identifier.trim()) {
      setShowPassword(true);
      toast.info("Please enter your password", { autoClose: 1800 });
    } else {
      toast.warn(loginWithWhatsapp ? "Nomor tidak boleh kosong" : "Email tidak boleh kosong");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.warn("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const payload = loginWithWhatsapp
        ? { whatsapp: countryCode + identifier } // 🔹 tambahkan kode negara
        : { email: identifier };

      payload.password = password;

      const response = await axios.post(
        "https://cashpay.my.id:2356/api/auth/signin",
        payload,
        { headers: { "X-Api-Key": "3f=Pr#g1@RU-nw=30" } }
      );

      if (response.data.status) {
        const data = response.data.data;
        Cookies.set("token", data.token);
        Cookies.set("refresh_token", data.refresh_token);
        localStorage.setItem("token", data.merchant_id);

        toast.success("Login successful!", { autoClose: 1500 });
        setTimeout(() => onLogin && onLogin(), 1500);
      } else {
        toast.error(response.data.meta?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.meta?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login clicked!");
  };

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

  if (ref !== "auth") {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#333",
          fontFamily: "sans-serif",
        }}
      >
        <p>Redirecting...</p>
        <ToastContainer />
      </div>
    );
  }

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
        margin: 0,
        padding: 0,
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
        Sign in to your account
      </h2>
      <h4 style={{ marginBottom: "30px", color: "#333", fontWeight: "normal" }}>
        Simplifying payments one transaction at a time
      </h4>

      {/* 🔹 Tombol Google */}
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
        <FcGoogle style={{ width: "20px", height: "20px", marginRight: "10px" }} />
        Continue with Google
      </button>

      {/* 🔸 Separator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "320px",
          maxWidth: "100%",
          marginBottom: "20px",
        }}
      >
        <hr style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }} />
        <span style={{ margin: "0 10px", color: "#999", fontSize: "14px" }}>OR</span>
        <hr style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }} />
      </div>

      {/* 🔹 Form Login */}
      <form
        onSubmit={showPassword ? handleLogin : handleEmailSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* 🔹 Input Email atau WhatsApp */}
        {loginWithWhatsapp ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "320px",
              maxWidth: "100%",
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "30px",
              overflow: "hidden",
              transition: "0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#52796f")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
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
              placeholder="811-2345-6789"
              value={
                identifier
                  .replace(/\D/g, "")                    // buang semua non-angka
                  .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3") // tampilkan format 819-5294-4296
                  .substring(0, 13)                      // batasi agar tidak kelebihan karakter
              }
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, ""); // simpan murni angka
                setIdentifier(numeric);
              }}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "14px 16px",
                fontSize: "15px",
                backgroundColor: "white",
                color: "#555",
                letterSpacing: "0.5px",
              }}
            />

          </div>
        ) : (
          <input
            type="email"
            placeholder="Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            style={{
              ...elementStyle,
              textAlign: "left",
              backgroundColor: "white",
              color: "#555",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#52796f")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        )}

        {/* 🔹 Password */}
        {showPassword && (
          <div style={{ position: "relative", width: "320px", maxWidth: "100%" }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...elementStyle,
                paddingRight: "40px",
                textAlign: "left",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#52796f")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
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
                backgroundColor: "white",
              }}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        {/* 🔹 Forgot Password */}
        <p
          onClick={() => navigate("/forgot-password")}
          style={{
            alignSelf: "flex-end",
            width: "200px",
            textAlign: "right",
            color: "#2a9d8f",
            fontSize: "15px",
            fontWeight: "500",
            marginTop: "5px",
            marginBottom: "20px",
            cursor: "pointer",
            textDecoration: "underline",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#1f776f")}
          onMouseLeave={(e) => (e.target.style.color = "#2a9d8f")}
        >
          Forgot password?
        </p>

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
          onMouseEnter={(e) => {
            if (!loading && identifier.trim())
              e.target.style.backgroundColor = "#405d50";
          }}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#52796f")}
        >
          {showPassword ? (loading ? "Logging in..." : "Sign In") : "Continue"}
        </button>
      </form>

      {/* 🔁 Toggle Email / Whatsapp */}
      <p style={{ marginTop: "15px", fontSize: "14px", color: "#333" }}>
        {loginWithWhatsapp ? (
          <>
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
              Log in with email
            </span>
          </>
        ) : (
          <>
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
              Log in with WhatsApp Number
            </span>
          </>
        )}
      </p>

      {/* 🆕 Link ke signup */}
      <p
        style={{
          marginTop: "10px",
          color: "#333",
          fontSize: "14px",
        }}
      >
        No account?{" "}
        <span
          onClick={() => navigate("/signup")}
          style={{
            color: "#2a9d8f",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Create one!
        </span>
      </p>
    </div>
  );
};

export default Login;
