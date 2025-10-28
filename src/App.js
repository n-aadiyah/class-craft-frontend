// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TeacherDashboardLayout  from "./layout/TeacherDashboardlayout";
import ManageClasses from "./pages/Admin/ManageClasses";
import ManageStudents from "./pages/Admin/ManageStudents";
import ManageQuests from "./pages/Admin/ManageQuests";
import RewardSystem from "./pages/Admin/RewardSystem";
import TeacherSettings from "./pages/Admin/TeacherSettings";
import TeacherDashboard from "./pages/Admin/TeacherDashboard";
import TrackPerformance from "./pages/Admin/TrackPerformance";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Routes>
      {/* Public Page */}
      <Route path="/" element={<LandingPage />} />
 <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
      <Route path="/teacher/students"element={<TeacherDashboardLayout><ManageStudents /></TeacherDashboardLayout>}/>
      <Route path="/teacher/quests" element={ <TeacherDashboardLayout><ManageQuests /></TeacherDashboardLayout>}/>
      <Route path="/teacher/rewards" element={ <TeacherDashboardLayout><RewardSystem /></TeacherDashboardLayout>}/>
      <Route path="/teacher/performance" element={ <TeacherDashboardLayout> <TrackPerformance /> </TeacherDashboardLayout>}/>
      <Route path="/teacher/settings" element={ <TeacherDashboardLayout> <TeacherSettings /> </TeacherDashboardLayout>}/>
    </Routes>
  );
}

export default App;
