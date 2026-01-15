// src/pages/Teacher/RewardSystem.js
import React, { useEffect, useState } from "react";
import { Award, Plus, Trash2, Save } from "lucide-react";
import API from "../../api/axiosInstance";

const RewardSystem = () => {
  const [rewards, setRewards] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newReward, setNewReward] = useState({
    student: "",
    classId: "",
    xp: "",
    badge: "",
    date: "",
    reason: "",
  });

  /* =======================
     FETCH DATA
  ======================= */

  useEffect(() => {
    fetchRewards();
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchRewards = async () => {
    try {
      const res = await API.get("/rewards");
      setRewards(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load rewards", err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load students", err);
    }
  };

  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes");
      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load classes", err);
    }
  };

  /* =======================
     CREATE REWARD
  ======================= */

  const handleAddReward = async () => {
    const { student, classId, xp, badge, date, reason } = newReward;

    if (!student || !classId || !xp || !badge || !date) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await API.post("/rewards", {
        studentId: student,
        classId,
        xp: Number(xp),
        badge,
        reason,
        date,
      });

      setShowModal(false);
      setNewReward({
        student: "",
        classId: "",
        xp: "",
        badge: "",
        date: "",
        reason: "",
      });

      fetchRewards();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create reward");
    }
  };

  /* =======================
     DELETE REWARD
  ======================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reward?")) return;

    try {
      await API.delete(`/rewards/${id}`);
      fetchRewards();
    } catch {
      alert("Failed to delete reward");
    }
  };

  /* =======================
     FILTER
  ======================= */

  const filteredRewards = rewards.filter(
    (r) =>
      r.student?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) &&
      (selectedClass === "" || r.classId?._id === selectedClass) &&
      (selectedDate === "" ||
        r.date?.slice(0, 10) === selectedDate)
  );

  /* =======================
     UI
  ======================= */

  return (
    <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-red-700 flex items-center gap-2">
          <Award size={28} /> Reward System
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Student..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Classes</option>
            {classes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />

          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[700px]">
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
              <tr key={r._id} className="border-b">
                <td className="p-3">{r.student?.name}</td>
                <td className="p-3">{r.classId?.name}</td>
                <td className="p-3">{r.xp}</td>
                <td className="p-3">{r.badge}</td>
                <td className="p-3">{r.date?.slice(0, 10)}</td>
                <td className="p-3">{r.reason}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredRewards.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No rewards found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Add Reward
            </h2>

            <select
  className="input"
  value={newReward.student}
  onChange={(e) =>
    setNewReward({ ...newReward, student: e.target.value })
  }
  disabled={!newReward.classId}
>
  <option value="">Select Student</option>

  {students
    .filter((s) => s.classId?._id === newReward.classId)
    .map((s) => (
      <option key={s._id} value={s._id}>
        {s.name} ({s.enrollNo})
      </option>
    ))}
</select>


            <select
  className="input"
  value={newReward.classId}
  onChange={(e) =>
    setNewReward({
      ...newReward,
      classId: e.target.value,
      student: "", // 🔥 reset student when class changes
    })
  }
>
  <option value="">Select Class</option>
  {classes.map((c) => (
    <option key={c._id} value={c._id}>
      {c.name}
    </option>
  ))}
</select>


            <input
              type="number"
              placeholder="XP"
              className="input"
              value={newReward.xp}
              onChange={(e) =>
                setNewReward({ ...newReward, xp: e.target.value })
              }
            />

            <input
              placeholder="Badge"
              className="input"
              value={newReward.badge}
              onChange={(e) =>
                setNewReward({ ...newReward, badge: e.target.value })
              }
            />

            <input
              type="date"
              className="input"
              value={newReward.date}
              onChange={(e) =>
                setNewReward({ ...newReward, date: e.target.value })
              }
            />

            <textarea
              placeholder="Reason"
              className="input"
              value={newReward.reason}
              onChange={(e) =>
                setNewReward({ ...newReward, reason: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button
                onClick={handleAddReward}
                className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <Save size={16} /> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardSystem;
