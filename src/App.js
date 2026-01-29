// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthFlipPage";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

/* Admin */
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminClasses from "./pages/Admin/AdminClasses";
import AdminStudents from "./pages/Admin/AdminStudents";
import AdminTeachers from "./pages/Admin/AdminTeachers";
import AdminUsers from "./pages/Admin/AdminUsers";

/* Teacher */
import TeacherDashboardLayout from "./layout/TeacherDashboardlayout";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import ManageClasses from "./pages/Teacher/ManageClasses";
import ManageQuests from "./pages/Teacher/ManageQuests";
import RewardSystem from "./pages/Teacher/RewardSystem";
import TeacherSettings from "./pages/Teacher/TeacherSettings";
import AttendanceRegister from "./pages/Teacher/AttendanceRegister";
import AttendanceHistory from "./pages/Teacher/AttendanceHistory";

/* Student */
import StudentDashboard from "./pages/Student/StudentDashboard";
import StudentProfile from "./pages/Student/Studentprofile";
import StudentAssignments from "./pages/Student/StudentAssignments";
import StudentTasks from "./pages/Student/StudentTasks";  
import StudentRewards from "./pages/Student/StudentRewards";  
import StudentLayout from "./layout/Studentlayout";

/* Auth */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute role="admin">
              <AdminClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes/:id/students"
          element={
            <ProtectedRoute role="admin">
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute role="admin">
              <AdminTeachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentLayout>
                <StudentDashboard />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute role="student">
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute role="student">
              <StudentAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/tasks"
          element={
            <ProtectedRoute role="student">
              <StudentTasks />
            </ProtectedRoute>
          }
        />
        <Route
         path="/student/rewards"
          element={
            <ProtectedRoute role="student">
              <StudentRewards />
            </ProtectedRoute>
          }
        />

        {/* Teacher */}
        <Route
          path="/teacher/dashboard"
          element={
            <TeacherDashboardLayout>
              <TeacherDashboard />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <TeacherDashboardLayout>
              <ManageClasses />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/quests"
          element={
            <TeacherDashboardLayout>
              <ManageQuests />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/rewards"
          element={
            <TeacherDashboardLayout>
              <RewardSystem />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/settings"
          element={
            <TeacherDashboardLayout>
              <TeacherSettings />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <TeacherDashboardLayout>
              <AttendanceRegister />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/attendance-history"
          element={
            <TeacherDashboardLayout>
              <AttendanceHistory />
            </TeacherDashboardLayout>
          }
        />
        <Route
          path="/teacher/students/:id"
          element={
            <TeacherDashboardLayout>
              <StudentProfile />
            </TeacherDashboardLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<div className="p-10">Page Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
