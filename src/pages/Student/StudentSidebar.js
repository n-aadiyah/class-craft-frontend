import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, BookOpen, Trophy, ListChecks, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const StudentSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, setUser } = useAuth();

  const links = [
    { name: "Dashboard", path: "/student/dashboard", icon: <User size={18} /> },
    { name: "My Tasks", path: "/student/tasks", icon: <ListChecks size={18} /> },
    { name: "Rewards", path: "/student/rewards", icon: <Trophy size={18} /> },
    { name: "Courses", path: "/student/courses", icon: <BookOpen size={18} /> },
  ];

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-60
        bg-zinc-900 border-r border-zinc-800 shadow-xl
        text-gray-300 z-50 flex flex-col transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 text-sm">
          {links.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all
                  ${
                    active
                      ? "bg-yellow-400 text-black font-semibold shadow-md"
                      : "hover:bg-zinc-800 hover:text-yellow-400"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold 
              hover:bg-yellow-300 transition flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
