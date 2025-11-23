'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/app/sections/ui/Button';
import { Sun, Moon } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`
        flex items-center justify-between 
        px-6 py-3 md:px-8 md:py-4 
        bg-white/90 dark:bg-ink/90 backdrop-blur-md 
        border-2 border-ink dark:border-white/20 rounded-full 
        shadow-soft transition-all duration-300
        w-full max-w-4xl
        ${scrolled ? 'scale-95' : 'scale-100'}
      `}>
        <div className="font-display font-bold text-xl tracking-tight text-ink dark:text-white">
          S<span className="text-bubblegum">&</span>M
        </div>

        <div className="hidden md:flex items-center space-x-8 font-medium text-ink dark:text-smoke">
          {['Duo', 'Services', 'Projects'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="hover:text-forest dark:hover:text-bubblegum transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubblegum transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-smoke dark:hover:bg-white/10 transition-colors text-ink dark:text-white"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Button onClick={() => scrollTo('footer')} className="text-sm px-5 py-2 hidden sm:inline-flex">
            Let's Talk
          </Button>
        </div>
      </div>
    </nav>
  );
};
