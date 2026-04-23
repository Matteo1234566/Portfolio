'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import {
  Archive,
  ArrowUpRight,
  CircleCheck,
  Github,
  HardDrive,
  Layers,
  ShieldCheck,
  Terminal,
  Usb,
} from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import PyquarkSchema from './PyquarkSchema';

const DARK_THEME = {
  surface: '#1A1C24',
  card: '#181C22',
  active: '#333338',
  seed: '#20BF20',
  ink: '#F5EFDF',
  muted: '#D2C9BC',
  subtle: '#797C77',
  accent: '#737B85',
};

const LIGHT_THEME = {
  surface: '#F5EFDF',
  card: '#FFFFFF',
  active: '#D2C9BC',
  seed: '#20BF20',
  ink: '#000000',
  muted: '#333338',
  subtle: '#797C77',
  accent: '#737B85',
};

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

function QCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${className}`}
      style={{
        backgroundColor: 'var(--pyq-card)',
        borderColor: 'var(--pyq-card-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function PyquarkPageClient() {
  const t = useTranslations('PyQuark');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(245,239,223,0.14)' : 'rgba(0,0,0,0.14)';

  const capabilities = [
    {
      id: 'dual',
      icon: <Usb size={30} style={{ color: C.seed }} />,
      title: t('capabilities.dual.title'),
      desc: t('capabilities.dual.desc'),
    },
    {
      id: 'xci',
      icon: <HardDrive size={30} style={{ color: C.accent }} />,
      title: t('capabilities.xci.title'),
      desc: t('capabilities.xci.desc'),
    },
    {
      id: 'rar',
      icon: <Archive size={30} style={{ color: C.ink }} />,
      title: t('capabilities.rar.title'),
      desc: t('capabilities.rar.desc'),
    },
    {
      id: 'state',
      icon: <Layers size={30} style={{ color: C.seed }} />,
      title: t('capabilities.state.title'),
      desc: t('capabilities.state.desc'),
    },
  ];

  const setup = [
    {
      id: 'windows',
      title: t('setup.windows.title'),
      desc: t('setup.windows.desc'),
    },
    {
      id: 'linux',
      title: t('setup.linux.title'),
      desc: t('setup.linux.desc'),
    },
    {
      id: 'deps',
      title: t('setup.dependencies.title'),
      desc: t('setup.dependencies.desc'),
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
        '--pyq-card': C.card,
        '--pyq-card-border': cardBorder,
      }}
    >
      <PyquarkSchema />

      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: `${C.seed}1A`, color: C.seed }}
            >
              <Usb size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div
                className="relative h-[3.375rem] w-[3.375rem] md:h-[5.4rem] md:w-[5.4rem] rounded-2xl overflow-hidden border"
                style={{ borderColor: `${C.seed}66`, backgroundColor: C.active }}
              >
                <Image
                  src={isDark ? '/pyquark/logo_white.png' : '/pyquark/logo_black.png'}
                  alt="PyQuark logo"
                  fill
                  sizes="(min-width: 768px) 86px, 54px"
                  quality={100}
                  className="object-contain p-1"
                  priority
                />
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9]" style={{ color: C.ink }}>
                PyQuark
              </h1>
            </div>

            <p className="text-3xl md:text-4xl font-display font-bold mb-6" style={{ color: C.seed }}>
              {t('tagline')}
            </p>

            <p className="text-xl leading-relaxed max-w-2xl mb-5" style={{ color: C.muted }}>
              {t('description')}
            </p>

            <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: C.subtle }}>
              {t('supporting')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[t('chips.0'), t('chips.1'), t('chips.2'), t('chips.3')].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]"
                  style={{ borderColor: `${C.seed}66`, backgroundColor: `${C.seed}12`, color: C.muted }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="https://github.com/Zannael/PyQuark" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="px-7 py-4 text-base gap-2" style={{ backgroundColor: C.seed, color: '#000000', borderColor: '#000000' }}>
                  <Github size={18} />
                  {t('cta_repo')}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <QCard className="relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${C.seed}33` }} />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full blur-3xl" style={{ backgroundColor: `${C.accent}33` }} />

              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: C.subtle }}>
                  {t('modes.label')}
                </p>

                <div className="rounded-2xl border p-5" style={{ backgroundColor: C.active, borderColor: cardBorder }}>
                  <p className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>Goldleaf + Quark</p>
                  <p className="mb-3" style={{ color: C.muted }}>{t('modes.goldleaf')}</p>
                  <p className="text-xs uppercase tracking-[0.16em] font-bold" style={{ color: C.seed }}>{t('modes.goldleafWhen')}</p>
                </div>

                <div className="rounded-2xl border p-5" style={{ backgroundColor: C.active, borderColor: cardBorder }}>
                  <p className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>DBI + DBI0</p>
                  <p className="mb-3" style={{ color: C.muted }}>{t('modes.dbi')}</p>
                  <p className="text-xs uppercase tracking-[0.16em] font-bold" style={{ color: C.seed }}>{t('modes.dbiWhen')}</p>
                </div>
              </div>
            </QCard>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('capabilitiesLabel')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('capabilitiesTitle')}</h2>
          <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('capabilitiesSubtitle')}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {capabilities.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <QCard className="h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: C.active }}>
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </QCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <QCard className="h-full">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.seed }}>
            <Terminal size={20} />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('setupLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('setupTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('setupSubtitle')}</p>
          <div className="space-y-3">
            {setup.map((entry) => (
              <div key={entry.id} className="rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <p className="font-bold mb-1" style={{ color: C.ink }}>{entry.title}</p>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </div>
            ))}
          </div>
        </QCard>

        <QCard className="h-full">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.seed }}>
            <ShieldCheck size={20} />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('positioningLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('positioningTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('positioningDescription')}</p>

          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <CircleCheck size={18} className="mt-0.5 shrink-0" style={{ color: C.seed }} />
                <p className="leading-relaxed" style={{ color: C.muted }}>{t(`positioningPoints.${index}`)}</p>
              </div>
            ))}
          </div>
        </QCard>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <QCard className="p-8 md:p-10">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('faqLabel')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('faqTitle')}</h2>
            <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('faqSubtitle')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faq.map((entry) => (
              <div key={entry.question} className="rounded-2xl border p-5" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: C.ink }}>{entry.question}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.answer}</p>
              </div>
            ))}
          </div>
        </QCard>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 p-8 md:p-10"
          style={{
            borderColor: isDark ? 'rgba(32,191,32,0.45)' : 'rgba(0,0,0,0.2)',
            background: `linear-gradient(120deg, ${C.seed} 0%, ${isDark ? '#1A1C24' : '#D2C9BC'} 100%)`,
            color: isDark ? '#F5EFDF' : '#000000',
          }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('footer.title')}</h2>
          <p className="text-lg max-w-3xl" style={{ opacity: 0.88 }}>{t('footer.desc')}</p>
          <a
            href="https://github.com/Zannael/PyQuark"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-wide mt-6 text-sm hover:opacity-80 transition-opacity"
          >
            <Github size={16} />
            {t('footer.link')}
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </main>
  );
}
