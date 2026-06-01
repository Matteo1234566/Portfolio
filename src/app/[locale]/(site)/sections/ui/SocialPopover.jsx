'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const SOCIALS = [
  {
    id: 'instagram',
    href: 'https://www.instagram.com/devop.sbs/',
    label: 'Instagram',
    Icon: FaInstagram,
    cardBg: 'bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]',
    glow: '0 8px 28px rgba(220,39,67,0.55)',
  },
  {
    id: 'tiktok',
    href: 'https://www.tiktok.com/@devop.sbs',
    label: 'TikTok',
    Icon: FaTiktok,
    cardBg: 'bg-[#010101] ring-1 ring-white/10',
    glow: '0 8px 28px rgba(238,29,82,0.45)',
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/@devop.sbs-it',
    label: 'YouTube',
    Icon: FaYoutube,
    cardBg: 'bg-gradient-to-br from-red-600 to-red-800',
    glow: '0 8px 28px rgba(220,38,38,0.55)',
  },
];

export default function SocialPopover({ triggerLabel }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group relative inline-flex items-center gap-1 font-bold text-ink dark:text-white hover:text-bubblegum transition-colors duration-200"
      >
        {triggerLabel}
        <span className="absolute -bottom-px left-0 h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-bubblegum to-pink-400 transition-transform duration-300 rounded-full" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="social-popover"
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50 select-none"
          >
            <div className="overflow-hidden rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              {/* accent bar */}
              <div className="h-[2px] bg-gradient-to-r from-bubblegum via-pink-400 to-bubblegum/30" />

              {/* label */}
              <span className="block px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">
                Follow us
              </span>

              {/* cards */}
              <div className="flex gap-2 px-3 pb-3 pt-1">
                {SOCIALS.map(({ id, href, label, Icon, cardBg, glow }, i) => (
                  <motion.a
                    key={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 420, damping: 28 }}
                    style={{ boxShadow: '0 0px 0px rgba(0,0,0,0)' }}
                    whileHover={{ scale: 1.07, boxShadow: glow }}
                    whileTap={{ scale: 0.94 }}
                    className={`flex flex-col items-center justify-center gap-2 w-[72px] py-5 rounded-xl text-white cursor-pointer ${cardBg}`}
                  >
                    <Icon size={22} />
                    <span className="text-[10px] font-bold tracking-wider leading-none">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* caret */}
            <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-zinc-950 border-r border-b border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
