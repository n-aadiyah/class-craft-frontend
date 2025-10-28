// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
   const navigate = useNavigate();

  return (
    <header className="absolute top-0 left-0 right-0 z-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
         <button
      type="button"
      className="text-white font-semibold rounded hover:bg-white/20 px-4 py-2 text-sm transition"
      onClick={() => navigate("/login")}
    >
      Portal Login
    </button>

        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white">
            GAYATHRI CENTRAL  SCHOOL
          </h1>
        </div>

        <Link
          to="/"
          className="text-white font-semibold rounded hover:bg-white/20 px-4 py-2 text-sm transition"
        >
          Home
        </Link>
      </div>

      <hr className="border-gray-200/30 dark:border-gray-700/30 mt-4" />

      <nav className="flex justify-center items-center gap-8 pt-4 flex-wrap">
        <Link
          to="/student"
          className="text-primary font-bold border-b-2 border-primary pb-2 text-sm"
        >
          Student
        </Link>
        <Link
          to="/curriculum"
          className="text-white hover:text-primary pb-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-sm"
        >
          Curriculum
        </Link>
        <Link
          to="/leaderboard"
          className="text-white hover:text-primary pb-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-sm"
        >
          Leaderboard
        </Link>
        <Link
          to="/about"
          className="text-white hover:text-primary pb-2 border-b-2 border-transparent hover:border-primary transition-colors duration-300 text-sm"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
