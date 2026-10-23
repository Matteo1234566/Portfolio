'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { INTEREST_SCENES } from './InterestScenes';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 20 } },
};

// interests: [{ key, scene: keyof INTEREST_SCENES, icon: LucideIcon, title, description }]
export default function ProfileInterests({ title, subtitle, interests }) {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bubblegum/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]">{title}</h2>
          <p className="max-w-xl border-l-4 border-bubblegum pl-5 text-xl italic text-ink/70 dark:text-white/70">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-8 md:grid-cols-3"
        >
          {interests.map((interest) => (
            <InterestCard key={interest.key} interest={interest} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function InterestCard({ interest }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const SceneComponent = INTEREST_SCENES[interest.scene];
  const Icon = interest.icon;

  return (
    <motion.div ref={ref} variants={item} className="group h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-smoke/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bubblegum hover:shadow-2xl dark:border-white/10 dark:bg-ink/50 dark:hover:border-bubblegum">
        <div className="on-dark relative h-44 overflow-hidden border-b-2 border-ink bg-forest dark:border-white/10">
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}
          />
          <div className="absolute inset-0 p-4 transition-transform duration-500 group-hover:scale-105">
            <SceneComponent play={inView && !reduceMotion} label={interest.title} />
          </div>
        </div>

        <div className="flex flex-grow flex-col p-6">
          <div className="mb-3 flex items-center gap-3">
            <Icon size={20} className="text-accent transition-transform duration-300 group-hover:-rotate-12" aria-hidden="true" />
            <h3 className="font-display text-2xl font-bold text-ink transition-colors group-hover:text-bubblegum dark:text-white">
              {interest.title}
            </h3>
          </div>
          <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{interest.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
