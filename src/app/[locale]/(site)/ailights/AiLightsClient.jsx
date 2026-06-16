'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Building2,
  Camera,
  Clapperboard,
  Eye,
  MonitorPlay,
  PlayCircle,
  Radar,
  Target,
  Trophy,
  Users,
  Wifi,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import AiLightsSchema from './AiLightsSchema';

const DARK_THEME = {
  surface: '#101010',
  card: '#1A1A1A',
  active: '#232323',
  highlight: '#2B2B2B',
  seed: '#F6B700',
  ink: '#FFFFFF',
  muted: 'rgba(255,255,255,0.72)',
  subtle: 'rgba(255,255,255,0.52)',
  accent: '#857C8D',
};

const LIGHT_THEME = {
  surface: '#FAFAFA',
  card: '#FFFFFF',
  active: '#F0F0F0',
  highlight: '#E8E8E8',
  seed: '#F6B700',
  ink: '#151515',
  muted: 'rgba(21,21,21,0.72)',
  subtle: 'rgba(21,21,21,0.52)',
  accent: '#857C8D',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 50, damping: 20 },
  },
};

function ACard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${className}`}
      style={{
        backgroundColor: 'var(--ailights-card)',
        borderColor: 'var(--ailights-card-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function AiLights() {
  const t = useTranslations('AiLights');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(21,21,21,0.12)';

  const pillars = [
    {
      id: 'category',
      icon: <Camera size={38} style={{ color: C.seed }} />,
      title: t('pillars.category.title'),
      desc: t('pillars.category.desc'),
    },
    {
      id: 'automation',
      icon: <Eye size={38} style={{ color: C.accent }} />,
      title: t('pillars.automation.title'),
      desc: t('pillars.automation.desc'),
    },
    {
      id: 'buyers',
      icon: <Activity size={38} style={{ color: C.ink }} />,
      title: t('pillars.buyers.title'),
      desc: t('pillars.buyers.desc'),
    },
  ];

  const engine = [
    {
      id: 'capture',
      icon: <MonitorPlay size={28} style={{ color: C.seed }} />,
      title: t('engine.capture.title'),
      desc: t('engine.capture.desc'),
    },
    {
      id: 'direction',
      icon: <Radar size={28} style={{ color: C.accent }} />,
      title: t('engine.direction.title'),
      desc: t('engine.direction.desc'),
    },
    {
      id: 'analytics',
      icon: <BarChart3 size={28} style={{ color: C.ink }} />,
      title: t('engine.analytics.title'),
      desc: t('engine.analytics.desc'),
    },
    {
      id: 'distribution',
      icon: <Clapperboard size={28} style={{ color: C.seed }} />,
      title: t('engine.distribution.title'),
      desc: t('engine.distribution.desc'),
    },
  ];

  const sports = [
    {
      id: 'futsal',
      title: t('sports.futsal.title'),
      description: t('sports.futsal.description'),
      metrics: [t('sports.futsal.0'), t('sports.futsal.1'), t('sports.futsal.2')],
      icon: <PlayCircle size={24} />,
    },
    {
      id: 'tennis',
      title: t('sports.tennis.title'),
      description: t('sports.tennis.description'),
      metrics: [t('sports.tennis.0'), t('sports.tennis.1'), t('sports.tennis.2')],
      icon: <Target size={24} />,
    },
    {
      id: 'padel',
      title: t('sports.padel.title'),
      description: t('sports.padel.description'),
      metrics: [t('sports.padel.0'), t('sports.padel.1'), t('sports.padel.2')],
      icon: <BarChart3 size={24} />,
    },
  ];

  const buyers = [
    {
      id: 'clubs',
      icon: <Trophy size={28} style={{ color: C.seed }} />,
      title: t('buyers.clubs.title'),
      desc: t('buyers.clubs.desc'),
    },
    {
      id: 'centers',
      icon: <Building2 size={28} style={{ color: C.accent }} />,
      title: t('buyers.centers.title'),
      desc: t('buyers.centers.desc'),
    },
    {
      id: 'coaches',
      icon: <Users size={28} style={{ color: C.ink }} />,
      title: t('buyers.coaches.title'),
      desc: t('buyers.coaches.desc'),
    },
  ];

  const faq = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.${index}.question`),
    answer: t(`faq.${index}.answer`),
  }));

  return (
    <main
      className="min-h-screen pt-32 pb-20"
      style={{
        backgroundColor: C.surface,
        color: C.ink,
        '--ailights-card': C.card,
        '--ailights-card-border': cardBorder,
      }}
    >
      <AiLightsSchema />

      <section className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16 mb-24">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6" style={{ backgroundColor: `${C.seed}1A`, color: C.seed }}>
              <Wifi size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative h-14 w-14 rounded-2xl overflow-hidden border" style={{ borderColor: `${C.seed}66`, backgroundColor: C.highlight }}>
                <Image
                  src={isDark ? '/ailights/ailights_logo.png' : '/ailights/ailights_logo_black.png'}
                  alt="AiLights logo"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                  priority
                />
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.88]" style={{ color: C.ink }}>
                AiLights
              </h1>
            </div>

            <p className="text-3xl md:text-4xl font-display font-bold mb-6" style={{ color: C.seed }}>
              {t('tagline')}
            </p>

            <p className="text-xl mb-6 leading-relaxed max-w-2xl" style={{ color: C.muted }}>
              {t('description')}
            </p>

            <p className="text-base md:text-lg mb-8 leading-relaxed max-w-2xl" style={{ color: C.subtle }}>
              {t('supporting')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[t('chips.0'), t('chips.1'), t('chips.2'), t('chips.3')].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{
                    borderColor: `${C.seed}55`,
                    color: C.muted,
                    backgroundColor: `${C.seed}10`,
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="mailto:hello@4aitech.it">
                <Button variant="primary" className="px-8 py-4 text-lg gap-2" style={{ backgroundColor: C.seed, color: '#151515', borderColor: '#151515' }}>
                  {t('cta_demo')}
                  <ArrowRight size={18} />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${C.seed}38 0%, transparent 70%)` }}
              />
              <ACard className="relative h-full overflow-hidden p-0">
                <Image
                  src={isDark ? '/ailights_dark.webp' : '/ailights.webp'}
                  alt="AiLights sports AI platform visual"
                  fill
                  className="object-cover select-none pointer-events-none"
                />
              </ACard>

              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-8 -right-8 p-4 rounded-2xl border"
                style={{
                  borderColor: `${C.seed}66`,
                  backgroundColor: C.card,
                }}
              >
                <Activity size={30} style={{ color: C.seed }} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="absolute -bottom-8 -left-4 md:left-0 max-w-xs rounded-3xl p-5 border"
                style={{
                  backgroundColor: C.card,
                  borderColor: cardBorder,
                }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] mb-2" style={{ color: C.seed }}>{t('heroCard.label')}</p>
                <p className="font-display text-2xl mb-2" style={{ color: C.ink }}>{t('heroCard.title')}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.description')}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-32">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-100px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {pillars.map((entry) => (
            <motion.div key={entry.id} variants={item} className="h-full">
              <ACard className="h-full transition-colors duration-300 hover:!border-[var(--ailights-seed,#F6B700)]" style={{ '--ailights-seed': C.seed }}>
                <div className="mb-6 p-4 rounded-2xl w-fit" style={{ backgroundColor: C.active }}>
                  {entry.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </ACard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 mb-28">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('engine_label')}</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: C.ink }}>{t('engine_title')}</h2>
          <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('engine_subtitle')}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {engine.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <ACard className="h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: C.active }}>
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </ACard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: isDark ? '#141414' : '#1D1D1D', color: '#FFFFFF' }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="font-display text-4xl md:text-6xl font-bold mb-4"
            >
              {t('sports_title')} <span style={{ color: C.seed }}>Smart Stats</span>
            </motion.h2>
            <p className="max-w-2xl mx-auto text-lg" style={{ color: 'rgba(255,255,255,0.72)' }}>
              {t('sports_subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sports.map((sport, index) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.2 }}
                className="backdrop-blur-sm border rounded-3xl p-8 transition-colors"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  borderColor: 'rgba(255,255,255,0.16)',
                }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-display text-3xl font-bold">{sport.title}</h3>
                  <div className="p-2 rounded-full" style={{ backgroundColor: C.seed, color: '#151515' }}>
                    {sport.icon}
                  </div>
                </div>

                <p className="leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {sport.description}
                </p>

                <ul className="space-y-4">
                  {sport.metrics.map((metric, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-medium" style={{ color: 'rgba(255,255,255,0.95)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.seed, boxShadow: `0 0 10px ${C.seed}80` }} />
                      {metric}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('buyers_label')}</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4" style={{ color: C.ink }}>{t('buyers_title')}</h2>
          <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('buyers_subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {buyers.map((entry) => (
            <ACard key={entry.id} className="h-full">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: C.active }}>
                {entry.icon}
              </div>
              <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
              <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
            </ACard>
          ))}
        </div>

        <ACard>
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('advantage.label')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('advantage.title')}</h2>
          <p className="text-lg leading-relaxed max-w-4xl" style={{ color: C.muted }}>{t('advantage.description')}</p>
        </ACard>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border p-8 md:p-10" style={{ backgroundColor: C.card, borderColor: cardBorder }}>
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('faq_label')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('faq_title')}</h2>
            <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('faq_subtitle')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((entry) => (
              <div
                key={entry.question}
                className="rounded-2xl border p-5"
                style={{
                  backgroundColor: C.active,
                  borderColor: cardBorder,
                }}
              >
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: C.ink }}>{entry.question}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
