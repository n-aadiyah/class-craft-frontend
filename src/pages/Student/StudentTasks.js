import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import TaskCard from "../../components/students/TaskCard";
import { useNavigate } from "react-router-dom";

export default function StudentTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await API.get("/student/tasks");
        setTasks(res.data || []);
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

        {loading ? (
          <p className="text-gray-500">Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned 🎉</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
