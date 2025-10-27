import React, { useState } from "react";
import { Map, Plus, Edit2, Trash2, Save } from "lucide-react";

const classes = ["Grade 6A", "Grade 6B", "Grade 7A", "Grade 8B"];
const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["Active", "Completed"];

const ManageQuests = () => {
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Solar System Exploration",
      description: "Learn the planets and their order.",
      assignedClass: "Grade 6A",
      difficulty: "Medium",
      reward: "50 XP",
      startDate: "2025-10-10",
      endDate: "2025-10-20",
      status: "Active",
    },
    {
      id: 2,
      title: "Math Quiz 2",
      description: "Practice fractions and decimals.",
      assignedClass: "Grade 7A",
      difficulty: "Easy",
      reward: "30 XP",
      startDate: "2025-10-15",
      endDate: "2025-10-22",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    assignedClass: "",
    difficulty: "",
    reward: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });
  const [editQuest, setEditQuest] = useState(null);

  const filteredQuests = quests.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedClass === "" || q.assignedClass === selectedClass)
  );

  const handleAddQuest = () => {
    if (
      !newQuest.title ||
      !newQuest.description ||
      !newQuest.assignedClass ||
      !newQuest.difficulty ||
      !newQuest.reward ||
      !newQuest.startDate ||
      !newQuest.endDate
    )
      return;

    setQuests([...quests, { ...newQuest, id: Date.now() }]);
    setNewQuest({
      title: "",
      description: "",
      assignedClass: "",
      difficulty: "",
      reward: "",
      startDate: "",
      endDate: "",
      status: "Active",
    });
    setShowModal(false);
  };

  const handleDeleteQuest = (id) => {
    setQuests(quests.filter((q) => q.id !== id));
  };

  const handleEditClick = (quest) => {
    setEditQuest(quest);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setQuests(
      quests.map((q) => (q.id === editQuest.id ? editQuest : q))
    );
    setShowEditModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <Map size={28} /> Manage Quests
        </h1>

        {/* Filters + Add */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Quest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600 w-full sm:w-64"
          />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-600"
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
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-800 transition"
          >
            <Plus size={20} /> Create Quest
          </button>
        </div>
      </div>

      {/* Quest Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Difficulty</th>
              <th className="p-3 text-left">Reward</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuests.map((q) => (
              <tr key={q.id} className="border-b hover:bg-gray-50 transition-all">
                <td className="p-3 font-medium text-gray-800">{q.title}</td>
                <td className="p-3 text-gray-600">{q.description}</td>
                <td className="p-3 text-gray-600">{q.assignedClass}</td>
                <td
                  className={`p-3 font-semibold ${
                    q.difficulty === "Easy"
                      ? "text-green-600"
                      : q.difficulty === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {q.difficulty}
                </td>
                <td className="p-3 text-gray-600">{q.reward}</td>
                <td className="p-3 text-gray-600">{q.startDate}</td>
                <td className="p-3 text-gray-600">{q.endDate}</td>
                <td
                  className={`p-3 font-semibold ${
                    q.status === "Active" ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {q.status}
                </td>
                <td className="p-3 text-right flex justify-end gap-3">
                  <button
                    onClick={() => handleEditClick(q)}
                    className="text-yellow-600 hover:bg-yellow-50 p-2 rounded-full transition"
                    title="Edit Quest"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteQuest(q.id)}
                    className="text-red-600 hover:bg-red-50 p-2 rounded-full transition"
                    title="Delete Quest"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredQuests.length === 0 && (
              <tr>
                <td colSpan="9" className="p-3 text-center text-gray-500 italic">
                  No quests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Quest Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Quest</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Quest Title"
                value={newQuest.title}
                onChange={(e) => setNewQuest({ ...newQuest, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <textarea
                placeholder="Description"
                value={newQuest.description}
                onChange={(e) => setNewQuest({ ...newQuest, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <select
                value={newQuest.assignedClass}
                onChange={(e) => setNewQuest({ ...newQuest, assignedClass: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <select
                value={newQuest.difficulty}
                onChange={(e) => setNewQuest({ ...newQuest, difficulty: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              >
                <option value="">Select Difficulty</option>
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Reward (e.g., 50 XP / Badge)"
                value={newQuest.reward}
                onChange={(e) => setNewQuest({ ...newQuest, reward: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={newQuest.startDate}
                  onChange={(e) => setNewQuest({ ...newQuest, startDate: e.target.value })}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
                />
                <input
                  type="date"
                  value={newQuest.endDate}
                  onChange={(e) => setNewQuest({ ...newQuest, endDate: e.target.value })}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddQuest}
                className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Quest Modal */}
      {showEditModal && editQuest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Quest</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={editQuest.title}
                onChange={(e) => setEditQuest({ ...editQuest, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
              <textarea
                value={editQuest.description}
                onChange={(e) => setEditQuest({ ...editQuest, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
              <select
                value={editQuest.assignedClass}
                onChange={(e) => setEditQuest({ ...editQuest, assignedClass: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
              <select
                value={editQuest.difficulty}
                onChange={(e) => setEditQuest({ ...editQuest, difficulty: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={editQuest.reward}
                onChange={(e) => setEditQuest({ ...editQuest, reward: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              />
              <div className="flex gap-2">
                <input
                  type="date"
                  value={editQuest.startDate}
                  onChange={(e) => setEditQuest({ ...editQuest, startDate: e.target.value })}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                />
                <input
                  type="date"
                  value={editQuest.endDate}
                  onChange={(e) => setEditQuest({ ...editQuest, endDate: e.target.value })}
                  className="w-1/2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <select
                value={editQuest.status}
                onChange={(e) => setEditQuest({ ...editQuest, status: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2 transition"
              >
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuests;
