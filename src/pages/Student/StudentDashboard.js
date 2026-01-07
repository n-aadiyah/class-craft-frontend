import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

import AvatarCard from "../../components/students/AvatarCard";
import XPProgressBar from "../../components/students/XPProgressBar";
import LevelBadge from "../../components/students/LevelBadge";
import TaskCard from "../../components/students/TaskCard";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await API.get("/student/dashboard");
        setStudent(res.data.student);
        setTasks(res.data.tasks || []);
        setAssignments(res.data.assignments || []);
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading dashboard…
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load student data
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT: Avatar & Progress */}
        <div className="bg-white rounded-xl shadow border p-6 text-center">
          <AvatarCard level={student.level} />
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {student.name}
          </h2>
          <LevelBadge level={student.level} />
          <XPProgressBar
            xp={student.xp}
            nextLevelXp={student.nextLevelXp}
          />
        </div>

        {/* RIGHT: Tasks & Assignments */}
        <div className="lg:col-span-2 space-y-6">

          <section className="bg-white rounded-xl shadow border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Active Tasks
              </h3>
              <button
                className="text-sm text-red-700 font-semibold hover:underline"
                onClick={() => navigate("/student/tasks")}
              >
                View all
              </button>
            </div>

            {tasks.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No active tasks 🎉
              </p>
            ) : (
              tasks.slice(0, 3).map(task => (
                <TaskCard key={task._id} task={task} />
              ))
            )}
          </section>

          <section className="bg-white rounded-xl shadow border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Assignments
              </h3>
              <button
                className="text-sm text-red-700 font-semibold hover:underline"
                onClick={() => navigate("/student/assignments")}
              >
                View all
              </button>
            </div>

            {assignments.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No assignments due 🎯
              </p>
            ) : (
              assignments.slice(0, 3).map(a => (
                <TaskCard key={a._id} task={a} />
              ))
            )}
          </section>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
