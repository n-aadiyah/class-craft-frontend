import React, { useState } from "react";
import { Award, Plus, Edit2, Trash2, Save } from "lucide-react";

const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 8B"];

const RewardSystem = () => {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      student: "John Smith",
      class: "Grade 6A",
      xp: 50,
      badge: "Science Star",
      date: "2025-10-20",
      reason: "Excellent performance in Solar System Quest",
    },
    {
      id: 2,
      student: "Maria Johnson",
      class: "Grade 7A",
      xp: 30,
      badge: "Math Whiz",
      date: "2025-10-18",
      reason: "Completed Math Quiz 2",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingReward, setEditingReward] = useState(null);

  const [newReward, setNewReward] = useState({
    student: "",
    class: "",
    xp: "",
    badge: "",
    date: "",
    reason: "",
  });

  const filteredRewards = rewards.filter(
    (r) =>
      r.student.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === "" || r.class === selectedClass) &&
      (selectedDate === "" || r.date === selectedDate)
  );

  // 🟢 Handle Add New Reward
  const handleAddReward = () => {
    if (!newReward.student || !newReward.class || !newReward.xp || !newReward.badge || !newReward.date)
      return;

    setRewards([...rewards, { ...newReward, id: Date.now() }]);
    setNewReward({ student: "", class: "", xp: "", badge: "", date: "", reason: "" });
    setShowModal(false);
  };

  // 🟡 Open Edit Modal with Data
  const handleEditClick = (reward) => {
    setEditingReward(reward);
    setNewReward({ ...reward });
    setShowModal(true);
  };

  // 🟢 Save Edited Reward
  const handleSaveEdit = () => {
    setRewards((prev) =>
      prev.map((r) => (r.id === editingReward.id ? { ...newReward, id: r.id } : r))
    );
    setEditingReward(null);
    setNewReward({ student: "", class: "", xp: "", badge: "", date: "", reason: "" });
    setShowModal(false);
  };

  // 🔴 Delete Reward
  const handleDelete = (id) => {
    setRewards(rewards.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700 flex items-center gap-2">
          <Award size={28} /> Reward System
        </h1>

        {/* Filters + Add Button */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 w-full sm:w-56"
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
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            onClick={() => {
              setShowModal(true);
              setEditingReward(null);
              setNewReward({
                student: "",
                class: "",
                xp: "",
                badge: "",
                date: "",
                reason: "",
              });
            }}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-800 transition"
          >
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      {/* Rewards Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">XP</th>
              <th className="p-3 text-left">Badge</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRewards.map((r) => (
              <tr
                key={r.id}
                className="border-b hover:bg-gray-50 transition-all duration-200"
              >
                <td className="p-3 font-medium text-gray-800">{r.student}</td>
                <td className="p-3 text-gray-600">{r.class}</td>
                <td className="p-3 text-gray-600">{r.xp}</td>
                <td className="p-3 text-gray-600">{r.badge}</td>
                <td className="p-3 text-gray-600">{r.date}</td>
                <td className="p-3 text-gray-600">{r.reason}</td>
                <td className="p-3 flex justify-end gap-3">
                  <button
                    title="Edit Reward"
                    onClick={() => handleEditClick(r)}
                    className="p-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    title="Remove Reward"
                    onClick={() => handleDelete(r.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredRewards.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No rewards found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 sm:w-96 animate-fadeIn">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              {editingReward ? "Edit Reward" : "Add New Reward"}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Student Name"
                value={newReward.student}
                onChange={(e) =>
                  setNewReward({ ...newReward, student: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <select
                value={newReward.class}
                onChange={(e) =>
                  setNewReward({ ...newReward, class: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="XP Points"
                value={newReward.xp}
                onChange={(e) =>
                  setNewReward({ ...newReward, xp: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="text"
                placeholder="Badge / Title"
                value={newReward.badge}
                onChange={(e) =>
                  setNewReward({ ...newReward, badge: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="date"
                value={newReward.date}
                onChange={(e) =>
                  setNewReward({ ...newReward, date: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <textarea
                placeholder="Reason / Notes"
                value={newReward.reason}
                onChange={(e) =>
                  setNewReward({ ...newReward, reason: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={editingReward ? handleSaveEdit : handleAddReward}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-red-800 flex items-center gap-2 transition"
              >
                <Save size={18} /> {editingReward ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardSystem;
