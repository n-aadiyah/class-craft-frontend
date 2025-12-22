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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Classes</h1>

      {err && <div className="text-red-600 mb-3">{err}</div>}

      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-2">Class Name</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Teacher</th>
              <th className="p-2">Students</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-600">
                  Loading classes...
                </td>
              </tr>
            ) : classes.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50">
                  <td
                    className="p-2 text-blue-600 cursor-pointer font-medium"
                    onClick={() => navigate(`/admin/classes/${c._id}/students`)}
                  >
                    {c.name}
                  </td>
                  <td className="p-2">{c.grade ?? "—"}</td>
                  <td className="p-2">{c.teacher?.name ?? "—"}</td>
                  <td className="p-2">{c.studentCount ?? 0}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
