'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleCheck,
  Database,
  Gamepad2,
  Github,
  Globe,
  HardDrive,
  ShieldCheck,
  Timer,
  Upload,
} from 'lucide-react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import PuseSchema from './PuseSchema';

const DARK_THEME = {
  surface: '#0A1123',
  card: '#18223A',
  active: '#131D33',
  primary: '#1C53F6',
  accent: '#E1C144',
  ink: '#FAFAFA',
  muted: '#CBD4EB',
  subtle: '#96A4C7',
};

const LIGHT_THEME = {
  surface: '#FAFAFA',
  card: '#FFFFFF',
  active: '#EEF2FF',
  primary: '#1C53F6',
  accent: '#E1C144',
  ink: '#18223A',
  muted: '#314165',
  subtle: '#5E6E93',
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

export default function PusePageClient() {
  const t = useTranslations('Puse');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted || resolvedTheme === 'dark';
  const C = isDark ? DARK_THEME : LIGHT_THEME;
  const cardBorder = isDark ? 'rgba(250,250,250,0.14)' : 'rgba(24,34,58,0.14)';

  const capabilities = [
    {
      id: 'party',
      icon: <Gamepad2 size={28} style={{ color: C.primary }} />,
      title: t('capabilities.party.title'),
      desc: t('capabilities.party.desc'),
    },
    {
      id: 'pc',
      icon: <HardDrive size={28} style={{ color: C.accent }} />,
      title: t('capabilities.pc.title'),
      desc: t('capabilities.pc.desc'),
    },
    {
      id: 'bag',
      icon: <Database size={28} style={{ color: C.ink }} />,
      title: t('capabilities.bag.title'),
      desc: t('capabilities.bag.desc'),
    },
    {
      id: 'checksum',
      icon: <ShieldCheck size={28} style={{ color: C.primary }} />,
      title: t('capabilities.checksum.title'),
      desc: t('capabilities.checksum.desc'),
    },
  ];

  const flow = [
    {
      id: 'upload',
      icon: <Upload size={24} style={{ color: C.primary }} />,
      title: t('flow.upload.title'),
      desc: t('flow.upload.desc'),
    },
    {
      id: 'edit',
      icon: <Gamepad2 size={24} style={{ color: C.accent }} />,
      title: t('flow.edit.title'),
      desc: t('flow.edit.desc'),
    },
    {
      id: 'validate',
      icon: <ShieldCheck size={24} style={{ color: C.primary }} />,
      title: t('flow.validate.title'),
      desc: t('flow.validate.desc'),
    },
    {
      id: 'export',
      icon: <CheckCircle2 size={24} style={{ color: C.ink }} />,
      title: t('flow.export.title'),
      desc: t('flow.export.desc'),
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
      }}
    >
      <PuseSchema />

      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: `${C.primary}14`, color: C.primary }}
            >
              <Gamepad2 size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div
                className="relative h-14 w-14 md:h-16 md:w-16 rounded-2xl overflow-hidden border"
                style={{ borderColor: `${C.primary}66`, backgroundColor: C.active }}
              >
                <Image
                  src="/puse/icon.webp"
                  alt="PUSE logo"
                  fill
                  sizes="(min-width: 768px) 64px, 56px"
                  quality={100}
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95]" style={{ color: C.ink }}>
                {t('heroTitle')}
              </h1>
            </div>

            <p className="text-2xl md:text-3xl font-display font-bold mb-5" style={{ color: C.primary }}>
              {t('heroSubtitle')}
            </p>

            <p className="text-xl leading-relaxed max-w-3xl mb-4" style={{ color: C.muted }}>
              {t('description')}
            </p>

            <p className="text-base md:text-lg leading-relaxed max-w-3xl mb-8" style={{ color: C.subtle }}>
              {t('supporting')}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[t('chips.0'), t('chips.1'), t('chips.2'), t('chips.3')].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
                  style={{ borderColor: `${C.primary}66`, backgroundColor: `${C.primary}14`, color: C.muted }}
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="https://github.com/Zannael/PUSE" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="primary"
                  className="px-7 py-4 text-base gap-2"
                  style={{ backgroundColor: C.primary, color: '#FAFAFA', borderColor: C.primary }}
                >
                  <Github size={18} />
                  {t('cta_repo')}
                </Button>
              </a>
              <a href="https://zannael.github.io/PUSE/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="secondary"
                  className="px-7 py-4 text-base gap-2"
                  style={{ backgroundColor: C.card, color: C.ink, borderColor: cardBorder }}
                >
                  <Globe size={18} />
                  {t('cta_live')}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card
              className="relative overflow-hidden backdrop-blur-xl"
              style={{ borderColor: cardBorder, backgroundColor: C.card }}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl" style={{ backgroundColor: `${C.primary}22` }} />
              <div className="absolute -bottom-24 -left-24 w-52 h-52 rounded-full blur-3xl" style={{ backgroundColor: `${C.accent}2B` }} />

              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] font-bold" style={{ color: C.subtle }}>
                  {t('heroCard.label')}
                </p>

                <div className="rounded-2xl border p-5" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>
                    {t('heroCard.localTitle')}
                  </p>
                  <p style={{ color: C.muted }}>{t('heroCard.localDesc')}</p>
                </div>

                <div className="rounded-2xl border p-5" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  <p className="font-display text-2xl font-bold mb-1" style={{ color: C.ink }}>
                    {t('heroCard.backendTitle')}
                  </p>
                  <p style={{ color: C.muted }}>{t('heroCard.backendDesc')}</p>
                </div>

                <div className="rounded-2xl border p-5 space-y-2" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                  {[0, 1, 2].map((index) => (
                    <p key={index} className="text-sm flex items-start gap-2" style={{ color: C.muted }}>
                      <CircleCheck size={15} className="mt-0.5 shrink-0" style={{ color: C.primary }} />
                      <span>{t(`heroCard.trust.${index}`)}</span>
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.primary }}>{t('capabilitiesLabel')}</p>
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
              <Card className="h-full group" style={{ borderColor: cardBorder, backgroundColor: C.card }}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: C.active }}
                >
                  {entry.icon}
                </div>
                <h3 className="font-display text-3xl font-bold mb-3" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <Card className="p-8 md:p-10" style={{ borderColor: cardBorder, backgroundColor: C.card }}>
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.primary }}>{t('flowLabel')}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('flowTitle')}</h2>
            <p className="text-lg leading-relaxed" style={{ color: C.muted }}>{t('flowSubtitle')}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {flow.map((entry) => (
              <div key={entry.id} className="rounded-2xl border p-5" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <div className="mb-3">{entry.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-2" style={{ color: C.ink }}>{entry.title}</h3>
                <p className="leading-relaxed" style={{ color: C.muted }}>{entry.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="h-full" style={{ borderColor: cardBorder, backgroundColor: C.card }}>
          <div className="flex items-center gap-3 mb-4" style={{ color: C.primary }}>
            <Database size={20} />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('compatLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('compatTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('compatDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <CircleCheck size={18} className="mt-0.5 shrink-0" style={{ color: C.primary }} />
                <p className="leading-relaxed" style={{ color: C.muted }}>{t(`compatItems.${index}`)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="h-full" style={{ borderColor: cardBorder, backgroundColor: C.card }}>
          <div className="flex items-center gap-3 mb-4" style={{ color: C.primary }}>
            <Timer size={20} />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('limitationsLabel')}</p>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: C.ink }}>{t('limitationsTitle')}</h2>
          <p className="leading-relaxed mb-5" style={{ color: C.muted }}>{t('limitationsDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <AlertTriangle size={18} className="mt-0.5 shrink-0" style={{ color: C.accent }} />
                <p className="leading-relaxed" style={{ color: C.muted }}>{t(`limitationsItems.${index}`)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <Card className="p-8 md:p-10" style={{ borderColor: cardBorder, backgroundColor: C.card }}>
          <div className="flex items-center gap-3 mb-4" style={{ color: C.primary }}>
            <ShieldCheck size={20} />
            <p className="text-xs uppercase tracking-[0.2em] font-bold">{t('positioningLabel')}</p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: C.ink }}>{t('positioningTitle')}</h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: C.muted }}>{t('positioningDescription')}</p>
          <div className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: cardBorder, backgroundColor: C.active }}>
                <CircleCheck size={18} className="mt-0.5 shrink-0" style={{ color: C.primary }} />
                <p className="leading-relaxed" style={{ color: C.muted }}>{t(`positioningPoints.${index}`)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <Card className="p-8 md:p-10" style={{ borderColor: cardBorder, backgroundColor: C.card }}>
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.2em] font-bold mb-3" style={{ color: C.primary }}>{t('faqLabel')}</p>
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
        </Card>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 p-8 md:p-10"
          style={{
            borderColor: `${C.primary}70`,
            background: `linear-gradient(125deg, ${C.primary} 0%, ${isDark ? '#18223A' : '#E7EEFF'} 100%)`,
            color: '#FAFAFA',
          }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('footer.title')}</h2>
          <p className="text-white/85 text-lg max-w-3xl">{t('footer.desc')}</p>
          <div className="flex flex-wrap gap-5 mt-6">
            <a
              href="https://github.com/Zannael/PUSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
            >
              <Github size={16} />
              {t('footer.link_repo')}
              <ArrowUpRight size={15} />
            </a>
            <a
              href="https://zannael.github.io/PUSE/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm hover:opacity-80 transition-opacity"
            >
              <Globe size={16} />
              {t('footer.link_live')}
              <ArrowUpRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
