import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosInstance";

import StudentLayout from "../../layout/Studentlayout";
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
      <StudentLayout>
        <div className="h-[60vh] flex items-center justify-center text-yellow-400">
          Loading dashboard…
        </div>
      </StudentLayout>
    );

  if (error)
    return (
      <StudentLayout>
        <div className="h-[60vh] flex items-center justify-center text-red-500">
          {error}
        </div>
      </StudentLayout>
    );

  /* ---------------- CHART DATA ---------------- */

  const xpChartData = {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [
      {
        data: student.xpHistory || [10, 30, 55, student.xp],
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
      <div className="pt-4 sm:pt-6 lg:pt-8 pb-10 px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 tracking-wide">
          Overview
        </h1>

        {/* GRID: PROFILE + PROGRESS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT : PROFILE CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6 text-center">
            <AvatarCard level={student.level} />

            <h2 className="mt-4 text-xl font-bold text-white">
              {student.name}
            </h2>

            <p className="text-gray-400 text-sm">
              Level {student.level} • Active Student
            </p>

            <div className="mt-4">
              <XPProgressBar xp={student.xp} nextLevelXp={student.nextLevelXp} />
            </div>

            <div className="mt-6 text-left space-y-2 text-sm">
              <p>
                <span className="text-yellow-400 font-semibold">Enrollment:</span>{" "}
                {student.enrollmentNo || "—"}
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Course:</span>{" "}
                {student.course || "—"}
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Batch:</span>{" "}
                {student.batch || "—"}
              </p>
            </div>
          </div>

          {/* RIGHT : PROGRESS SECTION */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-6">
              Progress Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <Line
                  data={xpChartData}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { beginAtZero: true, ticks: { color: "#aaa" } },
                      x: { ticks: { color: "#aaa" } },
                    },
                  }}
                />
              </div>

              <div className="text-center">
                <Doughnut data={taskChartData} />
                <p className="mt-3 text-lg font-semibold text-yellow-300">
                  {student.completedTasks}/{student.totalTasks}
                </p>
                <p className="text-xs text-gray-400">Tasks Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
          <h4 className="text-yellow-400 font-semibold mb-2">Profile Summary</h4>
          <p className="text-gray-300 text-sm leading-relaxed">
            {student.bio || "No profile summary provided yet."}
          </p>
        </div>
      </div>
  );
};

export default StudentProfileDashboard;