import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // for icon

const AttendanceHistory = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const attendanceRecords = [
    {
      date: "2025-11-01",
      class: "Grade 8 - A",
      present: 24,
      absent: 2,
      remarks: "Good attendance overall",
    },
    {
      date: "2025-10-30",
      class: "Grade 9 - B",
      present: 22,
      absent: 4,
      remarks: "Few absentees due to school event",
    },
    {
      date: "2025-10-29",
      class: "Grade 10 - A",
      present: 25,
      absent: 1,
      remarks: "Excellent attendance",
    },
  ];

  const filteredRecords = attendanceRecords.filter((record) => {
    return (
      (!selectedClass || record.class === selectedClass) &&
      (!selectedDate || record.date === selectedDate)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10 transition-all duration-500">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 relative">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate("/teacher/attendance")}
          className="absolute top-6 left-6 flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-red-800 dark:text-white mb-6">
          Attendance History
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="Grade 8 - A">Grade 8 - A</option>
            <option value="Grade 9 - B">Grade 9 - B</option>
            <option value="Grade 10 - A">Grade 10 - A</option>
          </select>

          <input
            type="date"
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <button
            onClick={() => {
              setSelectedClass("");
              setSelectedDate("");
            }}
            className="w-full md:w-1/4 bg-red-800 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Class
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Present
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Absent
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="hover:bg-red-50 dark:hover:bg-gray-800 transition duration-300"
                  >
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {record.date}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {record.class}
                    </td>
                    <td className="px-6 py-4 text-green-700 font-semibold dark:text-green-400">
                      {record.present}
                    </td>
                    <td className="px-6 py-4 text-red-700 font-semibold dark:text-red-400">
                      {record.absent}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 italic">
                      {record.remarks}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No attendance records found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="mt-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-red-800 dark:text-white mb-2">
            Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            View attendance patterns over time and analyze participation trends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
