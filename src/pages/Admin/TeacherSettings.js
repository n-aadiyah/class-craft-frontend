import React, { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";

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
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon size={28} className="text-red-700" />
        <h1 className="text-3xl font-bold text-red-700">Settings</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile Info</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Profile Picture</label>
              <div className="flex items-center gap-4">
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border"
                />
                <input type="file" accept="image/*" onChange={handleProfilePicChange} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleProfileChange}
                placeholder="********"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition mt-2">
              Update Profile
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Preferences</h2>
          <div className="flex flex-col gap-4">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Notifications</span>
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handlePreferencesChange}
                className="h-5 w-5 accent-red-600"
              />
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Theme</span>
              <select
                name="theme"
                value={preferences.theme}
                onChange={handlePreferencesChange}
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Language</span>
              <select
                name="language"
                value={preferences.language}
                onChange={handlePreferencesChange}
                className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition mt-2">
              Update Preferences
            </button>
          </div>

          {/* Account Management */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Account</h3>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full mb-2">
              Change Password
            </button>
            <button className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition w-full">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettings;
