import React from "react";
import { BookOpen, Users, Award, BarChart3, Bell } from "lucide-react";

const TeacherDashboard = () => {
  const stats = [
    {
      title: "Total Classes",
      value: "5 Active Classes",
      icon: <BookOpen size={26} className="text-red-600" />,
    },
    {
      title: "Total Students",
      value: "120 Students",
      icon: <Users size={26} className="text-red-600" />,
    },
    {
      title: "Average Quest Completion",
      value: "75% Completed",
      icon: <BarChart3 size={26} className="text-red-600" />,
    },
    {
      title: "Total Rewards Given",
      value: "240 XP Distributed",
      icon: <Award size={26} className="text-red-600" />,
    },
  ];

  const recentActivities = [
    "🧭 Quest ‘Solar System Challenge’ assigned to Grade 7.",
    "🏅 John Smith earned 50 XP for completing Quest 2.",
    "📘 New class ‘Grade 9 Physics’ created.",
    "🎓 Maria reached Level 5 in Rewards System.",
  ];

  const upcomingTasks = [
    { task: "Grade Quest 3", due: "25 Oct", status: "Pending" },
    { task: "Prepare Quiz for Class 8", due: "27 Oct", status: "In Progress" },
    { task: "Review Reward Requests", due: "30 Oct", status: "Not Started" },
  ];

  return (
    <div className="p-3 sm:p-6 md:p-8 bg-gray-50 min-h-screen max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700">
          Teacher Dashboard
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-1">
          Welcome back, Ms. Shency! 👋
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm sm:shadow-md p-3 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 hover:shadow-lg transition-all duration-200"
          >
            <div className="bg-red-100 p-2 sm:p-3 rounded-full">{stat.icon}</div>
            <div className="text-center sm:text-left">
              <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-600">
                {stat.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
              Recent Activity
            </h2>
          </div>
          <ul className="space-y-2 sm:space-y-3">
            {recentActivities.map((activity, index) => (
              <li
                key={index}
                className="bg-gray-50 p-2 sm:p-3 rounded-lg text-gray-700 hover:bg-red-50 transition-all text-xs sm:text-sm md:text-base leading-relaxed"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 overflow-x-auto">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4">
            Upcoming Tasks
          </h2>
          <table className="w-full min-w-[400px] border-collapse text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="text-left bg-red-100 text-red-800">
                <th className="p-2 sm:p-3">Task</th>
                <th className="p-2 sm:p-3">Due Date</th>
                <th className="p-2 sm:p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {upcomingTasks.map((task, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="p-2 sm:p-3 font-medium text-gray-800 whitespace-nowrap">
                    {task.task}
                  </td>
                  <td className="p-2 sm:p-3 text-gray-600 whitespace-nowrap">
                    {task.due}
                  </td>
                  <td
                    className={`p-2 sm:p-3 font-semibold ${
                      task.status === "Pending"
                        ? "text-yellow-600"
                        : task.status === "In Progress"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {task.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
