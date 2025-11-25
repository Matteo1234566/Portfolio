'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/app/sections/ui/Button';
import { Sun, Moon, Menu, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar({
                                 theme,
                                 toggleTheme,
                                 currentView = 'home',
                                 onNavigate = () => {},
                               }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollTo = (id) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      setIsOpen(false);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const isHome = currentView === 'home';

  return (
      <>
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 ${
                scrolled ? 'py-4' : 'py-8'
            }`}
        >
          <div
              className={`
          flex items-center justify-between 
          px-6 py-3 md:px-8 md:py-4 
          bg-white/90 dark:bg-ink/90 backdrop-blur-md 
          border-2 border-ink dark:border-white/20 rounded-full 
          shadow-soft transition-all duration-300
          w-full max-w-4xl
          ${scrolled ? 'scale-95' : 'scale-100'}
        `}
          >
            <button
                onClick={() => onNavigate('home')}
                className="relative z-50 hover:opacity-80 transition-opacity flex items-center"
            >
              <Image
                  src={theme === 'dark' ? '/logo_moon.webp' : '/logo_sun.webp'}
                  alt="Logo"
                  // Aumenta la risoluzione sorgente (es. 80x80 o 120x120)
                  // Anche se il CSS la forzerà a h-10 (40px), l'immagine sarà nitida su schermi Retina
                  width={180}
                  height={180}
                  className="object-contain h-10 w-auto"
                  priority
              />
            </button>

            <div className="hidden md:flex items-center space-x-8 font-medium text-ink dark:text-smoke">
              {isHome ? (
                  <>
                    {['Duo', 'Services', 'Projects'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollTo(item.toLowerCase())}
                            className="hover:text-forest dark:hover:text-bubblegum transition-colors relative group"
                        >
                          {item}
                          <span
                              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-bubblegum transition-all group-hover:w-full"></span>
                        </button>
                    ))}
                  </>
              ) : (
                  <button
                      onClick={() => onNavigate('home')}
                      className="flex items-center gap-2 hover:text-bubblegum transition-colors"
                  >
                    <ArrowLeft size={16}/>
                    Back to Home
                  </button>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-smoke dark:hover:bg-white/10 transition-colors text-ink dark:text-white"
                  aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
              </button>

              {isHome && (
                  <Button onClick={() => scrollTo('footer')} className="text-sm px-5 py-2">
                    Let's Talk
                  </Button>
              )}
            </div>

            <button
                className="md:hidden p-2 text-ink dark:text-white focus:outline-none relative z-50"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{opacity: 0, y: -20}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: -20}}
                  transition={{duration: 0.3, ease: 'easeInOut'}}
                  className="fixed inset-0 z-40 bg-paper dark:bg-ink pt-32 px-6 md:hidden flex flex-col items-center justify-start overflow-y-auto"
              >
                <div className="flex flex-col items-center gap-8 w-full max-w-sm pb-10">
                {isHome ? (
                      ['Duo', 'Services', 'Projects'].map((item) => (
                          <button
                              key={item}
                              onClick={() => scrollTo(item.toLowerCase())}
                              className="font-display text-4xl font-bold text-ink dark:text-white hover:text-bubblegum transition-colors w-full text-center"
                          >
                            {item}
                          </button>
                      ))
                  ) : (
                      <button
                          onClick={() => {
                            onNavigate('home');
                            setIsOpen(false);
                          }}
                          className="font-display text-4xl font-bold text-ink dark:text-white hover:text-bubblegum transition-colors w-full text-center flex items-center justify-center gap-2"
                      >
                        <ArrowLeft /> Home
                      </button>
                  )}

                  <div className="w-24 h-px bg-ink/10 dark:bg-white/10 my-2"></div>

                  <button
                      onClick={toggleTheme}
                      className="flex items-center gap-3 font-medium text-xl text-ink dark:text-white hover:text-bubblegum transition-colors"
                  >
                    {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>

                  {isHome && (
                      <Button onClick={() => scrollTo('footer')} className="w-full text-lg py-4 mt-4">
                        Let's Talk
                      </Button>
                  )}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}
