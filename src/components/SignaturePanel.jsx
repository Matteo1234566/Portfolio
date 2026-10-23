'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Dark "device" panel used for project hero signature animations.
// `children` is a render function receiving { play, still }:
//   play  -> animations should loop (panel on screen, motion allowed)
//   still -> reduced motion: render the final, readable state without animating
export default function SignaturePanel({ label, status = 'Live', background = '#1e1b4b', className = '', children }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const play = inView && !reduceMotion;

  return (
    <div
      ref={ref}
      className={`on-dark mb-6 overflow-hidden rounded-2xl border-2 border-ink shadow-hard dark:border-white/10 dark:shadow-none ${className}`}
      style={{ backgroundColor: background }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-widest text-white/70">
        <span>{label}</span>
        <span className="flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-red-500"
            animate={play ? { opacity: [1, 0.2, 1] } : undefined}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          {status}
        </span>
      </div>
      {children({ play, still: !!reduceMotion })}
    </div>
  );
}

// Keyframe timing helper: one shared loop length, phases given as fractions of it.
export const loopT = (duration, times, extra = {}) => ({ duration, times, repeat: Infinity, ease: 'easeInOut', ...extra });
