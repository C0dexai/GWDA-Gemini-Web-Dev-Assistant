
import React from 'react';

const SparklesIcon = ({ className }: { className?: string }): React.ReactNode => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L14.39 8.61L21 9.24L16.5 13.5L18.18 20L12 16.77L5.82 20L7.5 13.5L3 9.24L9.61 8.61L12 2z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

export default SparklesIcon;
