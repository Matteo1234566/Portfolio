'use client';

import React from 'react';

export const DoodlePeace = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="4" className="fill-white dark:fill-ink transition-colors duration-300" strokeLinecap="round" strokeLinejoin="round">
      {/* Palm */}
      <path d="M60,160 C60,180 140,180 140,160 L140,120 C140,100 130,100 120,120 L120,110 L60,110 Z" />
      {/* Fingers */}
      <path d="M80,110 L80,40 C80,20 100,20 100,40 L100,110" />
      <path d="M120,110 L120,40 C120,20 140,20 140,40 L140,120" />
      {/* Thumb tucked */}
      <path d="M60,110 C40,120 50,140 70,130" />
    </g>
  </svg>
);

export const DoodleThumbsUp = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <g stroke="currentColor" strokeWidth="4" className="fill-white dark:fill-ink transition-colors duration-300" strokeLinecap="round" strokeLinejoin="round">
      <path d="M50,100 L50,160 C50,175 130,175 130,160 L130,120 L160,120 C175,120 175,100 160,90 L130,90 L130,60 C130,30 90,30 90,60 L90,100 L50,100 Z" />
    </g>
  </svg>
);

export const DoodleSnap = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
     <g stroke="currentColor" strokeWidth="4" className="fill-white dark:fill-ink transition-colors duration-300" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="100" cy="100" r="40" strokeDasharray="10 10" fill="none" opacity="0.5" />
        <path d="M110,90 L140,60 M100,80 L80,50" strokeWidth="6" />
        <path d="M90,120 C80,150 120,150 110,120" />
     </g>
  </svg>
);

export const ArrowDoodle = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M10,50 Q50,10 90,50 L80,40 M90,50 L80,60" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
