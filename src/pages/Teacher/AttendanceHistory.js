// src/pages/Teacher/AttendanceHistory.js
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../../api/axiosInstance";
import { downloadCsv } from "../../utils/download";

const AttendanceHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1));
  const [year, setYear] = useState(String(now.getFullYear()));

  const [selectedClass, setSelectedClass] = useState("");

  const [classes, setClasses] = useState([]);
  const [matrixDays, setMatrixDays] = useState([]);
  const [matrixRows, setMatrixRows] = useState([]);

  const [ setLoadingClasses] = useState(false);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  const latestReqId = useRef(0);
  const passedClassRef = useRef(null);

  // Read passed class from navigation
  useEffect(() => {
    try {
      const st = location?.state || {};
      const clsObj = st.class || st.cls || null;
      const clsNameFromObj = clsObj?.name;
      const clsNameFromParam = st.className || null;

      const chosen = clsNameFromObj || clsNameFromParam || null;
      if (chosen) {
        passedClassRef.current = String(chosen).trim();
        setSelectedClass(passedClassRef.current);
      }

      const qParam = new URLSearchParams(location.search).get("className");
      if (!passedClassRef.current && qParam) {
        passedClassRef.current = qParam.trim();
        setSelectedClass(passedClassRef.current);
      }
    } catch {}
  }, [location]);

  // Load class list
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoadingClasses(true);
        const res = await API.get("/classes");
        const list = Array.isArray(res.data) ? res.data : [];
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

        if (!mounted) return;
        setClasses(list);

        if (passedClassRef.current) {
          const found = list.find(
            (c) => String(c.name).trim() === passedClassRef.current
          );
          if (found) setSelectedClass(found.name);
          else setSelectedClass(passedClassRef.current);
          return;
        }

        if (!selectedClass && list.length) {
          setSelectedClass(list[0].name);
        }
      } finally {
        if (mounted) setLoadingClasses(false);
      }
    };

    load();
    return () => (mounted = false);
  }, []);

  // Load monthly data
  useEffect(() => {
    const controller = new AbortController();
    const reqId = ++latestReqId.current;

    const load = async () => {
      if (!selectedClass || !month || !year) {
        setMatrixDays([]);
        setMatrixRows([]);
        return;
      }

      try {
        setLoadingMonthly(true);
        const params = new URLSearchParams({
          className: selectedClass.trim(),
          month,
          year,
          _t: Date.now(),
        });

        const res = await API.get(`/attendance/monthly?${params}`, {
          signal: controller.signal,
        });

        if (reqId !== latestReqId.current) return;

        setMatrixDays(res.data?.days || []);
        setMatrixRows(Array.isArray(res.data?.students) ? res.data.students : []);
      } finally {
        if (reqId === latestReqId.current) setLoadingMonthly(false);
      }
    };

    load();
    return () => controller.abort();
  }, [selectedClass, month, year]);

  // Summary
  const summary = useMemo(() => {
    const present = matrixRows.reduce((s, r) => s + (r.present || 0), 0);
    const absent = matrixRows.reduce((s, r) => s + (r.absent || 0), 0);
    return {
      totalStudents: matrixRows.length,
      present,
      absent,
    };
  }, [matrixRows]);

  const yearOptions = useMemo(() => {
    const now = new Date().getFullYear();
    return [String(now - 1), String(now), String(now + 1)];
  }, []);

  // CSV
  const handleDownload = () => {
    if (!matrixRows.length) return alert("No data to download.");

    const dayCols = matrixDays.map((d) => ({
      key: `day_${d}`,
      label: String(d),
    }));

    const columns = [
      { key: "rollNo", label: "Roll No" },
      { key: "studentName", label: "Student Name" },
      { key: "enrollNo", label: "Enrollment No" },
      ...dayCols,
      { key: "present", label: "Present" },
      { key: "absent", label: "Absent" },
    ];

    const rows = matrixRows.map((r, idx) => {
      const base = {
        rollNo: idx + 1,
        studentName: r.name || "",
        enrollNo: r.enrollNo || "",
        present: r.present ?? 0,
        absent: r.absent ?? 0,
      };
      matrixDays.forEach((d, i) => {
        base[`day_${d}`] =
          r.daily?.[i] === "Present"
            ? "Present"
            : r.daily?.[i] === "Absent"
            ? "Absent"
            : "NA";
      });
      return base;
    });

    downloadCsv(
      `attendance_${selectedClass}_${year}-${month}.csv`,
      rows,
      columns
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl relative">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/teacher/attendance")}
  className="mb-4 flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md w-fit"        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-2xl md:text-4xl text-center font-serif text-red-800 dark:text-white mb-6">
          Attendance History
        </h1>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="">Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="">Year</option>
            {yearOptions.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>

          <button
            onClick={handleDownload}
            disabled={!matrixRows.length}
            className="bg-green-600 hover:bg-green-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md disabled:bg-gray-300 disabled:text-gray-600"
          >
            Download CSV
          </button>
        </div>

        {/* RESPONSIVE TABLE (NON-STICKY) */}
        <div className="w-full overflow-x-auto rounded-lg border">
          <table className="min-w-max border-collapse w-full">
            {/* HEADER */}
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Roll No</th>
                <th className="px-4 py-3 text-sm font-semibold">Student Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Enrollment No</th>

                {matrixDays.map((d) => (
                  <th
                    key={d}
                    className="px-3 py-3 text-xs font-semibold text-center border-l"
                  >
                    {d}
                  </th>
                ))}

                <th className="px-4 py-3 text-sm font-semibold">Present</th>
                <th className="px-4 py-3 text-sm font-semibold">Absent</th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody>
              {loadingMonthly ? (
                <tr>
                  <td
                    colSpan={3 + matrixDays.length + 2}
                    className="text-center py-6 text-gray-600"
                  >
                    Loading attendance...
                  </td>
                </tr>
              ) : matrixRows.length > 0 ? (
                matrixRows.map((row, idx) => (
                  <tr key={row.studentId} className="hover:bg-red-50">
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.enrollNo}</td>

                    {(row.daily || []).map((st, i) => (
                      <td
                        key={i}
                        className={`px-3 py-2 text-center font-bold ${
                          st === "Present"
                            ? "text-green-700"
                            : st === "Absent"
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {st === "Present"
                          ? "P"
                          : st === "Absent"
                          ? "A"
                          : "NA"}
                      </td>
                    ))}

                    <td className="px-4 py-3 text-center">{row.present}</td>
                    <td className="px-4 py-3 text-center">{row.absent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3 + matrixDays.length + 2}
                    className="text-center py-6 text-gray-600"
                  >
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SUMMARY */}
        <div className="mt-6 p-4 bg-white dark:bg-gray-800 border rounded-xl text-center shadow">
          <h2 className="font-semibold text-red-800 dark:text-white text-xl mb-2">
            Summary
          </h2>

          {selectedClass && month && year ? (
            <p className="text-gray-700 dark:text-gray-300">
              Students: {summary.totalStudents} | Present: {summary.present} |
              Absent: {summary.absent}
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              Select all filters to view summary.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
