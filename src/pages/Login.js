import React, { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
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
      const res = await API.post("/auth/login", formData);
          const userRole = res.data.user.role;
          
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      alert("Login successful");

       // ✅ Redirect based on user role
      if (userRole === "admin") {
        navigate("/admin/dashboard");
      } else if (userRole === "teacher") {
        navigate("/teacher/dashboard");
      } else if (userRole === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/"); // fallback (optional)
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
      style={{
        background: "linear-gradient(135deg, #0d6efd 40%, #6c63ff)",
        color: "#fff",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          background: "#ffffff",
          color: "#333",
        }}
      >
        <h3 className="text-center mb-3 fw-bold text-primary">
          ClassCraft Login
        </h3>
        <p className="text-center text-muted mb-4">
          Sign in to continue to your dashboard
        </p>

        {error && (
          <div className="alert alert-danger text-center py-2">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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
              <option value="">Select Role</option>
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 mb-0">
          Don’t have an account?{" "}
          <a href="/register" className="text-decoration-none fw-semibold text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
