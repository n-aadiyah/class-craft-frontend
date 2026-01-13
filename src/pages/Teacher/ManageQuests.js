// src/pages/Teacher/ManageQuests.js
import React, { useEffect, useState } from "react";
import { Map, Plus, Edit2, Trash2, Save } from "lucide-react";
import API from "../../api/axiosInstance";

const difficulties = ["Easy", "Medium", "Hard"];
const statuses = ["Active", "Completed"];

const ManageQuests = () => {
  const [quests, setQuests] = useState([]);
  const [classes, setClasses] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    classId: "",
    difficulty: "",
    rewardXP: "",
    startDate: "",
    endDate: "",
  });

  const [editQuest, setEditQuest] = useState(null);

  /* =======================
     FETCH DATA
  ======================= */

  useEffect(() => {
    fetchClasses();
    fetchQuests();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await API.get("/classes/my-classes");
      setClasses(Array.isArray(res.data) ? res.data : []);
    } catch {
      alert("Failed to load classes");
    }
  };

  const fetchQuests = async (classId = "") => {
    try {
      const url = classId ? `/quests?classId=${classId}` : "/quests";
      const res = await API.get(url);
      setQuests(Array.isArray(res.data) ? res.data : []);
    } catch {
      alert("Failed to load quests");
    }
  };

  /* =======================
     CREATE QUEST
  ======================= */

  const handleAddQuest = async () => {
    const {
      title,
      description,
      classId,
      difficulty,
      rewardXP,
      startDate,
      endDate,
    } = newQuest;

    if (!title || !description || !classId || !difficulty || !rewardXP || !startDate || !endDate) {
      return alert("Please fill all fields");
    }

    try {
      await API.post("/quests", {
        title,
        description,
        classId,
        difficulty,
        rewardXP: Number(rewardXP),
        startDate,
        endDate,
      });

      setShowModal(false);
      setNewQuest({
        title: "",
        description: "",
        classId: "",
        difficulty: "",
        rewardXP: "",
        startDate: "",
        endDate: "",
      });

      fetchQuests(selectedClass);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create quest");
    }
  };

  /* =======================
     DELETE QUEST
  ======================= */

  const handleDeleteQuest = async (id) => {
    if (!window.confirm("Delete this quest?")) return;
    try {
      await API.delete(`/quests/${id}`);
      fetchQuests(selectedClass);
    } catch {
      alert("Failed to delete quest");
    }
  };

  /* =======================
     EDIT QUEST
  ======================= */

  const handleEditClick = (quest) => {
    setEditQuest({
      ...quest,
      rewardXP: quest.rewardXP,
      startDate: quest.startDate?.slice(0, 10),
      endDate: quest.endDate?.slice(0, 10),
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await API.put(`/quests/${editQuest._id}`, {
        title: editQuest.title,
        description: editQuest.description,
        difficulty: editQuest.difficulty,
        rewardXP: Number(editQuest.rewardXP),
        startDate: editQuest.startDate,
        endDate: editQuest.endDate,
        status: editQuest.status,
      });

      setShowEditModal(false);
      fetchQuests(selectedClass);
    } catch {
      alert("Failed to update quest");
    }
  };

  /* =======================
     FILTER
  ======================= */

  const filteredQuests = quests.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* =======================
     UI
  ======================= */

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-red-700 flex items-center gap-2">
          <Map size={28} /> Manage Quests
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Quest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border rounded-lg w-full sm:w-64"
          />
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              fetchQuests(e.target.value);
            }}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Create Quest
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow-md rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-red-100 text-red-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Difficulty</th>
              <th className="p-3 text-left">Reward</th>
              <th className="p-3 text-left">Dates</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQuests.map((q) => (
              <tr key={q._id} className="border-b">
                <td className="p-3 font-medium">{q.title}</td>
                <td className="p-3">{q.classId?.name}</td>
                <td className="p-3">{q.difficulty}</td>
                <td className="p-3">{q.rewardXP} XP</td>
                <td className="p-3">
                  {q.startDate?.slice(0, 10)} → {q.endDate?.slice(0, 10)}
                </td>
                <td className="p-3">{q.status}</td>
                <td className="p-3 text-right flex gap-2 justify-end">
                  <button onClick={() => handleEditClick(q)}><Edit2 size={18} /></button>
                  <button onClick={() => handleDeleteQuest(q._id)}><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {filteredQuests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No quests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Quest</h2>

            <input placeholder="Title" className="input" onChange={(e)=>setNewQuest({...newQuest,title:e.target.value})}/>
            <textarea placeholder="Description" className="input" onChange={(e)=>setNewQuest({...newQuest,description:e.target.value})}/>
            <select className="input" onChange={(e)=>setNewQuest({...newQuest,classId:e.target.value})}>
              <option value="">Select Class</option>
              {classes.map(c=> <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
            <select className="input" onChange={(e)=>setNewQuest({...newQuest,difficulty:e.target.value})}>
              <option value="">Difficulty</option>
              {difficulties.map(d=> <option key={d}>{d}</option>)}
            </select>
            <input placeholder="Reward XP" type="number" className="input" onChange={(e)=>setNewQuest({...newQuest,rewardXP:e.target.value})}/>
            <input type="date" className="input" onChange={(e)=>setNewQuest({...newQuest,startDate:e.target.value})}/>
            <input type="date" className="input" onChange={(e)=>setNewQuest({...newQuest,endDate:e.target.value})}/>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={()=>setShowModal(false)}>Cancel</button>
              <button onClick={handleAddQuest} className="bg-red-700 text-white px-4 py-2 rounded">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && editQuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Quest</h2>

            <input value={editQuest.title} onChange={(e)=>setEditQuest({...editQuest,title:e.target.value})} className="input"/>
            <textarea value={editQuest.description} onChange={(e)=>setEditQuest({...editQuest,description:e.target.value})} className="input"/>
            <select value={editQuest.difficulty} onChange={(e)=>setEditQuest({...editQuest,difficulty:e.target.value})} className="input">
              {difficulties.map(d=> <option key={d}>{d}</option>)}
            </select>
            <input type="number" value={editQuest.rewardXP} onChange={(e)=>setEditQuest({...editQuest,rewardXP:e.target.value})} className="input"/>
            <select value={editQuest.status} onChange={(e)=>setEditQuest({...editQuest,status:e.target.value})} className="input">
              {statuses.map(s=> <option key={s}>{s}</option>)}
            </select>

            <div className="flex justify-end gap-3 mt-4">
              <button onClick={()=>setShowEditModal(false)}>Cancel</button>
              <button onClick={handleSaveEdit} className="bg-yellow-500 text-white px-4 py-2 rounded">
                <Save size={16}/> Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQuests;
