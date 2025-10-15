import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const fullName = location.state?.fullName || "";
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateWhatsapp = (num) =>
    /^\+?[0-9]{10,15}$/.test(num);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !whatsapp || !password) {
      toast.warn("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!validateWhatsapp(whatsapp)) {
      toast.error("Invalid WhatsApp number");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://cashpay.my.id/api/auth/signup",
        {
          full_name: fullName,
          email,
          whatsapp,
          password,
        },
        {
          headers: {
            "X-Api-Key": "3f=Pr#g1@RU-nw=30",
          },
        }
      );

      if (res.data.status) {
        toast.success("Signup successful! Please verify OTP.");
        // Tunggu sebentar agar toast terlihat, lalu arahkan ke OTP
        setTimeout(
          () => navigate("/signup/otp", { state: { email, whatsapp } }),
          2000
        );
      } else {
        toast.error(res.data.meta?.message || "Signup failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.meta?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        flexDirection: "column",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <ToastContainer theme="colored" />

      <h2 style={{ color: "#333", fontWeight: "bold" }}>
        Complete your account
      </h2>
      <form
        onSubmit={handleSignup}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "320px",
        }}
      >
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            textAlign: "center",
            backgroundColor: "#fff",   // 🟢 kolom putih
            color: "#000",
          }}
        />
        <input
          type="text"
          placeholder="WhatsApp number (e.g. +628123456789)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            marginBottom: "15px",
            textAlign: "center",
            backgroundColor: "#fff",   // 🟢 kolom putih
            color: "#000",
          }}
        />
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            marginBottom: "25px",
            textAlign: "center",
            backgroundColor: "#fff",   // 🟢 kolom putih
            color: "#000",
            }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#52796f",
            color: "white",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
