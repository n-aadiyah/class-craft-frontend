// src/utils/download.js
// Utility to download CSV files from an array of objects.
// Exports: named `downloadCsv` and default (same function).

/**
 * downloadCsv(filename, rows = [], columns = null)
 * - filename: string, e.g. "attendance.csv"
 * - rows: array of objects
 * - columns: optional array [{ key, label }], controls column order and headers
 */
export function downloadCsv(filename, rows = [], columns = null) {
  // Normalize rows
  if (!Array.isArray(rows) || rows.length === 0) {
    const blob = new Blob([""], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "data.csv";
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  // Determine columns
  const cols =
    Array.isArray(columns) && columns.length > 0
      ? columns
      : Object.keys(rows[0]).map((k) => ({ key: k, label: k }));

  // Build CSV header
  const header = cols.map((c) => JSON.stringify(String(c.label))).join(",");

  // Build lines
  const lines = rows.map((row) =>
    cols
      .map((c) => {
        const raw = row[c.key];
        if (raw === null || raw === undefined) return '""';
        // convert Date to readable string
        if (raw instanceof Date) return JSON.stringify(raw.toISOString());
        // convert objects/arrays to JSON string
        if (typeof raw === "object") return JSON.stringify(raw);
        // string escape via JSON.stringify
        return JSON.stringify(String(raw));
      })
      .join(",")
  );

  const csv = [header, ...lines].join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "data.csv";
  document.body.appendChild(a); // some browsers need it in DOM
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default downloadCsv;
