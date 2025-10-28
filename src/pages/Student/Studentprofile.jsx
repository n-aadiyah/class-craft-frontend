// src/pages/StudentProfile.jsx
import React from "react";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-red-700 mb-4">Student Profile</h1>
      <p>Viewing details for Student ID: {id}</p>
      {/* Fetch and display full student info here */}
    </div>
  );
};

export default StudentProfile;
