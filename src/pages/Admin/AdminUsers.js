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
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await API.get("/admin/users");
        if (!mounted) return;
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (e) {
        console.error("Failed to load users", e);
        setErr(
          e?.response?.data?.message ||
          e?.message ||
          "Failed to load users"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  /* =======================
     DERIVED STATS
  ======================== */
  const stats = useMemo(() => {
    const admins = users.filter(u => u.role === "admin").length;
    return {
      totalUsers: users.length,
      admins,
      nonAdmins: users.length - admins,
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

  const confirmChange = async () => {
    if (!selectedUser || !action) return;

    try {
      setSaving(true);
      const newRole = action === "make" ? "admin" : "user";

      await API.patch(`/admin/users/${selectedUser._id}`, {
        role: newRole,
      });

      // update UI optimistically
      setUsers(prev =>
        prev.map(u =>
          u._id === selectedUser._id
            ? { ...u, role: newRole }
            : u
        )
      );

      closeConfirm();
    } catch (e) {
      console.error("Role update failed", e);
      alert(
        e?.response?.data?.message ||
        "Failed to update role"
      );
      setSaving(false);
    }
  };

  /* =======================
     RENDER
  ======================== */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HEADER ===== */}
      <div className="bg-white border-b border-red-100 px-6 py-6">
        <h1 className="text-2xl font-extrabold text-gray-800 font-serif">
          Users & Roles
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-serif">
          Control who has administrative access
        </p>
      </div>

      {/* ===== STATS ===== */}
      <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-5 font-serif">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Admins" value={stats.admins} highlight />
        <StatCard label="Regular Users" value={stats.nonAdmins} />
      </div>

      {/* ===== ERROR ===== */}
      {err && (
        <div className="px-6 text-red-600 font-medium">
          {err}
        </div>
      )}

      {/* ===== TABLE ===== */}
      <div className="px-6 pb-10">
        <div className="bg-white rounded-xl shadow border border-red-100 overflow-hidden font-serif">
          <table className="w-full text-sm">
            <thead className="bg-red-50 text-gray-700">
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
                        ? "bg-red-50 hover:bg-red-100"
                        : "hover:bg-yellow-50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {u.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 break-all">
                      {u.email}
                    </td>
                    <td className="px-4 py-3">
                      {u.role === "admin" ? (
                        <span className="bg-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Admin
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          User
                        </span>
                      )}
                    </td>
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
                          className="text-yellow-600 font-semibold hover:underline"
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

      {/* ===== CONFIRM MODAL ===== */}
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
