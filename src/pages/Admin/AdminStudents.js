import React, { useEffect, useState } from "react";
import API from "../../api/axiosInstance";
import { ArrowLeft, Users } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => navigate(-1)}
              title="Back"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-red-700" />
            </button>
            <h1 className="text-2xl font-bold text-red-700">Admin — Students</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <Users size={18} />
              <span className="text-sm">Manage students by class</span>
            </div>
            <button
              onClick={() => {
                if (students && students.length) {
                  const rows = students.map((s) => ({
                    name: s.name || "",
                    enrollNo: s.enrollNo || "",
                    contact: s.contact || "",
                    createdAt: s.createdAt ? new Date(s.createdAt).toLocaleString() : "",
                    id: s._id || s.id || "",
                  }));
                  const safeName = (selectedClassInfo?.name || "students").replace(/[^a-z0-9_-]/gi, "_").toLowerCase();
                  downloadCsv(`${safeName}-students.csv`, rows);
                }
              }}
              className={`px-3 py-2 rounded text-sm ${
                students && students.length ? "bg-red-700 text-white hover:bg-red-800" : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!students || students.length === 0}
              aria-disabled={!students || students.length === 0}
              aria-label="Export students to CSV"
              title={!students || students.length === 0 ? "No students to export" : "Export students to CSV"}
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Class selector */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Class</label>
          {classesLoading ? (
            <div>Loading classes...</div>
          ) : classesError ? (
            <div className="text-red-600">Failed to load classes: {classesError}</div>
          ) : (
            <div className="flex gap-3 items-center">
              <select
                aria-label="Select class"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                {classes.length ? (
                  classes.map((c, idx) => {
                    const id = c._id ?? c.id ?? `class-${idx}`;
                    return (
                      <option key={id} value={id}>
                        {c.name} {c.grade ? `— ${c.grade}` : ""} {c.studentCount != null ? `(${c.studentCount})` : ""}
                      </option>
                    );
                  })
                ) : (
                  <option value="">No classes available</option>
                )}
              </select>

              {selectedClassInfo && (
                <div className="text-sm text-gray-600">
                  <div>
                    <strong>Teacher:</strong> {selectedClassInfo.teacher?.name || "—"}
                  </div>
                  <div>
                    <strong>Grade:</strong> {selectedClassInfo.grade || "—"}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Students table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Students {selectedClassInfo ? `— ${selectedClassInfo.name}` : ""}</h2>

          {studentsLoading ? (
            <div className="py-6 text-center">Loading students...</div>
          ) : studentsError ? (
            <div className="py-6 text-center text-red-600">Failed to fetch students: {studentsError}</div>
          ) : students.length === 0 ? (
            <div className="py-6 text-center text-gray-600">No students found for this class.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2">#</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Enrollment No</th>
                    <th className="p-2">Contact</th>
                    <th className="p-2">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s, idx) => (
                    <tr key={s._id || s.id || idx} className="border-b hover:bg-gray-50">
                      <td className="p-2">{idx + 1}</td>
                      <td className="p-2">{s.name || "—"}</td>
                      <td className="p-2">{s.enrollNo || "—"}</td>
                      <td className="p-2">{s.contact || "—"}</td>
                      <td className="p-2">{fmtDate(s.createdAt) ?? "—"}</td>
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
