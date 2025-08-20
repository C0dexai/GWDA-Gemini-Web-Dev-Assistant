import React from 'react';

const ViteIcon = ({ className }: { className?: string }): React.ReactNode => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={className}
    preserveAspectRatio="xMidYMid"
  >
    <defs>
      <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#41D1FF', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#BD34FE', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#viteGradient)"
      d="M256,23.33V203a23.31,23.31,0,0,1-23.33,23.33H140.42L112,185.58,81.25,226.33H23.33A23.31,23.31,0,0,1,0,203V23.33A23.31,23.31,0,0,1,23.33,0H232.67A23.31,23.31,0,0,1,256,23.33ZM183,73.5l-39,83.33-28.59-60.83C110.59,85.2,101,73.5,91,73.5H41.67V50.17H96.42c19.16,0,32.08,12.5,39.33,26.41L158.33,124l26.25-54.83,1.25-2.34c3.34-6,5.84-13.33,5.84-13.33Z"
    />
  </svg>
);

export default ViteIcon;
