import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Activity } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 8B"];
const quests = ["Solar System", "Math Quiz 1", "Science Lab", "History Project"];

const TrackPerformance = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedQuest, setSelectedQuest] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Sample Chart Data
  const classPerformanceData = {
    labels: ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 8B"],
    datasets: [
      {
        label: "XP Completion %",
        data: [80, 75, 90, 60],
        backgroundColor: "rgba(220, 38, 38, 0.7)",
      },
    ],
  };

  const averageQuestScoreData = {
    labels: ["Quest 1", "Quest 2", "Quest 3", "Quest 4"],
    datasets: [
      {
        label: "Average Score",
        data: [70, 85, 60, 90],
        borderColor: "rgba(220, 38, 38, 1)",
        backgroundColor: "rgba(220, 38, 38, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const rewardDistributionData = {
    labels: ["Science Star", "Math Whiz", "History Buff", "Participation"],
    datasets: [
      {
        label: "Rewards",
        data: [40, 25, 20, 15],
        backgroundColor: ["#dc2626", "#f87171", "#fca5a5", "#fee2e2"],
      },
    ],
  };

  const engagementTrendData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Engagement Score",
        data: [60, 70, 80, 75],
        borderColor: "rgba(220, 38, 38, 1)",
        backgroundColor: "rgba(220, 38, 38, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const topStudents = [
    { name: "John Smith", xp: 120 },
    { name: "Maria Johnson", xp: 110 },
    { name: "Alex Brown", xp: 105 },
    { name: "Lily White", xp: 100 },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Activity size={28} className="text-red-700" />
        <h1 className="text-3xl font-bold text-red-700">Track Performance</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        <select
          value={selectedQuest}
          onChange={(e) => setSelectedQuest(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <option value="">All Quests</option>
          {quests.map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Class Performance</h2>
          <Bar data={classPerformanceData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Average Quest Score</h2>
          <Line data={averageQuestScoreData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Reward Distribution</h2>
          <Pie data={rewardDistributionData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Engagement Trend</h2>
          <Line data={engagementTrendData} />
        </div>
      </div>

      {/* Top Performing Students */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Top Performing Students</h2>
        <ul className="divide-y divide-gray-200">
          {topStudents.map((s, index) => (
            <li key={s.name} className="py-2 flex justify-between items-center">
              <span>{index + 1}. {s.name}</span>
              <span className="font-semibold text-red-700">{s.xp} XP</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrackPerformance;
