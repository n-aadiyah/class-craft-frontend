// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// Helper: decode JWT payload (no dependency). Returns object or null.
function decodeJwt(token) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch (e) {
    console.warn("Failed to decode JWT", e);
    return null;
  }
}

const AuthContext = createContext({
  token: null,
  user: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    if (u) return JSON.parse(u);
    // fallback: if token exists and contains name/email
    const t = localStorage.getItem("token");
    if (t) {
      const payload = decodeJwt(t);
      if (payload) return { name: payload.name || payload.fullName || payload.email, email: payload.email };
    }
    return null;
  });

  // keep localStorage and state in sync
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);
  const logout = () => {
    setToken(null);
    setUser(null);
    // optionally notify server / clear other app state
  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for convenience
export const useAuth = () => useContext(AuthContext);
