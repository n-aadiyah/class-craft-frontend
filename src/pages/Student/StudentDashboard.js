import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";
import { useLocation } from "react-router-dom";
import AvatarCard from "../../components/students/AvatarCard";
import XPProgressBar from "../../components/students/XPProgressBar";

import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const StudentProfileDashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        const res = await API.get("/students/dashboard");
        if (!mounted) return;
        setStudent(res.data.student);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 401) return navigate("/login");
        if (status === 403) return navigate("/unauthorized");
        setError("Failed to load student dashboard");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProfile();
    return () => (mounted = false);
  }, [navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Loading dashboard…
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600">
        {error}
      </div>
    );

  /* ---------------- DATA ---------------- */

  const xpChartData = {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [
      {
        data: student.xpHistory || [15, 35, 60, student.xp],
        borderColor: "#facc15",
        backgroundColor: "rgba(250,204,21,0.15)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const taskChartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [
          student.completedTasks || 0,
          Math.max(
            0,
            (student.totalTasks || 10) - (student.completedTasks || 0)
          ),
        ],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-red-700 text-white flex flex-col justify-between">
        <div>
          <div className="px-6 py-6 text-xl font-bold">
            Dashboard
          </div>

         <nav className="mt-4 space-y-1 px-4 text-sm">
  <SidebarItem
    label="Overview"
    active
    onClick={() => navigate("/student/dashboard")}
  />
  <SidebarItem
    label="My Courses"
    onClick={() => navigate("/student/courses")}
  />
  <SidebarItem
  label="My Tasks"
  active={location.pathname === "/student/tasks"}
  onClick={() => navigate("/student/tasks")}
/>
  <SidebarItem
    label="Rewards"
    onClick={() => navigate("/student/rewards")}
  />
  <SidebarItem
    label="Progress"
    onClick={() => navigate("/student/progress")}
  />
  <SidebarItem
    label="Settings"
    onClick={() => navigate("/student/settings")}
  />
</nav>

        </div>

        <div className="p-4">
          <button
            onClick={() => navigate("/logout")}
            className="w-full bg-white text-red-700 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* TOP BAR */}
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
          <h1 className="text-lg font-bold text-red-700">
            Student Dashboard
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Hello, {student.name}
            </span>
            <img
              src="/Avatar.jpg"
              alt="avatar"
              className="w-9 h-9 rounded-full border"
            />
          </div>
        </header>

        {/* CONTENT */}
        <section className="p-8 space-y-6">

          {/* TOP GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* PROFILE */}
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <AvatarCard level={student.level} />

              <h2 className="mt-4 text-lg font-bold text-gray-900">
                {student.name}
              </h2>

              <p className="text-sm text-gray-500">
                Level {student.level} • Beginner
              </p>

              <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold
                bg-green-100 text-green-700 rounded-full">
                Enrolled • Active
              </span>

              <div className="mt-5">
                <XPProgressBar
                  xp={student.xp}
                  nextLevelXp={student.nextLevelXp}
                />
              </div>

              <div className="mt-6 text-left text-sm space-y-2">
                <p><b>Enrollment No:</b> {student.enrollmentNo || "—"}</p>
                <p><b>Course:</b> {student.course || "—"}</p>
                <p><b>Batch:</b> {student.batch || "—"}</p>
              </div>
            </div>

            {/* PROGRESS OVERVIEW */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Progress Overview
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

                <div className="md:col-span-2">
                  <Line
                    data={xpChartData}
                    options={{
                      plugins: { legend: { display: false } },
                      scales: { y: { beginAtZero: true } },
                    }}
                  />
                </div>

                <div className="text-center">
                  <Doughnut data={taskChartData} />
                  <p className="mt-3 text-sm font-semibold text-gray-700">
                    {student.completedTasks || 0} / {student.totalTasks || 10}
                  </p>
                  <p className="text-xs text-gray-500">
                    Tasks Completed
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="text-sm font-bold text-gray-900 mb-2">
              Profile Summary
            </h4>

            <p className="text-sm text-gray-600 mb-4">
              {student.bio || "No summary provided yet."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/student/profile")}
                className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold text-sm"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/student/tasks")}
                className="px-4 py-2 rounded-lg border border-red-500
                text-red-500 font-semibold text-sm"
              >
                View Tasks
              </button>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

/* ---------------- SIDEBAR ITEM ---------------- */

const SidebarItem = ({ label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`px-4 py-2 rounded-lg cursor-pointer transition
      ${active
        ? "bg-white text-red-700 font-semibold"
        : "hover:bg-red-600 hover:text-white"}`}
  >
    {label}
  </div>
);


export default StudentProfileDashboard;
