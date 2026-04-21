'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  Zap,
  Brain,
  Focus,
  Database,
  Smartphone,
  WifiOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Lock,
  CloudOff,
  UserX,
  Clock,
  Download,
  FileText,
  CheckSquare,
  CalendarClock,
} from 'lucide-react';

const DARK_THEME = {
  surface:   '#131315',
  card:      '#1E1E22',
  active:    '#25252B',
  highlight: '#2A2A31',
  seed:      '#C89B5B',
  ink:       '#F4EEE3',
  muted:     '#B8AD9B',
  success:   '#7FBC8C',
  warning:   '#B76432',
  info:      '#85A9C7',
  danger:    '#D37066',
};

const LIGHT_THEME = {
  surface:   '#F4EEE3',
  card:      '#EEE6D9',
  active:    '#E2D9CC',
  highlight: '#D8CEBF',
  seed:      '#C89B5B',
  ink:       '#131315',
  muted:     'rgba(19,19,21,0.72)',
  success:   '#7FBC8C',
  warning:   '#B76432',
  info:      '#85A9C7',
  danger:    '#D37066',
};

const container = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 55, damping: 18 } },
};

function CCard({ children, className = '', style = {} }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
      style={{ backgroundColor: 'var(--capture-card)', borderColor: 'var(--capture-card-border)', ...style }}
    >
      {children}
    </div>
  );
}

function NodePill({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>
        {label}
      </span>
    </span>
  );
}

export default function CapturePageClient() {
  const t = useTranslations('Capture');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(19,19,21,0.12)';
  const panelBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(19,19,21,0.1)';
  const innerBorder = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(19,19,21,0.1)';

  const mockNodes = [
    { type: t('node_types.note'),  color: C.seed,    Icon: FileText,      text: t('mock.note'),  meta: null },
    { type: t('node_types.task'),  color: C.success,  Icon: CheckSquare,   text: t('mock.task'),  meta: null },
    { type: t('node_types.event'), color: C.warning,  Icon: CalendarClock, text: t('mock.event'), meta: t('mock.event_meta') },
  ];

  const instantItems = [
    { id: 'i1', icon: <Zap size={22} style={{ color: C.seed }} />,       title: t('instant.item_1_title'), desc: t('instant.item_1_desc') },
    { id: 'i2', icon: <Sparkles size={22} style={{ color: C.seed }} />,   title: t('instant.item_2_title'), desc: t('instant.item_2_desc') },
    { id: 'i3', icon: <Smartphone size={22} style={{ color: C.seed }} />, title: t('instant.item_3_title'), desc: t('instant.item_3_desc') },
  ];

  const focusItems = [
    { id: 'f1', icon: <Focus size={22} style={{ color: C.info }} />, title: t('focus.item_1_title'), desc: t('focus.item_1_desc') },
    { id: 'f2', icon: <Brain size={22} style={{ color: C.info }} />, title: t('focus.item_2_title'), desc: t('focus.item_2_desc') },
    { id: 'f3', icon: <Clock size={22} style={{ color: C.info }} />, title: t('focus.item_3_title'), desc: t('focus.item_3_desc') },
  ];

  const dataItems = [
    { id: 'd1', icon: <CloudOff size={22} style={{ color: C.seed }} />,  title: t('data_yours.item_1_title'), desc: t('data_yours.item_1_desc') },
    { id: 'd2', icon: <Database size={22} style={{ color: C.seed }} />,  title: t('data_yours.item_2_title'), desc: t('data_yours.item_2_desc') },
    { id: 'd3', icon: <UserX size={22} style={{ color: C.seed }} />,     title: t('data_yours.item_3_title'), desc: t('data_yours.item_3_desc') },
    { id: 'd4', icon: <Download size={22} style={{ color: C.seed }} />,  title: t('data_yours.item_4_title'), desc: t('data_yours.item_4_desc') },
  ];

  const features = [
    { id: 'capture',     icon: <Zap size={28} style={{ color: C.seed }} />,          title: t('features.capture.title'),     desc: t('features.capture.desc') },
    { id: 'node',        icon: <Database size={28} style={{ color: C.muted }} />,     title: t('features.node.title'),        desc: t('features.node.desc') },
    { id: 'now',         icon: <Clock size={28} style={{ color: C.info }} />,         title: t('features.now.title'),         desc: t('features.now.desc') },
    { id: 'progressive', icon: <CalendarClock size={28} style={{ color: C.warning }} />, title: t('features.progressive.title'), desc: t('features.progressive.desc') },
  ];

  const comparisons = [
    { id: 'notion',   name: t('comparison.notion.name'),   pro: t('comparison.notion.pro'),   desc: t('comparison.notion.desc') },
    { id: 'obsidian', name: t('comparison.obsidian.name'), pro: t('comparison.obsidian.pro'), desc: t('comparison.obsidian.desc') },
    { id: 'todoist',  name: t('comparison.todoist.name'),  pro: t('comparison.todoist.pro'),  desc: t('comparison.todoist.desc') },
  ];

  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    id: `faq-${n}`,
    q: t(`faq.q${n}`),
    a: t(`faq.a${n}`),
  }));

  return (
    <main
      className="min-h-screen pt-32 pb-20"
      style={{
        backgroundColor: C.surface,
        color: C.ink,
        '--capture-card': C.card,
        '--capture-card-border': cardBorder,
      }}
    >

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16" id="quick-capture-notes-app">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div
                className="relative h-11 w-11 rounded-xl overflow-hidden border"
                style={{ borderColor: `${C.seed}55`, backgroundColor: C.highlight }}
              >
                <Image src="/logo.jpg" alt="Capture logo" fill sizes="44px" className="object-cover" priority />
              </div>
              <span className="font-display text-2xl font-bold" style={{ color: C.ink }}>
                Capture
              </span>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest"
                style={{ backgroundColor: `${C.seed}18`, color: C.seed }}
              >
                <Focus size={14} className="animate-pulse" />
                <span>{t('badge')}</span>
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-5">
              <span style={{ color: C.ink }}>{t('hero.headline_1')}</span>
              <span className="block mt-1" style={{ color: C.seed }}>{t('hero.headline_2')}</span>
            </h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { Icon: WifiOff, label: t('hero.badge_offline') },
                { Icon: UserX,   label: t('hero.badge_private') },
                { Icon: Lock,    label: t('hero.badge_local') },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium"
                  style={{ borderColor: `${C.seed}40`, color: C.muted }}
                >
                  <Icon size={12} /> {label}
                </span>
              ))}
            </div>

            <p className="text-xl leading-relaxed max-w-2xl mb-8" style={{ color: C.muted }}>
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-base transition-opacity hover:opacity-80"
                style={{ backgroundColor: C.seed, color: C.ink }}
              >
                {t('cta_soon')} <ArrowRight size={17} />
              </button>
              <Link
                href={`/${locale}/capture/privacy`}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border font-bold text-base transition-opacity hover:opacity-70"
                style={{ borderColor: `${C.seed}40`, color: C.muted }}
              >
                <ShieldCheck size={17} /> {t('cta_privacy')}
              </Link>
            </div>
          </motion.div>

          {/* ── Node mockup ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div
              className="relative rounded-3xl p-6 border overflow-hidden"
              style={{ backgroundColor: C.card, borderColor: panelBorder }}
            >
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: `radial-gradient(circle, ${C.seed}22 0%, transparent 70%)` }}
              />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] font-bold mb-4" style={{ color: C.muted }}>
                  {t('workflow_label')}
                </p>
                <div className="space-y-3">
                  {mockNodes.map(({ type, color, Icon, text, meta }) => (
                    <div
                      key={type}
                      className="rounded-xl border p-4"
                      style={{ backgroundColor: C.active, borderColor: innerBorder }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <NodePill color={color} label={type} />
                        <Icon size={13} style={{ color, opacity: 0.65 }} />
                      </div>
                      <p className="text-sm font-medium" style={{ color: C.ink }}>{text}</p>
                      {meta && <p className="text-xs mt-1" style={{ color: C.muted }}>{meta}</p>}
                    </div>
                  ))}
                </div>
                <div
                  className="mt-4 rounded-xl p-3 flex items-center gap-3 border"
                  style={{ backgroundColor: `${C.success}14`, borderColor: `${C.success}30` }}
                >
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: C.success }} />
                  <span className="text-xs font-semibold" style={{ color: C.success }}>{t('mock.active_label')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INSTANT CAPTURE ── */}
      <section className="max-w-6xl mx-auto px-4 mt-28" id="offline-note-taking-app">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('instant.label')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('instant.title')}</h2>
          <p className="text-lg max-w-2xl" style={{ color: C.muted }}>{t('instant.subtitle')}</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid md:grid-cols-3 gap-6">
          {instantItems.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <CCard className="h-full group cursor-default">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${C.seed}18` }}
                >
                  {entry.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </CCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FOCUS TODAY ── */}
      <section className="max-w-6xl mx-auto px-4 mt-20" id="daily-focus-app">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.info }}>{t('focus.label')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('focus.title')}</h2>
          <p className="text-lg max-w-2xl" style={{ color: C.muted }}>{t('focus.subtitle')}</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid md:grid-cols-3 gap-6">
          {focusItems.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <CCard className="h-full group cursor-default">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${C.info}18` }}
                >
                  {entry.icon}
                </div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </CCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── YOUR DATA STAYS YOURS ── */}
      <section className="max-w-6xl mx-auto px-4 mt-20" id="private-notes-on-device">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 border relative overflow-hidden"
          style={{ backgroundColor: C.card, borderColor: `${C.seed}30` }}
        >
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${C.seed}18 0%, transparent 70%)` }}
          />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.seed }}>{t('data_yours.label')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('data_yours.title')}</h2>
            <p className="text-lg max-w-2xl mb-10" style={{ color: C.muted }}>{t('data_yours.subtitle')}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {dataItems.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl p-5 border"
                  style={{ backgroundColor: C.active, borderColor: panelBorder }}
                >
                  <div className="mb-4">{entry.icon}</div>
                  <h3 className="font-display text-xl font-bold mb-2" style={{ color: C.ink }}>{entry.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CORE FEATURES ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16" id="capture-vs-alternatives">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold"
            style={{ color: C.ink }}
          >
            {t('features_title')}
          </motion.h2>
        </div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} className="grid md:grid-cols-2 gap-6">
          {features.map((entry) => (
            <motion.div key={entry.id} variants={item}>
              <CCard className="h-full group cursor-default">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: C.active }}
                >
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </CCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.muted }}>{t('comparison.label')}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('comparison.title')}</h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: C.muted }}>{t('comparison.subtitle')}</p>
        </motion.div>
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className="grid md:grid-cols-3 gap-6">
          {comparisons.map((comp) => (
            <motion.div key={comp.id} variants={item}>
              <CCard className="h-full cursor-default">
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border"
                  style={{ borderColor: `${C.seed}40`, color: C.seed, backgroundColor: `${C.seed}10` }}
                >
                  {comp.name}
                </div>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: C.ink }}>{comp.pro}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{comp.desc}</p>
              </CCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-4 mt-16" id="capture-faq">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: C.ink }}>{t('faq.title')}</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: C.card, borderColor: cardBorder }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                aria-expanded={openFaq === faq.id}
              >
                <span className="font-display text-lg font-bold pr-4" style={{ color: C.ink }}>{faq.q}</span>
                <ChevronDown
                  size={20}
                  style={{ color: C.muted }}
                  className={`shrink-0 transition-transform duration-200 ${openFaq === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === faq.id && (
                <div className="px-6 pb-5 leading-relaxed" style={{ color: C.muted }}>{faq.a}</div>
              )}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-10 border relative overflow-hidden"
          style={{ backgroundColor: C.card, borderColor: `${C.seed}40` }}
        >
          <div
            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${C.seed}20 0%, transparent 70%)` }}
          />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: C.ink }}>{t('footer.title')}</h2>
            <p className="text-lg max-w-3xl" style={{ color: C.muted }}>{t('footer.desc')}</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
