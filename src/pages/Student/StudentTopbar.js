// src/pages/Student/StudentTopbar.js
import React from "react";
import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const StudentTopbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  const displayName =
    user?.name?.trim() ||
    user?.fullName?.trim?.() ||
    user?.email?.split("@")?.[0] ||
    "Student";

  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800
                 flex items-center justify-between px-4 sm:px-8 shadow-lg z-50"
    >
      {/* LEFT */}
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

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <span className="text-gray-300 hidden sm:block">
          Hello, <span className="text-yellow-400">{displayName}</span>
        </span>

        {/* LETTER AVATAR (STUDENT ONLY) */}
        <div
          className="
            w-10 h-10
            rounded-full
            bg-yellow-400
            text-black
            flex items-center justify-center
            font-bold text-lg
            shadow-md
          "
          title={displayName}
        >
          {firstLetter}
        </div>
      </div>
    </header>
  );
};

export default StudentTopbar;
