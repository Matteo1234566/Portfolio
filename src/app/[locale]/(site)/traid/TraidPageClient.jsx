'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  CircleCheck,
  Database,
  DollarSign,
  FlaskConical,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react';
import TraidSchema from './TraidSchema';

const DARK_THEME = {
  surface:   '#0A0A0A',
  card:      '#111111',
  active:    '#1A1A1A',
  highlight: '#202020',
  seed:      '#1EB953',
  bear:      '#E53232',
  ink:       '#FFFFFF',
  muted:     'rgba(255,255,255,0.55)',
};

const LIGHT_THEME = {
  surface:   '#FFFFFF',
  card:      '#F4F4F4',
  active:    '#EBEBEB',
  highlight: '#E2E2E2',
  seed:      '#179944',
  bear:      '#CC2020',
  ink:       '#000000',
  muted:     'rgba(0,0,0,0.55)',
};

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 55, damping: 18 } },
};

function TCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{ backgroundColor: 'var(--traid-card)', borderColor: 'var(--traid-border)', ...style }}
    >
      {children}
    </div>
  );
}

export default function TraidPageClient() {
  const t = useTranslations('Traid');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const border     = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)';
  const borderSeed = `${C.seed}35`;

  const pillars = [
    { id: 'models',     icon: <BrainCircuit size={26} style={{ color: C.seed }} />,  title: t('pillars.models.title'),     desc: t('pillars.models.desc') },
    { id: 'signals',    icon: <TrendingUp   size={26} style={{ color: C.seed }} />,  title: t('pillars.signals.title'),    desc: t('pillars.signals.desc') },
    { id: 'validation', icon: <ShieldCheck  size={26} style={{ color: C.seed }} />,  title: t('pillars.validation.title'), desc: t('pillars.validation.desc') },
  ];

  const metrics = [
    { id: 'training',   icon: <Database    size={20} style={{ color: C.seed }} /> },
    { id: 'backtesting',icon: <BarChart3   size={20} style={{ color: C.seed }} /> },
    { id: 'holdout',    icon: <FlaskConical size={20} style={{ color: C.seed }} /> },
    { id: 'selection',  icon: <CircleCheck size={20} style={{ color: C.seed }} /> },
  ].map(({ id, icon }) => ({
    id, icon,
    value: t(`metrics.${id}.value`),
    label: t(`metrics.${id}.label`),
    desc:  t(`metrics.${id}.desc`),
  }));

  const pipeline = [
    { id: 'collection', icon: <Database     size={26} style={{ color: C.seed }} /> },
    { id: 'training',   icon: <BrainCircuit size={26} style={{ color: C.seed }} /> },
    { id: 'validation', icon: <FlaskConical size={26} style={{ color: C.seed }} /> },
    { id: 'signals',    icon: <Zap          size={26} style={{ color: C.seed }} /> },
  ].map(({ id, icon }) => ({
    id, icon,
    title: t(`pipeline.${id}.title`),
    desc:  t(`pipeline.${id}.desc`),
  }));

  const markets = [
    { id: 'us',    icon: <BarChart3 size={26} style={{ color: C.seed }} /> },
    { id: 'etf',   icon: <PieChart  size={26} style={{ color: C.seed }} /> },
    { id: 'forex', icon: <DollarSign size={26} style={{ color: C.seed }} /> },
  ].map(({ id, icon }) => ({
    id, icon,
    title: t(`markets.${id}.title`),
    desc:  t(`markets.${id}.desc`),
  }));

  const values = ['rigor', 'transparency', 'realtime'].map((id) => ({
    id,
    title: t(`value.${id}.title`),
    desc:  t(`value.${id}.desc`),
  }));

  const faq = [0, 1, 2, 3].map((i) => ({
    question: t(`faq.${i}.question`),
    answer:   t(`faq.${i}.answer`),
  }));

  const logoSrc = isDark ? '/traid/logo_white.png' : '/traid/logo_black.png';
  const pittoSrc = isDark ? '/traid/pittogramma_white.png' : '/traid/pittogramma_black.png';

  return (
    <main
      className="min-h-screen pt-32 pb-20"
      style={{
        backgroundColor: C.surface,
        color: C.ink,
        '--traid-card':   C.card,
        '--traid-border': border,
      }}
    >
      <TraidSchema />

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>

            {/* Logo + badge row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div
                className="relative h-10 w-10 rounded-xl overflow-hidden border flex items-center justify-center"
                style={{ borderColor: borderSeed, backgroundColor: C.active }}
              >
                <Image src={pittoSrc} alt="Traid pittogramma" fill sizes="40px" className="object-contain p-1" priority />
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
                style={{ backgroundColor: `${C.seed}18`, color: C.seed }}
              >
                <TrendingUp size={13} className="animate-pulse" />
                <span>{t('badge')}</span>
              </div>
            </div>

            {/* Full logo */}
            <div className="relative h-14 w-56 mb-6">
              <Image src={logoSrc} alt="Traid logo" fill sizes="224px" className="object-contain object-left" priority />
            </div>

            <p className="text-xl leading-relaxed max-w-2xl mb-3" style={{ color: C.muted }}>
              {t('description')}
            </p>
            <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: C.muted }}>
              {t('supporting')}
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[t('chips.0'), t('chips.1'), t('chips.2'), t('chips.3')].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ borderColor: border, color: C.muted }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <a href="https://traid.it/it/" target="_blank" rel="noopener noreferrer">
              <button
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-80"
                style={{ backgroundColor: C.seed, color: '#FFFFFF' }}
              >
                {t('cta_live')}
                <ArrowUpRight size={17} />
              </button>
            </a>
          </motion.div>

          {/* Hero card — validation metrics preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div
              className="relative rounded-3xl p-6 border overflow-hidden"
              style={{ backgroundColor: C.card, borderColor: border }}
            >
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${C.seed}22 0%, transparent 70%)` }}
              />
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: C.muted }}>
                  {t('heroCard.eyebrow')}
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div
                    className="rounded-2xl border p-4"
                    style={{ backgroundColor: C.active, borderColor: border }}
                  >
                    <div className="flex items-center gap-2 mb-3" style={{ color: C.seed }}>
                      <ShieldCheck size={16} />
                      <p className="text-xs font-bold uppercase tracking-[0.16em]">{t('heroCard.validationTitle')}</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.validationDescription')}</p>
                  </div>
                  <div
                    className="rounded-2xl border p-4"
                    style={{ backgroundColor: C.active, borderColor: border }}
                  >
                    <div className="flex items-center gap-2 mb-3" style={{ color: C.seed }}>
                      <Zap size={16} />
                      <p className="text-xs font-bold uppercase tracking-[0.16em]">{t('heroCard.signalsTitle')}</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.signalsDescription')}</p>
                  </div>
                </div>

                <div
                  className="rounded-2xl border p-4"
                  style={{ backgroundColor: C.active, borderColor: borderSeed }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: C.seed }}>
                    {t('heroCard.outcomeLabel')}
                  </p>
                  <p className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>
                    {t('heroCard.outcomeTitle')}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                    {t('heroCard.outcomeDescription')}
                  </p>
                </div>

                {/* Candlestick ticker decoration */}
                <div
                  className="rounded-xl border p-3 flex items-center gap-3"
                  style={{ backgroundColor: `${C.seed}12`, borderColor: `${C.seed}28` }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.seed }} />
                  <div className="flex items-end gap-1">
                    {[14, 20, 12, 24, 18, 28, 16, 22].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-sm"
                        style={{ height: `${h}px`, backgroundColor: i % 3 === 1 ? C.bear : C.seed, opacity: 0.85 }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold ml-1" style={{ color: C.seed }}>
                    Live signals active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-6 md:grid-cols-3"
        >
          {pillars.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <TCard className="h-full group cursor-default">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${C.seed}18` }}
                >
                  {entry.icon}
                </div>
                <h2 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h2>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </TCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── METRICS — the 0.1% standard ── */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: C.ink }}>{t('metrics_title')}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {metrics.map((m) => (
            <motion.div key={m.id} variants={item}>
              <TCard className="h-full text-center cursor-default group">
                <div className="flex justify-center mb-3">{m.icon}</div>
                <p className="font-display text-5xl font-bold mb-1" style={{ color: C.seed }}>{m.value}</p>
                <p className="text-xs font-bold uppercase tracking-[0.14em] mb-3" style={{ color: C.muted }}>{m.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{m.desc}</p>
              </TCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PIPELINE ── */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: C.ink }}>{t('pipeline_title')}</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-5"
        >
          {pipeline.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <TCard className="h-full group cursor-default">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: C.active }}
                >
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </TCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── MARKETS ── */}
      <section className="max-w-6xl mx-auto px-4 mt-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: C.ink }}>{t('markets_title')}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          className="grid gap-5 md:grid-cols-3"
        >
          {markets.map((entry) => (
            <TCard key={entry.id} className="h-full group cursor-default">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: `${C.seed}18` }}
              >
                {entry.icon}
              </div>
              <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
              <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
            </TCard>
          ))}
        </motion.div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border p-8 md:p-10 relative overflow-hidden"
          style={{ backgroundColor: C.card, borderColor: borderSeed }}
        >
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${C.seed}16 0%, transparent 70%)` }}
          />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8" style={{ color: C.ink }}>
              {t('value_title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {values.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border p-5"
                  style={{ backgroundColor: C.active, borderColor: border }}
                >
                  <div className="w-1.5 h-6 rounded-full mb-4" style={{ backgroundColor: C.seed }} />
                  <h3 className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>{entry.title}</h3>
                  <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border p-8 md:p-10"
          style={{ backgroundColor: C.card, borderColor: border }}
        >
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('faqEyebrow')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('faqTitle')}</h2>
            <p className="leading-relaxed" style={{ color: C.muted }}>{t('faqDescription')}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((entry) => (
              <div
                key={entry.question}
                className="rounded-2xl border p-5"
                style={{ backgroundColor: C.active, borderColor: border }}
              >
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: C.ink }}>{entry.question}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
