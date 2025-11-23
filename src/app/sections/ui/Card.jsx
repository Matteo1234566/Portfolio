import React from 'react';

export default function Card({ children, className = '', dark = false }) {
  return (
    <div className={`
      rounded-[2rem] p-8 transition-transform hover:-translate-y-1 duration-300
      ${dark 
        ? 'bg-forest/40 border-2 border-white/20 backdrop-blur-sm text-white' 
        : 'bg-white dark:bg-white/5 border-2 border-ink dark:border-white/20 shadow-hard dark:shadow-hard-white'
      }
      ${className}
    `}>
      {children}
    </div>
  );
};
