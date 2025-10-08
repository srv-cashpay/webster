import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
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

const handleSignup = async (e) => {
  e.preventDefault();

  if (!fullName.trim()) {
    toast.warn("Full name is required");
    return;
  }

  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(fullName.trim())) {
    toast.error("Full name can only contain letters and spaces");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      "https://cashpay.my.id:2356/api/auth/signup",
      {
        full_name: fullName,
      },
      {
        headers: {
          "X-Api-Key": "3f=Pr#g1@RU-nw=30",
        },
      }
    );

    if (response.data.status) {
      toast.success("Sign up successful! Redirecting...", { autoClose: 1800 });
      setTimeout(() => navigate("/login?ref=auth"), 2000);
    } else {
      toast.error(response.data.meta?.message || "Signup failed");
    }
  } catch (err) {
    toast.error(err.response?.data?.meta?.message || err.message);
  } finally {
    setLoading(false);
  }
};

  const handleGoogleSignup = () => {
    toast.info("Google Sign Up clicked!");
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
      <h4 style={{ marginBottom: "30px", color: "#333", fontWeight: "normal" }}>
        Join the future of digital payments
      </h4>

      <button
        type="button"
        onClick={handleGoogleSignup}
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
        Sign up with Google
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
        <hr style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }} />
        <span style={{ margin: "0 10px", color: "#999", fontSize: "14px" }}>OR</span>
        <hr style={{ flex: 1, border: "none", height: "1px", backgroundColor: "#ccc" }} />
      </div>

      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={elementStyle}
          onFocus={(e) => (e.target.style.borderColor = "#52796f")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <button
          type="submit"
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          disabled={loading}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#405d50")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#52796f")}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
