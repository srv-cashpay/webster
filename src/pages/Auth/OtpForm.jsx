import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState(240); // 4 menit = 240 detik
  const [isExpired, setIsExpired] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const whatsapp = location.state?.whatsapp;

  // 🕒 TIMER: Hitung mundur 4 menit
  useEffect(() => {
    if (isExpired) return;
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isExpired]);

  // Format waktu ke "MM:SS"
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Input OTP
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // 🚀 Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    if (isExpired) {
      toast.error("OTP expired. Please resend OTP.");
      return;
    }

    try {
      // contoh validasi dummy
      if (code === "1234") {
        toast.success("OTP verified successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        toast.error("Invalid OTP. Try again.");
      }
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    }
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    setResending(true);
    try {
      await axios.post("https://cashpay.co.id:2356/api/auth/resend-otp", {
        email,
        whatsapp,
      });

      toast.success("A new OTP has been sent!");
      setOtp(["", "", "", ""]);
      setTimeLeft(240); // reset waktu
      setIsExpired(false);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        background: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <ToastContainer theme="colored" />
      <h2 style={{ color: "#333", fontWeight: "bold", marginBottom: "5px" }}>
        Verify your account
      </h2>
      <h4 style={{ marginBottom: "10px", color: "#333", fontWeight: "normal" }}>
        Enter the 4-digit OTP sent to your Email: <b>{email}</b>
      </h4>

      <p
        style={{
          marginBottom: "25px",
          color: isExpired ? "#e63946" : "#52796f",
          fontWeight: "bold",
        }}
      >
        {isExpired
          ? "OTP expired"
          : `Expires in ${formatTime(timeLeft)}`}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 🔢 Input OTP */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "30px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength="1"
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              style={{
                width: "60px",
                height: "60px",
                textAlign: "center",
                fontSize: "22px",
                borderRadius: "12px",
                border: "2px solid #ccc",
                outline: "none",
                background: "#fff",
                transition: "0.2s",
                color: "black",
              }}
            />
          ))}
        </div>

        {/* 🔘 Tombol Verify */}
        <button
          type="submit"
          disabled={isExpired}
          style={{
            width: "240px",
            padding: "14px",
            borderRadius: "30px",
            border: "none",
            backgroundColor: isExpired ? "#aaa" : "#52796f",
            color: "white",
            fontWeight: "bold",
            cursor: isExpired ? "not-allowed" : "pointer",
            transition: "0.3s",
          }}
        >
          Verify OTP
        </button>

        {/* 🔁 Tombol Resend muncul setelah expired */}
        {isExpired && (
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending}
            style={{
              width: "240px",
              padding: "14px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#2a9d8f",
              color: "white",
              fontWeight: "bold",
              marginTop: "15px",
              cursor: resending ? "not-allowed" : "pointer",
              opacity: resending ? 0.6 : 1,
              transition: "0.3s",
            }}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </form>
    </div>
  );
};

export default OtpForm;
