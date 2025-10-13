import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const ref = queryParams.get("ref");

  useEffect(() => {
    if (ref !== "auth") {
      toast.warn("Akses tidak diizinkan", { autoClose: 1800 });
      setTimeout(() => navigate("/", { replace: true }), 1500);
    }
  }, [ref, navigate]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setShowPassword(true);
      toast.info("Please enter your password", { autoClose: 1800 });
    } else {
      toast.warn("Email cannot be empty");
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
      const response = await axios.post(
        "https://cashpay.my.id/api/auth/signin",
        { email, password },
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
        Continue with Google
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "320px",
          maxWidth: "100%",
          marginBottom: "20px",
        }}
      >
        <hr
          style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }}
        />
        <span style={{ margin: "0 10px", color: "#999", fontSize: "14px" }}>
          OR
        </span>
        <hr
          style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }}
        />
      </div>

      <form
        onSubmit={showPassword ? handleLogin : handleEmailSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
          ...elementStyle,
          display: "flex",
          alignItems: "center",
          textAlign: "left",
          justifyContent: "center",
          backgroundColor: "white",
          color: "#555",
          marginBottom: "20px",
        }}
          onFocus={(e) => (e.target.style.borderColor = "#d1d1d1")}
          onBlur={(e) => (e.target.style.borderColor = "#d1d1d1s")}
        />

        {showPassword && (
          <div style={{ position: "relative", width: "320px", maxWidth: "100%", marginBottom: "20px" }}>
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...elementStyle,
                paddingRight: "40px",
                textAlign: "left",
                backgroundColor: "white",
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
              }}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        )}
      <button
        type="submit"
        style={{
          ...buttonStyle,
          opacity:
            loading || (!showPassword && !email.includes("@")) ? 0.5 : 1,
          cursor:
            loading || (!showPassword && !email.includes("@"))
              ? "not-allowed"
              : "pointer",
        }}
        disabled={loading || (!showPassword && !email.includes("@"))}
        onMouseEnter={(e) => {
          if (!loading && (showPassword || email.includes("@")))
            e.target.style.backgroundColor = "#405d50";
        }}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#52796f")}
      >
        {showPassword ? (loading ? "Logging in..." : "Sign In") : "Continue"}
      </button>
      </form>
    </div>
  );
};

export default Login;
