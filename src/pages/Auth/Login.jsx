import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState(""); // email atau whatsapp
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginWithWhatsapp, setLoginWithWhatsapp] = useState(false);
  const [countryCode, setCountryCode] = useState("+62");

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  // 🔒 Akses hanya dari ?ref=auth
  useEffect(() => {
    if (ref !== "auth") {
      toast.warn("Akses tidak diizinkan", { autoClose: 1800 });
      setTimeout(() => navigate("/", { replace: true }), 1500);
    }
  }, [ref, navigate]);

  // 🔹 Google Login (gunakan id_token, bukan access_token)
  const login = useGoogleLogin({
    flow: "implicit", // ambil token langsung dari Google popup
    onSuccess: async (tokenResponse) => {
      try {
        // ✅ Ambil ID Token dari Google
        const idToken = tokenResponse?.id_token;

        if (!idToken) {
          toast.error("Google login gagal: idToken tidak ditemukan");
          return;
        }

        // Optional: decode token untuk debugging
        const userInfo = jwtDecode(idToken);
        console.log("Google User:", userInfo);

        // ✅ Kirim ke backend
        const res = await axios.post(
          "https://cashpay.my.id:2356/api/google",
          { idToken }, // backend kamu minta field ini
          { headers: { "X-Api-Key": "3f=Pr#g1@RU-nw=30" } }
        );

        if (res.data.status) {
          const data = res.data.data;
          Cookies.set("token", data.token);
          Cookies.set("refresh_token", data.refresh_token);
          localStorage.setItem("token", data.merchant_id);

          toast.success("Login with Google successful!", { autoClose: 1500 });
          setTimeout(() => onLogin && onLogin(), 1500);
        } else {
          toast.error(res.data.meta?.message || "Google login failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Google login error");
      }
    },
    onError: () => toast.error("Google login failed!"),
  });

  // 🔹 Submit email / nomor
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (identifier.trim()) {
      setShowPassword(true);
      toast.info("Please enter your password", { autoClose: 1800 });
    } else {
      toast.warn(
        loginWithWhatsapp ? "Nomor tidak boleh kosong" : "Email tidak boleh kosong"
      );
    }
  };

  // 🔹 Login manual
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.warn("Password cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const payload = loginWithWhatsapp
        ? { whatsapp: countryCode + identifier }
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

  // 🔹 Style umum
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
        onClick={() => login()}
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
              placeholder="811-2345-6789"
              value={identifier
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
                .substring(0, 13)}
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, "");
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
                backgroundColor: "white",
              }}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}

        <p
          onClick={() => navigate("/forgot-password")}
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
          Forgot password?
        </p>

        <button
          type="submit"
          style={{
            ...buttonStyle,
            opacity: loading || (!showPassword && !identifier.trim()) ? 0.5 : 1,
          }}
          disabled={loading || (!showPassword && !identifier.trim())}
        >
          {showPassword ? (loading ? "Logging in..." : "Sign In") : "Continue"}
        </button>
      </form>

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
            Log in with email
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
            Log in with WhatsApp Number
          </span>
        )}
      </p>

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
