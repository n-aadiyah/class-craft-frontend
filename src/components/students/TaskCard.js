import React from "react";

export default function TaskCard({ task }) {
  const {
    title,
    description,
    xpReward = 0,
    status = "pending", // pending | completed
    dueDate,
  } = task;

  const isCompleted = status === "completed";

  return (
    <div
      className={`
        flex items-center justify-between gap-4
        p-4 mb-3 rounded-lg border
        ${isCompleted ? "bg-gray-50 opacity-70" : "bg-white"}
      `}
    >
      {/* LEFT */}
      <div>
        <h4
          className={`font-semibold ${
            isCompleted ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {title}
        </h4>

        {description && (
          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        )}

        {dueDate && !isCompleted && (
          <p className="text-xs text-red-600 mt-1">
            Due: {new Date(dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <span
          className={`
            inline-block px-3 py-1 text-xs font-semibold rounded-full
            ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {isCompleted ? "Completed" : `+${xpReward} XP`}
        </span>
      </div>
    </div>
  );
}
