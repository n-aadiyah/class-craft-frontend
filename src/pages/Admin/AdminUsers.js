import React, { useEffect, useMemo, useState } from "react";
import API from "../../api/axiosInstance";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [action, setAction] = useState(null); // "make" | "remove"
  const [saving, setSaving] = useState(false);

  /* =======================
     LOAD USERS
  ======================== */
  const loadUsers = async () => {
  try {
    setLoading(true);
    setErr(null);
    const res = await API.get("/admin/users");
    setUsers(Array.isArray(res.data) ? res.data : []);
  } catch (e) {
    console.error("Failed to load users", e);
    setErr(
      e?.response?.data?.message ||
        e?.message ||
        "Failed to load users"
    );
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadUsers();
}, []);

  /* =======================
     DERIVED STATS
  ======================== */
  const stats = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter(u => u.role === "admin").length,
      teachers: users.filter(u => u.role === "teacher").length,
      students: users.filter(u => u.role === "student").length,
    };
  }, [users]);

  /* =======================
     ROLE CHANGE FLOW
  ======================== */
  const openConfirm = (user, type) => {
    setSelectedUser(user);
    setAction(type); // make | remove
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    if (saving) return;
    setConfirmOpen(false);
    setSelectedUser(null);
    setAction(null);
  };
  const isLastAdmin =
  action === "remove" &&
  stats.admins === 1;

if (isLastAdmin) {
  alert("You must keep at least one admin.");
  return;
}


  const confirmChange = async () => {
  if (!selectedUser || !action) return;

  try {
    setSaving(true);

    const newRole = action === "make" ? "admin" : "student";

    await API.patch(`/admin/users/${selectedUser._id}`, {
      role: newRole,
    });

    // ✅ ALWAYS refetch users from backend
    await loadUsers();

    closeConfirm();
  } catch (e) {
    console.error("Role update failed", e);
    alert(
      e?.response?.data?.message ||
        "Failed to update role"
    );
  } finally {
    setSaving(false);
  }
};

  /* =======================
     RENDER
  ======================== */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-red-100 px-6 py-6">
        <h1 className="text-3xl font-extrabold text-red-700 font-serif">
          Users & Roles
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-serif">
          Manage admins, teachers, and students
        </p>
      </div>

      {/* STATS */}
      <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-4 gap-5 font-serif font-bold">
        <StatCard label="Total Users" value={stats.total} />
        <StatCard label="Admins" value={stats.admins} highlight />
        <StatCard label="Teachers" value={stats.teachers} />
        <StatCard label="Students" value={stats.students} />
      </div>

      {/* ERROR */}
      {err && (
        <div className="px-6 text-red-600 font-medium">
          {err}
        </div>
      )}

      {/* TABLE */}
      <div className="px-6 pb-10">
        <div className="bg-white rounded-xl shadow border border-red-100 overflow-hidden font-serif">
          <table className="w-full text-sm">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    Loading users…
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr
                    key={u._id}
                    className={`transition ${
                      u.role === "admin"
                        ? "bg-red-50 hover:bg-red-200"
                        : "hover:bg-yellow-100"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {u.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 break-all">
                      {u.email}
                    </td>

                    {/* ROLE LABEL */}
                    <td className="px-4 py-3">
                      {u.role === "admin" && (
                        <span className="bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Admin
                        </span>
                      )}
                      {u.role === "teacher" && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Teacher
                        </span>
                      )}
                      {u.role === "student" && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Student
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3">
                      {u.role === "admin" ? (
                        <button
                          onClick={() => openConfirm(u, "remove")}
                          className="text-red-700 font-semibold hover:underline"
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => openConfirm(u, "make")}
                          className="text-green-700 font-semibold hover:underline"
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {confirmOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-800">
              Confirm Role Change
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to{" "}
              <strong>
                {action === "make" ? "grant" : "remove"}
              </strong>{" "}
              admin access for{" "}
              <strong>{selectedUser.name}</strong>?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                disabled={saving}
                className="px-4 py-2 rounded bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmChange}
                disabled={saving}
                className="px-4 py-2 rounded bg-red-700 text-white"
              >
                {saving ? "Updating…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =======================
   STAT CARD COMPONENT
======================= */
function StatCard({ label, value, highlight }) {
  return (
    <div className="bg-white border border-red-100 rounded-xl p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`text-3xl font-extrabold mt-2 ${
          highlight ? "text-red-700" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
