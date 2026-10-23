'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: a natural-language query is typed, scattered data points settle into a regional bar chart.
const LOOP = 6;
const QUERY = 'popolazione per regione';
const HEIGHTS = [62, 44, 80, 32, 52, 72, 40, 58];
const PEAK = 2;
const BASE = 156;
// fixed "scattered" starting points for each data dot
const SCATTER = [[60, 70], [130, 118], [210, 64], [300, 104], [350, 66], [92, 140], [250, 136], [170, 92]];
const T = { typed: 0.24, settle: 0.42, grow: 0.58, label: 0.66, hold: 0.92 };

export default function MirrorSignature() {
  return (
    <SignaturePanel label="ISTAT · query" status="Live">
      {({ play, still }) => (
        <svg viewBox="0 0 400 170" className="block w-full">
          {/* search bar with typed query */}
          <rect x="16" y="12" width="368" height="28" rx="14" fill="#fff" fillOpacity="0.08" stroke="#fff" strokeOpacity="0.15" />
          <circle cx="34" cy="26" r="5" fill="none" stroke="#a5b4fc" strokeWidth="2" />
          <line x1="38" y1="30" x2="42" y2="34" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
          {QUERY.split('').map((ch, i) => {
            const at = (T.typed * (i + 1)) / QUERY.length;
            return (
              <motion.text
                key={i} x={52 + i * 7.2} y="30.5" fontSize="12" fontFamily="ui-monospace, monospace" fill="#f8fafc"
                initial={still ? false : { opacity: 0 }}
                animate={play ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
                transition={play ? loopT(LOOP, [0, at, Math.min(at + 0.005, 0.99), T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.text>
            );
          })}

          {/* axis */}
          <line x1="24" y1={BASE} x2="376" y2={BASE} stroke="#fff" strokeOpacity="0.2" strokeWidth="2" />

          {HEIGHTS.map((h, i) => {
            const x = 44 + i * 42;
            const isPeak = i === PEAK;
            const color = isPeak ? '#facc15' : '#a5b4fc';
            return (
              <g key={i}>
                <motion.rect
                  x={x} y={BASE - h} width="26" height={h} rx="4" fill={color} fillOpacity={isPeak ? 1 : 0.75}
                  style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                  initial={still ? false : { scaleY: 0 }}
                  animate={play ? { scaleY: [0, 0, 1, 1, 0] } : { scaleY: 1 }}
                  transition={play ? loopT(LOOP, [0, T.settle, T.grow, T.hold, 1], { delay: i * 0.04 }) : { duration: 0 }}
                />
                {/* data point: scattered -> top of its bar */}
                <motion.circle
                  r="5" fill={color} cx="0" cy="0"
                  initial={{ x: x + 13, y: BASE - h, opacity: still ? 1 : 0 }}
                  animate={play ? {
                    x: [SCATTER[i][0], SCATTER[i][0], x + 13, x + 13, SCATTER[i][0]],
                    y: [SCATTER[i][1], SCATTER[i][1], BASE - h, BASE - h, SCATTER[i][1]],
                    opacity: [0, 1, 1, 1, 0],
                  } : { x: x + 13, y: BASE - h, opacity: 1 }}
                  transition={play ? loopT(LOOP, [0, T.typed, T.settle, T.hold, 1]) : { duration: 0 }}
                />
              </g>
            );
          })}

          {/* peak label */}
          <motion.g
            initial={still ? false : { opacity: 0, y: 6 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 6] } : { opacity: 1, y: 0 }}
            transition={play ? loopT(LOOP, [0, T.grow, T.label, T.hold, 1]) : { duration: 0 }}
          >
            <rect x={44 + PEAK * 42 - 14} y={BASE - HEIGHTS[PEAK] - 34} width="54" height="20" rx="10" fill="#facc15" />
            <text x={44 + PEAK * 42 + 13} y={BASE - HEIGHTS[PEAK] - 20} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0f172a">
              5.7M
            </text>
          </motion.g>
        </svg>
      )}
    </SignaturePanel>
  );
}
