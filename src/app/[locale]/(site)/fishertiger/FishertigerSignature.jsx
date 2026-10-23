'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: Monte Carlo season paths fan out, the median settles, and a live bid climbs to a "value" verdict.
const LOOP = 6.5;
const X0 = 20;
const X1 = 226;
const Y0 = 112;
const STEPS = 10;

// Deterministic PRNG so server and client render identical paths (no hydration drift).
function mulberry32(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(7);
const PATHS = Array.from({ length: 18 }, () => {
  let y = Y0;
  const pts = [[X0, Y0]];
  for (let s = 1; s <= STEPS; s++) {
    y += (rand() - 0.62) * 18; // slight upward drift = points accumulating over the season
    pts.push([Math.round(X0 + ((X1 - X0) * s) / STEPS), Math.round(Math.max(24, Math.min(150, y)))]);
  }
  return pts;
});
const MEDIAN = Array.from({ length: STEPS + 1 }, (_, s) => {
  const ys = PATHS.map((p) => p[s][1]).sort((a, b) => a - b);
  return [PATHS[0][s][0], ys[Math.floor(ys.length / 2)]];
});
const toD = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');

const BIDS = [12, 18, 25, 31];
const T = { fan: 0.3, median: 0.42, bidStart: 0.42, verdict: 0.78, hold: 0.93 };

export default function FishertigerSignature() {
  return (
    <SignaturePanel label="Auction · Monte Carlo" status="Live">
      {({ play, still }) => (
        <svg viewBox="0 0 400 170" className="block w-full">
          <line x1={X0} y1="158" x2={X1} y2="158" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" />
          <line x1={X0} y1="16" x2={X0} y2="158" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" />

          {PATHS.map((pts, i) => (
            <motion.path
              key={i} d={toD(pts)} fill="none" stroke="#a5b4fc" strokeOpacity="0.35" strokeWidth="1.5" strokeLinejoin="round"
              initial={{ pathLength: still ? 1 : 0 }}
              animate={play ? { pathLength: [0, 1, 1, 0] } : { pathLength: 1 }}
              transition={play ? loopT(LOOP, [0, T.fan, T.hold, 1], { delay: i * 0.03 }) : { duration: 0 }}
            />
          ))}
          <motion.path
            d={toD(MEDIAN)} fill="none" stroke="#facc15" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: still ? 1 : 0 }}
            animate={play ? { pathLength: [0, 0, 1, 1, 0] } : { pathLength: 1 }}
            transition={play ? loopT(LOOP, [0, T.fan, T.median, T.hold, 1]) : { duration: 0 }}
          />

          {/* auction card */}
          <rect x="250" y="20" width="134" height="130" rx="14" fill="#0f172a" fillOpacity="0.55" stroke="#fff" strokeOpacity="0.15" />
          <circle cx="276" cy="48" r="13" fill="#a5b4fc" fillOpacity="0.25" stroke="#a5b4fc" />
          <rect x="298" y="40" width="68" height="7" rx="3.5" fill="#fff" opacity="0.7" />
          <rect x="298" y="52" width="40" height="6" rx="3" fill="#fff" opacity="0.35" />
          <text x="266" y="88" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#fff" opacity="0.6" letterSpacing="1">BID</text>
          {BIDS.map((bid, i) => {
            const from = T.bidStart + ((T.verdict - T.bidStart) * i) / BIDS.length;
            const to = i === BIDS.length - 1 ? T.hold : T.bidStart + ((T.verdict - T.bidStart) * (i + 1)) / BIDS.length;
            const last = i === BIDS.length - 1;
            return (
              <motion.text
                key={bid} x="266" y="114" fontSize="26" fontWeight="700" fontFamily="var(--font-oswald)" fill="#f8fafc"
                initial={{ opacity: last ? 1 : 0 }}
                animate={play ? { opacity: [0, 0, 1, 1, 0, 0], y: [6, 6, 0, 0, 0, 0] } : { opacity: last ? 1 : 0 }}
                transition={play ? loopT(LOOP, [0, from, from + 0.02, to - 0.005, to, 1], { ease: 'linear' }) : { duration: 0 }}
              >
                €{bid}
              </motion.text>
            );
          })}
          <motion.g
            initial={still ? false : { opacity: 0, scale: 0.6 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] } : { opacity: 1, scale: 1 }}
            transition={play ? loopT(LOOP, [0, T.verdict, T.verdict + 0.05, T.hold, 1], { ease: [0.34, 1.56, 0.64, 1] }) : { duration: 0 }}
            style={{ transformOrigin: '345px 128px', transformBox: 'view-box' }}
          >
            <rect x="314" y="118" width="62" height="20" rx="10" fill="#4ade80" />
            <text x="345" y="132" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0f172a">✓ VALUE</text>
          </motion.g>
        </svg>
      )}
    </SignaturePanel>
  );
}
