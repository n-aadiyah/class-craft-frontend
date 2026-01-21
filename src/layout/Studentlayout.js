import React, { useState } from "react";

import StudentSidebar from "../pages/Student/StudentSidebar";
import StudentTopbar from "../pages/Student/StudentTopbar";

const StudentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Area */}
      <div
        className={`
          flex-1 transition-all duration-300
          ${sidebarOpen ? "ml-60 lg:ml-60" : "ml-0 lg:ml-60"}
        `}
      >
        <StudentTopbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="mt-20 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default StudentLayout;
