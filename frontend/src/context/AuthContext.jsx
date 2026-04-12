import { createContext, useState, useEffect } from "react";
import api from "../lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem("token")));

  // On app load, check if token exists and validate it
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAdmin(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          setAdmin(null);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    setAdmin(res.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
  };

  // Helper to get auth headers for protected requests
  const authHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
