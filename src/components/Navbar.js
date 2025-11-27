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
  const [showNavbar, setShowNavbar] = React.useState(true);
  const lastScrollY = React.useRef(0);

  // Detect scroll to hide / show navbar
  React.useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowNavbar(current < lastScrollY.current);
      lastScrollY.current = current;
    };

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

  const displayName =
    user?.name || user?.fullName || user?.email?.split("@")[0] || "User";

  const initials = displayName?.charAt(0)?.toUpperCase() || "U";

  // Avatar URL Fix
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
      className={`fixed top-0 left-0 right-0 w-full z-50 
        transition-all duration-500 backdrop-blur-xl
        ${showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
      `}
    >
      {/* Top Main Row */}
      <div className="w-full bg-black/10 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-2.5 
                        flex items-center justify-between relative">

          {/* LEFT — Login / Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!token ? (
              <button
                className="text-white bg-red-600 hover:bg-red-700 
                           px-3 sm:px-4 py-1.5 text-xs sm:text-sm 
                           rounded-lg font-semibold transition-all"
                onClick={() => navigate("/login")}
              >
                Portal Login
              </button>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Avatar */}
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt=""
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover 
                               border-2 border-yellow-400 shadow"
                  />
                ) : (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full 
                                  bg-gradient-to-br from-red-600 to-yellow-400 
                                  text-white flex items-center justify-center 
                                  font-bold shadow">
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
                             px-1 sm:px-3 py-1 text-xs sm:text-sm 
                             rounded-md shadow transition-all"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* CENTER TITLE */}
        {/* Mobile Short Title */}
<h1
  className="absolute left-1/2 -translate-x-1/2 
             text-white font-serif font-extrabold drop-shadow-md
             text-sm  sm:hidden"
>
  GCS
</h1>

{/* Full Title for Tablet & Desktop */}
<h1
  className="absolute left-1/2 -translate-x-1/2 
             text-white font-serif font-extrabold drop-shadow-md
             text-xs sm:text-sm md:text-xl lg:text-2xl whitespace-nowrap
             hidden sm:block"
>
  GAYATHRI CENTRAL SCHOOL
</h1>

          {/* RIGHT — Dashboard */}
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
                           text-xs sm:text-sm font-semibold transition"
              >
                <LayoutDashboard size={18} className="text-yellow-400" />
                Dashboard
              </button>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="sm:hidden text-white text-lg px-2 py-1 
                       rounded hover:bg-white/20 transition"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {showMenu && (
          <div className="sm:hidden px-4 py-3 bg-black/40 backdrop-blur-xl 
                          border-t border-white/10 shadow-inner">
            <Link
              to="/"
              className="block text-white py-2 text-sm"
              onClick={() => setShowMenu(false)}
            >
              Home
            </Link>

            {token && user?.role && (
              <button
                className="flex items-center gap-2 py-2 text-white text-sm"
                onClick={() => {
                  if (user.role === "teacher") navigate("/teacher/dashboard");
                  else if (user.role === "student") navigate("/student/dashboard");
                  else navigate("/");
                  setShowMenu(false);
                }}
              >
                <LayoutDashboard size={16} className="text-yellow-400" />
                Dashboard
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation Row */}
      <nav
        className="flex justify-center items-center gap-5 sm:gap-6 
                   py-2 text-xs sm:text-sm font-semibold 
                   bg-black/10 backdrop-blur-sm border-t border-white/5"
      >
        <Link
          to="/student"
          className="text-yellow-400 font-bold border-b-2 border-red-600 pb-1"
        >
          Student
        </Link>

        <Link
          to="/curriculum"
          className="text-white hover:text-yellow-400 pb-1 
                     border-b-2 border-transparent hover:border-red-600"
        >
          Curriculum
        </Link>

        <Link
          to="/leaderboard"
          className="text-white hover:text-yellow-400 pb-1 
                     border-b-2 border-transparent hover:border-red-600"
        >
          Leaderboard
        </Link>

        <Link
          to="/about"
          className="text-white hover:text-yellow-400 pb-1 
                     border-b-2 border-transparent hover:border-red-600"
        >
          About
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
