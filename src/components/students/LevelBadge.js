import React from "react";
import { getAvatarKeyByLevel } from "../../utils/levelUtils";

const badgeStyles = {
  beginner: {
    label: "Beginner",
    bg: "bg-gray-200",
    text: "text-gray-700",
    ring: "ring-gray-300",
  },
  apprentice: {
    label: "Apprentice",
    bg: "bg-green-100",
    text: "text-green-700",
    ring: "ring-green-300",
  },
  warrior: {
    label: "Warrior",
    bg: "bg-blue-100",
    text: "text-blue-700",
    ring: "ring-blue-300",
  },
  master: {
    label: "Master",
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    ring: "ring-yellow-400",
  },
};

export default function LevelBadge({ level = 1 }) {
  const key = getAvatarKeyByLevel(level);
  const badge = badgeStyles[key];

  return (
    <div
      className={`
        inline-flex items-center gap-2 px-4 py-1.5 mt-3
        rounded-full text-sm font-semibold
        ${badge.bg} ${badge.text}
        ring-2 ${badge.ring}
      `}
    >
      <span>{badge.label}</span>
      <span className="opacity-70">Lv {level}</span>
    </div>
  );
}
