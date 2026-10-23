'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { AudioLines, Brain, Eye, ServerCog } from 'lucide-react';

const trackIcons = {
  ai: Brain,
  vision: Eye,
  engineering: ServerCog,
  speech: AudioLines,
};

export default function TechnologyTracks() {
  const t = useTranslations('TechnologyTracks');

  const tracks = ['ai', 'vision', 'engineering', 'speech'].map((key) => ({
    key,
    tag: t(`items.${key}.tag`),
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    stack: [0, 1, 2, 3].map((index) => t(`items.${key}.stack.${index}`)),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mb-14"
      >
        <span className="text-accent font-bold tracking-widest uppercase text-sm mb-3 block">
          {t('label')}
        </span>
        <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-ink dark:text-white mb-5">
          {t('title.start')} <br />
          <span className="text-forest dark:text-bubblegum">{t('title.highlight')}</span>
        </h2>
        <p className="text-lg leading-relaxed text-ink/70 dark:text-white/70">{t('intro')}</p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        {tracks.map((track, index) => {
          const Icon = trackIcons[track.key];

          return (
            <motion.div
              key={track.key}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ type: 'spring', stiffness: 60, damping: 20, delay: index * 0.1 }}
              className="group h-full"
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-smoke/40 bg-white transition-all dark:border-white/10 dark:bg-ink/50 duration-300 hover:-translate-y-1 hover:border-bubblegum hover:shadow-2xl">
                <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-bubblegum/30 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

                <div className="mb-4 flex items-start justify-between p-6 pb-0">
                  <span className="rounded bg-green-100 px-2 py-1 font-mono text-xs font-bold uppercase text-forest dark:bg-forest/40 dark:text-green-300">
                    {track.tag}
                  </span>
                  <Icon size={22} className="text-ink/40 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110 group-hover:text-accent dark:text-white/40" aria-hidden="true" />
                </div>

                <h3 className="mb-4 px-6 font-display text-4xl font-bold text-ink transition-colors group-hover:text-accent dark:text-white">
                  {track.title}
                </h3>

                <p className="mb-8 flex-grow px-6 text-lg text-ink/80 dark:text-smoke/80">{track.description}</p>

                <div className="flex flex-wrap gap-2 border-t-2 border-smoke px-6 dark:border-white/10 pb-6 pt-6">
                  {track.stack.map((item) => (
                    <span key={item} className="cursor-default text-sm font-bold text-ink/70 transition-colors hover:text-accent dark:text-white/60">
                      #{item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
