import React from "react";
import { getAvatarKeyByLevel } from "../../utils/levelUtils";

const avatarMap = {
  beginner: "/avatars/beginner.png",
  apprentice: "/avatars/apprentice.png",
  warrior: "/avatars/warrior.png",
  master: "/avatars/master.png",
};

const borderMap = {
  beginner: "border-gray-300",
  apprentice: "border-green-400",
  warrior: "border-blue-400",
  master: "border-yellow-400",
};

export default function AvatarCard({ level = 1 }) {
  const avatarKey = getAvatarKeyByLevel(level);

  return (
    <div className="flex flex-col items-center">
      <img
        src={avatarMap[avatarKey]}
        alt={`${avatarKey} avatar`}
        className={`w-32 h-32 rounded-full border-4 ${borderMap[avatarKey]} shadow`}
        onError={(e) => {
          e.currentTarget.src = avatarMap.beginner;
        }}
      />
      <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
        {avatarKey}
      </p>
    </div>
  );
}
