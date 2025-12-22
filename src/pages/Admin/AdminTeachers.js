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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Teachers</h1>
      {loading && <div>Loading...</div>}
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <div className="overflow-auto bg-white rounded shadow p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Joined</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => {
              const created = t.createdAt ? new Date(t.createdAt) : createdDateFromId(t._id) ?? new Date();
              return (
                <tr key={t._id || t.id} className="border-t">
                  <td className="p-2">{t.name || "—"}</td>
                  <td className="p-2">{t.email || "—"}</td>
                  <td className="p-2">{created instanceof Date && !Number.isNaN(created.getTime()) ? created.toLocaleDateString() : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && teachers.length === 0 && <div className="p-4 text-gray-500">No teachers found</div>}
      </div>
    </div>
  );
}
