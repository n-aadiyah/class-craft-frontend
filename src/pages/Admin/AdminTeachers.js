import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";

/**
 * If createdAt missing, try to derive date from a 24-char hex ObjectId string.
 * ObjectId hex: first 8 chars are epoch seconds in hex.
 */
function createdDateFromId(id) {
  if (!id || typeof id !== "string") return null;
  // typical ObjectId hex length is 24
  if (id.length >= 8 && /^[0-9a-fA-F]+$/.test(id.slice(0, 8))) {
    try {
      const secondsHex = id.slice(0, 8);
      const seconds = parseInt(secondsHex, 16);
      if (!Number.isNaN(seconds)) {
        return new Date(seconds * 1000);
      }
    } catch (e) {
      // fallthrough
    }
  }
  return null;
}

export default function AdminTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await API.get("/admin/teachers");
        if (!mounted) return;
        setTeachers(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("Failed to fetch teachers", e);
        setErr(e.response?.data?.message || e.message || "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const stats = {
  totalTeachers: teachers.length,
  recentTeachers: teachers.filter(t => {
    const d = t.createdAt
      ? new Date(t.createdAt)
      : createdDateFromId(t._id);
    return d && (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24) <= 30;
  }).length,
};

return (
  <div className="min-h-screen bg-gray-50">
    {/* ===== Header ===== */}
    <div className="bg-white border-b border-red-100 px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-extrabold text-gray-800">
            Teachers Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-serif ">
            Manage all registered teaching staff
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-red-700 text-white px-4 py-2 rounded-lg text-sm  font-semibold shadow-md">
            Total: {stats.totalTeachers}
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
    <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <div className="bg-white border border-red-100 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 font-serif ">Total Teachers</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">
          {stats.totalTeachers}
        </p>
      </div>

      <div className="bg-white border border-red-100 rounded-xl p-5 shadow-sm">
        <p className="text-sm text-gray-500 font-serif ">Joined in Last 30 Days</p>
        <p className="text-2xl font-bold text-gray-800 mt-2">
          {stats.recentTeachers}
        </p>
      </div>
    </div>

    {/* ===== Table ===== */}
    <div className="px-6 pb-10">
      <div className="bg-white rounded-xl shadow border border-red-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-red-700 text-white font-serif ">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-left font-semibold">Joined</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500 font-serif">
                  Loading teachers…
                </td>
              </tr>
            ) : teachers.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((t) => {
                const created =
                  t.createdAt
                    ? new Date(t.createdAt)
                    : createdDateFromId(t._id);

                return (
                  <tr
                    key={t._id || t.id}
                    className="hover:bg-yellow-100 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800 font-serif ">
                      {t.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 break-all font-serif ">
                      {t.email || "—"}
                    </td>
                    <td className="px-4 py-3 font-serif ">
                      {created instanceof Date &&
                      !Number.isNaN(created.getTime())
                        ? created.toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

}
