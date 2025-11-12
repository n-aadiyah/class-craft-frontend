import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import API from "../../api/axiosInstance";

const AttendanceHistory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Preselect current month/year
  const now = new Date();
  const [month, setMonth] = useState(String(now.getMonth() + 1)); // "1".."12"
  const [year, setYear] = useState(String(now.getFullYear()));    // "2025"

  // Filters
  const [selectedClass, setSelectedClass] = useState(""); // className (string)

  // Data
  const [classes, setClasses] = useState([]);       // [{_id, name, grade, ...}]
  const [matrixDays, setMatrixDays] = useState([]); // [1..N]
  const [matrixRows, setMatrixRows] = useState([]); // [{studentId,name,enrollNo,daily,present,absent}]

  // Status
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  // Guard for out-of-order responses
  const latestReqId = useRef(0);

  // store the passed-in className from location.state (if any)
  const passedClassRef = useRef(null);

  // 0) Read location.state once and store passed className (support multiple keys)
  useEffect(() => {
    try {
      const st = location?.state || {};
      // support multiple shapes: { class: cls }, { cls: cls }, { className: '...' }
      const clsObj = st.class || st.cls || null;
      const clsNameFromObj = clsObj?.name;
      const clsNameFromParam = st.className || null;

      const chosen = clsNameFromObj || clsNameFromParam || null;
      if (chosen) {
        passedClassRef.current = String(chosen).trim();
        console.log("[AttendanceHistory] passed class from location.state:", passedClassRef.current);
        // set it eagerly so UI reflects the clicked class quickly
        setSelectedClass(passedClassRef.current);
      }
      // Also accept query param className in URL ?className=...
      const qParam = new URLSearchParams(location.search).get("className");
      if (!passedClassRef.current && qParam) {
        passedClassRef.current = String(qParam).trim();
        setSelectedClass(passedClassRef.current);
        console.log("[AttendanceHistory] passed class from query param:", passedClassRef.current);
      }
    } catch (e) {
      console.warn("Error reading location.state in AttendanceHistory:", e);
    }
    // only run when location changes
  }, [location]);

  // 1) Load classes once. Do not overwrite selectedClass if already set by location.state.
  useEffect(() => {
    let mounted = true;
    const loadClasses = async () => {
      try {
        setLoadingClasses(true);
        const res = await API.get("/classes", { headers: { "Cache-Control": "no-cache" } });
        const list = Array.isArray(res.data) ? res.data : [];
        // alphabetical for UX
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        if (!mounted) return;
        setClasses(list);

        // if we already have a selected class (passed from location/state), prefer it
        if (passedClassRef.current) {
          // ensure it exists in the fetched list
          const found = list.find((c) => String(c.name).trim() === String(passedClassRef.current).trim());
          if (found) {
            setSelectedClass(found.name);
            console.log("[AttendanceHistory] selectedClass set from passedClassRef:", found.name);
            return;
          } else {
            // passed class not found — still set (backend may accept string), but log it
            console.warn("[AttendanceHistory] passed class not found in classes list:", passedClassRef.current);
            setSelectedClass(passedClassRef.current);
            return;
          }
        }

        // otherwise, if no selectedClass set and we have classes, auto-select first
        if (!selectedClass && list.length) {
          setSelectedClass(list[0].name);
          console.log("[AttendanceHistory] auto-selected first class:", list[0].name);
        }
      } catch (e) {
        console.error("Error fetching classes:", e);
      } finally {
        if (mounted) setLoadingClasses(false);
      }
    };
    loadClasses();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Load monthly matrix whenever filters change (and are complete)
  useEffect(() => {
    const controller = new AbortController();
    const reqId = ++latestReqId.current;

    const fetchMonthly = async () => {
      if (!selectedClass || !month || !year) {
        setMatrixDays([]);
        setMatrixRows([]);
        return;
      }

      try {
        setLoadingMonthly(true);

        // normalize and trim
        const classNameTrim = String(selectedClass).trim();
        const params = new URLSearchParams({
          className: classNameTrim,
          month: String(month),
          year: String(year),
          _t: Date.now().toString(), // cache buster
        });

        const url = `/attendance/monthly?${params.toString()}`;
        console.log("[AttendanceHistory] fetching monthly for:", { url, className: classNameTrim });

        const res = await API.get(url, {
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (reqId !== latestReqId.current) {
          console.log("[AttendanceHistory] ignoring out-of-order response", reqId);
          return;
        }

        setMatrixDays(res.data?.days || []);
        setMatrixRows(Array.isArray(res.data?.students) ? res.data.students : []);
      } catch (e) {
        if (e.name === "CanceledError" || e.code === "ERR_CANCELED") return;
        console.error("Error fetching monthly attendance:", e);
        setMatrixDays([]);
        setMatrixRows([]);
      } finally {
        if (reqId === latestReqId.current) setLoadingMonthly(false);
      }
    };

    fetchMonthly();
    return () => controller.abort();
  }, [selectedClass, month, year]);

  // Summary totals
  const summary = useMemo(() => {
    const present = matrixRows.reduce((sum, r) => sum + (r.present || 0), 0);
    const absent = matrixRows.reduce((sum, r) => sum + (r.absent || 0), 0);
    return {
      totalStudents: matrixRows.length,
      present,
      absent,
    };
  }, [matrixRows]);

  // Year options
  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    return [current - 1, current, current + 1].map(String);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 dark:from-gray-900 dark:to-gray-800 p-6 md:p-10 transition-all duration-500">
      <div className="max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl rounded-2xl p-8 relative">
        {/* Back */}
        <button
          onClick={() => navigate("/teacher/attendance")}
          className="absolute top-6 left-6 flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-serif text-center text-red-800 dark:text-white mb-8">
          Attendance History
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
          {/* Class (uses class name because backend expects className) */}
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            disabled={loadingClasses}
          >
            <option value="">
              {loadingClasses ? "Loading classes..." : "Select Class"}
            </option>
            {classes.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}{c.grade ? ` ` : ""}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-red-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Year</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectedClass(classes[0]?.name || "");
              setMonth(String(now.getMonth() + 1));
              setYear(String(now.getFullYear()));
              setMatrixDays([]);
              setMatrixRows([]);
            }}
            className="w-full md:w-1/4 bg-red-800 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-red-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Roll No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase">Enrollment No</th>
                {matrixDays.map((d) => (
                  <th
                    key={d}
                    className="px-3 py-3 text-center text-xs font-semibold uppercase"
                    title={`Day ${d}`}
                  >
                    {d}
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Present</th>
                <th className="px-6 py-3 text-center text-sm font-semibold uppercase">Absent</th>
              </tr>
            </thead>
            <tbody>
              {loadingMonthly ? (
                <tr>
                  <td colSpan={3 + matrixDays.length + 2} className="text-center py-6 text-gray-500 dark:text-gray-400">
                    Loading attendance...
                  </td>
                </tr>
              ) : matrixRows.length > 0 ? (
                matrixRows.map((row, idx) => (
                  <tr key={row.studentId} className="hover:bg-red-50 dark:hover:bg-gray-800 transition duration-300">
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{idx + 1}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{row.name}</td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{row.enrollNo}</td>

                    {(row.daily || []).map((st, i) => (
                      <td
                        key={i}
                        className={`px-3 py-2 text-center font-semibold ${
                          st === "Present"
                            ? "text-green-700 dark:text-green-400"
                            : st === "Absent"
                            ? "text-red-700 dark:text-red-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                        title={st}
                      >
                        {st === "Present" ? "P" : st === "Absent" ? "A" : "NA"}
                      </td>
                    ))}

                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{row.present}</td>
                    <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">{row.absent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3 + matrixDays.length + 2} className="text-center py-6 text-gray-500 dark:text-gray-400">
                    {selectedClass && month && year
                      ? "No records for this month."
                      : "Select Class, Month & Year to view attendance."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="mt-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-red-800 dark:text-white mb-2">Summary</h2>
          {selectedClass && month && year ? (
            <p className="text-gray-700 dark:text-gray-300">
              Students: {summary.totalStudents} &nbsp;|&nbsp; Present (sum): {summary.present} &nbsp;|&nbsp; Absent (sum): {summary.absent}
            </p>
          ) : (
            <p className="text-gray-700 dark:text-gray-300">Select Class, Month & Year to view summary.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceHistory;
