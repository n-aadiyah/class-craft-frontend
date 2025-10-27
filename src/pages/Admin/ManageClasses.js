import React, { useState } from "react";
import { BookOpen, Plus, Eye, Trash2, X } from "lucide-react";

const grades = ["6", "7", "8", "9", "10", "11", "12"];

const ManageClasses = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: "Grade 6A",
      grade: "6",
      students: 25,
      startDate: "2025-10-01",
      endDate: "2026-03-31",
      studentList: [
        { id: 1, name: "John Smith", roll: "6A01", attendance: "Present" },
        { id: 2, name: "Emily Brown", roll: "6A02", attendance: "Absent" },
      ],
    },
    {
      id: 2,
      name: "Grade 7B",
      grade: "7",
      students: 28,
      startDate: "2025-09-15",
      endDate: "2026-04-30",
      studentList: [
        { id: 1, name: "Alex Taylor", roll: "7B01", attendance: "Present" },
        { id: 2, name: "Sophia Davis", roll: "7B02", attendance: "Present" },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    grade: "",
    students: "",
    startDate: "",
    endDate: "",
  });

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClass = () => {
    if (
      !newClass.name ||
      !newClass.grade ||
      !newClass.students ||
      !newClass.startDate ||
      !newClass.endDate
    )
      return;

    setClasses([...classes, { ...newClass, id: Date.now(), studentList: [] }]);
    setNewClass({
      name: "",
      grade: "",
      students: "",
      startDate: "",
      endDate: "",
    });
    setShowAddClassModal(false);
  };

  const handleViewClass = (cls) => {
    setSelectedClass(cls);
    setShowModal(true);
  };

  const toggleAttendance = (studentId) => {
    const updatedStudents = selectedClass.studentList.map((stu) =>
      stu.id === studentId
        ? {
            ...stu,
            attendance: stu.attendance === "Present" ? "Absent" : "Present",
          }
        : stu
    );

    const updatedClass = { ...selectedClass, studentList: updatedStudents };
    setSelectedClass(updatedClass);
    setClasses(
      classes.map((c) => (c.id === selectedClass.id ? updatedClass : c))
    );
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <BookOpen size={28} /> Manage Classes
        </h1>

        {/* Search & Add */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-64"
          />
          <button
            onClick={() => setShowAddClassModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700 transition"
          >
            <Plus size={20} /> Add Class
          </button>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-sm md:text-base table-auto">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left w-1/5">Class Name</th>
              <th className="p-3 text-left w-1/6">Grade</th>
              <th className="p-3 text-left w-1/6">Students</th>
              <th className="p-3 text-left w-1/5">Start Date</th>
              <th className="p-3 text-left w-1/5">End Date</th>
              <th className="p-3 text-center w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls) => (
              <tr
                key={cls.id}
                className="border-b hover:bg-gray-50 transition-all"
              >
                <td className="p-3 font-medium text-gray-800">{cls.name}</td>
                <td className="p-3 text-gray-600">{cls.grade}</td>
                <td className="p-3 text-gray-600">{cls.students}</td>
                <td className="p-3 text-gray-600">{cls.startDate}</td>
                <td className="p-3 text-gray-600">{cls.endDate}</td>
                <td className="p-2 text-center whitespace-nowrap">
                  <div className="flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      onClick={() => handleViewClass(cls)}
                      title="View Class"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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

      {/* 📘 Class Details Modal */}
      {showModal && selectedClass && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Eye className="text-red-600" /> {selectedClass.name} — Grade{" "}
              {selectedClass.grade}
            </h2>
            <p className="text-gray-600 mb-4">
              Duration: {selectedClass.startDate} - {selectedClass.endDate}
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mb-3">Students</h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-red-100 text-red-800">
                  <tr>
                    <th className="p-2 text-left w-1/4">Roll No</th>
                    <th className="p-2 text-left w-2/4">Name</th>
                    <th className="p-2 text-left w-1/4">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClass.studentList.map((stu) => (
                    <tr key={stu.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">{stu.roll}</td>
                      <td className="p-2">{stu.name}</td>
                      <td className="p-2">
                        <button
                          onClick={() => toggleAttendance(stu.id)}
                          className={`px-3 py-1 rounded-lg font-medium ${
                            stu.attendance === "Present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {stu.attendance}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Add Class Modal */}
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
              Add New Class
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Class Name"
                value={newClass.name}
                onChange={(e) =>
                  setNewClass({ ...newClass, name: e.target.value })
                }
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
                    setNewClass({
                      ...newClass,
                      startDate: e.target.value,
                    })
                  }
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
                />
                <input
                  type="date"
                  value={newClass.endDate}
                  onChange={(e) =>
                    setNewClass({
                      ...newClass,
                      endDate: e.target.value,
                    })
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
                onClick={handleAddClass}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
              >
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClasses;
