'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: a capture drops into the phone and becomes note -> task -> event while the
// signal drops out; it still saves locally. Uses Capture's own dark palette.
const LOOP = 6.5;
const P = { bg: '#131315', card: '#1E1E22', active: '#25252B', ink: '#F4EEE3', seed: '#C89B5B', success: '#7FBC8C', warning: '#CC7845', info: '#85A9C7' };
const TYPES = [
  { label: 'NOTE', color: P.seed, from: 0.16, to: 0.36 },
  { label: 'TASK', color: P.success, from: 0.36, to: 0.56 },
  { label: 'EVENT', color: P.warning, from: 0.56, to: 0.92 },
];
const T = { drop: 0.16, offline: 0.3, saved: 0.62, hold: 0.92 };

export default function CaptureSignature() {
  return (
    <SignaturePanel label="Capture · on device" status="Offline" background={P.bg}>
      {({ play, still }) => (
        <svg viewBox="0 0 400 170" className="block w-full">
          {/* phone */}
          <rect x="34" y="10" width="112" height="152" rx="18" fill={P.card} stroke={P.ink} strokeOpacity="0.3" strokeWidth="2" />
          <rect x="72" y="16" width="36" height="5" rx="2.5" fill={P.ink} opacity="0.25" />
          {/* existing items */}
          {[0, 1].map((i) => (
            <g key={i}>
              <rect x="46" y={104 + i * 26} width="88" height="20" rx="6" fill={P.active} />
              <rect x="54" y={111 + i * 26} width={i ? 40 : 56} height="6" rx="3" fill={P.ink} opacity="0.3" />
            </g>
          ))}

          {/* new capture dropping in */}
          <motion.g
            initial={{ y: 0, opacity: 1 }}
            animate={play ? { y: [-80, 0, 0, 0], opacity: [0, 1, 1, 0] } : { y: 0, opacity: 1 }}
            transition={play ? loopT(LOOP, [0, T.drop, T.hold, 1], { ease: [0.34, 1.4, 0.64, 1] }) : { duration: 0 }}
          >
            <rect x="46" y="32" width="88" height="62" rx="8" fill={P.active} stroke={P.seed} strokeOpacity="0.5" />
            <rect x="54" y="62" width="70" height="6" rx="3" fill={P.ink} opacity="0.75" />
            <rect x="54" y="74" width="48" height="6" rx="3" fill={P.ink} opacity="0.4" />
            {TYPES.map((type) => (
              <motion.g
                key={type.label}
                initial={{ opacity: type.label === 'EVENT' ? 1 : 0 }}
                animate={play ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: type.label === 'EVENT' ? 1 : 0 }}
                transition={play ? loopT(LOOP, [0, type.from, type.from + 0.02, type.to - 0.02, type.to, 1], { ease: 'linear' }) : { duration: 0 }}
              >
                <rect x="54" y="40" width={type.label.length * 7 + 14} height="14" rx="7" fill={type.color} fillOpacity="0.2" stroke={type.color} />
                <text x="61" y="50.5" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill={type.color} letterSpacing="0.5">
                  {type.label}
                </text>
              </motion.g>
            ))}
          </motion.g>

          {/* signal dropping out */}
          <g transform="translate(250 86)">
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M${-14 - i * 12} ${-6 - i * 10} Q0 ${-22 - i * 18} ${14 + i * 12} ${-6 - i * 10}`}
                fill="none" stroke={P.info} strokeWidth="4" strokeLinecap="round"
                initial={{ opacity: still ? 0.15 : 1 }}
                animate={play ? { opacity: [1, 1, 0.12, 0.12, 1] } : { opacity: 0.15 }}
                transition={play ? loopT(LOOP, [0, T.offline - (2 - i) * 0.04, T.offline + 0.02 - (2 - i) * 0.04, T.hold, 1]) : { duration: 0 }}
              />
            ))}
            <circle cx="0" cy="0" r="5" fill={P.info} />
            <motion.line
              x1="-30" y1="-40" x2="30" y2="6" stroke={P.warning} strokeWidth="4" strokeLinecap="round"
              initial={{ pathLength: still ? 1 : 0 }}
              animate={play ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
              transition={play ? loopT(LOOP, [0, T.offline, T.offline + 0.06, T.hold, 1]) : { duration: 0 }}
            />
          </g>

          {/* saved locally */}
          <motion.g
            initial={still ? false : { opacity: 0, scale: 0.6 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] } : { opacity: 1, scale: 1 }}
            transition={play ? loopT(LOOP, [0, T.saved, T.saved + 0.06, T.hold, 1], { ease: [0.34, 1.56, 0.64, 1] }) : { duration: 0 }}
            style={{ transformOrigin: '300px 130px', transformBox: 'view-box' }}
          >
            <rect x="216" y="116" width="168" height="30" rx="15" fill={P.success} fillOpacity="0.18" stroke={P.success} />
            <path d="M232 131 l6 6 l11 -12" fill="none" stroke={P.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <text x="258" y="135.5" fontSize="12" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.success} letterSpacing="0.5">
              SAVED · LOCAL
            </text>
          </motion.g>
        </svg>
      )}
    </SignaturePanel>
  );
}
