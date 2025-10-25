import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    textAlign: "left",
    backgroundColor: "white",
    color: "black"
  };

  const buttonStyle = {
    ...elementStyle,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#52796f",
    transition: "0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // 👈 tulisan jadi tepat di tengah
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.warn("Email cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://cashpay.my.id:2356/api/auth/request-reset-password",
        { email },
        { headers: { "X-Api-Key": "3f=Pr#g1@RU-nw=30" } }
      );

      if (response.data.status) {
        const token = response.data.data?.token;

        if (token) {
          toast.success("OTP sent successfully!", { autoClose: 1500 });
          setTimeout(() => {
            navigate(`/verify-reset?token_verfied=${token}`);
          }, 2000);
        } else {
          toast.error("Missing token from server response");
        }
      } else {
        toast.error(response.data.message || "Request failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
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
      <ToastContainer position="top-right" hideProgressBar theme="colored" />

      <h2 style={{ color: "#333", fontWeight: "bold", marginBottom: "10px" }}>
        Forgot your password?
      </h2>
      <p style={{ color: "#555", marginBottom: "25px", fontSize: "15px" }}>
        Enter your email and we’ll send a reset code.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={elementStyle}
          onFocus={(e) => (e.target.style.borderColor = "#52796f")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <button
          type="submit"
          style={{
            ...buttonStyle,
            opacity: loading || !email.trim() ? 0.5 : 1,
            cursor: loading || !email.trim() ? "not-allowed" : "pointer",
          }}
          disabled={loading || !email.trim()}
        >
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>

      <p style={{ marginTop: "20px", color: "#333", fontSize: "14px" }}>
        <span
          onClick={() => navigate("/login?ref=auth")}
          style={{
            color: "#2a9d8f",
            fontWeight: "bold",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Back to login
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
