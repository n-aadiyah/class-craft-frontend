// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TeacherDashboardLayout  from "./layout/TeacherDashboardlayout";
import ManageClasses from "./pages/Teacher/ManageClasses";
import ManageQuests from "./pages/Teacher/ManageQuests";
import RewardSystem from "./pages/Teacher/RewardSystem";
import TeacherSettings from "./pages/Teacher/TeacherSettings";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import StudentProfile from "./pages/Student/Studentprofile";
import AttendanceRegister from "./pages/Teacher/Attendence Register"; 
import AuthPage from "./pages/AuthFlipPage";

function App() {
  return (
    <Routes>
      {/* Public Page */}
      <Route path="/" element={<LandingPage />} />
 <Route path="/login" element={< AuthPage/>} />
         <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
      {/* Teacher Dashboard Pages */}
      <Route path="/teacher/dashboard"element={<TeacherDashboardLayout><TeacherDashboard /></TeacherDashboardLayout>}/>
      <Route path="/teacher/classes"element={<TeacherDashboardLayout><ManageClasses /></TeacherDashboardLayout>}/>
      <Route path="/teacher/quests" element={ <TeacherDashboardLayout><ManageQuests /></TeacherDashboardLayout>}/>
      <Route path="/teacher/rewards" element={ <TeacherDashboardLayout><RewardSystem /></TeacherDashboardLayout>}/>
      <Route path="/teacher/settings" element={ <TeacherDashboardLayout> <TeacherSettings /> </TeacherDashboardLayout>}/>
      <Route path="/teacher/attendance" element={ <TeacherDashboardLayout><AttendanceRegister /></TeacherDashboardLayout>} />

      {/* Student Pages */}
      <Route path="/teacher/students/:id" element={<TeacherDashboardLayout><StudentProfile /></TeacherDashboardLayout>} />

    </Routes>
  );
}

export default App;
