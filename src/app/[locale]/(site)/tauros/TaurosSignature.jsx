'use client';

import { motion } from 'framer-motion';
import SignaturePanel, { loopT } from '@/components/SignaturePanel';

// Hero signature: an agent invokes a domain MCP tool, the hardened Gen 3 toolchain builds
// ROM + .sym, and the integrated mGBA runner checks RAM + counterfactuals to reach PROVEN.
const LOOP = 6.8;
const P = {
  bg: '#141210',
  card: '#1D1916',
  active: '#27211C',
  ink: '#FAF5EE',
  amber: '#E69F45',
  green: '#4ADE80',
  visor: '#38BDF8',
  subtle: '#9E9184',
};
const T = {
  typed: 0.14,
  wire1: 0.26,
  buildEnd: 0.46,
  wire2: 0.56,
  scanEnd: 0.72,
  verdict: 0.75,
  hold: 0.93,
};

export default function TaurosSignature() {
  return (
    <SignaturePanel label="MCP · Build · RAM Verify" status="GBA" background={P.bg}>
      {({ play, still }) => (
        <svg viewBox="0 0 400 175" className="block w-full">
          {/* 1. Agent MCP terminal */}
          <rect x="14" y="22" width="114" height="130" rx="10" fill={P.card} stroke={P.ink} strokeOpacity="0.14" />
          <circle cx="26" cy="34" r="2.5" fill={P.amber} opacity="0.8" />
          <circle cx="35" cy="34" r="2.5" fill={P.visor} opacity="0.8" />
          <circle cx="44" cy="34" r="2.5" fill={P.green} opacity="0.8" />
          <text x="56" y="37" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.subtle} letterSpacing="0.8">
            RMCP
          </text>
          <line x1="22" y1="44" x2="120" y2="44" stroke={P.ink} strokeOpacity="0.08" />

          {/* > prompt + tool call */}
          <text x="22" y="64" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.green}>
            &gt;
          </text>
          <motion.rect
            x="34" y="55" width="76" height="8" rx="4" fill={P.ink} fillOpacity="0.75"
            style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
            initial={{ scaleX: still ? 1 : 0 }}
            animate={play ? { scaleX: [0, 1, 1, 0] } : { scaleX: 1 }}
            transition={play ? loopT(LOOP, [0, T.typed, T.hold, 1]) : { duration: 0 }}
          />
          <motion.rect
            x="22" y="72" width="60" height="7" rx="3.5" fill={P.visor} fillOpacity="0.7"
            style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
            initial={{ scaleX: still ? 1 : 0 }}
            animate={play ? { scaleX: [0, 0, 1, 1, 0] } : { scaleX: 1 }}
            transition={play ? loopT(LOOP, [0, 0.05, T.typed + 0.03, T.hold, 1]) : { duration: 0 }}
          />
          <rect x="22" y="92" width="96" height="22" rx="6" fill={P.active} />
          <text x="30" y="106.5" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.amber}>
            create_trainer
          </text>
          <rect x="22" y="120" width="96" height="22" rx="6" fill={P.active} />
          <text x="30" y="134.5" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.visor}>
            run_verification
          </text>

          {/* Wire 1 */}
          <line x1="128" y1="87" x2="156" y2="87" stroke={P.subtle} strokeWidth="2.5" strokeDasharray="3 3" strokeOpacity="0.45" />
          <motion.circle
            cy="87" r="4.5" fill={P.green}
            initial={{ cx: 128, opacity: 0 }}
            animate={play ? { cx: [128, 128, 156, 156], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
            transition={play ? loopT(LOOP, [0, T.typed, T.wire1, T.wire1 + 0.02], { ease: 'linear' }) : { duration: 0 }}
          />

          {/* 2. Semantic Model & Hardened Docker Build */}
          <rect x="156" y="30" width="92" height="114" rx="10" fill={P.card} stroke={P.ink} strokeOpacity="0.14" />
          <text x="202" y="48" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.subtle} letterSpacing="0.8">
            GEN 3 BUILD
          </text>
          <rect x="166" y="56" width="72" height="18" rx="5" fill={P.active} />
          <text x="202" y="68" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.ink} opacity="0.85">
            --network none
          </text>

          <rect x="166" y="84" width="72" height="7" rx="3.5" fill={P.ink} fillOpacity="0.15" />
          <motion.rect
            x="166" y="84" width="72" height="7" rx="3.5" fill={P.amber}
            style={{ transformBox: 'fill-box', transformOrigin: 'left' }}
            initial={{ scaleX: still ? 1 : 0 }}
            animate={play ? { scaleX: [0, 0, 1, 1, 0] } : { scaleX: 1 }}
            transition={play ? loopT(LOOP, [0, T.wire1, T.buildEnd, T.hold, 1], { ease: 'linear' }) : { duration: 0 }}
          />

          <motion.g
            initial={{ opacity: still ? 1 : 0.3 }}
            animate={play ? { opacity: [0.3, 0.3, 1, 1, 0.3] } : { opacity: 1 }}
            transition={play ? loopT(LOOP, [0, T.buildEnd - 0.02, T.buildEnd, T.hold, 1]) : { duration: 0 }}
          >
            <rect x="166" y="102" width="72" height="28" rx="6" fill={P.active} stroke={P.amber} strokeOpacity="0.55" />
            <text x="202" y="114.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.amber}>
              ROM + .SYM
            </text>
            <text x="202" y="125" textAnchor="middle" fontSize="7.5" fontFamily="ui-monospace, monospace" fill={P.subtle}>
              sha256 paired
            </text>
          </motion.g>

          {/* Wire 2 */}
          <line x1="248" y1="87" x2="274" y2="87" stroke={P.subtle} strokeWidth="2.5" strokeDasharray="3 3" strokeOpacity="0.45" />
          <motion.circle
            cy="87" r="4.5" fill={P.amber}
            initial={{ cx: 248, opacity: 0 }}
            animate={play ? { cx: [248, 248, 274, 274], opacity: [0, 1, 1, 0] } : { opacity: 0 }}
            transition={play ? loopT(LOOP, [0, T.buildEnd, T.wire2, T.wire2 + 0.02], { ease: 'linear' }) : { duration: 0 }}
          />

          {/* 3. Integrated mGBA + RAM Verification */}
          <rect x="274" y="18" width="112" height="138" rx="12" fill={P.card} stroke={P.ink} strokeOpacity="0.18" />
          <text x="330" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fontFamily="ui-monospace, monospace" fill={P.subtle} letterSpacing="0.8">
            MGBA · RAM
          </text>

          {/* Handheld screen */}
          <rect x="284" y="40" width="92" height="58" rx="5" fill="#0F172A" stroke={P.ink} strokeOpacity="0.14" />
          {/* Pixel tiles inside GBA screen */}
          {[0, 1, 2, 3].map((col) => (
            <rect key={col} x={294 + col * 19} y="50" width="13" height="13" rx="2" fill={col === 2 ? P.amber : P.visor} opacity={col === 2 ? 0.85 : 0.35} />
          ))}
          <rect x="294" y="70" width="72" height="6" rx="3" fill={P.ink} opacity="0.25" />
          <rect x="294" y="81" width="48" height="6" rx="3" fill={P.green} opacity="0.65" />

          {/* RAM scan line over screen */}
          <motion.line
            x1="286" x2="374" y1="44" y2="44" stroke={P.visor} strokeWidth="2"
            initial={{ y: 0, opacity: 0 }}
            animate={play ? { y: [0, 0, 50, 0, 0], opacity: [0, 1, 1, 0, 0] } : { opacity: 0 }}
            transition={play ? loopT(LOOP, [0, T.wire2, T.scanEnd, T.scanEnd + 0.02, 1], { ease: 'linear' }) : { duration: 0 }}
          />

          <text x="330" y="112" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill={P.subtle}>
            gBattleOutcome
          </text>

          {/* PROVEN badge */}
          <motion.g
            initial={still ? false : { opacity: 0, scale: 0.65 }}
            animate={play ? { opacity: [0, 0, 1, 1, 0], scale: [0.65, 0.65, 1, 1, 0.65] } : { opacity: 1, scale: 1 }}
            transition={play ? loopT(LOOP, [0, T.verdict, T.verdict + 0.05, T.hold, 1], { ease: [0.34, 1.56, 0.64, 1] }) : { duration: 0 }}
            style={{ transformOrigin: '330px 134px', transformBox: 'view-box' }}
          >
            <rect x="289" y="122" width="82" height="22" rx="11" fill={P.green} />
            <text x="330" y="136.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#0f172a">
              ✓ PROVEN
            </text>
          </motion.g>
        </svg>
      )}
    </SignaturePanel>
  );
}
