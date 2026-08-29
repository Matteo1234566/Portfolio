'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrendingRepo() {
  const locale = useLocale();
  const t = useTranslations('TrendingRepo');

  return (
    <div className="mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-forest p-6 text-white shadow-hard dark:border-white md:p-10"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border-[24px] border-bubblegum/20" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full border-[18px] border-white/10" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-bubblegum">
              <Github size={24} strokeWidth={2.5} aria-hidden="true" />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">{t('label')}</span>
            </div>
            <h2 className="mb-5 max-w-2xl font-display text-5xl font-bold leading-[0.95] md:text-7xl">
              {t('title.start')} <span className="text-bubblegum italic">{t('title.highlight')}</span>
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{t('intro')}</p>
          </div>

          <Link
            href={`/${locale}/trending-repo`}
            className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full border-2 border-ink bg-bubblegum px-6 py-3 font-display font-bold uppercase tracking-wide text-ink shadow-hard-white transition-all duration-200 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-bubblegum focus:ring-offset-2 focus:ring-offset-forest"
          >
            {t('cta')}
            <ArrowUpRight size={20} className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
