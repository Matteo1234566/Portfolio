'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function PlaneIcon({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11 L21 3 L14 21 L11 13 Z" fill="#fff" stroke="#0f172a" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 13 L21 3" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M11 13 L12 18" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// Take-off from a point on screen (the submit button), flying off to the top-right.
export function PlaneTakeoff({ origin }) {
  if (!origin) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <motion.div
        className="absolute"
        style={{ left: origin.x - 22, top: origin.y - 22 }}
        initial={{ scale: 0, x: 0, y: 0, rotate: -20 }}
        animate={{
          scale: [0, 1.2, 1, 1],
          x: [0, -24, 220, 1400],
          y: [0, -40, -220, -900],
          rotate: [-20, -35, 0, 10],
        }}
        transition={{ duration: 1.15, times: [0, 0.18, 0.5, 1], ease: 'easeIn' }}
      >
        <PlaneIcon />
      </motion.div>
      {/* fading trail */}
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <motion.path
          d={`M${origin.x} ${origin.y} C${origin.x - 40} ${origin.y - 60} ${origin.x + 120} ${origin.y - 120} ${origin.x + 220} ${origin.y - 220} S${origin.x + 900} ${origin.y - 600} ${origin.x + 1400} ${origin.y - 900}`}
          fill="none" stroke="#6366f1" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.9 }}
          animate={{ pathLength: 1, opacity: [0.9, 0.9, 0] }}
          transition={{ duration: 1.25, delay: 0.15, ease: 'easeIn', opacity: { times: [0, 0.7, 1], duration: 1.25, delay: 0.15 } }}
        />
      </svg>
    </div>
  );
}

// Landing on the thank-you card: flies in from the left and settles with a small bounce.
export function PlaneLanding({ className = '' }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
      initial={reduceMotion ? false : { x: -520, y: -180, rotate: 10, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: 42, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 70, damping: 12, mass: 0.9, delay: 0.25 }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <PlaneIcon size={76} />
      </motion.div>
    </motion.div>
  );
}
