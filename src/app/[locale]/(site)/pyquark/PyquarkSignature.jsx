'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: the PC plugs into the console over USB, packets stream along the cable, the install bar fills.
// Uses PyQuark's own dark palette; the console is drawn as a generic handheld silhouette (no logos).
const LOOP = 6;
const P = { bg: '#1A1C24', line: '#F5EFDF', seed: '#20BF20', subtle: '#9C9E9A', left: '#00B2E3', right: '#FF4554' };
// Cable: cubic bezier from the PC port to the console's bottom port
const C0 = [112, 118];
const C1 = [170, 160];
const C2 = [250, 160];
const C3 = [310, 132];
const bez = (t, a, b, c, d) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d;
const SAMPLES = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  return [Math.round(bez(t, C0[0], C1[0], C2[0], C3[0])), Math.round(bez(t, C0[1], C1[1], C2[1], C3[1]))];
});
const T = { plug: 0.14, stream: 0.2, full: 0.8, hold: 0.93 };

export default function PyquarkSignature() {
  return (
    <SignaturePanel label="USB · Goldleaf / DBI" status="Live" background={P.bg}>
      {({ play, still }) => (
        <svg viewBox="0 0 400 180" className="block w-full">
          {/* PC */}
          <rect x="22" y="30" width="96" height="66" rx="8" fill="none" stroke={P.line} strokeOpacity="0.5" strokeWidth="2" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x="32" y={42 + i * 14} width={[56, 40, 64][i]} height="6" rx="3" fill={i === 2 ? P.seed : P.line} opacity={i === 2 ? 0.9 : 0.35} />
          ))}
          <rect x="54" y="96" width="32" height="10" fill={P.line} opacity="0.3" />
          <rect x="40" y="106" width="60" height="6" rx="3" fill={P.line} opacity="0.3" />
          <rect x="108" y="112" width="8" height="12" rx="2" fill={P.line} opacity="0.6" />

          {/* handheld console: wide body, thin-bezel screen, neon Joy-Con style side controllers */}
          <path d="M258 46 H250 Q234 46 234 64 V100 Q234 118 250 118 H258 Z" fill={P.left} />
          <path d="M362 46 H370 Q386 46 386 64 V100 Q386 118 370 118 H362 Z" fill={P.right} />
          {/* left controller: minus, stick, button cross, capture */}
          <rect x="250" y="51" width="6" height="2" rx="1" fill="#0f172a" />
          <circle cx="246" cy="64" r="6" fill="#0f172a" />
          <circle cx="246" cy="64" r="3.5" fill="#334155" />
          {[[0, -5], [5, 0], [0, 5], [-5, 0]].map(([dx, dy]) => <circle key={`l${dx}${dy}`} cx={246 + dx} cy={90 + dy} r="2.2" fill="#0f172a" />)}
          <rect x="249" y="107" width="5" height="5" rx="1" fill="#0f172a" />
          {/* right controller: plus, button cross, stick, home */}
          <rect x="364" y="51" width="6" height="2" rx="1" fill="#0f172a" />
          <rect x="366" y="49" width="2" height="6" rx="1" fill="#0f172a" />
          {[[0, -5], [5, 0], [0, 5], [-5, 0]].map(([dx, dy]) => <circle key={`r${dx}${dy}`} cx={374 + dx} cy={66 + dy} r="2.2" fill="#0f172a" />)}
          <circle cx="374" cy="92" r="6" fill="#0f172a" />
          <circle cx="374" cy="92" r="3.5" fill="#334155" />
          <circle cx="368" cy="109" r="2.6" fill="#0f172a" />
          {/* body + screen */}
          <rect x="258" y="46" width="104" height="72" fill="#2a2d36" />
          <rect x="264" y="51" width="92" height="62" rx="2" fill="#0f172a" />
          <rect x="304" y="117" width="12" height="3" rx="1" fill="#0f172a" />

          {/* install progress on screen */}
          <text x="310" y="72" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.line} opacity="0.8">XCI</text>
          <rect x="282" y="80" width="56" height="7" rx="3.5" fill={P.line} opacity="0.15" />
          <motion.rect
            x="282" y="80" width="56" height="7" rx="3.5" fill={P.seed}
            style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
            initial={{ scaleX: still ? 1 : 0 }}
            animate={play ? { scaleX: [0, 0, 1, 1, 0] } : { scaleX: 1 }}
            transition={play ? loopT(LOOP, [0, T.stream, T.full, T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
          />
          <motion.text
            x="310" y="102" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.seed}
            initial={{ opacity: still ? 1 : 0 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
            transition={play ? loopT(LOOP, [0, T.full, T.full + 0.03, T.hold, 1]) : { duration: 0 }}
          >
            100%
          </motion.text>

          {/* cable */}
          <path d={`M${C0} C${C1} ${C2} ${C3}`} fill="none" stroke={P.subtle} strokeWidth="4" strokeLinecap="round" />
          {/* plug sliding into the console port */}
          <motion.rect
            x="305" y="118" width="10" height="10" rx="2" fill={P.line}
            initial={{ y: 0 }}
            animate={play ? { y: [14, 0, 0, 14] } : { y: 0 }}
            transition={play ? loopT(LOOP, [0, T.plug, T.hold, 1], { ease: [0.34, 1.56, 0.64, 1] }) : { duration: 0 }}
          />

          {/* data packets */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.rect
              key={i} width="8" height="8" rx="2" fill={P.seed} x="-4" y="-4"
              initial={{ opacity: 0 }}
              animate={play ? {
                x: SAMPLES.map((p) => p[0]),
                y: SAMPLES.map((p) => p[1]),
                opacity: [0, 1, 1, 1, 1, 1, 1, 1, 0],
              } : { opacity: 0 }}
              transition={play ? { duration: 1.1, repeat: Infinity, ease: 'linear', delay: 0.9 + i * 0.22, repeatDelay: 0 } : { duration: 0 }}
            />
          ))}
        </svg>
      )}
    </SignaturePanel>
  );
}
