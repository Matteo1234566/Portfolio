'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Live rack for the hero: one unit per hardware category, sized by the selected tier (1U/2U/3U).
// Units slide in bottom-up on first view; changing a tier in the configurator resizes the unit and flashes it.
const ORDER = ['switch', 'miniPc', 'nas', 'storage', 'ups'];
const U_BY_TIER = { basic: 1, standard: 2, pro: 3 };
const U_PX = 26;
const RACK_U = 15; // every category at "pro" fits exactly

const LED = { green: '#4ade80', indigo: '#a5b4fc', amber: '#fbbf24' };

function Leds({ count, play, color = LED.green, seed = 0 }) {
  return (
    <span className="flex gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
          animate={play ? { opacity: [1, 0.25, 1, 1] } : undefined}
          transition={{ duration: 0.9 + ((i + seed) % 3) * 0.35, repeat: Infinity, delay: ((i * 7 + seed * 3) % 10) / 10 }}
        />
      ))}
    </span>
  );
}

function UnitFace({ id, u, play }) {
  if (id === 'switch') {
    const ports = 8 * u;
    return (
      <span className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(ports, 12)}, minmax(0, 1fr))` }}>
        {Array.from({ length: ports }, (_, i) => (
          <motion.span
            key={i}
            className="h-2 w-2.5 rounded-[2px] bg-slate-900"
            animate={play ? { backgroundColor: ['#0f172a', LED.green, '#0f172a'] } : undefined}
            transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1.6, delay: (i % 12) * 0.12 + Math.floor(i / 12) * 0.06 }}
          />
        ))}
      </span>
    );
  }
  if (id === 'nas' || id === 'storage') {
    const bays = (id === 'nas' ? 3 : 4) * u;
    return (
      <span className="flex flex-wrap justify-end gap-1" style={{ maxWidth: 140 }}>
        {Array.from({ length: bays }, (_, i) => (
          <span key={i} className="relative h-4 w-3 rounded-[3px] border border-white/15 bg-slate-800">
            <motion.span
              className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: id === 'nas' ? LED.indigo : LED.green }}
              animate={play ? { opacity: [0.2, 1, 0.2] } : undefined}
              transition={{ duration: 0.35, repeat: Infinity, repeatDelay: 0.4 + ((i * 5) % 7) * 0.2, delay: (i % 4) * 0.15 }}
            />
          </span>
        ))}
      </span>
    );
  }
  if (id === 'ups') {
    return (
      <span className="flex items-center gap-2">
        <span className="relative h-3 w-20 overflow-hidden rounded-full border border-white/20 bg-slate-900">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: LED.amber }}
            initial={{ width: '100%' }}
            animate={play ? { width: ['35%', '100%', '100%'] } : { width: '100%' }}
            transition={{ duration: 3, times: [0, 0.7, 1], repeat: Infinity, ease: 'easeOut' }}
          />
        </span>
        <Leds count={u} play={play} color={LED.amber} seed={4} />
      </span>
    );
  }
  // miniPc: vents + power LED
  return (
    <span className="flex items-center gap-3">
      <span className="flex gap-1">
        {Array.from({ length: 4 + u * 2 }, (_, i) => <span key={i} className="h-3 w-0.5 rounded bg-white/20" />)}
      </span>
      <Leds count={u} play={play} color={LED.indigo} seed={2} />
    </span>
  );
}

export default function HomelabRack({ selection, labelFor, tierLabelFor }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });
  const visible = inView || reduceMotion;
  const play = inView && !reduceMotion;
  const usedU = ORDER.reduce((sum, id) => sum + U_BY_TIER[selection[id]], 0);

  return (
    <div
      ref={ref}
      className="on-dark relative rounded-[1.75rem] border-2 border-ink bg-ink p-3 shadow-hard dark:border-white/20 dark:shadow-hard-white"
      aria-hidden="true"
    >
      {/* rails with mounting holes */}
      <div className="pointer-events-none absolute inset-y-3 left-3 w-3 rounded bg-slate-800" style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1.5px, transparent 2px)', backgroundSize: `12px ${U_PX / 2}px` }} />
      <div className="pointer-events-none absolute inset-y-3 right-3 w-3 rounded bg-slate-800" style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1.5px, transparent 2px)', backgroundSize: `12px ${U_PX / 2}px` }} />

      <div className="relative mx-5 flex flex-col justify-end gap-1" style={{ height: RACK_U * U_PX + 4 * 4 }}>
        {/* empty slots behind the units */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end gap-px">
          {Array.from({ length: RACK_U }, (_, i) => <span key={i} className="flex-1 rounded-sm bg-white/[0.03]" />)}
        </div>

        {ORDER.map((id, index) => {
          const u = U_BY_TIER[selection[id]];
          return (
            <motion.div
              key={id}
              layout={!reduceMotion}
              className="relative z-10 flex items-center justify-between gap-3 overflow-hidden rounded-md border border-white/10 bg-gradient-to-b from-slate-600 to-slate-700 px-3"
              style={{ height: u * U_PX }}
              initial={reduceMotion ? false : { opacity: 0, x: 60 }}
              animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{
                opacity: { duration: 0.3, delay: (ORDER.length - 1 - index) * 0.18 },
                x: { type: 'spring', stiffness: 160, damping: 18, delay: (ORDER.length - 1 - index) * 0.18 },
                layout: { type: 'spring', stiffness: 260, damping: 26 },
              }}
            >
              {/* flash when the tier changes */}
              <motion.span
                key={selection[id]}
                className="pointer-events-none absolute inset-0 bg-indigo-300"
                initial={{ opacity: reduceMotion || !inView ? 0 : 0.45 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative min-w-0 font-mono text-[10px] font-bold uppercase leading-tight tracking-wider text-white/85">
                <span className="block truncate">{labelFor(id)}</span>
                {u > 1 && <span className="block text-indigo-200">{tierLabelFor(id)} · {u}U</span>}
              </span>
              <span className="relative shrink-0">
                <UnitFace id={id} u={u} play={play} />
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mx-5 mt-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-white/70">
        <span>{usedU}U / {RACK_U}U</span>
        <span className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-green-400"
            animate={play ? { opacity: [1, 0.3, 1] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          online
        </span>
      </div>
    </div>
  );
}
