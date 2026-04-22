'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import { AudioLines, Brain, Database, Eye, ServerCog } from 'lucide-react';

const trackIcons = {
  ai: Brain,
  vision: Eye,
  data: Database,
  architecture: ServerCog,
  speech: AudioLines,
};

export default function TechnologyTracks() {
  const t = useTranslations('TechnologyTracks');

  const tracks = ['ai', 'vision', 'data', 'architecture', 'speech'].map((key) => ({
    key,
    title: t(`items.${key}.title`),
    description: t(`items.${key}.description`),
    focus: t(`items.${key}.focus`),
    stack: [0, 1, 2, 3].map((index) => t(`items.${key}.stack.${index}`)),
    outcomes: [0, 1, 2].map((index) => t(`items.${key}.outcomes.${index}`)),
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
        <span className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-3 block">
          {t('label')}
        </span>
        <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-white mb-5">
          {t('title.start')} <br />
          <span className="text-bubblegum italic">{t('title.highlight')}</span>
        </h2>
        <p className="text-lg leading-relaxed text-white/70">{t('intro')}</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {tracks.map((track, index) => {
          const Icon = trackIcons[track.key];

          return (
            <motion.div
              key={track.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card dark className="h-full !bg-ink/90 !border-white/10 overflow-hidden">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-bubblegum mb-3">{t('label')}</p>
                    <h3 className="font-display text-3xl font-bold text-white mb-3">{track.title}</h3>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-bubblegum">
                    <Icon size={26} />
                  </div>
                </div>

                <p className="text-white/75 text-lg leading-relaxed mb-4">{track.description}</p>
                <p className="text-sm uppercase tracking-[0.18em] text-white/45 mb-5">{track.focus}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {track.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 text-white/75">
                  {track.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bubblegum" />
                      <p className="leading-relaxed">{outcome}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
