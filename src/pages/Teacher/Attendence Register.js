import React, { useState } from "react";
import { ClipboardList, Eye, X, CheckCircle, XCircle } from "lucide-react";

const AttendanceRegister = () => {
  // Sample classes (same structure as ManageClasses)
  const [classes] = useState([
    {
      id: 1,
      name: "Grade 6A",
      grade: "6",
      students: 5,
      startDate: "2025-10-01",
      endDate: "2026-03-31",
      studentList: [
        { id: 1, name: "John Smith", enrollNo: "6A01", contact: "9876543210" },
        { id: 2, name: "Emily Brown", enrollNo: "6A02", contact: "9876543211" },
      ],
    },
    {
      id: 2,
      name: "Grade 7B",
      grade: "7",
      students: 4,
      startDate: "2025-09-10",
      endDate: "2026-03-30",
      studentList: [
        { id: 1, name: "Chris Evans", enrollNo: "7B01", contact: "9876543215" },
        { id: 2, name: "Sophia Lee", enrollNo: "7B02", contact: "9876543216" },
      ],
    },
  ]);

  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Attendance record for current class (maps studentId → "Present"/"Absent")
  const [attendance, setAttendance] = useState({});

  // Open modal and initialize attendance
  const handleViewClass = (cls) => {
    setSelectedClass(cls);
    const initial = {};
    cls.studentList.forEach((stu) => {
      initial[stu.id] = attendance[stu.id] || "Present";
    });
    setAttendance(initial);
    setShowModal(true);
  };

  // Toggle Present/Absent
  const toggleAttendance = (id) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present",
    }));
  };

  // Save Attendance (local only)
  const handleSaveAttendance = () => {
    alert(
      `✅ Attendance saved for ${selectedClass.name}\n` +
        JSON.stringify(attendance, null, 2)
    );
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <ClipboardList size={28} /> Attendance Register
        </h1>
        <p className="text-gray-600">Mark attendance for each class</p>
      </div>

      {/* Class List Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left">Class Name</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Students</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{cls.name}</td>
                <td className="p-3">{cls.grade}</td>
                <td className="p-3">{cls.studentList.length}</td>
                <td className="p-3">{cls.startDate}</td>
                <td className="p-3">{cls.endDate}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleViewClass(cls)}
                    className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                    title="View Attendance"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="p-5 text-center text-gray-500 italic"
                >
                  No classes available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Attendance Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-red-700 mb-4">
              {selectedClass.name} — Attendance
            </h2>

            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="bg-red-100 text-red-800">
                <tr>
                  <th className="p-2 text-left w-1/12">#</th>
                  <th className="p-2 text-left w-2/6">Student Name</th>
                  <th className="p-2 text-left w-1/6">Enroll No</th>
                  <th className="p-2 text-center w-1/6">Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.studentList.map((stu, index) => (
                  <tr
                    key={stu.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{stu.name}</td>
                    <td className="p-2">{stu.enrollNo}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => toggleAttendance(stu.id)}
                        className={`flex items-center justify-center gap-1 px-3 py-1 rounded-lg font-medium transition ${
                          attendance[stu.id] === "Present"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {attendance[stu.id] === "Present" ? (
                          <>
                            <CheckCircle size={16} /> Present
                          </>
                        ) : (
                          <>
                            <XCircle size={16} /> Absent
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
                {selectedClass.studentList.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center text-gray-500 p-4 italic"
                    >
                      No students found for this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-end mt-5 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAttendance}
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceRegister;
