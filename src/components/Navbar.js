// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard } from "lucide-react";


const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, setToken, setUser } = useAuth();
  const [showMenu, setShowMenu] = React.useState(false);


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

  const [scrolled, setScrolled] = React.useState(false);

React.useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


return (
<header
  className={`fixed top-0 left-0 right-0 z-50 border-b border-red-400/20 transition-all duration-300 ${
    scrolled
      ? "bg-black/40 backdrop-blur-md shadow-md"
      : "bg-white/10 backdrop-blur-0"
  }`}
>
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">

    {/* Left Side — USER */}
    <div className="flex items-center gap-3">
      {!token ? (
        <button
          type="button"
          className="text-white font-semibold rounded-lg bg-red-600 hover:bg-red-700 px-3 py-2 text-xs md:text-sm transition-all"
          onClick={() => navigate("/login")}
        >
          Portal Login
        </button>
      ) : (
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-red-600 to-yellow-400 text-white flex items-center justify-center font-bold shadow text-sm md:text-base">
            {initials}
          </div>

          {/* Hide name on very small screens */}
          <span className="hidden sm:block text-white font-semibold text-sm">
            {displayName}
          </span>

          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 rounded-md px-1 py-1 text-xs md:text-sm transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </div>

    {/* Center — SCHOOL NAME */}
    <h1 className="text-center text-sm sm:text-base md:text-2xl lg:text-3xl font-serif font-extrabold text-white tracking-wide absolute left-1/2 -translate-x-1/2 whitespace-nowrap drop-shadow-lg">
  GAYATHRI CENTRAL SCHOOL
</h1>


    {/* Right Side — HOME + DASHBOARD */}
    {/* Hidden on mobile */}
    <div className="hidden sm:flex items-center gap-1 md:gap-3">
      <Link
        to="/"
        className="text-white font-semibold rounded hover:bg-white/20 px-3 py-1 text-xs md:text-sm transition-all"
      >
        Home
      </Link>

      {token && user?.role && (
        <button
          onClick={() => {
            if (user.role === "teacher") navigate("/teacher/dashboard");
            else if (user.role === "student") navigate("/student/dashboard");
            else if (user.role === "admin") navigate("/admin/dashboard");
            else navigate("/");
          }}
          className="text-white font-semibold rounded hover:bg-white/20 px-3 py-1 text-xs md:text-sm transition-all flex items-center gap-1 group"
        >
          <LayoutDashboard
            size={16}
            className="text-red-500 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6"
          />
          Dashboard
        </button>
      )}
    </div>

    {/* Mobile Menu Button */}
    <button
      className="sm:hidden text-white text-xl px-2 py-1 rounded hover:bg-white/20 transition"
      onClick={() => setShowMenu((prev) => !prev)}
    >
      ☰
    </button>
  </div>

  {/* Mobile Dropdown Menu */}
  {showMenu && (
  <div className="sm:hidden flex flex-col items-start gap-3 px-4 py-3 bg-white/10 backdrop-blur-lg animate-slide-down shadow-lg border-t border-red-300/30">
    <Link
      to="/"
      className="text-white font-medium py-1"
      onClick={() => setShowMenu(false)}
    >
      Home
    </Link>

    {token && user?.role && (
      <button
        onClick={() => {
          if (user.role === "teacher") navigate("/teacher/dashboard");
          else if (user.role === "student") navigate("/student/dashboard");
          else if (user.role === "admin") navigate("/admin/dashboard");
          else navigate("/");
          setShowMenu(false);
        }}
        className="text-white font-medium py-1 flex gap-2"
      >
        <LayoutDashboard size={16} /> Dashboard
      </button>
    )}
  </div>
)}


  {/* Bottom Nav — stays same */}
  <nav className="flex justify-center items-center gap-4 md:gap-6 py-2 flex-wrap text-xs md:text-sm font-semibold">
    <Link
      to="/student"
      className="text-white font-bold border-b-2 border-red-600 pb-1"
    >
      Student
    </Link>
    <Link
      to="/curriculum"
      className="text-white hover:text-red-600 pb-1 border-b-2 border-transparent hover:border-red-600 transition-all"
    >
      Curriculum
    </Link>
    <Link
      to="/leaderboard"
      className="text-white hover:text-red-600 pb-1 border-b-2 border-transparent hover:border-red-600 transition-all"
    >
      Leaderboard
    </Link>
    <Link
      to="/about"
      className="text-white hover:text-red-600 pb-1 border-b-2 border-transparent hover:border-red-600 transition-all"
    >
      About
    </Link>
  </nav>
</header>
);

};

export default Navbar;
