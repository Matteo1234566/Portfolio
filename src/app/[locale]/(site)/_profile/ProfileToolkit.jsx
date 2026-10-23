'use client';

import { motion, useReducedMotion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 20 } },
};

// groups: [{ key, icon: LucideIcon, title, description, tech?: [{ icons: [ReactIcon], label }], list?: [string] }]
export default function ProfileToolkit({ label, title, groups }) {
  const reduceMotion = useReducedMotion();
  const marquee = groups.flatMap((group) => group.tech ?? []);

  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block">{label}</span>
          <h2 className="font-display text-5xl md:text-7xl font-bold">{title}</h2>
        </motion.div>
      </div>

      {/* Infinite logo strip with every tool listed in the cards below */}
      <div className="relative mb-14 -mx-4 border-y-2 border-ink bg-forest py-4 dark:border-white/10" aria-hidden="true">
        <motion.div
          className="flex w-max gap-10"
          animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[...marquee, ...marquee].map((tech, i) => (
            <span key={`${tech.label}-${i}`} className="flex shrink-0 items-center gap-3 font-display text-xl font-bold uppercase tracking-wide text-white/85">
              <span className="flex gap-1.5 text-bubblegum">
                {tech.icons.map((Icon, j) => <Icon key={j} className="h-5 w-5" />)}
              </span>
              {tech.label}
              <span className="ml-6 h-1.5 w-1.5 rounded-full bg-white/30" />
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3"
      >
        {groups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.div key={group.key} variants={item} className="group h-full">
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-smoke/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bubblegum hover:shadow-2xl dark:border-white/10 dark:bg-ink/50 dark:hover:border-bubblegum">
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-bubblegum/30 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

                <div className="mb-4 flex items-start justify-between p-6 pb-0">
                  <span className="rounded bg-green-100 px-2 py-1 font-mono text-xs font-bold uppercase text-forest dark:bg-forest/20 dark:text-green-300">
                    {String(index + 1).padStart(2, '0')} / {String(groups.length).padStart(2, '0')}
                  </span>
                  <Icon size={24} className="text-ink/40 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-bubblegum dark:text-white/40" aria-hidden="true" />
                </div>

                <h3 className="mb-3 px-6 font-display text-3xl font-bold text-ink transition-colors group-hover:text-bubblegum dark:text-white">
                  {group.title}
                </h3>
                <p className="mb-6 flex-grow px-6 text-ink/70 dark:text-smoke/75">{group.description}</p>

                <div className="border-t-2 border-smoke px-6 pb-6 pt-5 dark:border-white/10">
                  {group.tech && (
                    <ul className="flex flex-wrap gap-2">
                      {group.tech.map((tech) => (
                        <li
                          key={tech.label}
                          className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 px-3 py-1.5 text-sm font-bold text-ink/80 transition-colors hover:border-bubblegum hover:text-bubblegum dark:border-white/10 dark:text-white/80"
                        >
                          {tech.icons.map((TechIcon, j) => <TechIcon key={j} className="h-4 w-4" aria-hidden="true" />)}
                          {tech.label}
                        </li>
                      ))}
                    </ul>
                  )}
                  {group.list && (
                    <ol className="space-y-3">
                      {group.list.map((entry, i) => (
                        <li key={entry} className="flex items-start gap-3 text-sm font-bold text-ink/80 dark:text-white/80">
                          <span className="font-mono text-bubblegum">{String(i + 1).padStart(2, '0')}</span>
                          {entry}
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
