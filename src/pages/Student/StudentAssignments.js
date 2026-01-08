import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import TaskCard from "../../components/students/TaskCard";
import { useNavigate } from "react-router-dom";

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const res = await API.get("/student/assignments");
        setAssignments(res.data || []);
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAssignments();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Assignments</h1>

        {loading ? (
          <p className="text-gray-500">Loading assignments…</p>
        ) : assignments.length === 0 ? (
          <p className="text-gray-500">No assignments due 🎯</p>
        ) : (
          assignments.map((a) => (
            <TaskCard
              key={a._id}
              task={{
                ...a,
                xpReward: a.xpReward || 100,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
