import React, { useEffect, useState } from "react";
import { BookOpen, Users, UserCircle, Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Admin name from localStorage
  const adminName = localStorage.getItem("name") || "Admin";

  // Dashboard stats state
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    totalTeachers: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    let mounted = true;

    const fetchDashboardStats = async () => {
      try {
        const res = await API.get("/admin/dashboard-stats");
        if (!mounted) return;
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchDashboardStats();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* TOP NAVBAR */}
      <div className="w-full bg-white shadow-md px-4 sm:px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-red-50 transition"
            title="Go Back"
            aria-label="Go back to homepage"
          >
            <ArrowLeft size={22} className="text-red-700" />
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-red-700 font-serif flex items-center gap-2">
            <Menu className="block sm:hidden" />
            Admin Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-bold shadow-lg">
            {adminName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="p-4 sm:p-6 md:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-700 mb-6 font-serif">
          Welcome Back, {adminName}! 👋
        </h1>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* CLASSES */}
          <div
            onClick={() => navigate("/admin/classes")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/classes")}
            className="bg-white p-5 sm:p-6 shadow-md rounded-xl border-t-4 border-red-700 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <BookOpen size={36} className="text-red-700" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {loading ? "…" : stats.totalClasses}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Total Classes
              </p>
            </div>
          </div>

          {/* STUDENTS */}
          <div
            onClick={() => navigate("/admin/classes")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/classes")}
            className="bg-white p-5 sm:p-6 shadow-md rounded-xl border-t-4 border-yellow-400 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <Users size={36} className="text-yellow-600" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {loading ? "…" : stats.totalStudents}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Total Students
              </p>
            </div>
          </div>

          {/* TEACHERS */}
          <div
            onClick={() => navigate("/admin/teachers")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && navigate("/admin/teachers")}
            className="bg-white p-5 sm:p-6 shadow-md rounded-xl border-t-4 border-red-700 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <UserCircle size={36} className="text-red-600" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {loading ? "…" : stats.totalTeachers}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Total Teachers
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
