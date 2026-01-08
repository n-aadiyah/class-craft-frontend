import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import AvatarCard from "../../components/students/AvatarCard";
import LevelBadge from "../../components/students/LevelBadge";
import XPProgressBar from "../../components/students/XPProgressBar";
import { useNavigate } from "react-router-dom";

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/student/profile");
        setStudent(res.data);
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile…
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Failed to load profile
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow border text-center">
        <AvatarCard level={student.level} />

        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {student.name}
        </h2>

        <LevelBadge level={student.level} />

        <XPProgressBar
          xp={student.xp}
          currentLevelXp={student.currentLevelXp}
          nextLevelXp={student.nextLevelXp}
        />

        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Total XP</p>
            <p className="font-bold text-lg">{student.xp}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500">Current Level</p>
            <p className="font-bold text-lg">{student.level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
