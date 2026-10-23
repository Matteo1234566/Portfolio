'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import JoyconReveal from './JoyconReveal';
import { NINTENDO_PROJECTS } from './nintendoProjects';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 20 } },
};

export default function NintendoPageClient() {
  const t = useTranslations('Nintendo');
  const tp = useTranslations('Projects');
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-paper font-body text-ink transition-colors duration-300 dark:bg-ink dark:text-smoke">
      <section className="relative overflow-hidden bg-nintendo px-4 pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: 'radial-gradient(#fff 1.2px, transparent 1.2px)', backgroundSize: '24px 24px' }}
        />
        <div className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rounded-full border-[28px] border-white/15" />
        <div className="pointer-events-none absolute bottom-[-8rem] left-[-4rem] h-64 w-64 rounded-full border-[20px] border-ink/15" />
        <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-nintendo-dark/60 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href={`/${locale}?scrollTo=projects`}
              className="mb-8 inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-white transition-colors hover:underline"
            >
              {t('page.backHome')}
            </Link>
            <p className="mb-10 text-sm font-bold uppercase tracking-[0.2em] text-white">{t('page.label')}</p>
          </motion.div>

          <h1 className="sr-only">{`${t('banner.title_top')} ${t('banner.title_bottom')}`}</h1>
          <JoyconReveal active={active} top={t('banner.title_top')} bottom={t('banner.title_bottom')} size="lg" />

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mx-auto mt-12 max-w-2xl text-center text-lg leading-relaxed text-white md:text-xl"
          >
            {t('page.intro')}
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="font-display text-5xl font-bold leading-tight text-ink dark:text-white">
            {t('page.sectionTitle')}{' '}
            <span className="relative inline-block">
              <span className="relative z-10 px-2 text-white">{t('page.sectionHighlight')}</span>
              <motion.span
                className="absolute inset-0 bg-nintendo"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'circOut' }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70 dark:text-smoke/70">
            {t('banner.count', { count: NINTENDO_PROJECTS.length })}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 md:grid-cols-2"
        >
          {NINTENDO_PROJECTS.map((project) => {
            const title = tp(`items.${project.id}.title`);
            return (
              <NintendoProjectCard
                key={project.id}
                href={`/${locale}${project.link}`}
                title={title}
                category={tp(`items.${project.id}.category`)}
                description={tp(`items.${project.id}.description`)}
                techStack={Array.from({ length: project.techCount }, (_, i) => tp(`items.${project.id}.techStack.${i}`))}
                linkLabel={tp('view_case_study', { title })}
              />
            );
          })}
          <ComingSoonCard title={t('page.comingTitle')} description={t('page.comingDescription')} />
        </motion.div>

        <p className="mt-16 text-center text-xs text-ink/70 dark:text-smoke/70">{t('page.disclaimer')}</p>
      </section>
    </main>
  );
}

function NintendoProjectCard({ href, title, category, description, techStack, linkLabel }) {
  return (
    <motion.div variants={item} className="group h-full">
      <Link
        href={href}
        aria-label={linkLabel}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-smoke/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-nintendo hover:shadow-2xl dark:border-white/10 dark:bg-ink/50 dark:hover:border-nintendo"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 scale-100 rounded-full bg-nintendo/30 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
        <div className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-0 bg-nintendo transition-transform duration-500 group-hover:scale-x-100" />

        <div className="mb-4 flex items-start justify-between p-6 pb-0">
          <span className="rounded bg-nintendo/10 px-2 py-1 font-mono text-xs font-bold uppercase text-nintendo-dark dark:bg-nintendo/20 dark:text-red-300">
            {category}
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-ink/70 transition-colors group-hover:text-nintendo-dark dark:text-white/60 dark:group-hover:text-red-300">
            {linkLabel}
            <ArrowRight size={18} aria-hidden="true" />
          </span>
        </div>

        <h3 className="mb-4 px-6 font-display text-4xl font-bold text-ink transition-colors group-hover:text-nintendo-dark dark:text-white dark:group-hover:text-red-300">
          {title}
        </h3>

        <p className="mb-8 flex-grow px-6 text-lg text-ink/80 dark:text-smoke/80">{description}</p>

        <div className="flex flex-wrap gap-2 border-t-2 border-smoke px-6 pb-6 pt-6 dark:border-white/10">
          {techStack.map((tech) => (
            <span key={tech} className="cursor-default text-sm font-bold text-ink/70 transition-colors hover:text-nintendo dark:text-white/60">
              #{tech}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

function ComingSoonCard({ title, description }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      variants={item}
      className="flex h-full min-h-[18rem] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-nintendo/40 px-6 py-12 text-center md:col-span-2"
    >
      <div className="mb-5 flex gap-2" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-3 w-3 rounded-full bg-nintendo"
            animate={reduceMotion ? undefined : { y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <h3 className="font-display text-3xl font-bold text-ink dark:text-white">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-ink/65 dark:text-smoke/65">{description}</p>
    </motion.div>
  );
}
