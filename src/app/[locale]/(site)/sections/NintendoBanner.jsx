'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import JoyconReveal from '@/app/[locale]/(site)/nintendo/JoyconReveal';
import { NINTENDO_PROJECTS } from '@/app/[locale]/(site)/nintendo/nintendoProjects';

export default function NintendoBanner() {
  const t = useTranslations('Nintendo.banner');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.55 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12"
    >
      <Link
        href={`/${locale}/nintendo`}
        aria-label={t('aria')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="group relative block overflow-hidden rounded-2xl border-2 border-ink bg-nintendo shadow-hard transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-nintendo/40 dark:border-white/10"
      >
        <BannerBackdrop reduceMotion={reduceMotion} />

        <div className="relative flex flex-col items-center gap-8 px-5 py-10 md:px-10 md:py-12">
          <JoyconReveal active={inView} hovered={hovered} top={t('title_top')} bottom={t('title_bottom')} />
          <span className="sr-only">{`${t('title_top')} ${t('title_bottom')}`}</span>

          <div className="flex w-full flex-col items-center justify-between gap-4 text-white md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="rounded bg-white px-2 py-1 font-mono text-xs font-bold uppercase text-nintendo">
                {t('label')}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/75">
                {t('count', { count: NINTENDO_PROJECTS.length })}
              </span>
              <span className="hidden text-sm text-white/80 lg:inline">{t('description')}</span>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2 font-display text-sm font-bold uppercase tracking-wide text-ink shadow-hard transition-transform duration-200 group-hover:-translate-y-0.5">
              {t('cta')}
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function BannerBackdrop({ reduceMotion }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{ backgroundImage: 'radial-gradient(#fff 1.2px, transparent 1.2px)', backgroundSize: '22px 22px' }}
      />
      {/* Depth glows */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-nintendo-dark/70 blur-3xl" />
      {/* Concentric rings, echoing the existing hero decorations */}
      <div className="absolute -right-20 top-6 h-56 w-56 rounded-full border-[22px] border-white/10" />
      <div className="absolute -left-16 bottom-[-6rem] h-48 w-48 rounded-full border-[16px] border-ink/10" />
      {/* Light sweep on hover */}
      {!reduceMotion && (
        <div className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-none group-hover:left-[120%] group-hover:opacity-100 group-hover:transition-all group-hover:duration-1000" />
      )}
    </div>
  );
}
