'use client';

import { motion } from 'framer-motion';
import SignaturePanel from '@/components/SignaturePanel';

// Hero signature: scan the frame, close the detection box onto the plate, read it character by character.
const LOOP = 5.5;
const SCAN = '#a5b4fc';
const LOCK = '#4ade80';
const PLATE = 'AB123CD';
const CHAR_X = [175, 183.5, 194, 202.5, 211, 221.5, 230];

// [wide, tight] positions for each corner bracket
const CORNERS = [
  { d: 'M0 14 V0 H14', wide: [96, 28], tight: [152, 120] },
  { d: 'M-14 0 H0 V14', wide: [304, 28], tight: [258, 120] },
  { d: 'M0 -14 V0 H14', wide: [96, 178], tight: [152, 158] },
  { d: 'M-14 0 H0 V-14', wide: [304, 178], tight: [258, 158] },
];
// phases (fractions of LOOP): scan until 0.26, close until 0.4, read until 0.6, hold until 0.9, reset
const T = { scanEnd: 0.26, locked: 0.4, readEnd: 0.6, hold: 0.9 };

export default function TargageSignature() {
  const loop = (times) => ({ duration: LOOP, times, repeat: Infinity, ease: 'easeInOut' });

  return (
    <SignaturePanel label="Cam 02 · OCR" status="Live">
      {({ play, still: reduceMotion }) => (
      <svg viewBox="0 0 400 200" className="block w-full">
        {/* road */}
        <rect x="0" y="150" width="400" height="50" fill="#0f172a" opacity="0.6" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={40 + i * 140} y="186" width="60" height="4" rx="2" fill="#fff" opacity="0.15" />
        ))}

        {/* car (rear) */}
        <rect x="120" y="40" width="160" height="58" rx="22" fill="#1e293b" />
        <rect x="134" y="50" width="132" height="36" rx="14" fill="#334155" />
        <path d="M150 54 L176 54 L160 82 L142 82 Z" fill="#fff" opacity="0.08" />
        <rect x="104" y="86" width="192" height="80" rx="18" fill="#475569" />
        <rect x="110" y="98" width="34" height="14" rx="5" fill="#ef4444" opacity="0.85" />
        <rect x="256" y="98" width="34" height="14" rx="5" fill="#ef4444" opacity="0.85" />
        <rect x="118" y="166" width="30" height="16" rx="5" fill="#0f172a" />
        <rect x="252" y="166" width="30" height="16" rx="5" fill="#0f172a" />

        {/* plate (Italian layout: blue bands left and right) */}
        <rect x="160" y="126" width="90" height="26" rx="4" fill="#f8fafc" stroke="#0f172a" strokeWidth="1.5" />
        <rect x="160" y="126" width="10" height="26" rx="3" fill="#1d4ed8" />
        <rect x="240" y="126" width="10" height="26" rx="3" fill="#1d4ed8" />
        {PLATE.split('').map((ch, i) => {
          const at = T.locked + ((T.readEnd - T.locked) * i) / PLATE.length;
          return (
            <motion.text
              key={i} x={CHAR_X[i]} y="144.5" fontSize="13.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0f172a"
              initial={reduceMotion ? false : { opacity: 0.25 }}
              animate={play ? { opacity: [0.25, 0.25, 1, 1, 0.25] } : { opacity: 1 }}
              transition={play ? loop([0, at, at + 0.02, T.hold, 1]) : { duration: 0 }}
            >
              {ch}
            </motion.text>
          );
        })}

        {/* scan line */}
        <motion.g
          initial={{ y: 0, opacity: reduceMotion ? 0 : 1 }}
          animate={play ? { y: [0, 170, 0, 0], opacity: [1, 1, 1, 0] } : undefined}
          transition={play ? loop([0, T.scanEnd * 0.6, T.scanEnd, T.scanEnd + 0.02]) : undefined}
        >
          <rect x="0" y="14" width="400" height="18" fill={SCAN} opacity="0.12" />
          <line x1="0" y1="32" x2="400" y2="32" stroke={SCAN} strokeWidth="2" />
        </motion.g>

        {/* detection corners */}
        {CORNERS.map((c, i) => (
          <motion.path
            key={i} d={c.d} fill="none" strokeWidth="3" strokeLinecap="round"
            initial={{ x: c.tight[0], y: c.tight[1], stroke: LOCK }}
            animate={play ? {
              x: [c.wide[0], c.wide[0], c.tight[0], c.tight[0], c.wide[0]],
              y: [c.wide[1], c.wide[1], c.tight[1], c.tight[1], c.wide[1]],
              stroke: [SCAN, SCAN, LOCK, LOCK, SCAN],
            } : { x: c.tight[0], y: c.tight[1], stroke: LOCK }}
            transition={play ? loop([0, T.scanEnd, T.locked, T.hold, 1]) : { duration: 0 }}
          />
        ))}

        {/* read-out */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={play ? { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 6] } : { opacity: 1, y: 0 }}
          transition={play ? loop([0, T.readEnd, T.readEnd + 0.05, T.hold, 1]) : { duration: 0 }}
        >
          <rect x="146" y="92" width="118" height="22" rx="11" fill={LOCK} />
          <text x="205" y="107" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0f172a">
            {PLATE} · 98%
          </text>
        </motion.g>
      </svg>
      )}
    </SignaturePanel>
  );
}
