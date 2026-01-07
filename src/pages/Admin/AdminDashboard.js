import React, { useEffect, useState } from "react";
import { BookOpen, Users, UserCircle, Menu, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const adminName =
    user?.name?.trim() ||
    user?.fullName?.trim?.() ||
    user?.email?.split("@")?.[0] ||
    "Admin";

  const [stats, setStats] = useState({
    totalClasses: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalUsers: 0,
  });

  const [loading, setLoading] = useState(true);

  /* =======================
     FETCH DASHBOARD DATA
  ======================== */
  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        // 1️⃣ dashboard stats
        const statsRes = await API.get("/admin/dashboard-stats");

        // 2️⃣ users list (for total users count)
        const usersRes = await API.get("/admin/users");

        if (!mounted) return;

        setStats({
          totalClasses: statsRes.data?.totalClasses ?? 0,
          totalStudents: statsRes.data?.totalStudents ?? 0,
          totalTeachers: statsRes.data?.totalTeachers ?? 0,
          totalUsers: Array.isArray(usersRes.data)
            ? usersRes.data.length
            : 0,
        });
      } catch (err) {
        console.error("Failed to load admin dashboard", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStats();
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
            aria-label="Go back"
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
            <p className="font-semibold text-gray-800 font-serif">
              {adminName}
            </p>
            <p className="text-xs text-gray-500 font-serif">
              Administrator
            </p>
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
            className="bg-white p-6 shadow-md rounded-xl border-t-4 border-red-700 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <BookOpen size={36} className="text-red-700" />
            <div>
              <h2 className="text-xl font-bold">
                {loading ? "…" : stats.totalClasses}
              </h2>
              <p className="text-gray-600">Total Classes</p>
            </div>
          </div>

          {/* TEACHERS */}
          <div
            onClick={() => navigate("/admin/teachers")}
            className="bg-white p-6 shadow-md rounded-xl border-t-4 border-yellow-400 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <UserCircle size={36} className="text-yellow-600" />
            <div>
              <h2 className="text-xl font-bold">
                {loading ? "…" : stats.totalTeachers}
              </h2>
              <p className="text-gray-600">Total Teachers</p>
            </div>
          </div>

          {/* USERS */}
          <div
            onClick={() => navigate("/admin/users")}
            className="bg-white p-6 shadow-md rounded-xl border-t-4 border-red-700 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
          >
            <Users size={36} className="text-red-600" />
            <div>
              <h2 className="text-xl font-bold">
                {loading ? "…" : stats.totalUsers}
              </h2>
              <p className="text-gray-600">Total Users</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
