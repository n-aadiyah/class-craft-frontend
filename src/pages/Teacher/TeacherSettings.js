// src/pages/Teacher/TeacherSettings.js
import React, { useEffect, useState, useRef } from "react";
import { Settings as UploadIcon, Bell, Globe, SunMoon, LogOut, Trash2 } from "lucide-react";
import API from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import uploadAvatar from "../../api/uploads";

console.log("uploadAvatar type:", typeof uploadAvatar);

const TeacherSettings = () => {
  const navigate = useNavigate();
  const { user: authUser, setUser, setToken } = useAuth();

  // profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profilePic: "/Avatar.jpg",
  });

  // password fields (separate flow)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  // preferences
  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: "light",
    language: "English",
  });

  // local state
  const [loading, setLoading] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPrefs, setSavingPrefs] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // refs
  const avatarPreviewRef = useRef(null); // holds object URL string for revoke
  const fileInputRef = useRef(null);

  // helper: make full URL if backend returns relative path like "/uploads/avatars/..."
  const makeFullAvatarUrl = (avatarUrl) => {
    if (!avatarUrl) return avatarUrl;
    if (avatarUrl.startsWith("http://") || avatarUrl.startsWith("https://")) return avatarUrl;
    // try to derive from API.baseURL (which includes /api). remove trailing /api
    try {
      const base = API.defaults?.baseURL || "";
      const origin = base.replace(/\/api\/?$/, "") || window.location.origin;
      // ensure leading slash
      return avatarUrl.startsWith("/") ? `${origin}${avatarUrl}` : `${origin}/${avatarUrl}`;
    } catch {
      return avatarUrl;
    }
  };

  // load profile on mount (from backend)
  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await API.get("/users/me");
        if (!mounted) return;
        const u = res.data || {};
        setProfile({
          name: u.name || "",
          email: u.email || "",
          profilePic: makeFullAvatarUrl(u.avatarUrl || u.avatar || "/Avatar.jpg"),
        });
        setPreferences(u.preferences || { notifications: true, theme: "light", language: "English" });
        // sync auth context user if needed
        if (setUser) setUser(u);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadProfile();
    return () => {
      mounted = false;
      // revoke any preview URL on unmount
      if (avatarPreviewRef.current) {
        URL.revokeObjectURL(avatarPreviewRef.current);
        avatarPreviewRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // profile input handlers
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((s) => ({ ...s, [name]: value }));
  };

  const handlePreferencesChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPreferences((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // avatar preview + store file for upload
  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // revoke old preview URL if any
      if (avatarPreviewRef.current) {
        URL.revokeObjectURL(avatarPreviewRef.current);
      }
      const preview = URL.createObjectURL(file);
      avatarPreviewRef.current = preview;
      setAvatarFile(file);
      setProfile((p) => ({ ...p, profilePic: preview }));
    }
  };

 const handleSaveProfile = async () => {
  try {
    setSavingProfile(true);
    setUploadProgress(0);
    
    console.log("About to call uploadAvatar, typeof:", typeof uploadAvatar);
if (typeof uploadAvatar !== "function") {
  alert("uploadAvatar is not a function — check import/path and rebuild");
  return;
}


    // 1) upload avatar if present (uses helper)
    if (avatarFile) {
      try {
        const upData = await uploadAvatar(avatarFile, (pct) => {
          setUploadProgress(pct);
        });

        const returnedAvatar = upData.avatarFullUrl || upData.avatarUrl || upData.avatar;
        if (returnedAvatar) {
          const full = makeFullAvatarUrl(returnedAvatar);
          setProfile((p) => ({ ...p, profilePic: full }));
        }
      } catch (uploadErr) {
        console.error("Avatar upload failed:", uploadErr);
        const msg = uploadErr?.response?.data?.message || uploadErr?.message || "Avatar upload failed";
        alert(msg);
        setSavingProfile(false);
        setUploadProgress(0);
        return; // stop further saving if upload fails
      } finally {
        setAvatarFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (avatarPreviewRef.current) {
          URL.revokeObjectURL(avatarPreviewRef.current);
          avatarPreviewRef.current = null;
        }
      }
    }

    // 2) update basic profile (name/email)
    const payload = { name: profile.name, email: profile.email };
    const updatedRes = await API.put("/users/me", payload);
    const updatedUser = updatedRes?.data || {};

    // 3) update context and local state
    if (setUser) setUser(updatedUser);

    setProfile((p) => ({
      ...p,
      name: updatedUser.name || p.name,
      email: updatedUser.email || p.email,
      profilePic: makeFullAvatarUrl(updatedUser.avatarUrl || updatedUser.avatar || p.profilePic),
    }));

    alert("Profile updated successfully");
  } catch (err) {
    console.error("Error saving profile:", err);
    alert(err?.response?.data?.message || err?.message || "Failed to save profile");
  } finally {
    setSavingProfile(false);
    setUploadProgress(0);
  }
};

  // Save preferences separately
  const handleSavePreferences = async () => {
    try {
      setSavingPrefs(true);
      const res = await API.put("/users/me/preferences", preferences);
      if (res?.data) {
        if (setUser) setUser(res.data);
      }
      alert("Preferences saved");
    } catch (err) {
      console.error("Error saving preferences:", err);
      alert(err?.response?.data?.message || err?.message || "Failed to save preferences");
    } finally {
      setSavingPrefs(false);
    }
  };

  // Change password flow
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return alert("Fill both current and new password");
    try {
      setChangingPassword(true);
      const res = await API.put("/users/change-password", { currentPassword, newPassword });
      alert(res.data?.message || "Password changed. Please login again.");
      // force logout on password change
      setToken && setToken(null);
      setUser && setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Change password error:", err);
      alert(err?.response?.data?.message || err?.message || "Password change failed");
    } finally {
      setChangingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
    }
  };

  // Delete account (prompt for confirmation)
  const handleDeleteAccount = async () => {
    const v = window.prompt("Type DELETE to confirm account deletion");
    if (v !== "DELETE") return;
    try {
      await API.delete("/users/me");
      alert("Account deleted");
      setToken && setToken(null);
      setUser && setUser(null);
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Delete account error:", err);
      alert(err?.response?.data?.message || err?.message || "Failed to delete account");
    }
  };

  // Logout helper (for sidebar / button)
  const handleLogout = () => {
    setToken && setToken(null);
    setUser && setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="text-gray-600 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <img
                src={profile.profilePic}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border shadow-sm"
              />
              <label className="cursor-pointer bg-red-700 text-white flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm hover:bg-red-800 transition">
                <UploadIcon size={16} className="text-white" />
                <span>Upload</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            </div>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full">
                <div className="h-2 bg-gray-200 rounded">
                  <div style={{ width: `${uploadProgress}%` }} className="h-2 bg-red-700 rounded" />
                </div>
                <div className="text-xs mt-1">{uploadProgress}%</div>
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                className={`flex-1 ${savingProfile ? "bg-gray-300 text-gray-600" : "bg-red-700 text-white hover:bg-red-800"} py-2.5 rounded-lg font-medium transition`}
              >
                {savingProfile ? "Saving..." : "Save Profile"}
              </button>

              <button
                onClick={() => {
                  if (authUser) {
                    setProfile({
                      name: authUser.name || "",
                      email: authUser.email || "",
                      profilePic: makeFullAvatarUrl(authUser.avatarUrl || authUser.avatar || "/Avatar.jpg"),
                    });
                    setPreferences(authUser.preferences || { notifications: true, theme: "light", language: "English" });
                    alert("Reverted to saved profile values");
                  } else {
                    alert("No saved profile available to revert");
                  }
                }}
                className="flex-none bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition"
              >
                Revert
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <SunMoon size={20} className="text-red-700" /> Preferences
          </h2>

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Bell size={18} /> <span>Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={preferences.notifications}
                  onChange={handlePreferencesChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-red-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <SunMoon size={18} /> <span>Theme</span>
              </div>
              <select
                name="theme"
                value={preferences.theme}
                onChange={handlePreferencesChange}
                className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-700">
                <Globe size={18} /> <span>Language</span>
              </div>
              <select
                name="language"
                value={preferences.language}
                onChange={handlePreferencesChange}
                className="border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSavePreferences}
                disabled={savingPrefs}
                className={`flex-1 ${savingPrefs ? "bg-gray-300 text-gray-600" : "bg-red-700 text-white hover:bg-red-800"} py-2.5 rounded-lg font-medium transition`}
              >
                {savingPrefs ? "Saving..." : "Save Preferences"}
              </button>

              <button
                onClick={() => {
                  if (authUser?.preferences) {
                    setPreferences(authUser.preferences);
                    alert("Preferences reverted");
                  } else {
                    alert("No saved preferences to revert");
                  }
                }}
                className="flex-none bg-gray-100 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-200 transition"
              >
                Revert
              </button>
            </div>
          </div>
        </div>

        {/* Security / Account */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Management</h2>

          <form onSubmit={handleChangePassword} className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={changingPassword}
                className={`flex-1 ${changingPassword ? "bg-gray-300 text-gray-600" : "bg-yellow-500 text-white hover:bg-yellow-600"} py-2.5 rounded-lg font-medium transition`}
              >
                {changingPassword ? "Updating..." : "Change Password"}
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="flex-none bg-red-700 text-white px-4 py-2.5 rounded-lg hover:bg-red-800 transition flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
