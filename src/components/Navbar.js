// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, setToken, setUser } = useAuth();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "User";

  const initials = displayName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* If NOT logged in -> show login button */}
        {!token ? (
          <button
            type="button"
            className="text-white font-semibold rounded hover:bg-white/20 px-4 py-2 text-sm transition"
            onClick={() => navigate("/login")}
          >
            Portal Login
          </button>
        ) : (
          /* If logged in -> show user */
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
              {initials}
            </div>
            <span className="text-white font-semibold hidden sm:block">
              {displayName}
            </span>

            <button
              onClick={handleLogout}
              className="text-white rounded hover:bg-white/20 px-3 py-1 text-sm transition"
            >
              Logout
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white">
            GAYATHRI CENTRAL SCHOOL
          </h1>
        </div>

        <Link
          to="/"
          className="text-white font-semibold rounded hover:bg-white/20 px-4 py-2 text-sm transition"
        >
          Home
        </Link>
{/* If logged-in → show dashboard button */}
{token && user?.role && (
  <button
    onClick={() => {
      if (user.role === "teacher") navigate("/teacher/dashboard");
      else if (user.role === "student") navigate("/student/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    }}
    className="text-white font-semibold rounded hover:bg-white/20 px-4 py-2 text-sm transition"
  >
    <i className="bi bi-box-arrow-in-right"></i>
    Dashboard
  </button>
)}

      </div>

      <hr className="border-gray-200/30 dark:border-gray-700/30 mt-4" />

      <nav className="flex justify-center items-center gap-8 pt-4 flex-wrap">
        <Link
          to="/student"
          className="text-red-700 font-bold border-b-2 border-red-700 pb-2 text-sm"
        >
          Student
        </Link>

        <Link
          to="/curriculum"
          className="text-red-700 hover:text-red-800 pb-2 border-b-2 border-transparent hover:border-red-700 transition-colors duration-300 text-sm"
        >
          Curriculum
        </Link>

        <Link
          to="/leaderboard"
          className="text-red-700 hover:text-red-800 pb-2 border-b-2 border-transparent hover:border-red-700 transition-colors duration-300 text-sm"
        >
          Leaderboard
        </Link>

        <Link
          to="/about"
          className="text-red-700 hover:text-red-800 pb-2 border-b-2 border-transparent hover:border-red-700 transition-colors duration-300 text-sm"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
