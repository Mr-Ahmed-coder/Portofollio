import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { admin, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) {
      navigate("/admin", { replace: true });
    }
  }, [admin, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    setError("");
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/admin");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.status >= 500) {
        setError("Server error. Please try again in a moment.");
      } else if (err.code === "ERR_NETWORK") {
        setError("Unable to reach the server. Check that the backend is running.");
      } else {
        setError(err.response?.data?.message || "Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(14,165,233,0.05)",
    border: "1px solid rgba(14,165,233,0.2)",
    borderRadius: "10px",
    color: "#ffffff",
    fontSize: "15px",
    fontFamily: "'Barlow', sans-serif",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.3s ease",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #080d1e 0%, #0d1535 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(14,165,233,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(14,165,233,0.04) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: "300px", height: "300px",
        background: "radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "10%",
        width: "250px", height: "250px",
        background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Login Card */}
      <div style={{
        width: "100%", maxWidth: "420px",
        background: "rgba(15,27,48,0.85)",
        border: "1px solid rgba(14,165,233,0.2)",
        borderRadius: "20px",
        padding: "48px 40px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(14,165,233,0.08)",
        position: "relative", zIndex: 2,
        animation: "fadeIn 0.5s ease",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "52px", height: "52px",
            background: "linear-gradient(135deg, #0ea5e9, #0369a1)",
            borderRadius: "14px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: "900", color: "#fff",
            margin: "0 auto 14px",
            boxShadow: "0 0 30px rgba(14,165,233,0.4)",
          }}>J</div>
          <h1 style={{
            color: "#ffffff",
            fontSize: "26px",
            fontWeight: "900",
            fontFamily: "'Barlow Condensed', sans-serif",
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}>Admin Login</h1>
          <p style={{
            color: "#64748b",
            fontSize: "13px",
            fontFamily: "'Barlow', sans-serif",
          }}>Sign in to manage your portfolio</p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            padding: "12px 16px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: "8px",
            color: "#f87171",
            fontSize: "13px",
            fontFamily: "'Barlow', sans-serif",
            marginBottom: "20px",
            textAlign: "center",
          }}>
            ❌ {error}
          </div>
        )}

        {/* Email */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block", color: "#64748b",
            fontSize: "11px", fontWeight: "700",
            letterSpacing: "1.5px", textTransform: "uppercase",
            fontFamily: "'Barlow', sans-serif", marginBottom: "8px",
          }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="admin@portfolio.com"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(14,165,233,0.2)"}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "28px" }}>
          <label style={{
            display: "block", color: "#64748b",
            fontSize: "11px", fontWeight: "700",
            letterSpacing: "1.5px", textTransform: "uppercase",
            fontFamily: "'Barlow', sans-serif", marginBottom: "8px",
          }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(14,165,233,0.2)"}
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            background: loading
              ? "rgba(14,165,233,0.4)"
              : "linear-gradient(135deg, #0ea5e9, #0369a1)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontFamily: "'Barlow', sans-serif",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 0 30px rgba(14,165,233,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={e => {
            if (!loading) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 45px rgba(14,165,233,0.5)";
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.3)";
          }}
        >
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <p style={{
          color: "#334155", fontSize: "12px",
          fontFamily: "'Barlow', sans-serif",
          textAlign: "center", marginTop: "24px",
        }}>
          🔒 Restricted to admin only
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Login;
