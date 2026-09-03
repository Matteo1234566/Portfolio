'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Dices,
  Gauge,
  Github,
  Lock,
  ShieldCheck,
  Sparkles,
  Swords,
  Trophy,
  Users,
} from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import FishertigerSchema from './FishertigerSchema';

const REPO_URL = 'https://github.com/Zannael/fishertiger';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 55, damping: 18 },
  },
};

export default function FishertigerPageClient() {
  const t = useTranslations('Fishertiger');
  const reduceMotion = useReducedMotion();

  const capabilities = [
    { id: 'projections', icon: Gauge },
    { id: 'auction', icon: Swords },
    { id: 'goalkeepers', icon: ShieldCheck },
    { id: 'simulation', icon: Dices },
  ];

  const modelPoints = [0, 1, 2, 3].map((index) => t(`model.points.${index}`));
  const privacyPoints = [0, 1, 2].map((index) => t(`privacy.points.${index}`));
  const faq = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.${index}.question`),
    answer: t(`faq.${index}.answer`),
  }));

  return (
    <main className="min-h-screen bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300 pt-32 pb-24 overflow-x-hidden">
      <FishertigerSchema />

      <section className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
              <Trophy size={14} className={reduceMotion ? '' : 'animate-pulse'} aria-hidden="true" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white lowercase">
              fishertiger
            </h1>

            <p className="text-2xl md:text-3xl font-display font-bold mb-6 text-bubblegum">
              {t('tagline')}
            </p>

            <p className="text-xl leading-relaxed max-w-2xl mb-8 text-ink/75 dark:text-smoke/80">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-3 mb-9">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className="rounded-full border border-ink/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 dark:text-smoke/70"
                >
                  {t(`chips.${index}`)}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Button className="px-7 py-4 text-base gap-2">
                  <Github size={18} aria-hidden="true" />
                  {t('cta_repo')}
                </Button>
              </a>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-display font-bold uppercase tracking-wide transition-all duration-200 bg-white dark:bg-white/10 text-ink dark:text-white hover:bg-gray-50 dark:hover:bg-white/20 shadow-soft border-2 border-transparent hover:border-ink dark:hover:border-white focus:outline-none focus:ring-2 focus:ring-bubblegum"
              >
                {t('secondaryCta')}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-forest/20 dark:border-white/10 bg-white/75 dark:bg-ink/60 backdrop-blur-xl">
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-bubblegum/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full bg-forest/20 dark:bg-white/10 blur-3xl" />
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.22em] font-bold text-ink/50 dark:text-smoke/60">
                  {t('visual.label')}
                </p>

                <div className="rounded-2xl border-2 border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-5">
                  <p className="font-display text-2xl font-bold mb-2 text-ink dark:text-white">{t('visual.pipeline.title')}</p>
                  <p className="text-ink/65 dark:text-smoke/70">{t('visual.pipeline.desc')}</p>
                </div>

                <div className="rounded-2xl border-2 border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-5">
                  <p className="font-display text-2xl font-bold mb-2 text-ink dark:text-white">{t('visual.auction.title')}</p>
                  <p className="text-ink/65 dark:text-smoke/70">{t('visual.auction.desc')}</p>
                </div>

                <div className="rounded-2xl border-2 border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-5">
                  <p className="font-display text-2xl font-bold mb-2 text-ink dark:text-white">{t('visual.simulation.title')}</p>
                  <p className="text-ink/65 dark:text-smoke/70">{t('visual.simulation.desc')}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section id="capabilities" className="max-w-6xl mx-auto px-4 mt-24 scroll-mt-28">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3 text-bubblegum">{t('capabilitiesLabel')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-ink dark:text-white">{t('capabilitiesTitle')}</h2>
          <p className="text-lg leading-relaxed text-ink/65 dark:text-smoke/70">{t('capabilitiesSubtitle')}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {capabilities.map((entry) => {
            const Icon = entry.icon;
            return (
              <motion.div key={entry.id} variants={reduceMotion ? undefined : item}>
                <Card className="h-full bg-white/80 dark:bg-ink/60 border-ink/10 dark:border-white/10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-forest text-white dark:bg-white/10 dark:text-bubblegum">
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-ink dark:text-white">
                    {t(`capabilities.${entry.id}.title`)}
                  </h3>
                  <p className="leading-relaxed text-ink/65 dark:text-smoke/70">
                    {t(`capabilities.${entry.id}.desc`)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="h-full bg-white/80 dark:bg-ink/60 border-ink/10 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4 text-bubblegum">
            <Users size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('model.label')}</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-ink dark:text-white">{t('model.title')}</h2>
          <p className="leading-relaxed mb-5 text-ink/65 dark:text-smoke/70">{t('model.description')}</p>
          <ul className="space-y-3">
            {modelPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-white/5 p-4">
                <Sparkles size={16} className="mt-1 shrink-0 text-bubblegum" aria-hidden="true" />
                <span className="leading-relaxed text-ink/70 dark:text-smoke/75">{point}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="h-full bg-white/80 dark:bg-ink/60 border-ink/10 dark:border-white/10">
          <div className="flex items-center gap-3 mb-4 text-bubblegum">
            <Lock size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('privacy.label')}</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-ink dark:text-white">{t('privacy.title')}</h2>
          <p className="leading-relaxed mb-5 text-ink/65 dark:text-smoke/70">{t('privacy.description')}</p>
          <ul className="space-y-3">
            {privacyPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-xl border border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-white/5 p-4">
                <ShieldCheck size={16} className="mt-1 shrink-0 text-bubblegum" aria-hidden="true" />
                <span className="leading-relaxed text-ink/70 dark:text-smoke/75">{point}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-16">
        <Card className="p-8 md:p-10 bg-white/80 dark:bg-ink/60 border-ink/10 dark:border-white/10">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3 text-bubblegum">{t('faqLabel')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-ink dark:text-white">{t('faqTitle')}</h2>
            <p className="text-lg leading-relaxed text-ink/65 dark:text-smoke/70">{t('faqSubtitle')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((entry) => (
              <div key={entry.question} className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-white/5 p-5">
                <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-ink dark:text-white">{entry.question}</h3>
                <p className="leading-relaxed text-ink/65 dark:text-smoke/70">{entry.answer}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 border-ink dark:border-white/15 p-8 md:p-10 bg-forest text-white"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('footer.title')}</h2>
          <p className="text-lg max-w-3xl text-white/85">{t('footer.desc')}</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-wide mt-6 text-sm hover:opacity-80 transition-opacity"
          >
            <Github size={16} aria-hidden="true" />
            {t('footer.link')}
          </a>
        </motion.div>
      </section>
    </main>
  );
}
