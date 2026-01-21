// src/components/Topbar.js
import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axiosInstance";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  const role = user?.role;

  const displayName =
    user?.name?.trim() ||
    user?.fullName?.trim?.() ||
    user?.email?.split("@")?.[0] ||
    "User";

  const firstLetter = displayName.charAt(0).toUpperCase();

  // Build avatar URL (for teacher/admin only)
  const getAvatarUrl = () => {
    const avatar = user?.avatarUrl || "/Avatar.jpg";

    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    try {
      const base = API.defaults.baseURL.replace(/\/api\/?$/, "");
      return `${base}${avatar}`;
    } catch {
      return avatar;
    }
  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 shadow-md flex justify-between items-center px-4 sm:px-8 py-3 z-50 border-b border-gray-200 w-full">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="text-red-700 lg:hidden" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold font-serif text-red-700 tracking-wide">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <span className="text-gray-800 font-medium text-sm sm:text-base truncate max-w-[140px]">
          Hello, {displayName}
        </span>

        {/* STUDENT → LETTER AVATAR */}
        {role === "student" ? (
          <div
            className="
              w-9 h-9 sm:w-11 sm:h-11
              rounded-full
              bg-red-700
              text-white
              flex items-center justify-center
              font-bold text-lg
              shadow-sm
            "
            title={displayName}
          >
            {firstLetter}
          </div>
        ) : (
          /* TEACHER / ADMIN → IMAGE AVATAR */
          <img
            src={getAvatarUrl()}
            alt="Profile Avatar"
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-red-600 shadow-sm object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default Topbar;
