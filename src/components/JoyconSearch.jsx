'use client';

import { motion, useReducedMotion } from 'framer-motion';

// 404 scene: a lone Joy-Con looks around for its missing partner, tries to snap into the empty slot and bounces off.
const LOOP = 6;
const SLOT_X = 122;  // left edge of the missing right controller
const DOCK_X = SLOT_X - 32; // x where the lone controller would attach
const BLUE = '#00B2E3';
const INK = '#0f172a';

export default function JoyconSearch() {
  const reduceMotion = useReducedMotion();
  const play = !reduceMotion;

  return (
    <svg viewBox="0 0 220 124" className="h-32 w-auto md:h-40" aria-hidden="true">
      {/* empty slot for the missing right controller */}
      <path
        d={`M${SLOT_X} 14 H${SLOT_X + 16} Q${SLOT_X + 32} 14 ${SLOT_X + 32} 32 V92 Q${SLOT_X + 32} 110 ${SLOT_X + 16} 110 H${SLOT_X} Z`}
        className="stroke-ink/40 dark:stroke-white/40" fill="none" strokeWidth="2.5" strokeDasharray="6 5"
      />
      <motion.text
        x={SLOT_X + 16} y="70" textAnchor="middle" fontSize="28" fontWeight="700"
        className="fill-accent" style={{ fontFamily: 'var(--font-oswald)', transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={play ? { scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] } : undefined}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ?
      </motion.text>

      {/* ground shadow */}
      <motion.ellipse
        cy="118" rx="18" ry="3" className="fill-ink/15 dark:fill-white/15"
        initial={{ cx: 46 }}
        animate={play ? { cx: [46, 76, 26, 26, DOCK_X + 16, 78, 46] } : undefined}
        transition={{ duration: LOOP, times: [0, 0.2, 0.4, 0.5, 0.68, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* lone left controller */}
      <motion.g
        initial={{ x: 30, rotate: 0 }}
        animate={play ? {
          x: [30, 60, 10, 10, DOCK_X + 3, 62, 30],
          y: [0, -6, 0, 0, -2, -10, 0],
          rotate: [0, 6, -6, 0, 0, -14, 0],
        } : undefined}
        transition={{ duration: LOOP, times: [0, 0.2, 0.4, 0.5, 0.68, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}
      >
        <path d="M32 14 H18 Q2 14 2 32 V92 Q2 110 18 110 H32 Z" fill={BLUE} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="21" y="20" width="7" height="2.5" rx="1.2" fill={INK} />
        {/* stick = eye, looking around */}
        <circle cx="17" cy="38" r="8" fill={INK} />
        <motion.circle
          cy="38" r="3.4" fill="#fff"
          initial={{ cx: 17 }}
          animate={play ? { cx: [17, 21, 13, 13, 21, 21, 17] } : undefined}
          transition={{ duration: LOOP, times: [0, 0.2, 0.4, 0.5, 0.68, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }}
        />
        {[[0, -6], [6, 0], [0, 6], [-6, 0]].map(([dx, dy]) => (
          <circle key={`${dx}${dy}`} cx={17 + dx} cy={74 + dy} r="2.6" fill={INK} />
        ))}
        <rect x="20" y="96" width="6" height="6" rx="1.2" fill={INK} />
      </motion.g>

      {/* bump spark when it fails to attach */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={play ? { opacity: [0, 0, 1, 0, 0] } : undefined}
        transition={{ duration: LOOP, times: [0, 0.66, 0.69, 0.76, 1], repeat: Infinity }}
      >
        {[[-8, -10], [6, -12], [10, 4], [-6, 10]].map(([dx, dy], i) => (
          <line key={i} x1={SLOT_X - 2} y1="62" x2={SLOT_X - 2 + dx} y2={62 + dy} className="stroke-accent" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </motion.g>
    </svg>
  );
}
