import axios from "axios";

// ✅ Auto-detect environment: localhost → use local API; otherwise use live API
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api" // Local backend
    : "https://class-craft-backend.onrender.com/api"; // Live backend on Render

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
