import React, { useState } from "react";
import { Users, Eye, Edit2, Trash2, Plus, X } from "lucide-react";

const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 8B"];

const ManageStudents = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Smith", class: "Grade 6A", enrollNo: "001", contact: "555-123-4567", performance: "Excellent" },
    { id: 2, name: "Maria Johnson", class: "Grade 7A", enrollNo: "002", contact: "123-456-7890", performance: "Average" },
    { id: 3, name: "Alex Brown", class: "Grade 6B", enrollNo: "003", contact: "987-654-3210", performance: "Needs Help" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    enrollNo: "",
    contact: "",
    performance: "Average",
  });

  // Filter students
  const filteredStudents = students.filter(
    (stu) =>
      stu.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === "" || stu.class === selectedClass)
  );

  // Handle Add Student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.class || !newStudent.enrollNo) {
      alert("Please fill all fields before saving.");
      return;
    }
    const newEntry = { id: students.length + 1, ...newStudent };
    setStudents([...students, newEntry]);
    setShowModal(false);
    setNewStudent({ name: "", class: "", enrollNo: "", contact: "", performance: "Average" });
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700 flex items-center gap-2">
          <Users size={28} /> Manage Students
        </h1>

        {/* Filters & Add Button */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
          <input
            type="text"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-64"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-sm md:text-base">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left w-1/5">Student Name</th>
               <th className="p-3 text-left w-1/6">Class</th>
               <th className="p-3 text-left w-1/6">Enroll No</th>
               <th className="p-3 text-left w-1/5">Contact No</th>
               <th className="p-3 text-left w-1/6">Performance</th>
               <th className="p-3 text-center w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((stu) => (
                <tr key={stu.id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-3 font-medium text-gray-800">{stu.name}</td>
                  <td className="p-3 text-gray-600">{stu.class}</td>
                  <td className="p-3 text-gray-600">{stu.enrollNo}</td>
                  <td className="p-3 text-gray-600">{stu.contact}</td>
                  <td
                    className={`p-3 font-semibold ${
                      stu.performance === "Excellent"
                        ? "text-green-600"
                        : stu.performance === "Average"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {stu.performance}
                  </td>
                  <td className="p-3 flex justify-end gap-3">
                    <button
                      title="View Details"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      title="Edit Student"
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      title="Remove Student"
                      onClick={() => handleDelete(stu.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-5 text-center text-gray-500">
                  No students found. Try changing filters or add a new student.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-red-700">Add New Student</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <select
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Enroll No"
                value={newStudent.enrollNo}
                onChange={(e) => setNewStudent({ ...newStudent, enrollNo: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="text"
                placeholder="Contact No"
                value={newStudent.contact}
                onChange={(e) => setNewStudent({ ...newStudent, contact: e.target.value })}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStudent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;
