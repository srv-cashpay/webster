import React from "react";

const ScanLogo = ({ size = 64, color = "#2563eb" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Frame */}
      <rect x="6" y="6" width="16" height="16" rx="4" stroke={color} strokeWidth="3"/>
      <rect x="42" y="6" width="16" height="16" rx="4" stroke={color} strokeWidth="3"/>
      <rect x="6" y="42" width="16" height="16" rx="4" stroke={color} strokeWidth="3"/>
      <rect x="42" y="42" width="16" height="16" rx="4" stroke={color} strokeWidth="3"/>

      {/* Scan line */}
      <line
        x1="16"
        y1="32"
        x2="48"
        y2="32"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ScanLogo;
