'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  ShieldCheck,
  Database,
  Eye,
  Lock,
  Trash2,
  UserCheck,
  Baby,
  RefreshCw,
  Mail,
  ArrowLeft,
} from 'lucide-react';

const DARK_THEME = {
  surface: '#131315',
  card: '#1E1E22',
  active: '#25252B',
  highlight: '#2A2A31',
  seed: '#C89B5B',
  ink: '#F4EEE3',
  muted: '#B8AD9B',
  success: '#7FBC8C',
  warning: '#B76432',
  info: '#85A9C7',
};

const LIGHT_THEME = {
  surface: '#F4EEE3',
  card: '#EEE6D9',
  active: '#E2D9CC',
  highlight: '#D8CEBF',
  seed: '#C89B5B',
  ink: '#131315',
  muted: 'rgba(19,19,21,0.72)',
  success: '#7FBC8C',
  warning: '#B76432',
  info: '#85A9C7',
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 55, damping: 18 },
  },
};

export default function CapturePrivacyPage() {
  const t = useTranslations('CapturePrivacy');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(19,19,21,0.12)';

  const sections = [
    {
      id: 'audience',
      icon: <UserCheck size={24} style={{ color: C.seed }} />,
      title: t('sections.audience.title'),
      body: t('sections.audience.body'),
    },
    {
      id: 'data',
      icon: <Database size={24} style={{ color: C.info }} />,
      title: t('sections.data.title'),
      body: t('sections.data.body'),
    },
    {
      id: 'usage',
      icon: <Eye size={24} style={{ color: C.ink }} />,
      title: t('sections.usage.title'),
      body: t('sections.usage.body'),
    },
    {
      id: 'sharing',
      icon: <Lock size={24} style={{ color: C.seed }} />,
      title: t('sections.sharing.title'),
      body: t('sections.sharing.body'),
    },
    {
      id: 'retention',
      icon: <Trash2 size={24} style={{ color: C.warning }} />,
      title: t('sections.retention.title'),
      body: t('sections.retention.body'),
    },
    {
      id: 'rights',
      icon: <ShieldCheck size={24} style={{ color: C.success }} />,
      title: t('sections.rights.title'),
      body: t('sections.rights.body'),
    },
    {
      id: 'children',
      icon: <Baby size={24} style={{ color: C.seed }} />,
      title: t('sections.children.title'),
      body: t('sections.children.body'),
    },
    {
      id: 'changes',
      icon: <RefreshCw size={24} style={{ color: C.info }} />,
      title: t('sections.changes.title'),
      body: t('sections.changes.body'),
    },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20" style={{ backgroundColor: C.surface, color: C.ink }}>
      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
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
              <ShieldCheck size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-4" style={{ color: C.ink }}>
            {t('title')}
          </h1>
          <p className="text-xl max-w-3xl leading-relaxed mb-4" style={{ color: C.muted }}>
            {t('subtitle')}
          </p>
          <p className="text-sm font-bold uppercase tracking-widest" style={{ color: C.muted }}>
            {t('effective_date')}
          </p>

          <div className="mt-6">
            <Link
              href={`/${locale}/capture`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border text-sm font-bold transition-opacity hover:opacity-75"
              style={{ borderColor: `${C.seed}40`, color: C.muted }}
            >
              <ArrowLeft size={16} />
              {t('back_to_capture')}
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {sections.map((section) => (
            <motion.div key={section.id} variants={item}>
              <div
                className="h-full rounded-2xl border p-5 transition-colors group"
                style={{ backgroundColor: C.card, borderColor: cardBorder }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: C.active }}
                >
                  {section.icon}
                </div>
                <h2 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>
                  {section.title}
                </h2>
                <p className="leading-relaxed" style={{ color: C.muted }}>{section.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mt-16 rounded-3xl border p-8 md:p-10 relative overflow-hidden"
          style={{ backgroundColor: C.card, borderColor: `${C.seed}40` }}
        >
          <div
            className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none"
            style={{ background: `radial-gradient(circle, ${C.seed}20 0%, transparent 70%)` }}
          />
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 relative" style={{ color: C.ink }}>
            {t('contact.title')}
          </h2>
          <p className="text-lg max-w-3xl mb-5 relative" style={{ color: C.muted }}>{t('contact.body')}</p>
          <a
            href="mailto:magosimo99@gmail.com"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm hover:opacity-85 transition-opacity relative"
            style={{ color: C.seed }}
          >
            <Mail size={16} />
            {t('contact.email_label')}
          </a>
        </motion.div>
      </div>
    </main>
  );
}
