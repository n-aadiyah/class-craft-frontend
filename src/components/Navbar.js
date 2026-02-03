import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard } from "lucide-react";
import API from "../api/axiosInstance";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, setToken, setUser } = useAuth();

  const [showMenu, setShowMenu] = React.useState(false);
  const [showNavbar, setShowNavbar] = React.useState(true);
  const lastScrollY = React.useRef(0);

  /* ---------------- SCROLL HIDE / SHOW ---------------- */
  React.useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowNavbar(current < lastScrollY.current);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  /* ---------------- USER DISPLAY ---------------- */
  const displayName =
    user?.name ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "User";

  const initials = displayName.charAt(0).toUpperCase();

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

  /* ---------------- ACTIVE LINK ---------------- */
  const isActive = (path) =>
    location.pathname === path
      ? "text-yellow-400 font-bold border-b-2 border-red-600 pb-1"
      : "text-white hover:text-yellow-400 pb-1 border-b-2 border-transparent hover:border-red-600";

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50
        transition-all duration-500 backdrop-blur-xl
        ${showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}
      `}
    >
      {/* ================= TOP ROW ================= */}
      <div className="w-full bg-black/10 border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-2.5
                        flex items-center justify-between relative">

          {/* LEFT — LOGIN / PROFILE */}
          <div className="flex items-center gap-3">
            {!token ? (
              <button
                className="text-white bg-red-600 hover:bg-red-700
                           px-4 py-1.5 text-sm rounded-lg font-semibold"
                onClick={() => navigate("/login")}
              >
                Portal Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover
                               border-2 border-yellow-400 shadow"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full
                               bg-gradient-to-br from-red-600 to-yellow-400
                               text-white flex items-center justify-center
                               font-bold shadow"
                  >
                    {initials}
                  </div>
                )}

                <span className="hidden sm:block text-white font-semibold">
                  {displayName}
                </span>

                <button
                  onClick={handleLogout}
                  className="text-white bg-red-600 hover:bg-red-700
                             px-3 py-1 text-sm rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* CENTER TITLE */}
          <h1
            className="absolute left-1/2 -translate-x-1/2
                       text-white font-serif font-extrabold drop-shadow-md
                       text-sm sm:text-lg md:text-xl lg:text-2xl"
          >
            GAYATHRI CENTRAL SCHOOL
          </h1>

          {/* RIGHT — DASHBOARD */}
          <div className="hidden sm:flex items-center">
            {token && user?.role && (
              <button
                onClick={() => {
                  if (user.role === "teacher") navigate("/teacher/dashboard");
                  else if (user.role === "student") navigate("/student/dashboard");
                  else if (user.role === "admin") navigate("/admin/dashboard");
                }}
                className="flex items-center gap-2 px-3 py-1 rounded
                           text-white hover:bg-white/20 text-sm font-semibold"
              >
                <LayoutDashboard size={18} className="text-yellow-400" />
                Dashboard
              </button>
            )}
          </div>

          {/* MOBILE MENU */}
          <button
            className="sm:hidden text-white text-lg px-2 py-1"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {showMenu && (
          <div className="sm:hidden px-4 py-3 bg-black/40 backdrop-blur-xl">
            <Link to="/" className="block text-white py-2">Home</Link>
            <Link to="/about" className="block text-white py-2">About</Link>
            <Link to="/facilities" className="block text-white py-2">Facilities</Link>
            <Link to="/contact" className="block text-white py-2">Contact Us</Link>
          </div>
        )}
      </div>

      {/* ================= BOTTOM NAV ================= */}
      <nav
        className="flex justify-center items-center gap-6
                   py-2 text-sm font-semibold
                   bg-black/10 backdrop-blur-sm border-t border-white/5"
      >
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/facilities" className={isActive("/facilities")}>Facilities</Link>
        <Link to="/about" className={isActive("/about")}>About</Link>
        <Link to="/contact" className={isActive("/contact")}>Contact Us</Link>
      </nav>
    </header>
  );
};

export default Navbar;
