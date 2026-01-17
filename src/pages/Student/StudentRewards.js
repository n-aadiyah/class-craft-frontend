// src/pages/Student/StudentRewards.js
import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const StudentRewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const res = await API.get("/students/rewards");
        setRewards(res.data || []);
      } catch (err) {
        if (err?.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, [navigate]);

  if (loading) return <div className="p-6">Loading rewards…</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">My Rewards</h1>

      {rewards.length === 0 ? (
        <p className="text-gray-500">No rewards earned yet 🎯</p>
      ) : (
        <div className="space-y-4">
          {rewards.map((r) => (
            <div
              key={r._id}
              className="bg-white p-4 rounded-lg shadow border flex justify-between"
            >
              <div>
                <p className="font-semibold">{r.badge}</p>
                <p className="text-sm text-gray-500">{r.reason}</p>
                <p className="text-xs text-gray-400">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <span className="font-bold text-yellow-500">
                +{r.xp} XP
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRewards;
