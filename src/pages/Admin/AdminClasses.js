import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AdminClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setErr(null);
        const res = await API.get("/admin/classes");
        if (!mounted) return;
        setClasses(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("Failed to load classes", e);

        if (e?.response?.status === 401 || e?.response?.status === 403) {
          navigate("/login");
          return;
        }

        setErr(e?.response?.data?.message || "Failed to load classes");
        setClasses([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [navigate]);

  const stats = {
  totalClasses: classes.length,
  totalStudents: classes.reduce((a, c) => a + (c.studentCount || 0), 0),
  noTeacher: classes.filter(c => !c.teacher).length,
  empty: classes.filter(c => (c.studentCount || 0) === 0).length,
};


  return (
  <div className="min-h-screen bg-gray-50">
    {/* ===== Header ===== */}
    <div className="bg-white border-b border-red-100 px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800 font-serif">
            Classes Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-serif">
            Manage all classes, teachers, and students
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-serif font-semibold">
            Total: {stats.totalClasses}
          </span>

        </div>
      </div>
    </div>

    {/* ===== Error ===== */}
    {err && (
      <div className="px-6 mt-4 text-red-600 font-medium">
        {err}
      </div>
    )}

    {/* ===== Summary Cards ===== */}
    <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-serif ">
      {[
        { label: "Total Classes", value: stats.totalClasses },
        { label: "Total Students", value: stats.totalStudents },
        { label: "Unassigned Teachers", value: stats.noTeacher },
        { label: "Empty Classes", value: stats.empty },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-white border border-red-100 rounded-xl p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">{item.label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {item.value}
          </p>
        </div>
      ))}
    </div>

    {/* ===== Table ===== */}
    <div className="px-6 pb-10">
      <div className="bg-white rounded-xl shadow border border-red-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-red-700 text-white font-serif">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Class</th>
              <th className="px-4 py-3 text-left font-semibold">Grade</th>
              <th className="px-4 py-3 text-left font-semibold">Teacher</th>
              <th className="px-4 py-3 text-left font-semibold">Students</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500 font-serif ">
                  Loading classes…
                </td>
              </tr>
            ) : classes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500 font-serif ">
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr
                  key={c._id}
                  className="hover:bg-yellow-50 transition cursor-pointer"
                  onClick={() =>
                    navigate(`/admin/classes/${c._id}/students`)
                  }
                >
                  <td className="px-4 py-3 font-medium text-red-700">
                    {c.name}
                  </td>
                  <td className="px-4 py-3">{c.grade ?? "—"}</td>
                  <td className="px-4 py-3">
                    {c.teacher?.name || (
                      <span className="italic text-gray-400">
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 ">
                    {c.studentCount ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    {(c.studentCount ?? 0) > 0 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Empty
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}
