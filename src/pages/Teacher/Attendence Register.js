import React, { useState, useEffect } from "react";
import { ClipboardList, Eye, X, CheckCircle, XCircle } from "lucide-react";
import API from "../../api/axiosInstance";

const AttendanceRegister = () => {
  const [classes, setClasses] = useState([]);          // fetched from backend
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);        // fetched students of selected class
  const [attendance, setAttendance] = useState({});
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch all classes on load
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await API.get("/classes");
        setClasses(res.data);
      } catch (error) {
        console.error("❌ Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // ✅ Fetch students for selected class
  const handleViewClass = async (cls) => {
    setSelectedClass(cls);

    try {
      const res = await API.get(`/students/class/${cls._id}`);
      const studentList = res.data;

      setStudents(studentList);

      // Initialize attendance state (default = Present)
      const initialAttendance = {};
      studentList.forEach((stu) => {
        initialAttendance[stu._id] = "Present";
      });
      setAttendance(initialAttendance);
      setShowModal(true);
    } catch (error) {
      console.error("❌ Error fetching students:", error);
      alert("Error loading students for this class.");
    }
  };

  // ✅ Toggle Present / Absent
  const toggleAttendance = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "Present" ? "Absent" : "Present",
    }));
  };

  // ✅ Save Attendance to Backend
  const handleSaveAttendance = async () => {
    if (!selectedClass || students.length === 0) return;

    const records = students.map((stu) => ({
      studentId: stu._id,
      studentName: stu.name,
      enrollNo: stu.enrollNo,
      status: attendance[stu._id] || "Absent",
    }));

    try {
      const payload = {
        className: selectedClass.name,
        date: new Date(),
        records,
      };

      const res = await API.post("/attendance/save", payload);
      alert(`✅ Attendance saved successfully for ${selectedClass.name}`);
      console.log("Saved:", res.data);
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error saving attendance:", error);
      alert("Error saving attendance. Please try again.");
    }
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
              <th className="p-3 text-left">Student Limit</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{cls.name}</td>
                <td className="p-3">{cls.grade}</td>
                <td className="p-3">{cls.studentsLimit}</td>
                <td className="p-3">{new Date(cls.startDate).toLocaleDateString()}</td>
                <td className="p-3">{new Date(cls.endDate).toLocaleDateString()}</td>
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
                <td colSpan="6" className="p-5 text-center text-gray-500 italic">
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
                {students.map((stu, index) => (
                  <tr key={stu._id} className="border-b hover:bg-gray-50 transition">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{stu.name}</td>
                    <td className="p-2">{stu.enrollNo}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => toggleAttendance(stu._id)}
                        className={`flex items-center justify-center gap-1 px-3 py-1 rounded-lg font-medium transition ${
                          attendance[stu._id] === "Present"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-red-100 text-red-700 hover:bg-red-200"
                        }`}
                      >
                        {attendance[stu._id] === "Present" ? (
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
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 p-4 italic">
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
