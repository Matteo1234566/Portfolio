import React from 'react';

export default function Button({
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) {
  const baseStyles = "cursor-pointer inline-flex items-center justify-center px-8 py-3 rounded-full font-display font-bold uppercase tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-bubblegum text-white hover:bg-indigo-400 hover:scale-105 shadow-hard dark:shadow-hard-white border-2 border-ink dark:border-white",
    secondary: "bg-white dark:bg-white/10 text-ink dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 shadow-soft border-2 border-transparent hover:border-ink dark:hover:border-white",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-forest"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
