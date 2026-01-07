import React from "react";

export default function XPProgressBar({
  xp = 0,
  currentLevelXp = 0,
  nextLevelXp = 100,
}) {
  const safeXp = Math.max(xp - currentLevelXp, 0);
  const totalNeeded = Math.max(nextLevelXp - currentLevelXp, 1);

  const percent = Math.min((safeXp / totalNeeded) * 100, 100);

  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>XP Progress</span>
        <span>
          {safeXp} / {totalNeeded}
        </span>
      </div>

      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-yellow-400 transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>

      {percent >= 90 && percent < 100 && (
        <p className="mt-1 text-xs text-yellow-600 font-medium">
          Almost there! Level up soon ✨
        </p>
      )}
    </div>
  );
}
