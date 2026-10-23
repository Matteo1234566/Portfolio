'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Decorative radar: a sweep rotates clockwise and each "repo" blip flares as the beam passes it.
const PERIOD = 4; // seconds per revolution
const BLIPS = [
  { angle: 38, dist: 0.62, size: 10 },
  { angle: 95, dist: 0.35, size: 7 },
  { angle: 142, dist: 0.78, size: 8 },
  { angle: 205, dist: 0.5, size: 12 },
  { angle: 258, dist: 0.82, size: 7 },
  { angle: 312, dist: 0.3, size: 9 },
  { angle: 340, dist: 0.7, size: 6 },
];

export default function RepoRadar({ className = '' }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const play = inView && !reduceMotion;

  return (
    <div ref={ref} className={`pointer-events-none aspect-square ${className}`} aria-hidden="true">
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/15 bg-ink/30">
        {[0.25, 0.5, 0.75].map((s) => (
          <div
            key={s}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
          />
        ))}
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-white/10" />

        {/* Sweep: bright leading edge at the top of the cone, fading trail behind it */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, transparent 0deg 290deg, rgba(165,180,252,0.05) 300deg, rgba(165,180,252,0.45) 360deg)' }}
          initial={{ rotate: 0 }}
          animate={play ? { rotate: 360 } : { rotate: 0 }}
          transition={play ? { duration: PERIOD, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-transparent to-indigo-200"
          initial={{ rotate: 0 }}
          animate={play ? { rotate: 360 } : { rotate: 0 }}
          transition={play ? { duration: PERIOD, repeat: Infinity, ease: 'linear' } : { duration: 0 }}
        />

        {BLIPS.map((blip, i) => {
          const rad = (blip.angle * Math.PI) / 180;
          const left = (50 + Math.sin(rad) * blip.dist * 50).toFixed(2);
          const top = (50 - Math.cos(rad) * blip.dist * 50).toFixed(2);
          return (
            <motion.span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200"
              style={{ left: `${left}%`, top: `${top}%`, width: blip.size, height: blip.size, boxShadow: '0 0 12px 2px rgba(165,180,252,0.6)' }}
              initial={{ opacity: 0.35, scale: 1 }}
              animate={play ? { opacity: [0.25, 1, 0.25], scale: [1, 1.6, 1] } : { opacity: 0.6, scale: 1 }}
              transition={play ? {
                duration: PERIOD,
                times: [0, 0.04, 0.7],
                repeat: Infinity,
                ease: 'easeOut',
                delay: (blip.angle / 360) * PERIOD,
              } : { duration: 0 }}
            />
          );
        })}
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-200 bg-forest" />
      </div>
    </div>
  );
}
