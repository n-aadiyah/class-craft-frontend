import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const TeacherDashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64 lg:ml-64" : "ml-0 lg:ml-64"
        }`}
      >
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        {/* Add padding-top to avoid overlapping with fixed Topbar */}
        <main className="p-4 sm:p-6 mt-16">{children}</main>
      </div>
    </div>
  );
};

export default TeacherDashboardLayout;
