'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  BrainCircuit,
  Camera,
  ChartNoAxesCombined,
  CircleAlert,
  Database,
  FileSearch,
  LockKeyhole,
  Radar,
  Scale,
  Search,
  ServerCog,
} from 'lucide-react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import TargageInteractiveDemo from './TargageInteractiveDemo';
import TargageSchema from './TargageSchema';

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

export default function TargagePage() {
  const t = useTranslations('Targage');

  const pillars = [
    {
      id: 'efficiency',
      icon: <ChartNoAxesCombined size={28} className="text-bubblegum" />,
      title: t('pillars.efficiency.title'),
      desc: t('pillars.efficiency.desc'),
    },
    {
      id: 'legal',
      icon: <Scale size={28} className="text-forest dark:text-bubblegum" />,
      title: t('pillars.legal.title'),
      desc: t('pillars.legal.desc'),
    },
    {
      id: 'integration',
      icon: <ServerCog size={28} className="text-ink dark:text-white" />,
      title: t('pillars.integration.title'),
      desc: t('pillars.integration.desc'),
    },
  ];

  const pipeline = [
    {
      id: 'ingestion',
      icon: <Camera size={28} className="text-bubblegum" />,
      title: t('pipeline.ingestion.title'),
      desc: t('pipeline.ingestion.desc'),
    },
    {
      id: 'detection',
      icon: <Radar size={28} className="text-forest dark:text-bubblegum" />,
      title: t('pipeline.detection.title'),
      desc: t('pipeline.detection.desc'),
    },
    {
      id: 'indexing',
      icon: <Database size={28} className="text-ink dark:text-white" />,
      title: t('pipeline.indexing.title'),
      desc: t('pipeline.indexing.desc'),
    },
    {
      id: 'retrieval',
      icon: <FileSearch size={28} className="text-bubblegum" />,
      title: t('pipeline.retrieval.title'),
      desc: t('pipeline.retrieval.desc'),
    },
  ];

  const values = ['time', 'security', 'liability'].map((id) => ({
    id,
    title: t(`value.${id}.title`),
    desc: t(`value.${id}.desc`),
  }));

  const compatibility = [0, 1, 2, 3].map((index) => t(`compatibility.items.${index}`));
  const compliance = [0, 1, 2].map((index) => t(`compliance.items.${index}`));
  const faq = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.${index}.question`),
    answer: t(`faq.${index}.answer`),
  }));

  return (
    <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">
      <TargageSchema />
      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
              <Search size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white">
              Targage
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-forest to-bubblegum dark:from-violet-300 dark:to-pink-300 text-3xl md:text-5xl mt-2">
                {t('tagline')}
              </span>
            </h1>

            <p className="text-xl text-ink/70 dark:text-smoke/70 leading-relaxed max-w-2xl">
              {t('description')}
            </p>

            <p className="text-base md:text-lg text-ink/60 dark:text-smoke/65 leading-relaxed max-w-2xl mt-5">
              {t('supporting')}
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              {[t('chips.0'), t('chips.1'), t('chips.2'), t('chips.3')].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink/75 dark:text-smoke/80"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="mailto:magosimo99@gmail.com">
                <Button variant="primary" className="px-7 py-4 text-base gap-2">
                  {t('cta_demo')}
                  <ArrowRight size={17} />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="relative overflow-hidden border-forest/20 dark:border-white/10 bg-white/70 dark:bg-ink/60 backdrop-blur-xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-bubblegum/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full bg-forest/20 dark:bg-white/10 blur-3xl" />

              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-ink/50 dark:text-smoke/50">
                  {t('heroCard.eyebrow')}
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-3 text-bubblegum">
                      <BrainCircuit size={18} />
                      <p className="text-xs font-bold uppercase tracking-[0.18em]">{t('heroCard.brainTitle')}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/70 dark:text-smoke/75">{t('heroCard.brainDescription')}</p>
                  </div>
                  <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-4">
                    <div className="flex items-center gap-2 mb-3 text-forest dark:text-bubblegum">
                      <LockKeyhole size={18} />
                      <p className="text-xs font-bold uppercase tracking-[0.18em]">{t('heroCard.securityTitle')}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-ink/70 dark:text-smoke/75">{t('heroCard.securityDescription')}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-bubblegum/20 bg-bubblegum/10 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-bubblegum mb-2">{t('heroCard.outcomeLabel')}</p>
                  <p className="font-display text-2xl text-ink dark:text-white">{t('heroCard.outcomeTitle')}</p>
                  <p className="text-ink/70 dark:text-smoke/75 mt-2 leading-relaxed">{t('heroCard.outcomeDescription')}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {pillars.map((entry) => (
            <Card key={entry.id} className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
              <div className="w-14 h-14 rounded-2xl bg-smoke dark:bg-white/10 flex items-center justify-center mb-5">
                {entry.icon}
              </div>
              <h2 className="font-display text-3xl font-bold mb-3 text-ink dark:text-white">{entry.title}</h2>
              <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{entry.desc}</p>
            </Card>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-20">
        <TargageInteractiveDemo />
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            {t('pipeline_title')}
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {pipeline.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <Card className="h-full hover:border-bubblegum transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-smoke dark:bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3 text-ink dark:text-white">
                  {entry.title}
                </h3>
                <p className="text-ink/70 dark:text-smoke/70 leading-relaxed">{entry.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 border-ink/10 dark:border-white/10 bg-forest text-white p-8 md:p-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">{t('value_title')}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {values.map((entry) => (
              <div key={entry.id} className="rounded-2xl p-5 bg-white/10 border border-white/20">
                <h3 className="font-display text-2xl font-bold mb-2">{entry.title}</h3>
                <p className="text-white/85">{entry.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
        >
          <Card className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-5 text-bubblegum">
              <ServerCog size={22} />
              <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('compatibility.eyebrow')}</p>
            </div>
            <h2 className="font-display text-4xl font-bold text-ink dark:text-white mb-4">{t('compatibility.title')}</h2>
            <p className="text-ink/70 dark:text-smoke/75 leading-relaxed mb-6">{t('compatibility.description')}</p>
            <div className="flex flex-wrap gap-2">
              {compatibility.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink/10 dark:border-white/10 bg-paper dark:bg-ink px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-ink dark:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ delay: 0.08 }}
        >
          <Card className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-5 text-bubblegum">
              <LockKeyhole size={22} />
              <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('compliance.eyebrow')}</p>
            </div>
            <h2 className="font-display text-4xl font-bold text-ink dark:text-white mb-4">{t('compliance.title')}</h2>
            <p className="text-ink/70 dark:text-smoke/75 leading-relaxed mb-6">{t('compliance.description')}</p>
            <div className="space-y-3">
              {compliance.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-ink p-4">
                  <CircleAlert size={18} className="mt-0.5 shrink-0 text-bubblegum" />
                  <p className="text-ink/75 dark:text-smoke/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="rounded-3xl border-2 border-ink/10 dark:border-white/10 bg-paper dark:bg-ink p-8 md:p-10"
        >
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-bubblegum mb-3">{t('faqEyebrow')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink dark:text-white mb-4">{t('faqTitle')}</h2>
            <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{t('faqDescription')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((entry) => (
              <div key={entry.question} className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5">
                <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-3">{entry.question}</h3>
                <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{entry.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
