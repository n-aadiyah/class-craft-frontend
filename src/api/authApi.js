// authApi.js
import API from "./axiosInstance";

// Forgot password
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

// Reset password
export const resetPassword = (token, password) =>
  API.put(`/auth/reset-password/${token}`, { password });
