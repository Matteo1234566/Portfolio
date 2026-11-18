'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: local disk scan reads git & agent logs at zero token cost, computes
// staleness + mess scores, and routes the active card onto the NOW Kanban column.
const LOOP = 6.5;
const P = {
  bg: '#0d1117',
  card: '#151b23',
  active: '#1c2128',
  ink: '#e6edf3',
  muted: '#8d96a0',
  blue: '#4493f8',
  green: '#3fb950',
  amber: '#d29922',
  red: '#f85149',
};
const T = {
  scanEnd: 0.25,
  scoreStart: 0.3,
  scoreEnd: 0.55,
  moveEnd: 0.74,
  hold: 0.93,
};

export default function LogposeSignature() {
  return (
    <SignaturePanel label="Scan · Score · Board" status="0 Tokens" background={P.bg}>
      {({ play, still }) => (
        <svg viewBox="0 0 400 175" className="block w-full">
          {/* 1. Local disk sources */}
          <rect x="14" y="20" width="108" height="134" rx="10" fill={P.card} stroke={P.ink} strokeOpacity="0.14" />
          <text x="24" y="37" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.muted} letterSpacing="0.8">
            DISK SCAN
          </text>
          {[
            { label: '.git/status', color: P.blue, y: 48 },
            { label: 'CLAUDE.md', color: P.green, y: 74 },
            { label: '~/.codex', color: P.amber, y: 100 },
            { label: 'mtime', color: P.muted, y: 126 },
          ].map((row, idx) => (
            <g key={row.label}>
              <rect x="22" y={row.y} width="92" height="20" rx="5" fill={P.active} />
              <motion.circle
                cx="32" cy={row.y + 10} r="3" fill={row.color}
                initial={{ opacity: still ? 1 : 0.35 }}
                animate={play ? { opacity: [0.35, 1, 1, 0.35] } : { opacity: 1 }}
                transition={play ? loopT(LOOP, [0, 0.06 + idx * 0.05, T.hold, 1]) : { duration: 0 }}
              />
              <text x="41" y={row.y + 13} fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.ink} opacity="0.85">
                {row.label}
              </text>
            </g>
          ))}

          {/* Scan sweep beam */}
          <motion.line
            x1="18" x2="118" y1="45" y2="45" stroke={P.blue} strokeWidth="2"
            initial={{ y: 0, opacity: 0 }}
            animate={play ? { y: [0, 102, 0, 0], opacity: [0, 1, 0, 0] } : { opacity: 0 }}
            transition={play ? loopT(LOOP, [0, T.scanEnd, T.scanEnd + 0.02, 1], { ease: 'linear' }) : { duration: 0 }}
          />

          {/* 2. Score bars */}
          <rect x="136" y="26" width="96" height="122" rx="10" fill={P.card} stroke={P.ink} strokeOpacity="0.14" />
          <text x="146" y="43" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.muted} letterSpacing="0.8">
            HYGIENE
          </text>
          {[
            { label: 'FRESH', w: 72, color: P.green, y: 58 },
            { label: 'COOLING', w: 48, color: P.amber, y: 88 },
            { label: 'MESS 64', w: 58, color: P.red, y: 118 },
          ].map((bar, idx) => (
            <g key={bar.label}>
              <text x="146" y={bar.y} fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={bar.color}>
                {bar.label}
              </text>
              <rect x="146" y={bar.y + 5} width="76" height="6" rx="3" fill={P.ink} fillOpacity="0.12" />
              <motion.rect
                x="146" y={bar.y + 5} width={bar.w} height="6" rx="3" fill={bar.color}
                style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
                initial={{ scaleX: still ? 1 : 0 }}
                animate={play ? { scaleX: [0, 0, 1, 1, 0] } : { scaleX: 1 }}
                transition={play ? loopT(LOOP, [0, T.scoreStart + idx * 0.04, T.scoreEnd, T.hold, 1]) : { duration: 0 }}
              />
            </g>
          ))}

          {/* 3. Kanban Board (NOW / NEXT) */}
          <rect x="246" y="20" width="140" height="134" rx="10" fill={P.card} stroke={P.ink} strokeOpacity="0.14" />
          <text x="256" y="37" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.blue} letterSpacing="0.8">
            NOW (1/3)
          </text>
          <text x="326" y="37" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.muted} letterSpacing="0.8">
            NEXT
          </text>
          <rect x="254" y="45" width="58" height="100" rx="6" fill={P.active} />
          <rect x="320" y="45" width="58" height="100" rx="6" fill={P.active} />

          {/* Static card in NEXT */}
          <rect x="325" y="52" width="48" height="26" rx="4" fill={P.card} stroke={P.ink} strokeOpacity="0.12" />
          <rect x="331" y="59" width="28" height="4" rx="2" fill={P.muted} opacity="0.7" />
          <rect x="331" y="67" width="18" height="4" rx="2" fill={P.amber} opacity="0.85" />

          {/* Active card sliding from NEXT into NOW */}
          <motion.g
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={play ? {
              x: [66, 66, 0, 0, 66],
              y: [34, 34, 0, 0, 34],
              opacity: [0.4, 0.9, 1, 1, 0.4],
            } : { x: 0, y: 0, opacity: 1 }}
            transition={play ? loopT(LOOP, [0, T.scoreEnd, T.moveEnd, T.hold, 1], { ease: [0.22, 1, 0.36, 1] }) : { duration: 0 }}
          >
            <rect x="259" y="52" width="48" height="36" rx="5" fill={P.card} stroke={P.blue} strokeWidth="1.5" />
            <rect x="265" y="60" width="32" height="5" rx="2.5" fill={P.ink} opacity="0.85" />
            <rect x="265" y="70" width="24" height="4" rx="2" fill={P.green} opacity="0.9" />
            <circle cx="298" cy="79" r="3" fill={P.blue} />
          </motion.g>

          {/* RESUME badge */}
          <motion.g
            initial={still ? false : { opacity: 0, scale: 0.7 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], scale: [0.7, 0.7, 1, 1, 0.7] } : { opacity: 1, scale: 1 }}
            transition={play ? loopT(LOOP, [0, T.moveEnd, T.moveEnd + 0.05, T.hold, 1], { ease: [0.34, 1.56, 0.64, 1] }) : { duration: 0 }}
            style={{ transformOrigin: '283px 124px', transformBox: 'view-box' }}
          >
            <rect x="259" y="114" width="48" height="18" rx="9" fill={P.green} />
            <text x="283" y="126" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0d1117">
              RESUME
            </text>
          </motion.g>
        </svg>
      )}
    </SignaturePanel>
  );
}
