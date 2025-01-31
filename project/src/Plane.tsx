// src/Plane.tsx
import React from 'react';

const Plane: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s1-1 4-1 5 2 8 2 4-1 4-1" />
    <path d="M9 18H3l2-2" />
    <path d="M15 6l-2 2M21 12s-1 1-4 1-5-2-8-2-4 1-4 1" />
  </svg>
);

export default Plane;