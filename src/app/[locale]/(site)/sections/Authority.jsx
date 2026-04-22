'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import { Building2, GraduationCap, Rocket, Telescope } from 'lucide-react';

const icons = [GraduationCap, Rocket, Telescope, Building2];

export default function Authority() {
  const t = useTranslations('Authority');

  const proof = [
    {
      value: t('proof.0.value'),
      label: t('proof.0.label'),
      description: t('proof.0.description'),
    },
    {
      value: t('proof.1.value'),
      label: t('proof.1.label'),
      description: t('proof.1.description'),
    },
    {
      value: t('proof.2.value'),
      label: t('proof.2.label'),
      description: t('proof.2.description'),
    },
    {
      value: t('proof.3.value'),
      label: t('proof.3.label'),
      description: t('proof.3.description'),
    },
  ];

  const markets = [
    {
      title: t('markets.0.title'),
      description: t('markets.0.description'),
    },
    {
      title: t('markets.1.title'),
      description: t('markets.1.description'),
    },
    {
      title: t('markets.2.title'),
      description: t('markets.2.description'),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-3 block">
            {t('label')}
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-ink dark:text-white mb-6">
            {t('title.start')} <br />
            <span className="text-forest dark:text-bubblegum">{t('title.highlight')}</span>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-ink/75 dark:text-smoke/80 max-w-3xl">
            <p>{t('story.0')}</p>
            <p>{t('story.1')}</p>
            <p>{t('story.2')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {proof.map((item, index) => {
            const Icon = icons[index];

            return (
              <Card
                key={item.label}
                className="h-full border-ink/10 dark:border-white/10 bg-white/90 dark:bg-white/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-bubblegum/15 text-bubblegum">
                  <Icon size={24} />
                </div>
                <p className="font-display text-3xl font-bold text-ink dark:text-white mb-1">{item.value}</p>
                <p className="font-bold uppercase tracking-wider text-xs text-forest dark:text-bubblegum mb-3">
                  {item.label}
                </p>
                <p className="text-sm leading-relaxed text-ink/65 dark:text-smoke/75">{item.description}</p>
              </Card>
            );
          })}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {markets.map((market) => (
          <Card
            key={market.title}
            className="h-full border-ink/10 dark:border-white/10 bg-paper dark:bg-ink"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bubblegum mb-3">{t('marketsLabel')}</p>
            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-3">{market.title}</h3>
            <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{market.description}</p>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
