import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Plus, Eye, Trash2, X, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const grades = ["6", "7", "8", "9", "10", "11", "12"];

const ManageClasses = () => {
  const API_URL = "http://localhost:5000/api/classes";
  const STUDENT_API_URL = "http://localhost:5000/api/students";

  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClassModal, setShowClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [editClass, setEditClass] = useState(null);

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

  // ✅ Fetch all classes from backend
  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(API_URL);
      setClasses(
        res.data.map((cls) => ({
          ...cls,
          id: cls._id,
          students: cls.studentsLimit,
          studentList: [],
        }))
      );
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  // ✅ Add or Update Class (POST or PUT)
  const handleAddOrUpdateClass = async () => {
    if (
      !newClass.name ||
      !newClass.grade ||
      !newClass.students ||
      !newClass.startDate ||
      !newClass.endDate
    )
      return alert("Please fill all fields");

    try {
      const payload = {
        name: newClass.name,
        grade: newClass.grade,
        studentsLimit: newClass.students,
        startDate: newClass.startDate,
        endDate: newClass.endDate,
      };

      if (editClass) {
        await axios.put(`${API_URL}/${editClass.id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      await fetchClasses();
      closeClassModal();
    } catch (err) {
      console.error("Error saving class:", err);
    }
  };

  const closeClassModal = () => {
    setShowAddClassModal(false);
    setEditClass(null);
    setNewClass({
      name: "",
      grade: "",
      students: "",
      startDate: "",
      endDate: "",
    });
  };

  // ✅ Edit class
  const handleEditClass = (cls) => {
    setEditClass(cls);
    setNewClass({
      name: cls.name,
      grade: cls.grade,
      students: cls.students,
      startDate: cls.startDate.split("T")[0],
      endDate: cls.endDate.split("T")[0],
    });
    setShowAddClassModal(true);
  };

  // ✅ Delete class
  const handleDeleteClass = async (id) => {
    if (!window.confirm("Are you sure you want to delete this class?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  };

  // ✅ View class and its students
  const handleViewClass = async (cls) => {
    try {
      const res = await axios.get(`${STUDENT_API_URL}/class/${cls._id}`);
      const updatedClass = { ...cls, studentList: res.data };
      setSelectedClass(updatedClass);
      setShowClassModal(true);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // ✅ Add or update student
  const handleSaveStudent = async () => {
    if (!newStudent.name || !newStudent.enrollNo || !newStudent.contact) {
      return alert("Please fill all student fields");
    }

    try {
      const payload = {
        ...newStudent,
        classId: selectedClass._id,
      };

      if (editStudent) {
        await axios.put(`${STUDENT_API_URL}/${editStudent._id}`, payload);
      } else {
        await axios.post(STUDENT_API_URL, payload);
      }

      // Refresh student list without closing modal
      const res = await axios.get(`${STUDENT_API_URL}/class/${selectedClass._id}`);
      setSelectedClass({ ...selectedClass, studentList: res.data });

      closeStudentModal();
    } catch (err) {
      console.error("Error saving student:", err);
      alert("Error saving student");
    }
  };

  const closeStudentModal = () => {
    setShowStudentModal(false);
    setEditStudent(null);
    setNewStudent({ name: "", enrollNo: "", contact: "" });
  };

  // ✅ Edit student
  const handleEditStudent = (stu) => {
    setEditStudent(stu);
    setNewStudent({
      name: stu.name,
      enrollNo: stu.enrollNo,
      contact: stu.contact,
    });
    setShowStudentModal(true);
  };

  // ✅ Delete student
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${STUDENT_API_URL}/${id}`);
      const res = await axios.get(`${STUDENT_API_URL}/class/${selectedClass._id}`);
      setSelectedClass({ ...selectedClass, studentList: res.data });
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  // ✅ View student profile (placeholder)
  const handleViewStudentProfile = (student) => {
    navigate(`/student/${student._id}`, { state: { student } });
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <BookOpen size={28} /> Manage Classes
        </h1>

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
              <th className="p-3 text-center">Class Name</th>
              <th className="p-3 text-center">Grade</th>
              <th className="p-3 text-center">Total Students</th>
              <th className="p-3 text-center">Start Date</th>
              <th className="p-3 text-center">End Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls) => (
              <tr key={cls.id} className="border-b hover:bg-gray-50 text-center">
                <td className="p-1 font-medium text-gray-800">{cls.name}</td>
                <td className="p-1">{cls.grade}</td>
                <td className="p-2">{cls.students}</td>
                <td className="p-2">{cls.startDate?.slice(0, 10)}</td>
                <td className="p-2">{cls.endDate?.slice(0, 10)}</td>
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

      {/* ✅ Class Modal (Student Management) */}
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
                  <th className="p-1 text-center">SI No</th>
                  <th className="p-1 text-center">Student Name</th>
                  <th className="p-1 text-center">Enroll No</th>
                  <th className="p-1 text-center">Contact</th>
                  <th className="p-1 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.studentList.map((stu, index) => (
                  <tr key={stu._id} className="border-b hover:bg-gray-50 text-center">
                    <td className="p-1">{index + 1}</td>
                    <td className="p-1">{stu.name}</td>
                    <td className="p-1">{stu.enrollNo}</td>
                    <td className="p-1">{stu.contact}</td>
                    <td className="p-1 px-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleViewStudentProfile(stu)}
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
                          onClick={() => handleDeleteStudent(stu._id)}
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

      {/* Add/Edit Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeStudentModal}
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
                onClick={closeStudentModal}
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

      {/* Add/Edit Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeClassModal}
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
                onClick={closeClassModal}
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
