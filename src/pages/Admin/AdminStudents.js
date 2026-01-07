import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function downloadCsv(filename, rows) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      headers
        .map((h) => {
          const v = r[h] == null ? "" : String(r[h]);
          // escape quotes by doubling them (valid CSV escaping)
          return `"${v.replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "export.csv";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// safe date formatter
function fmtDate(val) {
  if (!val) return null;
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString();
}

const AdminStudents = () => {
  const navigate = useNavigate();
  const { id: paramClassId } = useParams(); // support /admin/classes/:id/students

  const [classes, setClasses] = useState([]);
  const [classesLoading, setClassesLoading] = useState(false);
  const [classesError, setClassesError] = useState(null);

  const [selectedClassId, setSelectedClassId] = useState(paramClassId || "");
  const [selectedClassInfo, setSelectedClassInfo] = useState(null);

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState(null);

  // helper to extract a friendly error message
  const fmtErr = (err) =>
    err?.response?.data?.message || err?.message || String(err) || "Unknown error";

  // load classes on mount
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setClassesLoading(true);
        setClassesError(null);
        const res = await API.get("/admin/classes");
        if (!mounted) return;
        const data = Array.isArray(res.data) ? res.data : [];
        setClasses(data);

        // select class: prefer route param if present & found, else preserve existing selection, else pick first
        if (paramClassId && data.some((c) => (c._id || c.id) === paramClassId)) {
          const found = data.find((c) => (c._id || c.id) === paramClassId);
          setSelectedClassId(paramClassId);
          setSelectedClassInfo(found ?? null);
        } else if (selectedClassId && data.some((c) => (c._id || c.id) === selectedClassId)) {
          // keep current selection (do nothing)
        } else if (data.length) {
          const first = data[0];
          const id = first?._id ?? first?.id ?? "";
          setSelectedClassId(id);
          setSelectedClassInfo(first ?? null);
        } else {
          setSelectedClassId("");
          setSelectedClassInfo(null);
        }
      } catch (err) {
        console.error("Failed to load classes", err);
        setClassesError(fmtErr(err));
        setClasses([]);
        setSelectedClassId("");
        setSelectedClassInfo(null);
      } finally {
        if (mounted) setClassesLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
    // NOTE: intentionally empty deps to run once; we used paramClassId and selectedClassId above safely
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount-only

  // fetch students when selectedClassId changes
  useEffect(() => {
    if (!selectedClassId) {
      setStudents([]);
      setSelectedClassInfo(null);
      return;
    }
    let mounted = true;
    const loadStudents = async () => {
      try {
        setStudentsLoading(true);
        setStudentsError(null);
        const res = await API.get(`/admin/classes/${selectedClassId}/students`);
        if (!mounted) return;
        // backend returns { class, students }
        const cls = res.data?.class ?? null;
        const studs = Array.isArray(res.data?.students) ? res.data.students : [];
        setSelectedClassInfo(cls);
        setStudents(studs);
      } catch (err) {
        console.error("Failed to fetch students", err);
        setStudentsError(fmtErr(err));
        setStudents([]);
      } finally {
        if (mounted) setStudentsLoading(false);
      }
    };
    loadStudents();
    return () => {
      mounted = false;
    };
  }, [selectedClassId]);

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* ===== Header ===== */}
      <div className="bg-white border-b border-red-100 rounded-xl px-6 py-5 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded hover:bg-red-50"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-red-700" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">
                Students Overview
              </h1>
              <p className="text-sm text-gray-500">
                View and manage students by class
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (!students.length) return;
              const rows = students.map((s) => ({
                name: s.name || "",
                enrollNo: s.enrollNo || "",
                contact: s.contact || "",
                joined: fmtDate(s.createdAt) || "",
              }));
              const safe =
                (selectedClassInfo?.name || "students")
                  .replace(/[^a-z0-9_-]/gi, "_")
                  .toLowerCase();
              downloadCsv(`${safe}-students.csv`, rows);
            }}
            disabled={!students.length}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition
              ${
                students.length
                  ? "bg-red-700 text-white hover:bg-red-800"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* ===== Class Context Card ===== */}
      <div className="bg-white rounded-xl shadow border border-red-100 p-6 mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Selected Class
        </label>

        {classesLoading ? (
          <div className="text-gray-500">Loading classes…</div>
        ) : classesError ? (
          <div className="text-red-600">{classesError}</div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:ring-2 focus:ring-red-500"
            >
              {classes.map((c, idx) => {
                const id = c._id ?? c.id ?? idx;
                return (
                  <option key={id} value={id}>
                    {c.name} {c.grade ? `— ${c.grade}` : ""}
                  </option>
                );
              })}
            </select>

            {selectedClassInfo && (
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <span className="block text-gray-500">Teacher</span>
                  <span className="font-semibold">
                    {selectedClassInfo.teacher?.name || "Unassigned"}
                  </span>
                </div>
                <div>
                  <span className="block text-gray-500">Students</span>
                  <span className="font-semibold">
                    {students.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ===== Students Table ===== */}
      <div className="bg-white rounded-xl shadow border border-red-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
          <h2 className="text-lg font-bold text-gray-800">
            Students List
            {selectedClassInfo && (
              <span className="text-gray-500 font-medium">
                {" "}— {selectedClassInfo.name}
              </span>
            )}
          </h2>
        </div>

        {studentsLoading ? (
          <div className="py-8 text-center text-gray-500">
            Loading students…
          </div>
        ) : studentsError ? (
          <div className="py-8 text-center text-red-600">
            {studentsError}
          </div>
        ) : students.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No students found for this class.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-red-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Enrollment No</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-left">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {students.map((s, idx) => (
                  <tr
                    key={s._id || idx}
                    className="hover:bg-yellow-50 transition"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {s.name || "—"}
                    </td>
                    <td className="px-4 py-3">{s.enrollNo || "—"}</td>
                    <td className="px-4 py-3">{s.contact || "—"}</td>
                    <td className="px-4 py-3">
                      {fmtDate(s.createdAt) || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default AdminStudents;
