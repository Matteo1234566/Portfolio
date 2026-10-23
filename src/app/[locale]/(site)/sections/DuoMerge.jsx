'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Two half-discs (Simone: neural net, Matteo: code) slide in and lock into one system.
const CX = 180;
const CY = 72;
const R = 62;
const INK = '#0f172a';
const ease = [0.22, 1, 0.36, 1];

const NODES = [
  [134, 52], [134, 92],
  [152, 38], [152, 72], [152, 106],
  [170, 56], [170, 88],
];
const EDGES = [[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 5], [3, 6], [4, 6]];

export default function DuoMerge({ leftName, rightName, label }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [hovered, setHovered] = useState(false);
  const state = reduceMotion || inView ? (hovered && !reduceMotion ? 'hover' : 'locked') : 'apart';
  const play = inView && !reduceMotion;

  const half = (dir) => ({
    apart: { x: dir * 150, rotate: dir * 18, opacity: 0, transition: { duration: 0.3 } },
    locked: { x: 0, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 140, damping: 13, delay: 0.1 } },
    hover: { x: dir * 12, rotate: dir * 6, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 14 } },
  });

  return (
    <div
      ref={ref}
      className="mx-auto mb-14 flex max-w-md flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <motion.svg viewBox="0 0 360 150" className="w-full overflow-visible" initial={reduceMotion ? 'locked' : 'apart'} animate={state}>
        {/* Impact ring + sparks when the halves lock */}
        <motion.circle
          cx={CX} cy={CY} r={R} fill="none" stroke="#6366f1" strokeWidth="3"
          variants={{
            apart: { scale: 1, opacity: 0 },
            locked: { scale: [1, 1.45], opacity: [0, 0.7, 0], transition: { delay: 0.45, duration: 0.8 } },
            hover: { opacity: 0 },
          }}
          style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' }}
        />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <motion.line
              key={i}
              x1={Math.round(CX + Math.cos(a) * (R + 8))} y1={Math.round(CY + Math.sin(a) * (R + 8))}
              x2={Math.round(CX + Math.cos(a) * (R + 22))} y2={Math.round(CY + Math.sin(a) * (R + 22))}
              stroke={i % 2 ? '#facc15' : '#6366f1'} strokeWidth="4" strokeLinecap="round"
              variants={{
                apart: { pathLength: 0, opacity: 0 },
                locked: { pathLength: [0, 1, 1], opacity: [0, 1, 0], transition: { delay: 0.45, duration: 0.7 } },
                hover: { opacity: 0 },
              }}
            />
          );
        })}

        {/* Simone: neural net half */}
        <motion.g variants={half(-1)} style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' }}>
          <path d={`M${CX + 4} ${CY - R + 4} A${R} ${R} 0 0 0 ${CX + 4} ${CY + R + 4} Z`} fill={INK} />
          <path d={`M${CX} ${CY - R} A${R} ${R} 0 0 0 ${CX} ${CY + R} Z`} fill="#6366f1" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          {EDGES.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
          ))}
          {NODES.map(([x, y], i) => (
            <motion.circle
              key={i} cx={x} cy={y} r="5" fill="#fff"
              animate={play ? { r: [5, 7, 5], opacity: [0.75, 1, 0.75] } : undefined}
              transition={{ duration: 1.2, repeat: Infinity, delay: 1 + (x - 134) / 40 }}
            />
          ))}
          <text x={CX - R - 16} y={CY + 7} textAnchor="end" className="fill-ink dark:fill-white" style={{ font: '700 20px var(--font-oswald)', letterSpacing: '0.06em' }}>
            {leftName.toUpperCase()}
          </text>
        </motion.g>

        {/* Matteo: code half */}
        <motion.g variants={half(1)} style={{ transformOrigin: `${CX}px ${CY}px`, transformBox: 'view-box' }}>
          <path d={`M${CX + 4} ${CY - R + 4} A${R} ${R} 0 0 1 ${CX + 4} ${CY + R + 4} Z`} fill={INK} />
          <path d={`M${CX} ${CY - R} A${R} ${R} 0 0 1 ${CX} ${CY + R} Z`} fill="#facc15" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
          <text x={CX + 28} y={CY + 10} textAnchor="middle" fill={INK} style={{ font: '700 30px ui-monospace, monospace' }}>
            {'</>'}
          </text>
          <motion.rect
            x={CX + 16} y={CY + 22} width="22" height="4" rx="2" fill={INK}
            animate={play ? { opacity: [1, 1, 0, 0] } : undefined}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
          <text x={CX + R + 16} y={CY + 7} textAnchor="start" className="fill-ink dark:fill-white" style={{ font: '700 20px var(--font-oswald)', letterSpacing: '0.06em' }}>
            {rightName.toUpperCase()}
          </text>
        </motion.g>
      </motion.svg>

      <motion.span
        className="mt-1 rounded-full border-2 border-ink bg-white px-4 py-1.5 font-display text-sm font-bold uppercase tracking-wider text-ink shadow-hard dark:border-white dark:bg-ink dark:text-white dark:shadow-hard-white"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 10 }}
        animate={reduceMotion || inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
        transition={inView ? { type: 'spring', stiffness: 300, damping: 16, delay: 0.8 } : { duration: 0.2, ease }}
      >
        {label}
      </motion.span>
    </div>
  );
}
