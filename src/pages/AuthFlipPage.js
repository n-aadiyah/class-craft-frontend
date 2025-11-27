// src/pages/AuthFlipPage.js
import React, { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const decodeJwt = (token) => {
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const routeByRole = (role) => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "teacher") navigate("/teacher/dashboard");
    else if (role === "student") navigate("/student/dashboard");
    else navigate("/");
  };

  // ------------------ LOGIN ------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // IMPORTANT: do not send `role` here to avoid role-mismatch 403
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data?.token;
      let user = res.data?.user ?? null;

      if (!token) throw new Error("No token returned");

      if (!user) {
        const payload = decodeJwt(token);
        user = {
          name: payload?.name || payload?.email,
          email: payload?.email,
          role: payload?.role,
        };
      }

      // update auth state & storage
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role ?? "");

      // Success toast
      toast.success("🎉 Login Successful!", {
        style: {
          background: "#b91c1c",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
          border: "2px solid #facc15",
          padding: "12px",
        },
        iconTheme: {
          primary: "#facc15",
          secondary: "#b91c1c",
        },
      });

      routeByRole(user.role);
    } catch (err) {
      console.error("Login failed:", err?.response ?? err);

      const msg = err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);

      toast.error("Login Failed ❌", {
        style: {
          background: "#450a0a",
          color: "white",
          border: "2px solid #b91c1c",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // ------------------ REGISTER ------------------
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await API.post("/auth/register", formData);

      toast.success("🎉 Registration successful!", {
        style: {
          background: "#b91c1c",
          color: "white",
          fontWeight: "bold",
          borderRadius: "10px",
          border: "2px solid #facc15",
        },
      });

      setTimeout(() => {
        setIsLogin(true);
        setFormData({ ...formData, password: "" });
      }, 500);
    } catch (err) {
      console.error("Register failed:", err?.response ?? err);
      setError(err?.response?.data?.message || "Registration failed");

      toast.error("Registration Failed ❌", {
        style: {
          background: "#450a0a",
          color: "white",
          border: "2px solid #b91c1c",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden text-white">
      {/* Neon Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-75 h-75 bg-red-600/30 blur-3xl rounded-full absolute top-0 left-0 animate-pulse"></div>
        <div className="w-50 h-50 bg-red-400/30 blur-3xl rounded-full absolute bottom-0 right-0 animate-ping"></div>
      </div>

      {/* 3D Flip Card */}
      <div className="flip-container">
        <div className={`flipper ${isLogin ? "" : "flipped"}`}>

          {/* LOGIN CARD */}
          <div className="front-card">
            <div className="auth-card">
              {/* left image */}
              <div className="hidden md:flex w-full md:w-1/2 justify-center mb-3">
                <img src="/girl.png" alt="Character"
                  className="w-30 md:w-50 animate-glow-float" />
              </div>

              {/* Right Form */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2">
                  ⚡ Login ⚡
                </h2>

                {error && (
                  <div className="text-red-300 text-center bg-red-900/40 border border-red-500 py-1.5 rounded-md mb-3 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-3">
                  <input type="email" name="email" placeholder="Email"
                    className="input-auth" onChange={handleChange} required />

                  <input type="password" name="password" placeholder="Password"
                    className="input-auth" onChange={handleChange} required />

                  {/* note: removed role selection from login to avoid role-mismatch 403 */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-auth"
                  >
                    {loading ? "Signing In..." : "Enter the Learning World"}
                  </button>
                </form>

                <p className="text-center text-gray-400 mt-4 text-sm">
                  Don’t have an account?{" "}
                  <span className="link-auth"
                    onClick={() => { setIsLogin(false); setError(""); }}>
                    Create one 💫
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* REGISTER CARD */}
          <div className="back-card">
            <div className="auth-card">

              <div className="hidden md:flex w-full md:w-1/2 justify-center">
                <img src="/boy.png" alt="Character"
                  className="w-30 md:w-50 animate-glow-float" />
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2">
                  🌟 Register 🌟
                </h2>

                {error && (
                  <div className="text-red-300 text-center bg-red-900/40 border border-red-500 py-1.5 rounded-md mb-3 text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                  <input type="text" name="name" placeholder="Full Name"
                    className="input-auth" onChange={handleChange} required />

                  <input type="email" name="email" placeholder="Email"
                    className="input-auth" onChange={handleChange} required />

                  <input type="password" name="password" placeholder="Password"
                    className="input-auth" onChange={handleChange} required />

                  <select name="role" className="input-auth"
                    value={formData.role} onChange={handleChange} required>
                    <option value="">Choose role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button type="submit" disabled={loading} className="btn-auth">
                    {loading ? "Registering..." : "Create Account"}
                  </button>
                </form>

                <p className="text-center text-gray-400 mt-4 text-sm">
                  Already have an account?{" "}
                  <span
                    className="link-auth"
                    onClick={() => { setIsLogin(true); setError(""); }}>
                    Login here 💫
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Styles Inject */}
      <style>{`
        .input-auth {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          background: #111;
          border: 1px solid #ff2a2a;
          color: white;
          font-size: 0.875rem;
        }
        .input-auth:focus {
          outline: none;
          border-color: #facc15;
          box-shadow: 0 0 5px #facc15;
        }
        .btn-auth {
          width: 100%;
          background: #b91c1c;
          color: white;
          font-weight: bold;
          padding: 0.5rem;
          border-radius: 0.5rem;
          text-transform: uppercase;
          border: 2px solid #facc15;
          transition: 0.3s;
        }
        .btn-auth:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px #ff3b3b;
        }
        .link-auth {
          color: #facc15;
          font-weight: bold;
          cursor: pointer;
        }
        .link-auth:hover {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
