import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  Map,
  Award,
  Settings,
  LayoutDashboard,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const links = [
    { name: "Overview", path: "/teacher/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Classes", path: "/teacher/classes", icon: <BookOpen size={20} /> },
    { name: "Manage Quests", path: "/teacher/quests", icon: <Map size={20} /> },
    { name: "Reward System", path: "/teacher/rewards", icon: <Award size={20} /> },
    { name: "Settings", path: "/teacher/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-gradient-to-b from-red-700 to-red-900 text-white p-5 shadow-lg flex flex-col justify-between z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <div className="flex justify-between items-center mb-20">
            <button onClick={onClose} className="lg:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === link.path
                    ? "bg-white text-red-800 shadow-md"
                    : "hover:bg-red-600 hover:translate-x-1"
                }`}
              >
                {link.icon}
                <span className="font-semibold">{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-center mt-8">
          <button className="w-full bg-white text-red-700 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
