// src/api/axiosInstance.js
import axios from "axios";

const DEFAULT_LOCAL = "http://localhost:5000/api";
const DEFAULT_PROD = "https://class-craft-backend.onrender.com/api";

// Allow env override first (useful for dev)
const BASE_URL = process.env.REACT_APP_API_BASE_URL ||
  (["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? DEFAULT_LOCAL
    : DEFAULT_PROD);

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if token present in localStorage
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // ensure headers exist
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
      // don't block requests if localStorage access fails; surface error
      console.warn("axios request interceptor error:", err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default API;
