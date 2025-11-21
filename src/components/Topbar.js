// src/components/Topbar.js
import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axiosInstance";

const Topbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  // Display name
  const displayName =
    user?.name?.trim() ||
    user?.fullName?.trim?.() ||
    user?.email?.split("@")?.[0] ||
    "Teacher";

  // Build full avatar URL
  const getAvatarUrl = () => {
    const avatar = user?.avatarUrl || "/Avatar.jpg";

    // If already full URL → return
    if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
      return avatar;
    }

    // If relative URL from backend → attach server origin
    try {
      const base = API.defaults.baseURL.replace(/\/api\/?$/, "");
      return `${base}${avatar}`;
    } catch {
      return avatar;
    }
  };

  return (
    <div className="bg-white fixed top-0 left-0 right-0 shadow-md flex flex-wrap justify-between items-center px-4 sm:px-8 py-3 z-50 border-b border-gray-200 w-full">
      
      {/* Left: Menu + Title */}
      <div className="flex items-center gap-3 mb-2 sm:mb-0">
        <button className="text-red-700 lg:hidden" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold font-serif text-red-700 tracking-wide">
          Dashboard
        </h1>
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <span className="text-gray-800 font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
          Hello, {displayName}
        </span>

        <img
          src={getAvatarUrl()}
          alt="Profile Avatar"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-red-600 shadow-sm hover:scale-105 transition-transform duration-200 object-cover"
        />
      </div>
    </div>
  );
};

export default Topbar;
