'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
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
          className="grid overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-hard dark:border-white/20 dark:bg-white/5 dark:shadow-hard-white sm:grid-cols-2"
        >
          {proof.map((item, index) => {
            const Icon = icons[index];

            return (
              <div
                key={item.label}
                className={`group relative p-6 transition-colors duration-300 hover:bg-bubblegum/5
                  ${index % 2 === 0 ? 'sm:border-r-2' : ''} ${index < 2 ? 'border-b-2' : index === 2 ? 'border-b-2 sm:border-b-0' : ''}
                  border-smoke/60 dark:border-white/10`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icon size={20} className="text-bubblegum transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
                  <p className="font-mono text-xs font-bold uppercase text-ink/55 dark:text-smoke/60">{item.label}</p>
                </div>
                <p className="mb-2 font-display text-3xl font-bold leading-tight text-ink dark:text-white">{item.value}</p>
                <p className="text-sm leading-relaxed text-ink/65 dark:text-smoke/70">{item.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-sm font-bold uppercase tracking-widest text-bubblegum"
        >
          {t('marketsLabel')}
        </motion.p>
        <motion.div
          className="relative grid gap-10 md:grid-cols-3 md:gap-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 origin-left bg-ink dark:bg-white/30"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease: 'circOut' } } }}
          />
          {markets.map((market, index) => (
            <motion.div
              key={market.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 + index * 0.12 } },
              }}
              className={`pt-6 md:px-8 ${index === 0 ? 'md:pl-0' : 'md:border-l-2 md:border-smoke/60 md:dark:border-white/10'} ${index === markets.length - 1 ? 'md:pr-0' : ''}`}
            >
              <span className="mb-3 block font-display text-5xl font-bold leading-none text-bubblegum/30">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-3 font-display text-2xl font-bold text-ink dark:text-white">{market.title}</h3>
              <p className="leading-relaxed text-ink/70 dark:text-smoke/75">{market.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
