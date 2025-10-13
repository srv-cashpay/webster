import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
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
    backgroundColor: "white",
    color: "#555",
  };

  const buttonStyle = {
    ...elementStyle,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#52796f",
    transition: "0.3s",
    textAlign: "center",
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !whatsapp || !password) {
      toast.warn("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    const waRegex = /^[0-9]{9,14}$/;
    if (!waRegex.test(whatsapp)) {
      toast.error("Invalid WhatsApp number (only numbers after +62)");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://cashpay.my.id/api/auth/signup",
        { email, whatsapp: `+62${whatsapp}`, password },
        { headers: { "X-Api-Key": "3f=Pr#g1@RU-nw=30" } }
      );

      if (res.data.status) {
        toast.success("Account created successfully!", { autoClose: 1800 });
        setTimeout(() => navigate("/otp"), 2000); // ubah ke halaman OTP
      } else {
        toast.error(res.data.meta?.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.meta?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Hanya izinkan angka
  const handleWhatsappChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // hapus semua non-digit
    setWhatsapp(value);
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
        Create your account
      </h2>
      <h4 style={{ marginBottom: "30px", color: "#333", fontWeight: "normal", alignItems: "center" }}>
        Please check OTP to your email
      </h4>

      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={elementStyle}
          onFocus={(e) => (e.target.style.borderColor = "#52796f")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        {/* Input WhatsApp dengan prefix +62 */}
        <div
          style={{
            ...elementStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "18px",
            paddingRight: "18px",
          }}
        >
          <span style={{ color: "#333", marginRight: "8px", flexShrink: 0 }}>
            +62
          </span>
          <input
            type="text"
            placeholder="81234567890"
            value={whatsapp}
            onChange={handleWhatsappChange}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              fontSize: "15px",
              backgroundColor: "transparent",
              color: "#555",
            }}
          />
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={elementStyle}
          onFocus={(e) => (e.target.style.borderColor = "#52796f")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#405d50")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#52796f")}
        >
          {loading ? "Please wait..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
