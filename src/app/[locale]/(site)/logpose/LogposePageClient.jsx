'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleCheck,
  Compass,
  Download,
  FolderGit2,
  GitBranch,
  Github,
  Kanban,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trash2,
} from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import LogposeSignature from './LogposeSignature';

const REPO_URL = 'https://github.com/Zannael/logpose';
const RELEASES_URL = 'https://github.com/Zannael/logpose/releases';

const DARK_THEME = {
  surface: '#0d1117',
  card: '#151b23',
  active: '#1c2128',
  seed: '#4493f8',
  green: '#3fb950',
  amber: '#d29922',
  red: '#f85149',
  violet: '#ab7df8',
  ink: '#e6edf3',
  muted: '#b3bcc6',
  subtle: '#8d96a0',
  onSeed: '#0d1117',
};

const LIGHT_THEME = {
  surface: '#f6f8fa',
  card: '#ffffff',
  active: '#eaeef2',
  seed: '#0969da',
  green: '#1a7f37',
  amber: '#9a6700',
  red: '#cf222e',
  violet: '#8250df',
  ink: '#1f2328',
  muted: '#424a53',
  subtle: '#656d76',
  onSeed: '#ffffff',
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

function LCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${className}`}
      style={{
        backgroundColor: 'var(--logpose-card)',
        borderColor: 'var(--logpose-card-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function LogposePageClient() {
  const t = useTranslations('Logpose');
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(230,237,243,0.14)' : 'rgba(31,35,40,0.14)';

  const capabilities = [
    {
      id: 'discovery',
      icon: <FolderGit2 size={28} style={{ color: C.seed }} />,
      title: t('capabilities.discovery.title'),
      desc: t('capabilities.discovery.desc'),
    },
    {
      id: 'scoring',
      icon: <GitBranch size={28} style={{ color: C.amber }} />,
      title: t('capabilities.scoring.title'),
      desc: t('capabilities.scoring.desc'),
    },
    {
      id: 'board',
      icon: <Kanban size={28} style={{ color: C.green }} />,
      title: t('capabilities.board.title'),
      desc: t('capabilities.board.desc'),
    },
    {
      id: 'removal',
      icon: <Trash2 size={28} style={{ color: C.red }} />,
      title: t('capabilities.removal.title'),
      desc: t('capabilities.removal.desc'),
    },
  ];

  const demoProjects = [
    {
      id: 'p0',
      bucketColor: C.green,
      messColor: C.green,
      name: t('demo.items.0.name'),
      column: t('demo.items.0.column'),
      bucket: t('demo.items.0.bucket'),
      days: t('demo.items.0.days'),
      messLabel: t('demo.items.0.messLabel'),
      messScore: t('demo.items.0.messScore'),
      agent: t('demo.items.0.agent'),
      gitSummary: t('demo.items.0.gitSummary'),
      lastGoal: t('demo.items.0.lastGoal'),
      nextSteps: [t('demo.items.0.nextSteps.0'), t('demo.items.0.nextSteps.1')],
      confidence: t('demo.items.0.confidence'),
    },
    {
      id: 'p1',
      bucketColor: C.amber,
      messColor: C.amber,
      name: t('demo.items.1.name'),
      column: t('demo.items.1.column'),
      bucket: t('demo.items.1.bucket'),
      days: t('demo.items.1.days'),
      messLabel: t('demo.items.1.messLabel'),
      messScore: t('demo.items.1.messScore'),
      agent: t('demo.items.1.agent'),
      gitSummary: t('demo.items.1.gitSummary'),
      lastGoal: t('demo.items.1.lastGoal'),
      nextSteps: [t('demo.items.1.nextSteps.0'), t('demo.items.1.nextSteps.1')],
      confidence: t('demo.items.1.confidence'),
    },
    {
      id: 'p2',
      bucketColor: C.red,
      messColor: C.red,
      name: t('demo.items.2.name'),
      column: t('demo.items.2.column'),
      bucket: t('demo.items.2.bucket'),
      days: t('demo.items.2.days'),
      messLabel: t('demo.items.2.messLabel'),
      messScore: t('demo.items.2.messScore'),
      agent: t('demo.items.2.agent'),
      gitSummary: t('demo.items.2.gitSummary'),
      lastGoal: t('demo.items.2.lastGoal'),
      nextSteps: [t('demo.items.2.nextSteps.0'), t('demo.items.2.nextSteps.1')],
      confidence: t('demo.items.2.confidence'),
    },
  ];

  const active = demoProjects[selectedProject];
  const faq = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.${index}.question`),
    answer: t(`faq.${index}.answer`),
  }));

  return (
    <main
      className="min-h-screen pt-32 pb-20 overflow-x-hidden"
      style={{
        backgroundColor: C.surface,
        color: C.ink,
        '--logpose-card': C.card,
        '--logpose-card-border': cardBorder,
      }}
    >
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: `${C.seed}1A`, color: C.seed }}
            >
              <Compass size={14} className={reduceMotion ? '' : 'animate-pulse'} aria-hidden="true" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-5" style={{ color: C.ink }}>
              Logpose
            </h1>

            <p className="text-2xl md:text-3xl font-display font-bold mb-5" style={{ color: C.seed }}>
              {t('tagline')}
            </p>

            <p className="text-xl leading-relaxed max-w-2xl mb-4" style={{ color: C.muted }}>
              {t('description')}
            </p>

            <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: C.subtle }}>
              {t('supporting')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[t('chips.0'), t('chips.1'), t('chips.2'), t('chips.3')].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ borderColor: `${C.seed}55`, backgroundColor: `${C.seed}12`, color: C.muted }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  className="px-7 py-4 text-base gap-2"
                  style={{ backgroundColor: C.seed, color: C.onSeed, borderColor: C.ink }}
                >
                  <Github size={18} aria-hidden="true" />
                  {t('cta_repo')}
                </Button>
              </a>
              <a href={RELEASES_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  className="px-7 py-4 text-base gap-2"
                  style={{ backgroundColor: C.card, color: C.ink, borderColor: cardBorder }}
                >
                  <Download size={18} aria-hidden="true" />
                  {t('cta_releases')}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <LogposeSignature />
            <LCard className="relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${C.seed}24` }} />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full blur-3xl" style={{ backgroundColor: `${C.green}22` }} />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: C.subtle }}>
                    {t('heroCard.label')}
                  </p>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${C.green}1F`, color: C.green }}
                  >
                    v0.1.1 · MIT
                  </span>
                </div>

                <div className="rounded-2xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>
                    {t('heroCard.localTitle')}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.localDesc')}</p>
                </div>

                <div className="rounded-2xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>
                    {t('heroCard.synthTitle')}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.synthDesc')}</p>
                </div>

                <div className="rounded-2xl border p-4 space-y-2" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  {[0, 1, 2].map((index) => (
                    <p key={index} className="text-sm flex items-start gap-2" style={{ color: C.muted }}>
                      <CircleCheck size={15} className="mt-0.5 shrink-0" style={{ color: C.green }} aria-hidden="true" />
                      <span>{t(`heroCard.trust.${index}`)}</span>
                    </p>
                  ))}
                </div>
              </div>
            </LCard>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="max-w-6xl mx-auto px-4 mt-24">
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
            <motion.div key={entry.id} variants={reduceMotion ? undefined : item}>
              <LCard className="h-full group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: C.active }}
                >
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </LCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Interactive Board & Scoring Demo */}
      <section id="board-demo" className="max-w-6xl mx-auto px-4 mt-16 scroll-mt-28">
        <LCard className="p-6 md:p-10">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: C.seed }}>{t('demo.eyebrow')}</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: C.ink }}>{t('demo.title')}</h2>
            <p className="leading-relaxed" style={{ color: C.muted }}>{t('demo.description')}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
            <div className="space-y-3">
              {demoProjects.map((project, index) => {
                const isSelected = selectedProject === index;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setSelectedProject(index)}
                    className="cursor-pointer w-full text-left rounded-2xl border p-4 transition-all"
                    style={{
                      backgroundColor: isSelected ? C.active : 'transparent',
                      borderColor: isSelected ? C.seed : cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider" style={{ color: C.subtle }}>
                        {project.column} · {project.days}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase"
                        style={{ backgroundColor: `${project.messColor}1F`, color: project.messColor }}
                      >
                        {project.messLabel} ({project.messScore})
                      </span>
                    </div>
                    <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>{project.name}</p>
                    <p className="text-xs font-mono" style={{ color: C.seed }}>{project.agent}</p>
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl border p-6 space-y-5" style={{ backgroundColor: C.active, borderColor: cardBorder }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider mb-1" style={{ color: C.subtle }}>
                    {active.column} · {active.bucket}
                  </p>
                  <h3 className="font-display text-3xl font-bold" style={{ color: C.ink }}>{active.name}</h3>
                </div>
                <span
                  className="rounded-full px-3 py-1 font-mono text-xs font-bold uppercase"
                  style={{ backgroundColor: `${active.messColor}1F`, color: active.messColor }}
                >
                  Mess {active.messScore}/100 · {active.messLabel}
                </span>
              </div>

              <div className="rounded-xl border p-4" style={{ backgroundColor: C.card, borderColor: cardBorder }}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: C.amber }}>
                  {t('demo.gitLabel')}
                </p>
                <p className="text-sm font-mono" style={{ color: C.muted }}>{active.gitSummary}</p>
              </div>

              <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: C.card, borderColor: cardBorder }}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: C.seed }}>
                    {t('demo.synthLabel')}
                  </p>
                  <span className="font-mono text-[11px]" style={{ color: C.green }}>
                    {active.confidence}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: C.ink }}>{active.lastGoal}</p>
                <ul className="space-y-1.5">
                  {active.nextSteps.map((step) => (
                    <li key={step} className="text-sm flex items-start gap-2" style={{ color: C.muted }}>
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: C.green }} aria-hidden="true" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </LCard>
      </section>

      {/* Architecture & Privacy */}
      <section className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <LCard className="h-full">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.seed }}>
            <Terminal size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('stackLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('stackTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('stackDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <Activity size={18} className="mt-0.5 shrink-0" style={{ color: C.seed }} aria-hidden="true" />
                <p className="leading-relaxed text-sm" style={{ color: C.muted }}>{t(`stackItems.${index}`)}</p>
              </div>
            ))}
          </div>
        </LCard>

        <LCard className="h-full">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.green }}>
            <ShieldCheck size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('safetyLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('safetyTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('safetyDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <CircleCheck size={18} className="mt-0.5 shrink-0" style={{ color: C.green }} aria-hidden="true" />
                <p className="leading-relaxed text-sm" style={{ color: C.muted }}>{t(`safetyItems.${index}`)}</p>
              </div>
            ))}
          </div>
        </LCard>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <LCard className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-3" style={{ color: C.violet }}>
            <Sparkles size={18} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('faqLabel')}</p>
          </div>
          <div className="max-w-3xl mb-8">
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
        </LCard>
      </section>

      {/* Footer CTA */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 p-8 md:p-10"
          style={{
            borderColor: `${C.seed}70`,
            background: `linear-gradient(125deg, ${C.seed} 0%, ${isDark ? '#151b23' : '#dbeafe'} 100%)`,
            color: isDark ? '#e6edf3' : '#1f2328',
          }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('footer.title')}</h2>
          <p className="text-lg max-w-3xl" style={{ opacity: 0.9 }}>{t('footer.desc')}</p>
          <div className="flex flex-wrap gap-5 mt-6">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
            >
              <Github size={16} aria-hidden="true" />
              {t('footer.link_repo')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a
              href={RELEASES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
            >
              <Download size={16} aria-hidden="true" />
              {t('footer.link_releases')}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
