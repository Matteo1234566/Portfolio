'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  ArrowUpRight,
  Blocks,
  Box,
  CheckCircle2,
  CircleAlert,
  CircleCheck,
  Cpu,
  Gamepad2,
  Github,
  Layers,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
} from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import TaurosSignature from './TaurosSignature';

const REPO_URL = 'https://github.com/Zannael/tauros';

const DARK_THEME = {
  surface: '#141210',
  card: '#1D1916',
  active: '#27211C',
  seed: '#E69F45',
  terminal: '#4ADE80',
  visor: '#38BDF8',
  ink: '#FAF5EE',
  muted: '#D6CBC0',
  subtle: '#9E9184',
  onSeed: '#141210',
};

const LIGHT_THEME = {
  surface: '#FAF5EE',
  card: '#FFFFFF',
  active: '#F2E9DD',
  seed: '#B45309',
  terminal: '#15803D',
  visor: '#0284C7',
  ink: '#181310',
  muted: '#443B34',
  subtle: '#6E6156',
  onSeed: '#FFFFFF',
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

function TCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-3xl border p-6 ${className}`}
      style={{
        backgroundColor: 'var(--tauros-card)',
        borderColor: 'var(--tauros-card-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function TaurosPageClient() {
  const t = useTranslations('Tauros');
  const { resolvedTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('layers');
  const [selectedLayer, setSelectedLayer] = useState(0);
  const [selectedProbe, setSelectedProbe] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(250,245,238,0.14)' : 'rgba(24,19,16,0.14)';

  const capabilities = [
    {
      id: 'model',
      icon: <Layers size={28} style={{ color: C.seed }} />,
      title: t('capabilities.model.title'),
      desc: t('capabilities.model.desc'),
    },
    {
      id: 'mcp',
      icon: <Terminal size={28} style={{ color: C.terminal }} />,
      title: t('capabilities.mcp.title'),
      desc: t('capabilities.mcp.desc'),
    },
    {
      id: 'emu',
      icon: <Gamepad2 size={28} style={{ color: C.visor }} />,
      title: t('capabilities.emu.title'),
      desc: t('capabilities.emu.desc'),
    },
    {
      id: 'toolchain',
      icon: <ShieldCheck size={28} style={{ color: C.seed }} />,
      title: t('capabilities.toolchain.title'),
      desc: t('capabilities.toolchain.desc'),
    },
  ];

  const layers = [0, 1, 2, 3, 4].map((index) => ({
    id: `layer-${index}`,
    badge: t(`workbench.layers.${index}.badge`),
    title: t(`workbench.layers.${index}.title`),
    crate: t(`workbench.layers.${index}.crate`),
    summary: t(`workbench.layers.${index}.summary`),
    contract: t(`workbench.layers.${index}.contract`),
  }));

  const counterfactuals = [0, 1, 2, 3, 4].map((index) => ({
    id: `cf-${index}`,
    key: t(`workbench.counterfactuals.${index}.key`),
    verdict: t(`workbench.counterfactuals.${index}.verdict`),
    tone: index === 0 ? C.terminal : C.seed,
    title: t(`workbench.counterfactuals.${index}.title`),
    detail: t(`workbench.counterfactuals.${index}.detail`),
  }));

  const limits = [0, 1, 2, 3, 4].map((index) => ({
    metric: t(`workbench.limits.${index}.metric`),
    value: t(`workbench.limits.${index}.value`),
    source: t(`workbench.limits.${index}.source`),
    note: t(`workbench.limits.${index}.note`),
  }));

  const connectors = [
    { id: 'gen3', icon: Cpu, accent: C.terminal },
    { id: 'gen12', icon: Blocks, accent: C.seed },
    { id: 'ds', icon: Box, accent: C.visor },
  ];

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
        '--tauros-card': C.card,
        '--tauros-card-border': cardBorder,
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
              <Terminal size={14} className={reduceMotion ? '' : 'animate-pulse'} aria-hidden="true" />
              <span>{t('badge')}</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div
                className="relative h-16 w-16 md:h-20 md:w-20 rounded-2xl overflow-hidden border shrink-0"
                style={{ borderColor: `${C.seed}66`, backgroundColor: C.active }}
              >
                <Image
                  src="/tauros/logo.avif"
                  alt="Tauros pixel logo"
                  fill
                  sizes="(min-width: 768px) 80px, 64px"
                  quality={100}
                  className="object-contain p-1.5"
                  style={{ imageRendering: 'pixelated' }}
                  priority
                />
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9]" style={{ color: C.ink }}>
                Tauros
              </h1>
            </div>

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
              <a
                href="#architecture"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-display font-bold uppercase tracking-wide transition-all duration-200 border-2 hover:opacity-85 focus:outline-none focus:ring-2"
                style={{ backgroundColor: C.card, color: C.ink, borderColor: cardBorder }}
              >
                {t('cta_architecture')}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <TaurosSignature />
            <TCard className="relative overflow-hidden backdrop-blur-xl">
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${C.seed}24` }} />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full blur-3xl" style={{ backgroundColor: `${C.visor}22` }} />

              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: C.subtle }}>
                    {t('heroCard.label')}
                  </p>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: `${C.terminal}18`, color: C.terminal }}
                  >
                    {t('heroCard.status')}
                  </span>
                </div>

                <div className="rounded-2xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>
                    {t('heroCard.workspaceTitle')}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.workspaceDesc')}</p>
                </div>

                <div className="rounded-2xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>
                    {t('heroCard.loopTitle')}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{t('heroCard.loopDesc')}</p>
                </div>

                <div className="rounded-2xl border p-4 space-y-2" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  {[0, 1, 2].map((index) => (
                    <p key={index} className="text-sm flex items-start gap-2" style={{ color: C.muted }}>
                      <CircleCheck size={15} className="mt-0.5 shrink-0" style={{ color: C.terminal }} aria-hidden="true" />
                      <span>{t(`heroCard.verified.${index}`)}</span>
                    </p>
                  ))}
                </div>
              </div>
            </TCard>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="architecture" className="max-w-6xl mx-auto px-4 mt-24 scroll-mt-28">
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
              <TCard className="h-full group">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
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

      {/* Interactive Workbench Explorer */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <TCard className="p-6 md:p-10 relative overflow-hidden">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: C.visor }}>
                {t('workbench.eyebrow')}
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-3" style={{ color: C.ink }}>
                {t('workbench.title')}
              </h2>
              <p className="leading-relaxed" style={{ color: C.muted }}>
                {t('workbench.description')}
              </p>
            </div>

            <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('workbench.title')}>
              {[
                { id: 'layers', label: t('workbench.tabs.layers') },
                { id: 'verify', label: t('workbench.tabs.verify') },
                { id: 'limits', label: t('workbench.tabs.limits') },
              ].map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveTab(tab.id)}
                    className="cursor-pointer rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                    style={{
                      backgroundColor: active ? C.seed : C.active,
                      color: active ? C.onSeed : C.ink,
                      borderColor: active ? C.seed : cardBorder,
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {activeTab === 'layers' && (
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-start">
              <div className="space-y-2.5">
                {layers.map((layer, index) => {
                  const active = selectedLayer === index;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setSelectedLayer(index)}
                      className="cursor-pointer w-full text-left rounded-2xl border p-4 transition-all"
                      style={{
                        backgroundColor: active ? C.active : 'transparent',
                        borderColor: active ? C.seed : cardBorder,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: active ? C.seed : C.subtle }}>
                          {layer.badge}
                        </span>
                        <span className="font-mono text-xs" style={{ color: C.visor }}>
                          {layer.crate}
                        </span>
                      </div>
                      <p className="font-display text-xl font-bold" style={{ color: C.ink }}>
                        {layer.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border p-6 md:p-7" style={{ backgroundColor: C.active, borderColor: cardBorder }}>
                <p className="font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: C.seed }}>
                  {layers[selectedLayer].badge} · {layers[selectedLayer].crate}
                </p>
                <h3 className="font-display text-3xl font-bold mb-4" style={{ color: C.ink }}>
                  {layers[selectedLayer].title}
                </h3>
                <p className="text-base leading-relaxed mb-6" style={{ color: C.muted }}>
                  {layers[selectedLayer].summary}
                </p>
                <div className="rounded-xl border p-4" style={{ backgroundColor: C.card, borderColor: cardBorder }}>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] mb-1.5" style={{ color: C.terminal }}>
                    {t('workbench.contractLabel')}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                    {layers[selectedLayer].contract}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verify' && (
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
              <div className="space-y-2.5">
                {counterfactuals.map((entry, index) => {
                  const active = selectedProbe === index;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setSelectedProbe(index)}
                      className="cursor-pointer w-full text-left rounded-2xl border p-4 transition-all flex items-center justify-between gap-3"
                      style={{
                        backgroundColor: active ? C.active : 'transparent',
                        borderColor: active ? C.seed : cardBorder,
                      }}
                    >
                      <div>
                        <p className="font-mono text-xs font-bold" style={{ color: C.visor }}>{entry.key}</p>
                        <p className="font-display text-xl font-bold" style={{ color: C.ink }}>{entry.title}</p>
                      </div>
                      <span
                        className="rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase"
                        style={{ backgroundColor: `${entry.tone}1F`, color: entry.tone }}
                      >
                        {entry.verdict}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border p-6 md:p-7 space-y-5" style={{ backgroundColor: C.active, borderColor: cardBorder }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: C.visor }}>
                    {counterfactuals[selectedProbe].key}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 font-mono text-xs font-bold uppercase"
                    style={{
                      backgroundColor: `${counterfactuals[selectedProbe].tone}1F`,
                      color: counterfactuals[selectedProbe].tone,
                    }}
                  >
                    {counterfactuals[selectedProbe].verdict}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-bold" style={{ color: C.ink }}>
                  {counterfactuals[selectedProbe].title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: C.muted }}>
                  {counterfactuals[selectedProbe].detail}
                </p>
                <div className="rounded-xl border p-4 font-mono text-xs leading-relaxed" style={{ backgroundColor: C.card, borderColor: cardBorder, color: C.muted }}>
                  {t('workbench.specNote')}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'limits' && (
            <div className="grid gap-4 md:grid-cols-2">
              {limits.map((limit) => (
                <div
                  key={limit.metric}
                  className="rounded-2xl border p-5"
                  style={{ backgroundColor: C.active, borderColor: cardBorder }}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-2xl font-bold" style={{ color: C.ink }}>
                      {limit.metric}
                    </h3>
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${C.seed}20`, color: C.seed }}>
                      {limit.value}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: C.muted }}>
                    {limit.note}
                  </p>
                  <p className="font-mono text-[11px]" style={{ color: C.subtle }}>
                    {limit.source}
                  </p>
                </div>
              ))}
            </div>
          )}
        </TCard>
      </section>

      {/* Foundations & Guardrails */}
      <section className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <TCard className="h-full">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.terminal }}>
            <Wrench size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('foundationsLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('foundationsTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('foundationsDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" style={{ color: C.terminal }} aria-hidden="true" />
                <p className="leading-relaxed text-sm" style={{ color: C.muted }}>{t(`foundationsItems.${index}`)}</p>
              </div>
            ))}
          </div>
        </TCard>

        <TCard className="h-full">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.seed }}>
            <LockKeyhole size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('guardrailsLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('guardrailsTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('guardrailsDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <CircleAlert size={18} className="mt-0.5 shrink-0" style={{ color: C.seed }} aria-hidden="true" />
                <p className="leading-relaxed text-sm" style={{ color: C.muted }}>{t(`guardrailsItems.${index}`)}</p>
              </div>
            ))}
          </div>
        </TCard>
      </section>

      {/* Multi-Generation Connector Roadmap */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.visor }}>{t('connectorsLabel')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('connectorsTitle')}</h2>
          <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('connectorsSubtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {connectors.map(({ id, icon: Icon, accent }) => (
            <TCard key={id} className="h-full">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: C.active }}>
                  <Icon size={24} style={{ color: accent }} aria-hidden="true" />
                </div>
                <span
                  className="rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase"
                  style={{ backgroundColor: `${accent}1A`, color: accent }}
                >
                  {t(`connectors.${id}.status`)}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2" style={{ color: C.ink }}>
                {t(`connectors.${id}.title`)}
              </h3>
              <p className="text-sm font-mono mb-3" style={{ color: C.subtle }}>
                {t(`connectors.${id}.targets`)}
              </p>
              <p className="leading-relaxed text-sm" style={{ color: C.muted }}>
                {t(`connectors.${id}.desc`)}
              </p>
            </TCard>
          ))}
        </div>
      </section>

      {/* Prior art & FAQ */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <TCard className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4" style={{ color: C.terminal }}>
            <Sparkles size={20} aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('creditsLabel')}</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('creditsTitle')}</h2>
          <p className="leading-relaxed mb-6 max-w-4xl" style={{ color: C.muted }}>{t('creditsDescription')}</p>

          <div className="border-t pt-8 mt-8" style={{ borderColor: cardBorder }}>
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
          </div>
        </TCard>
      </section>

      {/* Footer Banner */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 p-8 md:p-10"
          style={{
            borderColor: `${C.seed}70`,
            background: `linear-gradient(125deg, ${C.seed} 0%, ${isDark ? '#1D1916' : '#E8D9C5'} 100%)`,
            color: isDark ? '#FAF5EE' : '#181310',
          }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('footer.title')}</h2>
          <p className="text-lg max-w-3xl" style={{ opacity: 0.9 }}>{t('footer.desc')}</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-wide mt-6 text-sm hover:opacity-80 transition-opacity"
          >
            <Github size={16} aria-hidden="true" />
            {t('footer.link_repo')}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </main>
  );
}
