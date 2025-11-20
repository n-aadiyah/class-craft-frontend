// src/api/axiosInstance.js
import axios from "axios";

const DEFAULT_LOCAL = "http://localhost:5000/api";
const DEFAULT_PROD = "https://class-craft-backend.onrender.com/api";

// env override (useful for dev)
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? DEFAULT_LOCAL
    : DEFAULT_PROD);

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30_000, // 30s default (adjust if needed)
});

// Helper to set token programmatically (AuthContext may call this)
export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common.Authorization;
  }
}

// Attach Authorization header on every request (reads fresh token)
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (config.method === "get") {
        config.headers = config.headers || {};
        config.headers["Cache-Control"] = "no-cache";
        config.headers.Pragma = "no-cache";
      }
      return config;
    } catch (err) {
      console.warn("axios request interceptor error:", err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Global response handler: handle auth expiry centrally
API.interceptors.response.use(
  (resp) => resp,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      // token expired or invalid — clear local auth and redirect to login
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete API.defaults.headers.common.Authorization;
      } catch (e) {
        /* ignore */
      }
      // optional: redirect to login page — adjust path as needed
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;
