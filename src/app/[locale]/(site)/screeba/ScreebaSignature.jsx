'use client';

import { motion } from 'framer-motion';
import SignaturePanel from '@/components/SignaturePanel';

// Hero signature: a two-speaker waveform is "read" by a playhead and becomes a speaker-coloured transcript.
const LOOP = 5;
const SPEAKER_A = '#a5b4fc';
const SPEAKER_B = '#facc15';
const BARS = 28;
const segmentOf = (i) => (i < 9 ? 0 : i < 18 ? 1 : 2); // A, B, A
const speakerColor = (seg) => (seg === 1 ? SPEAKER_B : SPEAKER_A);
const ROWS = [
  { seg: 0, widths: [58, 34, 40] },
  { seg: 1, widths: [44, 62] },
  { seg: 2, widths: [36, 48, 30] },
];
const segEnd = [9 / BARS, 18 / BARS, 1].map((p) => p * 0.8); // playhead covers the wave in 80% of the loop

export default function ScreebaSignature() {

  return (
    <SignaturePanel label="Live transcript" status="REC">
      {({ play, still: reduceMotion }) => (
      <svg viewBox="0 0 400 120" className="block w-full">
        {/* waveform */}
        {Array.from({ length: BARS }, (_, i) => {
          const seg = segmentOf(i);
          const h = Math.round(14 + Math.abs(Math.sin(i * 1.7) * 30) + (i % 3) * 6); // integer: SSR/client float drift
          return (
            <motion.rect
              key={i}
              x={16 + i * 5.8} y={60 - h / 2} width="3.6" height={h} rx="1.8"
              fill={speakerColor(seg)}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scaleY: 1, opacity: 0.9 }}
              animate={play ? { scaleY: [0.35, 1, 0.5, 0.9, 0.35], opacity: [0.5, 1, 0.8, 1, 0.5] } : undefined}
              transition={{ duration: 1.1 + (i % 4) * 0.15, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.08 }}
            />
          );
        })}
        <motion.line
          y1="18" y2="102" stroke="#fff" strokeWidth="2" strokeLinecap="round"
          initial={{ x1: 176, x2: 176, opacity: reduceMotion ? 0 : 1 }}
          animate={play ? { x1: [14, 178, 178], x2: [14, 178, 178], opacity: [1, 1, 0] } : undefined}
          transition={{ duration: LOOP, times: [0, 0.8, 0.85], repeat: Infinity, ease: 'linear' }}
        />

        {/* arrow */}
        <motion.path
          d="M190 50 L204 60 L190 70" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          animate={play ? { x: [0, 4, 0] } : undefined}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* transcript */}
        {ROWS.map((row, r) => {
          const t = segEnd[row.seg] / 1;
          const color = speakerColor(row.seg);
          const show = play
            ? { opacity: [0, 0, 1, 1, 0], scaleX: [0, 0, 1, 1, 1] }
            : { opacity: 1, scaleX: 1 };
          const timing = { duration: LOOP, times: [0, t, Math.min(t + 0.08, 0.93), 0.94, 1], repeat: Infinity, ease: 'easeOut' };
          let x = 240;
          return (
            <g key={r}>
              <circle cx="226" cy={28 + r * 32} r="6" fill={color} />
              <text x="226" y={31.5 + r * 32} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">
                {row.seg === 1 ? 'B' : 'A'}
              </text>
              {row.widths.map((w, k) => {
                const rect = (
                  <motion.rect
                    key={k} x={x} y={24 + r * 32} width={w} height="8" rx="4" fill={color} fillOpacity="0.85"
                    style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
                    initial={reduceMotion ? false : { opacity: 0, scaleX: 0 }}
                    animate={show}
                    transition={play ? { ...timing, delay: k * 0.12 } : { duration: 0 }}
                  />
                );
                x += w + 6;
                return rect;
              })}
            </g>
          );
        })}
      </svg>
      )}
    </SignaturePanel>
  );
}
