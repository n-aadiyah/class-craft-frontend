// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

// ✅ Render backend URL or environment variable
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://class-craft-backend.onrender.com";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
    const res = await axios.post(`${BASE_URL}/api/auth/register`, formData, {
  headers: { "Content-Type": "application/json" },
});
console.log(res.data); // 👈 use the response, warning will disappear
      alert("Registration successful! 🎉");
      navigate("/login");
    } catch (err) {
      console.error("Register Error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        background: "linear-gradient(135deg, #6c63ff 40%, #0d6efd)",
        color: "#fff",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "16px",
          background: "#ffffff",
          color: "#333",
        }}
      >
        <h3 className="text-center mb-3 fw-bold text-primary">
          Create Your Account
        </h3>
        <p className="text-center text-muted mb-4">
          Register to access your ClassCraft dashboard
        </p>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Create a password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Role</label>
            <select
              name="role"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-decoration-none fw-semibold text-primary"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
