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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-400 text-lg">
        Loading rewards…
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/student/dashboard")}
          className="mb-8 px-4 py-2 rounded-lg bg-zinc-900 text-gray-300 border border-zinc-700 
                     hover:bg-zinc-800 hover:text-white transition flex items-center gap-2 shadow"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <h1 className="text-3xl font-bold font-serif text-yellow-400 tracking-wide mb-10">
          My Rewards
        </h1>

        {/* No Rewards */}
        {rewards.length === 0 ? (
          <p className="text-gray-400 text-lg bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center">
            No rewards earned yet ⚔️ Keep completing tasks!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

            {rewards.map((r) => {
              // Optional rarity — defaults to common
              const rarity = r.rarity || "common";

              const rarityStyles = {
                common: {
                  ring: "ring-gray-500/40",
                  glow: "shadow-[0_0_20px_rgba(255,255,255,0.05)]",
                  gradient: "from-zinc-800/40 to-zinc-900/40",
                  iconColor: "text-gray-300",
                },
                rare: {
                  ring: "ring-blue-500/40",
                  glow: "shadow-[0_0_25px_rgba(59,130,246,0.25)]",
                  gradient: "from-blue-900/30 to-zinc-900/40",
                  iconColor: "text-blue-300",
                },
                epic: {
                  ring: "ring-purple-500/40",
                  glow: "shadow-[0_0_28px_rgba(168,85,247,0.3)]",
                  gradient: "from-purple-900/30 to-zinc-900/40",
                  iconColor: "text-purple-300",
                },
                legendary: {
                  ring: "ring-yellow-500/40",
                  glow: "shadow-[0_0_32px_rgba(250,204,21,0.4)]",
                  gradient: "from-yellow-600/20 to-zinc-900/40",
                  iconColor: "text-yellow-300",
                },
              };

              const s = rarityStyles[rarity];

              return (
                <div
                  key={r._id}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${s.gradient}
                    border border-zinc-700/50 ring-1 ${s.ring}
                    backdrop-blur-xl transition-all duration-300 
                    hover:scale-[1.02] hover:shadow-2xl ${s.glow} overflow-hidden`}
                >
                  {/* Floating Particles */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping top-6 left-1/3"></div>
                    <div className="absolute w-1 h-1 bg-white rounded-full animate-ping opacity-30 bottom-6 right-1/4"></div>
                  </div>

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                      <h2 className="text-xl font-bold text-yellow-400 drop-shadow-sm capitalize">
                        {r.badge}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                        {rarity} Reward
                      </p>
                    </div>

                    {/* Reward Icon */}
                    <div className={`text-3xl ${s.iconColor}`}>
                      ⭐
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed relative z-10">
                    {r.reason}
                  </p>

                  {/* Footer */}
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-xs text-gray-500">
                      Earned on: {new Date(r.date).toLocaleDateString()}
                    </span>

                    <span className="px-4 py-1 rounded-full bg-yellow-400 text-black font-bold shadow">
                      +{r.xp} XP
                    </span>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default StudentRewards;
