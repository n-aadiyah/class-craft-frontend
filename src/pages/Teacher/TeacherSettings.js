import React, { useState } from "react";
import { Settings as  Upload, Bell, Globe, SunMoon } from "lucide-react";

const TeacherSettings = () => {
  const [profile, setProfile] = useState({
    name: "Ms. Shency",
    email: "shency@example.com",
    password: "",
    profilePic: "/Avatar.jpg",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    theme: "light",
    language: "English",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setProfile({ ...profile, profilePic: file });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 sm:p-10">

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
           Profile Information
          </h2>

          <div className="flex flex-col gap-5">
            {/* Profile Picture */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
              <div className="flex items-center gap-4">
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border object-cover shadow-sm"
                />
               <label className="cursor-pointer bg-red-700 text-white flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm hover:bg-red-800 transition">
  <Upload size={16} className="text-white" />
  <span>Upload</span>
  <input
    type="file"
    accept="image/*"
    onChange={handleProfilePicChange}
    className="hidden"
  />
</label>

              </div>
            </div>

            {/* Name */}
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

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            {/* Save Button */}
            <button className="w-full bg-red-700 text-white py-2.5 rounded-lg font-medium hover:bg-red-800 transition">
              Save Profile
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <SunMoon size={20} className="text-red-700" /> Preferences
          </h2>

          <div className="flex flex-col gap-6">
            {/* Notifications */}
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

            {/* Theme */}
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

            {/* Language */}
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

            <button className="w-full bg-red-700 text-white py-2.5 rounded-lg font-medium hover:bg-red-800 transition">
              Save Preferences
            </button>
          </div>

          {/* Account Management */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Management</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-yellow-500 text-white py-2.5 rounded-lg font-medium hover:bg-yellow-600 transition">
                Change Password
              </button>
              <button className="w-full bg-red-700 text-white py-2.5 rounded-lg font-medium hover:bg-red-800 transition">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
