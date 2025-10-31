import React, { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true = Login, false = Register
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      const userRole = res.data.user.role;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", userRole);
      alert("🎉 Login successful!");

      if (userRole === "admin") navigate("/admin/dashboard");
      else if (userRole === "teacher") navigate("/teacher/dashboard");
      else if (userRole === "student") navigate("/student/dashboard");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/register", formData);
      alert("🎉 Registration successful!");
      setTimeout(() => setIsLogin(true), 600);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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

      {/* 3D Flip Card Container */}
      <div className="flip-container">
        <div className={`flipper ${isLogin ? "" : "flipped"}`}>
          {/* ---------- LOGIN FRONT ---------- */}
          <div className="front-card">
            <div className="auth-card">
              <div className="hidden md:flex w-full md:w-1/2 justify-center mb-3 md:mb-0">
                <img
                  src="/girl.png"
                  alt="Anime Character"
                  className="w-30 md:w-50 animate-glow-float drop-shadow-[0_0_10px_#ff0033]"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2 drop-shadow-[0_0_12px_#ff1a1a]">
                  ⚡ Login ⚡
                </h2>
                <p className="text-center text-gray-400 mb-4 text-sm">
                  Step into the world of learning!
                </p>

                {error && (
                  <div className="text-red-300 text-center bg-red-900/40 border border-red-500 py-1.5 rounded-md mb-3 font-medium text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="role"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white text-sm"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-700 text-white font-bold py-2 rounded-lg shadow-[0_0_15px_#ff0033] hover:shadow-[0_0_30px_#ff1a1a] transition-all duration-300 hover:scale-[1.02] text-sm"
                  >
                    {loading ? "Signing In..." : "Enter the Learning world"}
                  </button>
                </form>

                <p className="text-center text-gray-400 mt-4 text-sm">
                  Don’t have an account?{" "}
                  <span
                    onClick={() => setIsLogin(false)}
                    className="text-red-400 font-semibold  hover:text-red-300 cursor-pointer"
                  >
                    Create one 💫
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* ---------- REGISTER BACK ---------- */}
          <div className="back-card">
            <div className="auth-card">
              <div className="hidden md:flex w-full md:w-1/2 justify-center mb-3 md:mb-0">
                <img
                  src="/boy.png"
                  alt="Anime Character"
                  className="w-30 md:w-50 animate-glow-float drop-shadow-[0_0_15px_#ff0033]"
                />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-extrabold text-center text-red-600 mb-2 drop-shadow-[0_0_12px_#ff1a1a]">
                  🌟 Register 🌟
                </h2>
                <p className="text-center text-gray-400 mb-4 text-sm">
                  Join the adventure of learning!
                </p>

                {error && (
                  <div className="text-red-300 text-center bg-red-900/40 border border-red-500 py-1.5 rounded-md mb-3 font-medium text-sm">
                    {error}
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white placeholder-gray-500 text-sm"
                    onChange={handleChange}
                    required
                  />
                  <select
                    name="role"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-red-500 focus:ring-2 focus:ring-red-400 focus:outline-none text-white text-sm"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose role</option>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-700 text-white font-bold py-2 rounded-lg shadow-[0_0_15px_#ff0033] hover:shadow-[0_0_30px_#ff1a1a] transition-all duration-300 hover:scale-[1.02] text-sm"
                  >
                    {loading ? "Registering..." : "Create Account"}
                  </button>
                </form>

                <p className="text-center text-gray-400 mt-4 text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => setIsLogin(true)}
                    className="text-red-400 font-semibold hover:text-red-300 cursor-pointer"
                  >
                    Login here 💫
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Glow Animation + Flip Animation */}
      <style>{`
        .animate-glow-float {
          animation: glowFloat 2s ease-in-out infinite;
        }
        @keyframes glowFloat {
          0%, 100% { transform: translateY(0); filter: drop-shadow(0 0 10px #ff0033); }
          50% { transform: translateY(-8px); filter: drop-shadow(0 0 20px #ff1a1a); }
        }

        /* 3D Flip Card Animation */
        .flip-container {
          perspective: 1500px;
          width: 80%;
          max-width: 900px;
          height: 70vh;
        }
        .flipper {
          position: center;
          width: 90%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.4, 0.2, 0.2, 1.2);
        }
        .flipper.flipped {
          transform: rotateY(180deg);
        }
        .front-card, .back-card {
          position: absolute;
          width: 90%;
          height: 100%;
          backface-visibility: hidden;
          top: 0;
          left: 0;
        }
        .back-card {
          transform: rotateY(180deg);
        }
        .auth-card {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background-color: rgba(0,0,0,0.7);
          border: 1px solid #f00;
          border-radius: 1.5rem;
          box-shadow: 0 0 25px #f00;
          padding: 3rem;
          height: 100%;
          backdrop-filter: blur(6px);
        }
      `}</style>
    </div>
  );
};

export default AuthPage;
