'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: bytes in a save file get edited, then the checksum rolls and lands on a valid value.
// Uses PUSE's own dark palette.
const LOOP = 6.5;
const P = { bg: '#0A1123', card: '#18223A', ink: '#FAFAFA', blue: '#5E85F9', yellow: '#E1C144', ok: '#4ade80' };
const BYTES = [
  '4E', '41', '0F', '7A', 'C3', '19', '00', '2B',
  'E1', '64', '3F', '08', '9D', 'A2', '11', '5C',
  '00', 'FF', '27', 'B4', '6E', '30', 'D8', '42',
  '1A', '95', '73', '0C', 'EE', '58', '21', '07',
];
// cells edited in sequence: [index, new value, time it changes]
const EDITS = [[3, '63', 0.16], [12, 'FF', 0.3], [21, '99', 0.44]];
const ROLL = ['3A9F', '81C2', 'F04D', '27B8', 'C61E', '5D03'];
const FINAL = '9E4A';
const T = { roll: 0.54, done: 0.72, hold: 0.93 };
const cellX = (i) => 18 + (i % 8) * 31;
const cellY = (i) => 22 + Math.floor(i / 8) * 34;

export default function PuseSignature() {
  return (
    <SignaturePanel label="Save editor · hex" status="Live" background={P.bg}>
      {({ play, still }) => (
        <svg viewBox="0 0 400 160" className="block w-full">
          {BYTES.map((byte, i) => {
            const edit = EDITS.find(([idx]) => idx === i);
            return (
              <g key={i}>
                <motion.rect
                  x={cellX(i)} y={cellY(i)} width="27" height="26" rx="5" fill={P.card}
                  initial={{ fill: P.card }}
                  animate={play && edit ? { fill: [P.card, P.card, P.yellow, P.card, P.card] } : { fill: P.card }}
                  transition={play && edit ? loopT(LOOP, [0, edit[2] - 0.03, edit[2], edit[2] + 0.08, 1]) : { duration: 0 }}
                />
                {/* original value */}
                <motion.text
                  x={cellX(i) + 13.5} y={cellY(i) + 17.5} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace"
                  fill={P.ink} fillOpacity="0.75"
                  initial={{ opacity: edit && still ? 0 : 1 }}
                  animate={play && edit ? { opacity: [1, 1, 0, 0, 1] } : { opacity: edit && still ? 0 : 1 }}
                  transition={play && edit ? loopT(LOOP, [0, edit[2] - 0.01, edit[2], T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
                >
                  {byte}
                </motion.text>
                {/* edited value */}
                {edit && (
                  <motion.text
                    x={cellX(i) + 13.5} y={cellY(i) + 17.5} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace"
                    fill={P.blue}
                    initial={{ opacity: still ? 1 : 0 }}
                    animate={play ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
                    transition={play ? loopT(LOOP, [0, edit[2], edit[2] + 0.01, T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
                  >
                    {edit[1]}
                  </motion.text>
                )}
              </g>
            );
          })}

          {/* edit cursor hopping between edited cells */}
          <motion.rect
            width="31" height="30" rx="7" fill="none" stroke={P.blue} strokeWidth="2.5" x="-2" y="-2"
            initial={{ x: cellX(EDITS[2][0]) - 2, y: cellY(EDITS[2][0]) - 2, opacity: still ? 0 : 1 }}
            animate={play ? {
              x: [EDITS[0], EDITS[0], EDITS[1], EDITS[2], EDITS[2], EDITS[2]].map(([idx]) => cellX(idx) - 2),
              y: [EDITS[0], EDITS[0], EDITS[1], EDITS[2], EDITS[2], EDITS[2]].map(([idx]) => cellY(idx) - 2),
              opacity: [1, 1, 1, 1, 0, 0],
            } : { opacity: 0 }}
            transition={play ? loopT(LOOP, [0, EDITS[0][2] - 0.06, EDITS[1][2] - 0.06, EDITS[2][2] - 0.06, T.roll, 1]) : { duration: 0 }}
          />

          {/* checksum panel */}
          <rect x="276" y="22" width="110" height="128" rx="12" fill={P.card} stroke={P.ink} strokeOpacity="0.12" />
          <text x="331" y="46" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.ink} opacity="0.6" letterSpacing="1">CHECKSUM</text>
          {ROLL.map((value, i) => {
            const from = T.roll + ((T.done - T.roll) * i) / ROLL.length;
            const to = T.roll + ((T.done - T.roll) * (i + 1)) / ROLL.length;
            return (
              <motion.text
                key={value} x="331" y="84" textAnchor="middle" fontSize="24" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.ink} fillOpacity="0.55"
                initial={{ opacity: 0 }}
                animate={play ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: 0 }}
                transition={play ? loopT(LOOP, [0, from, from + 0.002, to - 0.002, to, 1], { ease: 'linear' }) : { duration: 0 }}
              >
                {value}
              </motion.text>
            );
          })}
          {/* resting value before the edit, final value after */}
          <motion.text
            x="331" y="84" textAnchor="middle" fontSize="24" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.ink} fillOpacity="0.55"
            initial={{ opacity: still ? 0 : 1 }}
            animate={play ? { opacity: [1, 1, 0, 0, 1] } : { opacity: 0 }}
            transition={play ? loopT(LOOP, [0, T.roll - 0.005, T.roll, T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
          >
            7C10
          </motion.text>
          <motion.text
            x="331" y="84" textAnchor="middle" fontSize="24" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.ok}
            initial={{ opacity: still ? 1 : 0 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
            transition={play ? loopT(LOOP, [0, T.done, T.done + 0.005, T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
          >
            {FINAL}
          </motion.text>
          <motion.g
            initial={still ? false : { opacity: 0, scale: 0.6 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] } : { opacity: 1, scale: 1 }}
            transition={play ? loopT(LOOP, [0, T.done, T.done + 0.05, T.hold, 1], { ease: [0.34, 1.56, 0.64, 1] }) : { duration: 0 }}
            style={{ transformOrigin: '331px 118px', transformBox: 'view-box' }}
          >
            <rect x="301" y="107" width="60" height="22" rx="11" fill={P.ok} />
            <text x="331" y="122" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0f172a">✓ OK</text>
          </motion.g>
        </svg>
      )}
    </SignaturePanel>
  );
}
