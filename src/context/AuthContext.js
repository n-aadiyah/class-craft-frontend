// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import API, { setAuthToken } from "../api/axiosInstance";

/**
 * Safe JWT decode (browser). Returns payload object or null.
 * Handles base64url padding.
 */
function decodeJwt(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    // base64url -> base64 and pad
    let b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const json = atob(b64);
    return JSON.parse(json);
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
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  // store token in internal state
  const [token, _setToken] = useState(() => localStorage.getItem("token") || null);

  // initialize user from localStorage or best-effort from token payload
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    if (u) {
      try {
        return JSON.parse(u);
      } catch {
        // fallthrough
      }
    }
    const t = localStorage.getItem("token");
    if (t) {
      const payload = decodeJwt(t);
      if (payload) {
        return { name: payload.name || payload.fullName || payload.email, email: payload.email, role: payload.role };
      }
    }
    return null;
  });

  // stable setter: updates state, localStorage and axios header via setAuthToken
  const setToken = useCallback((newToken) => {
    _setToken(newToken || null);
    if (newToken) {
      try { localStorage.setItem("token", newToken); } catch (e) { /* ignore */ }
      setAuthToken(newToken);
    } else {
      try { localStorage.removeItem("token"); } catch (e) { /* ignore */ }
      setAuthToken(null);
    }
  }, []);

  // persist user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      try { localStorage.setItem("user", JSON.stringify(user)); } catch (e) { /* ignore */ }
    } else {
      try { localStorage.removeItem("user"); } catch (e) { /* ignore */ }
    }
  }, [user]);

  // ensure axios has token on initial mount (reads from state)
  useEffect(() => {
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  // Auto-logout at token expiry (if token has exp claim)
  useEffect(() => {
    if (!token) return undefined;
    const payload = decodeJwt(token);
    if (!payload || !payload.exp) return undefined;

    const expMs = payload.exp * 1000;
    const now = Date.now();
    if (expMs <= now) {
      // already expired — clear via public setter
      setToken(null);
      setUser(null);
      return undefined;
    }

    const timeout = expMs - now;
    const timer = setTimeout(() => {
      setToken(null);
      setUser(null);
      // cleanup localStorage and axios header handled by setToken
    }, timeout);

    return () => clearTimeout(timer);
  }, [token, setToken]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    // setToken already clears localStorage and axios header
  }, [setToken]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
