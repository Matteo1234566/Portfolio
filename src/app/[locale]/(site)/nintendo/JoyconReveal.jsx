'use client';

import { motion, useReducedMotion } from 'framer-motion';

const SIZES = {
  md: {
    joycon: 'h-24 w-[2.6rem] sm:h-32 sm:w-[3.4rem] md:h-40 md:w-[4.3rem]',
    text: 'text-[1.85rem] sm:text-5xl md:text-[4.1rem]',
    gap: 'px-3 sm:px-5 md:px-6',
  },
  lg: {
    joycon: 'h-28 w-12 sm:h-40 sm:w-[4.3rem] md:h-56 md:w-24',
    text: 'text-4xl sm:text-6xl md:text-[5.6rem]',
    gap: 'px-3 sm:px-6 md:px-8',
  },
};

const ease = [0.22, 1, 0.36, 1];

// Joy-Con pair that snaps together, then slides apart to reveal the two text lines.
// `active` drives the open/closed state; `hovered` adds a playful extra spread.
export default function JoyconReveal({ active, hovered = false, top, bottom, size = 'md' }) {
  const reduceMotion = useReducedMotion();
  const s = SIZES[size];
  const state = reduceMotion || active ? (hovered && !reduceMotion ? 'hover' : 'open') : 'closed';

  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      initial={reduceMotion ? 'open' : 'closed'}
      animate={state}
      aria-hidden="true"
    >
      <Joycon side="left" className={s.joycon} reduceMotion={reduceMotion} />

      <motion.div
        className="relative overflow-hidden"
        variants={{
          closed: { width: 0, transition: { duration: 0.35, ease } },
          open: { width: 'auto', transition: { delay: 0.55, type: 'spring', stiffness: 70, damping: 15 } },
          hover: { width: 'auto' },
        }}
      >
        <div className={`whitespace-nowrap text-center ${s.gap}`}>
          <TextLine text={top} className={s.text} offset={0} />
          <TextLine text={bottom} className={s.text} offset={top.length} />
        </div>
        {/* Seam flash: the light that escapes when the Joy-Cons first split */}
        <motion.span
          className="pointer-events-none absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-white blur-[2px]"
          variants={{
            closed: { opacity: 0, scaleY: 0 },
            open: { opacity: [0, 1, 0], scaleY: [0, 1, 1], transition: { delay: 0.5, duration: 0.6 } },
            hover: { opacity: 0 },
          }}
        />
      </motion.div>

      <Joycon side="right" className={s.joycon} reduceMotion={reduceMotion} />
    </motion.div>
  );
}

function TextLine({ text, className, offset }) {
  return (
    <span className={`block overflow-hidden font-display font-bold uppercase leading-[0.92] tracking-tight text-white ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          variants={{
            closed: { y: '110%', rotate: 8, transition: { duration: 0.2 } },
            open: {
              y: '0%',
              rotate: 0,
              transition: { delay: 0.8 + (offset + i) * 0.035, type: 'spring', stiffness: 260, damping: 18 },
            },
            hover: { y: '0%', rotate: 0 },
          }}
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  );
}

function Joycon({ side, className, reduceMotion }) {
  const isLeft = side === 'left';
  const dir = isLeft ? -1 : 1;

  return (
    <motion.div
      className={`relative shrink-0 ${className}`}
      variants={{
        closed: { y: -36, opacity: 0, rotate: 0, x: 0, transition: { duration: 0.25 } },
        open: {
          y: 0,
          opacity: 1,
          x: 0,
          rotate: [0, 0, dir * 7, 0],
          transition: {
            y: { type: 'spring', stiffness: 320, damping: 16 },
            opacity: { duration: 0.2 },
            rotate: { duration: 1.1, times: [0, 0.5, 0.7, 1], ease: 'easeOut' },
          },
        },
        hover: {
          y: 0,
          opacity: 1,
          x: dir * 14,
          rotate: dir * 9,
          transition: { type: 'spring', stiffness: 260, damping: 14 },
        },
      }}
    >
      {/* Idle bob, out of phase between the two halves */}
      <motion.div
        className="h-full w-full"
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 0 : 1.3 }}
      >
        <svg viewBox="0 0 60 140" className="h-full w-full drop-shadow-[0_6px_0_rgba(15,23,42,0.35)]">
          <path
            d={isLeft
              ? 'M56 0 H30 A30 30 0 0 0 0 30 V110 A30 30 0 0 0 30 140 H56 A4 4 0 0 0 60 136 V4 A4 4 0 0 0 56 0 Z'
              : 'M4 0 H30 A30 30 0 0 1 60 30 V110 A30 30 0 0 1 30 140 H4 A4 4 0 0 1 0 136 V4 A4 4 0 0 1 4 0 Z'}
            fill="#fff"
          />
          {isLeft ? <LeftControls reduceMotion={reduceMotion} /> : <RightControls reduceMotion={reduceMotion} />}
        </svg>
      </motion.div>
    </motion.div>
  );
}

const RED = '#e60012';

function Stick({ cx, cy, reduceMotion }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="11" fill={RED} />
      <motion.circle
        cx={cx}
        cy={cy}
        r="6.5"
        fill="#fff"
        animate={reduceMotion ? undefined : { x: [0, 2.5, 0, -2.5, 0], y: [0, -2, 2, 0, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  );
}

function ButtonCross({ cx, cy, reduceMotion }) {
  const offsets = [[0, -9], [9, 0], [0, 9], [-9, 0]];
  return (
    <g>
      {offsets.map(([dx, dy], i) => (
        <motion.circle
          key={i}
          cx={cx + dx}
          cy={cy + dy}
          r="4"
          fill={RED}
          animate={reduceMotion ? undefined : { opacity: [1, 0.35, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2.5, delay: 1.6 + i * 0.15 }}
        />
      ))}
    </g>
  );
}

function LeftControls({ reduceMotion }) {
  return (
    <g>
      <rect x="40" y="12" width="9" height="3" rx="1.5" fill={RED} />
      <Stick cx={30} cy={44} reduceMotion={reduceMotion} />
      <ButtonCross cx={30} cy={88} reduceMotion={reduceMotion} />
      <rect x="35" y="116" width="8" height="8" rx="1.5" fill={RED} />
    </g>
  );
}

function RightControls({ reduceMotion }) {
  return (
    <g>
      <rect x="11" y="12" width="9" height="3" rx="1.5" fill={RED} />
      <rect x="14" y="9" width="3" height="9" rx="1.5" fill={RED} />
      <ButtonCross cx={30} cy={44} reduceMotion={reduceMotion} />
      <Stick cx={30} cy={88} reduceMotion={reduceMotion} />
      <circle cx="21" cy="120" r="4.5" fill={RED} />
    </g>
  );
}
