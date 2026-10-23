'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Small looping SVG scenes for the "Beyond the code" cards. All share a 200x120 viewBox
// and receive `play` (false when reduced motion is on or the card is off screen).

const ACCENT = '#6366f1';
const SOFT = '#a5b4fc';
const WHITE = '#f8fafc';

const loop = (play, keyframes, transition) =>
  play ? { animate: keyframes, transition: { repeat: Infinity, ...transition } } : {};

function Scene({ children, label }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* ---------- Simone ---------- */

export function MusicScene({ play, label }) {
  const keys = Array.from({ length: 7 }, (_, i) => i);
  const blacks = [0, 1, 3, 4, 5];
  return (
    <Scene label={label}>
      {/* sketch line: the illustrator side */}
      <motion.path
        d="M18 42 C 30 18, 46 52, 58 30 S 80 20, 86 36"
        fill="none"
        stroke={SOFT}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: play ? 0 : 1 }}
        {...loop(play, { pathLength: [0, 1, 1, 0] }, { duration: 4, times: [0, 0.45, 0.8, 1], ease: 'easeInOut' })}
      />
      {keys.map((i) => (
        <motion.rect
          key={i}
          x={42 + i * 17}
          y={62}
          width={16}
          height={46}
          rx={2}
          fill={WHITE}
          {...loop(play, { fill: [WHITE, ACCENT, WHITE], y: [0, 2, 0] }, { duration: 0.5, delay: [0, 2, 4, 1, 5, 3, 6][i] * 0.35, repeatDelay: 2 })}
        />
      ))}
      {blacks.map((i) => (
        <rect key={`b${i}`} x={53 + i * 17} y={62} width={10} height={28} rx={1.5} fill="#0f172a" />
      ))}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={`n${i}`}
          initial={{ opacity: play ? 0 : 1, x: 120 + i * 22, y: 40 }}
          {...loop(play, { opacity: [0, 1, 0], y: [52, 14], x: [120 + i * 22, 128 + i * 22] }, { duration: 2.4, delay: i * 0.8, ease: 'easeOut' })}
        >
          <ellipse cx="0" cy="8" rx="5" ry="4" fill={i === 1 ? ACCENT : WHITE} />
          <rect x="4" y="-10" width="2" height="18" fill={i === 1 ? ACCENT : WHITE} />
        </motion.g>
      ))}
    </Scene>
  );
}

export function SportScene({ play, label }) {
  return (
    <Scene label={label}>
      <line x1="10" y1="108" x2="190" y2="108" stroke={WHITE} strokeOpacity="0.25" strokeWidth="2" />
      {/* padel racket */}
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        {...loop(play, { rotate: [-20, 25, -20] }, { duration: 1.2, ease: 'easeInOut' })}
      >
        <rect x="27" y="74" width="6" height="28" rx="3" fill={SOFT} />
        <ellipse cx="30" cy="56" rx="16" ry="20" fill="none" stroke={SOFT} strokeWidth="4" />
        {[50, 56, 62].map((cy) => <circle key={cy} cx="30" cy={cy} r="1.6" fill={SOFT} />)}
      </motion.g>
      {/* ball */}
      <motion.ellipse
        cx="0" cy="0" rx="7" ry="7" fill="#d9f99d"
        initial={{ x: 80, y: 100 }}
        {...loop(play, { x: [60, 85, 110], y: [40, 100, 40], scaleY: [1, 0.7, 1] }, { duration: 1.2, ease: ['easeIn', 'easeOut'], repeatType: 'reverse' })}
      />
      <motion.ellipse
        cy="109" rx="9" ry="2" fill="#0f172a" opacity="0.5"
        initial={{ cx: 85 }}
        {...loop(play, { cx: [60, 85, 110], scaleX: [0.5, 1.2, 0.5] }, { duration: 1.2, ease: ['easeIn', 'easeOut'], repeatType: 'reverse' })}
      />
      {/* barbell */}
      <motion.g
        initial={{ y: 0 }}
        {...loop(play, { y: [0, -26, -26, 0] }, { duration: 2, times: [0, 0.35, 0.65, 1], ease: 'easeInOut' })}
      >
        <rect x="130" y="88" width="56" height="4" rx="2" fill={WHITE} />
        <rect x="134" y="78" width="8" height="24" rx="2" fill={ACCENT} />
        <rect x="174" y="78" width="8" height="24" rx="2" fill={ACCENT} />
      </motion.g>
    </Scene>
  );
}

const KANJI = ['学', '日', '本', '語', '猫', '夢'];
const CUBE = ['#ef4444', '#f8fafc', '#facc15', '#22c55e', '#3b82f6', '#f97316'];

export function LearningScene({ play, label }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!play) return undefined;
    const timer = setInterval(() => setIndex((i) => (i + 1) % KANJI.length), 1400);
    return () => clearInterval(timer);
  }, [play]);

  return (
    <Scene label={label}>
      <motion.g
        {...loop(play, { rotate: [0, 0, 90, 90] }, { duration: 3, times: [0, 0.6, 0.8, 1], ease: 'easeInOut' })}
      >
        <rect x="26" y="26" width="68" height="68" rx="8" fill="#0f172a" />
        {Array.from({ length: 9 }, (_, i) => (
          <motion.rect
            key={i}
            x={30 + (i % 3) * 21.5}
            y={30 + Math.floor(i / 3) * 21.5}
            width="18.5"
            height="18.5"
            rx="3"
            fill={CUBE[i % CUBE.length]}
            {...loop(play, { fill: [CUBE[i % 6], CUBE[(i + 2) % 6], CUBE[(i + 4) % 6], CUBE[i % 6]] }, { duration: 6, delay: (i % 3) * 0.15, ease: 'linear' })}
          />
        ))}
      </motion.g>
      <rect x="116" y="26" width="68" height="68" rx="10" fill="none" stroke={SOFT} strokeWidth="2" strokeDasharray="4 4" />
      <AnimatePresence mode="wait">
        <motion.text
          key={KANJI[index]}
          x="150"
          y="76"
          textAnchor="middle"
          fontSize="44"
          fontWeight="700"
          fill={WHITE}
          initial={play ? { opacity: 0, y: 10 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {KANJI[index]}
        </motion.text>
      </AnimatePresence>
    </Scene>
  );
}

/* ---------- Matteo ---------- */

// Quadratic bezier sampled into keyframes so the plane follows the dashed route.
const P0 = [30, 92];
const P1 = [100, -10];
const P2 = [170, 50];
const route = Array.from({ length: 13 }, (_, i) => {
  const t = i / 12;
  const x = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t ** 2 * P2[0];
  const y = (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t ** 2 * P2[1];
  const dx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
  const dy = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
  return { x, y, r: (Math.atan2(dy, dx) * 180) / Math.PI };
});

function Pin({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 0 C -7 -8 -7 -18 0 -18 C 7 -18 7 -8 0 0 Z" fill={color} />
      <circle cx="0" cy="-12" r="2.5" fill="#1e1b4b" />
    </g>
  );
}

export function TravelScene({ play, label }) {
  return (
    <Scene label={label}>
      <circle cx="100" cy="150" r="90" fill={WHITE} opacity="0.06" />
      <path d={`M${P0} Q${P1} ${P2}`} fill="none" stroke={SOFT} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="5 6" />
      <motion.path
        d={`M${P0} Q${P1} ${P2}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: play ? 0 : 1 }}
        {...loop(play, { pathLength: [0, 1, 1] }, { duration: 3.2, times: [0, 0.8, 1], ease: 'easeInOut' })}
      />
      <Pin x={P0[0]} y={P0[1] + 2} color={SOFT} />
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        {...loop(play, { scale: [1, 1, 1.25, 1] }, { duration: 3.2, times: [0, 0.78, 0.86, 1] })}
      >
        <Pin x={P2[0]} y={P2[1] + 2} color={ACCENT} />
      </motion.g>
      <motion.g
        initial={{ x: P2[0], y: P2[1], rotate: route[12].r }}
        {...loop(
          play,
          { x: route.map((p) => p.x), y: route.map((p) => p.y), rotate: route.map((p) => p.r), opacity: [0, ...Array(11).fill(1), 0] },
          { duration: 3.2 * 0.8, repeatDelay: 3.2 * 0.2, ease: 'linear' }
        )}
      >
        <path d="M10 0 L-6 -3 L-10 -10 L-13 -10 L-10 -2 L-14 -1 L-16 -5 L-18 -5 L-16 0 L-18 5 L-16 5 L-14 1 L-10 2 L-13 10 L-10 10 L-6 3 Z" fill={WHITE} />
      </motion.g>
    </Scene>
  );
}

export function CinemaScene({ play, label }) {
  const frames = Array.from({ length: 8 }, (_, i) => i);
  return (
    <Scene label={label}>
      <motion.g
        initial={{ x: 0 }}
        {...loop(play, { x: [0, -40] }, { duration: 1.2, ease: 'linear' })}
      >
        <rect x="-10" y="22" width="260" height="56" fill="#0f172a" />
        {frames.map((i) => (
          <g key={i}>
            <rect x={i * 40} y="32" width="32" height="36" rx="3" fill={i % 2 ? SOFT : ACCENT} opacity={i % 2 ? 0.35 : 0.6} />
            {[0, 1, 2, 3].map((h) => (
              <g key={h}>
                <rect x={i * 40 + h * 10 - 2} y="25" width="5" height="4" rx="1" fill={WHITE} opacity="0.7" />
                <rect x={i * 40 + h * 10 - 2} y="71" width="5" height="4" rx="1" fill={WHITE} opacity="0.7" />
              </g>
            ))}
          </g>
        ))}
      </motion.g>
      {/* clapperboard */}
      <g transform="translate(138 82)">
        <rect x="0" y="10" width="46" height="28" rx="3" fill={WHITE} />
        <rect x="6" y="18" width="34" height="3" rx="1.5" fill="#0f172a" opacity="0.4" />
        <rect x="6" y="26" width="22" height="3" rx="1.5" fill="#0f172a" opacity="0.4" />
        <motion.g
          style={{ originX: 0, originY: 1 }}
          initial={{ rotate: 0 }}
          {...loop(play, { rotate: [0, -24, -24, 0, 0] }, { duration: 1.8, times: [0, 0.2, 0.55, 0.62, 1], ease: 'easeInOut' })}
        >
          <rect x="0" y="2" width="46" height="8" rx="2" fill="#0f172a" />
          {[4, 16, 28, 40].map((x) => <path key={x} d={`M${x} 2 L${x + 6} 2 L${x + 2} 10 L${x - 4} 10 Z`} fill={WHITE} />)}
        </motion.g>
      </g>
    </Scene>
  );
}

export function CuriosityScene({ play, label }) {
  return (
    <Scene label={label}>
      <motion.circle
        cx="100" cy="52" r="34" fill="#facc15"
        initial={{ opacity: 0.15 }}
        {...loop(play, { opacity: [0.08, 0.3, 0.08], scale: [0.9, 1.1, 0.9] }, { duration: 2.4, ease: 'easeInOut' })}
      />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <motion.line
            key={i}
            x1={Math.round(100 + Math.cos(a) * 30)} y1={Math.round(52 + Math.sin(a) * 30)}
            x2={Math.round(100 + Math.cos(a) * 40)} y2={Math.round(52 + Math.sin(a) * 40)}
            stroke="#facc15" strokeWidth="3" strokeLinecap="round"
            initial={{ opacity: 0.6 }}
            {...loop(play, { opacity: [0, 1, 0] }, { duration: 2.4, delay: i * 0.1 })}
          />
        );
      })}
      <path d="M100 30 a20 20 0 0 1 12 36 v8 h-24 v-8 a20 20 0 0 1 12 -36 Z" fill={WHITE} />
      <path d="M94 56 l3 -6 l3 6 l3 -6 l3 6" fill="none" stroke="#facc15" strokeWidth="2" strokeLinejoin="round" />
      <rect x="89" y="76" width="22" height="5" rx="2" fill={SOFT} />
      <rect x="92" y="83" width="16" height="5" rx="2" fill={SOFT} />
      {/* orbiting ideas */}
      <g transform="translate(100 56)">
        <motion.g initial={{ rotate: 0 }} {...loop(play, { rotate: 360 }, { duration: 8, ease: 'linear' })}>
          {/* invisible ring keeps the group's box centred on the bulb, so it rotates around it */}
          <circle r="54" fill="none" />
          <circle cx="0" cy="-48" r="5" fill={ACCENT} />
          <rect x="44" y="-4" width="9" height="9" rx="2" fill={SOFT} />
          <path d="M-52 4 l6 -10 l6 10 Z" fill={WHITE} opacity="0.8" />
        </motion.g>
      </g>
    </Scene>
  );
}

export const INTEREST_SCENES = {
  music: MusicScene,
  sport: SportScene,
  learning: LearningScene,
  travel: TravelScene,
  cinema: CinemaScene,
  curiosity: CuriosityScene,
};
