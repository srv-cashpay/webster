import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOtp, verifyOtp } from "../../services/auth/signup";
import "react-toastify/dist/ReactToastify.css";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const [timeLeft, setTimeLeft] = useState(240); // 4 menit
  const [isExpired, setIsExpired] = useState(false);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const whatsapp = location.state?.whatsapp;
 const token = location.state?.token;
  // =========================
  // ⏱ TIMER OTP
  // =========================
  useEffect(() => {
    if (isExpired) return;

    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isExpired]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // =========================
  // 🔢 INPUT OTP
  // =========================
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =========================
  // ✅ SUBMIT OTP
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }
if (!token || typeof token !== "string") {
    toast.error("Token tidak valid");
    return;
  }

    if (isExpired) {
      toast.error("OTP expired. Please resend OTP.");
      return;
    }

    setVerifying(true);

    try {
      // 👉 kalau backend sudah aktif
      await verifyOtp(token, code);


      toast.success("OTP verified successfully!");
      setTimeout(() => navigate("/auth?ref=encrypt"), 1500);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Invalid OTP. Try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  // =========================
  // 🔁 RESEND OTP
  // =========================
  const handleResendOtp = async () => {
    setResending(true);

    try {
      await resendOtp({
        email,
        whatsapp,
      });

      toast.success("A new OTP has been sent!");
      setOtp(["", "", "", ""]);
      setTimeLeft(240);
      setIsExpired(false);
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setResending(false);
    }
  };

  // =========================
  // 🎨 UI
  // =========================
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

      <h2 style={{ fontWeight: "bold", color: "#333" }}>
        Verify your account
      </h2>

      <h4 style={{ fontWeight: "normal",textAlign: "center", color: "#444" }}>
        Enter the 4-digit OTP sent to <b>{email}</b>
      </h4>

      <p
        style={{
          marginBottom: "25px",
          fontWeight: "bold",
          color: isExpired ? "#e63946" : "#52796f",
        }}
      >
        {isExpired ? "OTP expired" : `Expires in ${formatTime(timeLeft)}`}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* INPUT OTP */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "30px" }}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{
                width: "60px",
                height: "60px",
                textAlign: "center",
                fontSize: "22px",
                borderRadius: "12px",
                border: "2px solid #ccc",
                outline: "none",
              }}
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          type="submit"
          disabled={isExpired || verifying}
          style={{
            width: "240px",
            padding: "14px",
            borderRadius: "30px",
            border: "none",
            backgroundColor:
              isExpired || verifying ? "#aaa" : "#52796f",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {verifying ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND */}
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
              opacity: resending ? 0.6 : 1,
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
