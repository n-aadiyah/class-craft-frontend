import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import API from "../../api/axiosInstance";

const StudentTopbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  const displayName =
    user?.name ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "Student";

  const getAvatarUrl = () => {
    const avatar = user?.avatarUrl || "/Avatar.jpg";
    if (avatar.startsWith("http")) return avatar;

    try {
      const base = API.defaults.baseURL.replace(/\/api$/, "");
      return base + avatar;
    } catch {
      return avatar;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 
                       flex items-center justify-between px-4 sm:px-8 shadow-lg z-50">

      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-yellow-400 hover:text-yellow-300 transition"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-yellow-400 tracking-wide">
          Student Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-gray-300 hidden sm:block">
          Hello, <span className="text-yellow-400">{displayName}</span>
        </span>

        <img
          src={getAvatarUrl()}
          alt="  "
          className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md object-cover"
        />
      </div>
    </header>
  );
};

export default StudentTopbar;
