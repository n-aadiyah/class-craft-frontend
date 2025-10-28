import React, { useState } from "react";
import { BookOpen, Plus, Eye, Trash2, X, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ For navigation to student profile

const grades = ["6", "7", "8", "9", "10", "11", "12"];

const ManageClasses = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation hook

  const [classes, setClasses] = useState([
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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showClassModal, setShowClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [editClass, setEditClass] = useState(null); // ✅ New: track class being edited

  const [newClass, setNewClass] = useState({
    name: "",
    grade: "",
    students: "",
    startDate: "",
    endDate: "",
  });

  const [newStudent, setNewStudent] = useState({
    name: "",
    enrollNo: "",
    contact: "",
  });

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Add or Update Class ---
  const handleAddOrUpdateClass = () => {
    if (
      !newClass.name ||
      !newClass.grade ||
      !newClass.students ||
      !newClass.startDate ||
      !newClass.endDate
    )
      return;

    if (editClass) {
      // Update existing class
      const updatedClasses = classes.map((cls) =>
        cls.id === editClass.id ? { ...cls, ...newClass } : cls
      );
      setClasses(updatedClasses);
      setEditClass(null);
    } else {
      // Add new class
      setClasses([...classes, { ...newClass, id: Date.now(), studentList: [] }]);
    }

    setNewClass({
      name: "",
      grade: "",
      students: "",
      startDate: "",
      endDate: "",
    });
    setShowAddClassModal(false);
  };

  // --- Open modal for editing class ---
  const handleEditClass = (cls) => {
    setEditClass(cls);
    setNewClass({
      name: cls.name,
      grade: cls.grade,
      students: cls.students,
      startDate: cls.startDate,
      endDate: cls.endDate,
    });
    setShowAddClassModal(true);
  };

  // --- View Class (open Manage Students modal) ---
  const handleViewClass = (cls) => {
    setSelectedClass(cls);
    setShowClassModal(true);
  };

  // --- Delete Class ---
  const handleDeleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
    setShowClassModal(false);
  };

  // --- Add or Edit Student ---
  const handleSaveStudent = () => {
    if (!newStudent.name || !newStudent.enrollNo || !newStudent.contact) return;

    const updatedStudents = editStudent
      ? selectedClass.studentList.map((stu) =>
          stu.id === editStudent.id ? { ...newStudent, id: stu.id } : stu
        )
      : [...selectedClass.studentList, { ...newStudent, id: Date.now() }];

    if (updatedStudents.length > selectedClass.students) {
      alert("❌ You have reached the maximum number of students for this class!");
      return;
    }

    const updatedClass = { ...selectedClass, studentList: updatedStudents };
    setSelectedClass(updatedClass);
    setClasses(classes.map((c) => (c.id === selectedClass.id ? updatedClass : c)));
    setShowStudentModal(false);
    setEditStudent(null);
    setNewStudent({ name: "", enrollNo: "", contact: "" });
  };

  const handleEditStudent = (stu) => {
    setEditStudent(stu);
    setNewStudent({ name: stu.name, enrollNo: stu.enrollNo, contact: stu.contact });
    setShowStudentModal(true);
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = selectedClass.studentList.filter((stu) => stu.id !== id);
    const updatedClass = { ...selectedClass, studentList: updatedStudents };
    setSelectedClass(updatedClass);
    setClasses(classes.map((c) => (c.id === selectedClass.id ? updatedClass : c)));
  };

  // ✅ NEW: Navigate to individual student profile
  const handleViewStudentProfile = (student) => {
    navigate(`/teacher/students/${student.id}`);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <BookOpen size={28} /> Manage Classes
        </h1>

        {/* Search + Add Class */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-64"
          />
          <button
            onClick={() => {
              setShowAddClassModal(true);
              setEditClass(null);
              setNewClass({
                name: "",
                grade: "",
                students: "",
                startDate: "",
                endDate: "",
              });
            }}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition"
          >
            <Plus size={20} /> Add Class
          </button>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full border-collapse text-sm md:text-base table-auto">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left">Class Name</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Total Students</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls) => (
              <tr key={cls.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-800">{cls.name}</td>
                <td className="p-3">{cls.grade}</td>
                <td className="p-3">{cls.students}</td>
                <td className="p-3">{cls.startDate}</td>
                <td className="p-3">{cls.endDate}</td>
                <td className="p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={() => handleViewClass(cls)}
                      title="View Students"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                      onClick={() => handleEditClass(cls)}
                      title="Edit Class"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      onClick={() => handleDeleteClass(cls.id)}
                      title="Delete Class"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredClasses.length === 0 && (
              <tr>
                <td colSpan="6" className="p-5 text-center text-gray-500">
                  No classes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📘 Manage Students Modal */}
      {showClassModal && selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl relative">
            <button
              onClick={() => setShowClassModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-red-700 mb-4">
              {selectedClass.name} — Manage Students
            </h2>

            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600">
                Total Allowed: <b>{selectedClass.students}</b> | Added:{" "}
                <b>{selectedClass.studentList.length}</b>
              </p>
              <button
                onClick={() => {
                  setShowStudentModal(true);
                  setEditStudent(null);
                  setNewStudent({ name: "", enrollNo: "", contact: "" });
                }}
                className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition"
              >
                <Plus size={18} /> Add Student
              </button>
            </div>

            <table className="w-full border-collapse text-sm">
              <thead className="bg-red-100 text-red-800">
                <tr>
                  <th className="p-2 text-left w-1/12">SI No</th>
                  <th className="p-2 text-left w-2/6">Student Name</th>
                  <th className="p-2 text-left w-1/6">Enroll No</th>
                  <th className="p-2 text-left w-1/6">Contact</th>
                  <th className="p-2 text-center w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.studentList.map((stu, index) => (
                  <tr key={stu.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{stu.name}</td>
                    <td className="p-2">{stu.enrollNo}</td>
                    <td className="p-2">{stu.contact}</td>
                    <td className="p-2 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewStudentProfile(stu)} // ✅ View Student Profile
                          className="text-green-600 hover:bg-green-50 p-2 rounded-lg"
                          title="View Profile"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditStudent(stu)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                          title="Edit Student"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteStudent(stu.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                          title="Delete Student"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {selectedClass.studentList.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 p-3">
                      No students added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ➕ Add/Edit Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowStudentModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editStudent ? "Edit Student" : "Add Student"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <input
                type="text"
                placeholder="Enroll Number"
                value={newStudent.enrollNo}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, enrollNo: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={newStudent.contact}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, contact: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowStudentModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStudent}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
              >
                {editStudent ? "Save Changes" : "Add Student"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Add/Edit Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowAddClassModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editClass ? "Edit Class" : "Add New Class"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Class Name"
                value={newClass.name}
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <select
                value={newClass.grade}
                onChange={(e) =>
                  setNewClass({ ...newClass, grade: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Grade</option>
                {grades.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Number of Students"
                value={newClass.students}
                onChange={(e) =>
                  setNewClass({ ...newClass, students: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={newClass.startDate}
                  onChange={(e) =>
                    setNewClass({ ...newClass, startDate: e.target.value })
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
                />
                <input
                  type="date"
                  value={newClass.endDate}
                  onChange={(e) =>
                    setNewClass({ ...newClass, endDate: e.target.value })
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowAddClassModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateClass}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
              >
                {editClass ? "Save Changes" : "Add Class"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
