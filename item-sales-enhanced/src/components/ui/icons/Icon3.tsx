import React from 'react';

export function Icon3({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M3 8L6 5L9 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  );
}