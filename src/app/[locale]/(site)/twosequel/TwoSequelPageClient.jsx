'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  CircuitBoard,
  Database,
  FileSearch,
  Lock,
  MessageSquareCode,
  Play,
  ServerCog,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import TwoSequelSchema from './TwoSequelSchema';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
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

export default function TwoSequelPageClient() {
  const t = useTranslations('TwoSequel');

  const pillars = [
    {
      id: 'access',
      icon: <Users size={28} className="text-bubblegum" />,
      title: t('pillars.access.title'),
      desc: t('pillars.access.desc'),
    },
    {
      id: 'security',
      icon: <ShieldCheck size={28} className="text-forest dark:text-bubblegum" />,
      title: t('pillars.security.title'),
      desc: t('pillars.security.desc'),
    },
    {
      id: 'accuracy',
      icon: <BrainCircuit size={28} className="text-ink dark:text-white" />,
      title: t('pillars.accuracy.title'),
      desc: t('pillars.accuracy.desc'),
    },
  ];

  const pipeline = [
    {
      id: 'intent',
      icon: <MessageSquareCode size={28} className="text-bubblegum" />,
    },
    {
      id: 'sql',
      icon: <CircuitBoard size={28} className="text-forest dark:text-bubblegum" />,
    },
    {
      id: 'execution',
      icon: <Play size={28} className="text-ink dark:text-white" />,
    },
    {
      id: 'output',
      icon: <Zap size={28} className="text-bubblegum" />,
    },
  ].map(({ id, icon }) => ({
    id,
    icon,
    title: t(`pipeline.${id}.title`),
    desc: t(`pipeline.${id}.desc`),
  }));

  const compatItems = [0, 1, 2, 3].map((i) => t(`compat_items.${i}`));

  const values = ['speed', 'governance', 'autonomy'].map((id) => ({
    id,
    title: t(`value.${id}.title`),
    desc: t(`value.${id}.desc`),
  }));

  const faq = [0, 1, 2, 3].map((i) => ({
    question: t(`faq.${i}.question`),
    answer: t(`faq.${i}.answer`),
  }));

  return (
    <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">
      <TwoSequelSchema />

      {/* ── HERO ── */}
      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
              <Database size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white">
              2Sequel
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
              <a href="mailto:hello@4aitech.it">
                <Button variant="primary" className="px-7 py-4 text-base gap-2">
                  {t('cta_demo')}
                  <ArrowRight size={17} />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* ── Hero mock: NL → SQL ── */}
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

                {/* Natural language input */}
                <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-4">
                  <div className="flex items-center gap-2 mb-2 text-forest dark:text-bubblegum">
                    <MessageSquareCode size={15} />
                    <p className="text-xs font-bold uppercase tracking-[0.16em]">{t('heroCard.queryLabel')}</p>
                  </div>
                  <p className="text-sm font-medium text-ink dark:text-white italic">
                    &ldquo;{t('heroCard.query')}&rdquo;
                  </p>
                </div>

                {/* Generated SQL */}
                <div className="rounded-2xl border border-bubblegum/20 bg-bubblegum/5 p-4">
                  <div className="flex items-center gap-2 mb-2 text-bubblegum">
                    <CircuitBoard size={15} />
                    <p className="text-xs font-bold uppercase tracking-[0.16em]">{t('heroCard.sqlLabel')}</p>
                  </div>
                  <pre className="text-xs font-mono text-ink/80 dark:text-smoke/80 whitespace-pre-wrap leading-relaxed">
                    {t('heroCard.sql')}
                  </pre>
                </div>

                {/* Adaptive output */}
                <div className="rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/80 dark:bg-white/5 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-smoke/50 mb-2">
                    {t('heroCard.outputLabel')}
                  </p>
                  <p className="text-sm font-semibold text-ink dark:text-white">
                    {t('heroCard.output')}
                  </p>
                </div>

                {/* Status bar */}
                <div className="rounded-xl border border-bubblegum/20 bg-bubblegum/10 px-3 py-2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-bubblegum animate-pulse" />
                  <span className="text-xs font-bold text-bubblegum">{t('heroCard.accuracyLabel')}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ── PILLARS ── */}
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

      {/* ── PIPELINE ── */}
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

      {/* ── AUDIENCES ── */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            {t('audiences_title')}
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="grid gap-6 lg:grid-cols-2"
        >
          {['business', 'technical'].map((id) => (
            <Card key={id} className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
              <div className="w-14 h-14 rounded-2xl bg-smoke dark:bg-white/10 flex items-center justify-center mb-5">
                {id === 'business'
                  ? <Users size={28} className="text-bubblegum" />
                  : <ServerCog size={28} className="text-forest dark:text-bubblegum" />
                }
              </div>
              <h2 className="font-display text-3xl font-bold mb-2 text-ink dark:text-white">
                {t(`audiences.${id}.title`)}
              </h2>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-bubblegum mb-4">
                {t(`audiences.${id}.roles`)}
              </p>
              <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">
                {t(`audiences.${id}.desc`)}
              </p>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* ── COMPATIBILITY + SECURITY ── */}
      <div className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
        >
          <Card className="h-full border-ink/10 dark:border-white/10 bg-white/85 dark:bg-white/5">
            <div className="flex items-center gap-3 mb-5 text-bubblegum">
              <Database size={22} />
              <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('compat_title')}</p>
            </div>
            <p className="text-ink/70 dark:text-smoke/75 leading-relaxed mb-6">{t('compat_description')}</p>
            <div className="flex flex-wrap gap-2">
              {compatItems.map((item) => (
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
              <Lock size={22} />
              <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('pillars.security.title')}</p>
            </div>
            <p className="text-ink/70 dark:text-smoke/75 leading-relaxed mb-6">{t('pillars.security.desc')}</p>
            <div className="space-y-3">
              {[
                { icon: <ShieldCheck size={16} className="mt-0.5 shrink-0 text-bubblegum" />, text: 'Field-level access controls per user role' },
                { icon: <Lock size={16} className="mt-0.5 shrink-0 text-bubblegum" />, text: 'Native data masking for sensitive columns' },
                { icon: <FileSearch size={16} className="mt-0.5 shrink-0 text-bubblegum" />, text: 'Explainable query tracing & audit trail' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3 rounded-2xl border border-ink/10 dark:border-white/10 bg-paper/70 dark:bg-ink p-4">
                  {icon}
                  <p className="text-ink/75 dark:text-smoke/80 leading-relaxed text-sm">{text}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── VALUE ── */}
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

      {/* ── FAQ ── */}
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
              <div
                key={entry.question}
                className="rounded-2xl border border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5 p-5"
              >
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
