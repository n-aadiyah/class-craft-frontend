import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function AttendanceGrid({ days, rows, month, year }) {
  if (!days.length || !rows.length) return null;

  const colors = {
    Present: "bg-green-700 hover:bg-green-700",
    Absent: "bg-red-700 hover:bg-red-800",
    NA: "bg-yellow-200 hover:bg-yellow-500",
    default: "bg-gray-300 hover:bg-gray-400",
  };

  const getColor = (v) => colors[v] || colors.default;

  return (
    <div className="overflow-x-auto p-4">
      <div
        className="inline-grid gap-2"
        style={{
          gridTemplateColumns: `200px repeat(${days.length}, 26px) 45px 45px`,
        }}
      >
        {/* HEADER — Student Name */}
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Student
        </div>

        {/* HEADER — Day Numbers */}
        {days.map((d) => (
          <div
            key={d}
            className="text-[12px] font-semibold text-center text-gray-700 dark:text-gray-300"
          >
            {d}
          </div>
        ))}

        {/* HEADER — Total P & A */}
        <div className="text-[12px] font-bold text-center text-green-700">
          P
        </div>
        <div className="text-[12px] font-bold text-center text-red-700">
          A
        </div>

        {/* ROWS — Students */}
        {rows.map((row) => (
          <React.Fragment key={row.studentId}>
            {/* Student Name */}
            <div className="truncate text-[15px] font-medium text-gray-900 dark:text-gray-200 py-1">
              {row.name}
            </div>

            {/* Daily Heatmap */}
            {row.daily.map((status, index) => {
              const day = days[index];
              const tooltipId = `${row.studentId}-${day}`;

              return (
                <div key={index}>
                  <div
                    data-tooltip-id={tooltipId}
                    data-tooltip-content={`${status || "NA"} | ${day}-${month}-${year}`}
                    className={`
                      w-6 h-6 rounded-sm transition-all duration-200 cursor-pointer 
                      ${getColor(status)}
                    `}
                  ></div>

                  <Tooltip id={tooltipId} />
                </div>
              );
            })}

            {/* TOTAL PRESENT */}
            <div className="text-center text-[14px] font-bold text-green-700">
              {row.present ?? 0}
            </div>

            {/* TOTAL ABSENT */}
            <div className="text-center text-[14px] font-bold text-red-700">
              {row.absent ?? 0}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
