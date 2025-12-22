// src/api/axiosInstance.js
import axios from "axios";

/**
 * Build a normalized baseURL that ALWAYS ends with "/api" (no trailing slash),
 * and prevents double "/api/api" when callers use API.get('/...').
 *
 * Acceptable env values:
 * - REACT_APP_API_BASE_URL = "http://localhost:5000"          -> normalized to http://localhost:5000/api
 * - REACT_APP_API_BASE_URL = "http://localhost:5000/api"      -> normalized to http://localhost:5000/api
 * - REACT_APP_API_BASE_URL = "" (not set)                    -> fallback to DEFAULTs below
 */

const DEFAULT_LOCAL = "http://localhost:5000";
const DEFAULT_PROD = "https://class-craft-backend.onrender.com";

function normalizeBase(originOrUrl) {
  if (!originOrUrl || typeof originOrUrl !== "string") return null;
  // remove trailing spaces
  let url = originOrUrl.trim();

  // remove trailing slash(es)
  url = url.replace(/\/+$/, "");

  // if it already ends with "/api", keep it
  if (url.toLowerCase().endsWith("/api")) return url;

  // otherwise append /api
  return `${url}/api`;
}

// prefer explicit env var (developer chooses), else detect hostname
const env = typeof process !== "undefined" ? process.env.REACT_APP_API_BASE_URL : undefined;

const ORIGIN = env && env.length ? env : (["localhost", "127.0.0.1"].includes(window.location.hostname) ? DEFAULT_LOCAL : DEFAULT_PROD);

const BASE_URL = normalizeBase(ORIGIN);

// Create axios instance
const API = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
});

// helper to set Authorization header programmatically
export function setAuthToken(token) {
  if (token) API.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete API.defaults.headers.common.Authorization;
}

// Attach Authorization and anti-cache headers
API.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      if ((config.method || "").toLowerCase() === "get") {
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

// central response handler for 401
API.interceptors.response.use(
  (r) => r,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete API.defaults.headers.common.Authorization;
      } catch (e) { /* ignore */ }
      if (typeof window !== "undefined") window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default API;
