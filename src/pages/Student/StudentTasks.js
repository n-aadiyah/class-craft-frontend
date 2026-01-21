import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function StudentTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await API.get("/students/tasks");
        setTasks(res.data || []);
      } catch (err) {
        if (err?.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [navigate]);

  const handleComplete = async (id) => {
    try {
      setUpdatingId(id);
      await API.post(`/students/tasks/${id}/complete`);
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? { ...t, status: "completed" } : t
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/student/dashboard")}
          className="mb-8 px-4 py-2 rounded-lg bg-zinc-900 text-gray-300 border border-zinc-700 
                     hover:bg-zinc-800 hover:text-white transition flex items-center gap-2 shadow"
        >
          ← Back to Dashboard
        </button>

        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold font-serif mb-8 text-yellow-400 tracking-wide drop-shadow">
          My Tasks
        </h1>

        {/* MAIN CARD */}
        <div className="relative bg-zinc-900 rounded-2xl p-6 border border-zinc-700/60 shadow-[0_0_25px_rgba(255,255,255,0.06)] overflow-hidden">

          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none"></div>

          {loading ? (
            <p className="text-gray-400 text-center py-12">Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <p className="text-gray-400 text-center py-12">
              No tasks assigned. Enjoy the calm before the grind ⚔️
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-800/80 text-gray-300 uppercase tracking-wide text-xs">
                    <th className="py-3 px-4 text-left">Task</th>
                    <th className="py-3 px-4 text-left">Description</th>
                    <th className="py-3 px-4 text-center">XP</th>
                    <th className="py-3 px-4 text-center">Due</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/60 transition"
                    >
                      {/* TITLE */}
                      <td className="py-4 px-4 font-semibold text-white">
                        {task.title}
                      </td>

                      {/* DESCRIPTION */}
                      <td className="py-4 px-4 text-gray-400 max-w-sm">
                        {task.description || "—"}
                      </td>

                      {/* XP */}
 <td className="py-4 px-4 text-center">
  <div className="inline-flex items-center justify-center px-3 py-1.5 
                  bg-yellow-400 text-black font-bold text-xs rounded-md 
                  shadow-[0_0_10px_rgba(250,204,21,0.4)] border border-yellow-500">
    {task.xp || 0}
    <span className="ml-1 font-semibold text-[10px]">XP</span>
  </div>
</td>


                      {/* DUE DATE */}
                      <td className="py-4 px-4 text-center text-gray-300">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "—"}
                      </td>

                      {/* STATUS */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === "completed"
                              ? "bg-yellow-400 text-black"
                              : "bg-red-600 text-white"
                          }`}
                        >
                          {task.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </td>

                      {/* ACTION BUTTON */}
                      <td className="py-4 px-4 text-center">
                        {task.status === "completed" ? (
                          <button
                            disabled
                            className="px-4 py-2 rounded-lg bg-zinc-700 text-gray-500 cursor-not-allowed"
                          >
                            ✔ Done
                          </button>
                        ) : (
                          <button
                            onClick={() => handleComplete(task._id)}
                            disabled={updatingId === task._id}
                            className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold
                                       hover:bg-yellow-300 active:scale-95 transition"
                          >
                            {updatingId === task._id
                              ? "Updating..."
                              : "Mark Complete"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
