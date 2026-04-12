import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  // While checking token, show nothing
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#080d1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          width: "48px", height: "48px",
          border: "3px solid rgba(14,165,233,0.2)",
          borderTop: "3px solid #0ea5e9",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in → redirect to login page
  if (!admin) return <Navigate to="/admin/login" replace />;

  // Logged in → show the page
  return children;
};

export default ProtectedRoute;
