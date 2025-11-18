// src/components/Sidebar.js
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Map,
  Award,
  Settings,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Menu,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const links = [
    { name: "Overview", path: "/teacher/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Classes", path: "/teacher/classes", icon: <BookOpen size={20} /> },
    { name: "Attendance Register", path: "/teacher/attendance", icon: <ClipboardList size={20} /> },
    { name: "Manage Quests", path: "/teacher/quests", icon: <Map size={20} /> },
    { name: "Reward System", path: "/teacher/rewards", icon: <Award size={20} /> },
    { name: "Settings", path: "/teacher/settings", icon: <Settings size={20} /> },
  ];
  const { setToken, setUser } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
  setToken(null);
  setUser(null);
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/");
};


  return (
    <>
      {/* 🔹 Top bar (mobile only, toggle button only) */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-gradient-to-r from-red-700 to-red-900 text-white flex items-center justify-end px-4 py-3 shadow-md z-50">
        <button onClick={onClose} className="focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      {/* 🔹 Overlay (for mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden"
        ></div>
      )}

      {/* 🔹 Sidebar for Desktop / Slide-in for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-gradient-to-b from-red-700 to-red-900 text-white p-5 shadow-lg flex flex-col justify-between z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Navigation Links */}
        <nav className="space-y-2 mt-10">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`flex items-center gap-2 px-3 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === link.path
                  ? "bg-white text-red-800 shadow-md"
                  : "hover:bg-red-600 hover:translate-x-1"
              }`}
            >
              {link.icon}
              <span className="font-semibold text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-8">
          <button
    onClick={handleLogout}
    className="w-full bg-white text-red-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
