import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // hanya angka
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus ke kolom berikutnya
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    // simulasi validasi OTP
    if (code === "1234") {
      toast.success("OTP verified!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      toast.error("Invalid OTP");
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
        Verify your account
      </h2>
      <h4 style={{ marginBottom: "30px", color: "#333", fontWeight: "normal" }}>
        Enter the 4-digit OTP sent to your Email Address
      </h4>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
              }}
              onFocus={(e) => (e.target.style.borderColor = "#52796f")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          ))}
        </div>

        <button
          type="submit"
          style={{
            width: "240px",
            padding: "14px",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#52796f",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#405d50")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#52796f")}
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpForm;
