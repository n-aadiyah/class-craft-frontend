// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard } from "lucide-react";
import API from "../api/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, token, setToken, setUser } = useAuth();
  const [showMenu, setShowMenu] = React.useState(false);

  // Show navbar only at top
  const [showNavbar, setShowNavbar] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => setShowNavbar(window.scrollY < 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Display name
  const displayName =
    user?.name || user?.fullName || user?.email?.split("@")[0] || "User";

  const initials = displayName?.charAt(0)?.toUpperCase() || "U";
  const [isVisible, setIsVisible] = React.useState(true);
const lastScrollY = React.useRef(0);

React.useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY.current) {
      // scrolling down → hide navbar
      setIsVisible(false);
    } else {
      // scrolling up → show navbar
      setIsVisible(true);
    }

    lastScrollY.current = currentScroll;
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  // Avatar path fix
  const makeFullAvatarUrl = (avatarUrl) => {
    if (!avatarUrl) return null;
    if (avatarUrl.startsWith("http")) return avatarUrl;

    const base =
      API?.defaults?.baseURL?.replace(/\/api\/?$/, "") ||
      window.location.origin;

    return avatarUrl.startsWith("/")
      ? `${base}${avatarUrl}`
      : `${base}/${avatarUrl}`;
  };

  const avatarSrc = makeFullAvatarUrl(user?.avatarUrl || user?.avatar);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-ml 
      transition-all duration-500 
      ${showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
      bg-black/10 border-b border-white/10 shadow-md`}
    >
      {/* TOP MAIN ROW */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between relative">

        {/* LEFT USER AREA */}
        <div className="flex items-center gap-3">
          {!token ? (
            <button
              className="text-white bg-red-600 hover:bg-red-700 
                         px-4 py-2 text-xs md:text-sm 
                         rounded-lg font-semibold transition-all"
              onClick={() => navigate("/login")}
            >
              Portal Login
            </button>
          ) : (
            <div className="flex items-center gap-2 md:gap-3">
              {/* Avatar */}
              {avatarSrc ? (
                <img alt=" "
                  src={avatarSrc}
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-yellow-400 shadow"
                />
              ) : (
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br 
                                from-red-600 to-yellow-400 text-white 
                                flex items-center justify-center font-bold shadow">
                  {initials}
                </div>
              )}

              {/* Display name */}
              <span className="hidden sm:block text-white font-semibold text-sm">
                {displayName}
              </span>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 
                           px-2 py-1 text-xs md:text-sm rounded-md shadow transition-all"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* CENTER SCHOOL TITLE */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="text-white font-serif font-extrabold drop-shadow-md
                         text-sm sm:text-base md:text-2xl lg:text-3xl whitespace-nowrap">
            GAYATHRI CENTRAL SCHOOL
          </h1>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="hidden sm:flex items-center">
          {token && user?.role && (
            <button
              onClick={() => {
                if (user.role === "teacher") navigate("/teacher/dashboard");
                else if (user.role === "student") navigate("/student/dashboard");
                else if (user.role === "admin") navigate("/admin/dashboard");
                else navigate("/");
              }}
              className="flex items-center gap-1 px-3 py-1 rounded 
                         text-white hover:bg-white/20 
                         text-xs md:text-sm font-semibold transition-all"
            >
              <LayoutDashboard size={18} className="text-yellow-400" />
              Dashboard
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="sm:hidden text-white text-xl px-2 py-1 
                    rounded hover:bg-white/20 transition-all"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {showMenu && (
        <div className="sm:hidden px-4 py-3 bg-black/40 backdrop-blur-xl shadow-inner border-t border-white/10">
          <Link
            to="/"
            className="text-white block py-2"
            onClick={() => setShowMenu(false)}
          >
            Home
          </Link>

          {token && (
            <button
              onClick={() => {
                if (user.role === "teacher") navigate("/teacher/dashboard");
                else if (user.role === "student") navigate("/student/dashboard");
                else navigate("/");
                setShowMenu(false);
              }}
              className="text-white flex items-center gap-2 py-2"
            >
              <LayoutDashboard size={16} className="text-yellow-400" />
              Dashboard
            </button>
          )}
        </div>
      )}

      {/* BOTTOM NAV */}
  <nav className="flex justify-center items-center gap-6 py-2 text-xs md:text-sm font-semibold bg-black/10 backdrop-blur-sm border-t border-white/5 shadow-md">
        <Link to="/student" className="text-yellow-400 font-bold border-b-2 border-red-600 pb-1">
          Student
        </Link>
        <Link to="/curriculum" className="text-white hover:text-yellow-400 pb-1 border-b-2 border-transparent hover:border-red-600">
          Curriculum
        </Link>
        <Link to="/leaderboard" className="text-white hover:text-yellow-400 pb-1 border-b-2 border-transparent hover:border-red-600">
          Leaderboard
        </Link>
        <Link to="/about" className="text-white hover:text-yellow-400 pb-1 border-b-2 border-transparent hover:border-red-600">
          About
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;