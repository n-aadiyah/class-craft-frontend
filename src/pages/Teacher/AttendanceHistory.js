import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AttendanceHistory = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // Mock attendance data (class-wise)
  const attendanceRecords = {
    "Grade 8 - A": [
      { id: 1, name: "John Paul", EnrollNo: "G8A001", status: "Present" },
      { id: 2, name: "Mary Thomas", EnrollNo: "G8A002", status: "Absent" },
      { id: 3, name: "Rahul Nair", EnrollNo: "G8A003", status: "Present" },
      { id: 4, name: "Ananya Das", EnrollNo: "G8A004", status: "Present" },
    ],
    "Grade 9 - B": [
      { id: 1, name: "Vivek Sharma", EnrollNo: "G9B001", status: "Present" },
      { id: 2, name: "Sneha Gupta", EnrollNo: "G9B002", status: "Absent" },
      { id: 3, name: "Arjun Patel", EnrollNo: "G9B003", status: "Absent" },
      { id: 4, name: "Riya Mehta", EnrollNo: "G9B004", status: "Present" },
    ],
    "Grade 10 - A": [
      { id: 1, name: "Aditya Rao", EnrollNo: "G10A001", status: "Present" },
      { id: 2, name: "Priya Singh", EnrollNo: "G10A002", status: "Present" },
      { id: 3, name: "Karan Das", EnrollNo: "G10A003", status: "Present" },
      { id: 4, name: "Meera Iyer", EnrollNo: "G10A004", status: "Absent" },
    ],
  };

  const selectedRecords = selectedClass
    ? attendanceRecords[selectedClass] || []
    : [];

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
        <h1 className="text-3xl md:text-4xl font-serif text-center text-red-800 dark:text-white mb-8">
          Attendance History
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  SI No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Enrollment No
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedRecords.length > 0 ? (
                selectedRecords.map((student, index) => (
                  <tr
                    key={index}
                    className="hover:bg-red-50 dark:hover:bg-gray-800 transition duration-300"
                  >
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {student.enroll}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        student.status === "Present"
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {student.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    {selectedClass
                      ? "No records available for this date."
                      : "Please select a class to view attendance history."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition duration-300">
          <h2 className="text-xl font-semibold text-red-800 dark:text-white mb-2">
            Summary
          </h2>
          {selectedClass ? (
            <p className="text-gray-700 dark:text-gray-300">
              Total Students: {selectedRecords.length} | Present:{" "}
              {
                selectedRecords.filter((s) => s.status === "Present").length
              }{" "}
              | Absent:{" "}
              {selectedRecords.filter((s) => s.status === "Absent").length}
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              Select a class to view attendance summary.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
