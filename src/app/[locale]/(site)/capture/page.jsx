'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  Zap,
  Brain,
  Rocket,
  Clock,
  Focus,
  Database,
  Smartphone,
  WifiOff,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';

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

export default function CapturePage() {
  const t = useTranslations('Capture');

  const principles = [
    {
      id: 'speed',
      icon: <Zap size={28} className="text-bubblegum" />,
      title: t('principles.speed.title'),
      desc: t('principles.speed.desc'),
    },
    {
      id: 'clarity',
      icon: <Focus size={28} className="text-forest dark:text-bubblegum" />,
      title: t('principles.clarity.title'),
      desc: t('principles.clarity.desc'),
    },
    {
      id: 'calm',
      icon: <Brain size={28} className="text-ink dark:text-white" />,
      title: t('principles.calm.title'),
      desc: t('principles.calm.desc'),
    },
    {
      id: 'local',
      icon: <WifiOff size={28} className="text-bubblegum" />,
      title: t('principles.local.title'),
      desc: t('principles.local.desc'),
    },
    {
      id: 'context',
      icon: <Sparkles size={28} className="text-forest dark:text-bubblegum" />,
      title: t('principles.context.title'),
      desc: t('principles.context.desc'),
    },
  ];

  const features = [
    {
      id: 'capture',
      icon: <Zap size={28} className="text-bubblegum" />,
      title: t('features.capture.title'),
      desc: t('features.capture.desc'),
    },
    {
      id: 'node',
      icon: <Database size={28} className="text-forest dark:text-bubblegum" />,
      title: t('features.node.title'),
      desc: t('features.node.desc'),
    },
    {
      id: 'now',
      icon: <Clock size={28} className="text-ink dark:text-white" />,
      title: t('features.now.title'),
      desc: t('features.now.desc'),
    },
    {
      id: 'progressive',
      icon: <Rocket size={28} className="text-bubblegum" />,
      title: t('features.progressive.title'),
      desc: t('features.progressive.desc'),
    },
  ];

  const tech = [
    {
      id: 'sqlite',
      icon: <Database size={28} className="text-bubblegum" />,
      title: t('tech.sqlite.title'),
      desc: t('tech.sqlite.desc'),
    },
    {
      id: 'local',
      icon: <WifiOff size={28} className="text-forest dark:text-bubblegum" />,
      title: t('tech.local.title'),
      desc: t('tech.local.desc'),
    },
    {
      id: 'mobile',
      icon: <Smartphone size={28} className="text-ink dark:text-white" />,
      title: t('tech.mobile.title'),
      desc: t('tech.mobile.desc'),
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
              <Focus size={14} className="animate-pulse" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white">
              Capture
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-forest to-bubblegum dark:from-violet-300 dark:to-pink-300 text-3xl md:text-5xl mt-2">
                {t('tagline')}
              </span>
            </h1>

            <p className="text-xl text-ink/70 dark:text-smoke/70 leading-relaxed max-w-2xl">
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              {/* TODO: Add repository link when available */}
              {/* <a href="https://github.com/your-org/capture" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="px-7 py-4 text-base gap-2">
                  <Github size={18} />
                  {t('cta_repo')}
                </Button>
              </a> */}
              {/* TODO: Add Play Store link when available */}
              {/* <a href="https://play.google.com/store/apps/details?id=..." target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="px-7 py-4 text-base gap-2">
                  <Smartphone size={18} />
                  {t('cta_playstore')}
                </Button>
              </a> */}
              <Button variant="secondary" className="px-7 py-4 text-base gap-2">
                {t('cta_soon')}
                <ArrowRight size={17} />
              </Button>
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

              <div className="relative">
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-ink/50 dark:text-smoke/50 mb-4">
                  {t('workflow_label')}
                </p>
                <div className="space-y-4">
                  <div className="rounded-2xl border border-ink/10 dark:border-white/10 p-5 bg-paper/80 dark:bg-white/5">
                    <p className="font-display text-2xl font-bold text-ink dark:text-white mb-1">
                      {t('workflow.capture.title')}
                    </p>
                    <p className="text-ink/70 dark:text-smoke/70">{t('workflow.capture.desc')}</p>
                  </div>
                  <div className="rounded-2xl border border-ink/10 dark:border-white/10 p-5 bg-paper/80 dark:bg-white/5">
                    <p className="font-display text-2xl font-bold text-ink dark:text-white mb-1">
                      {t('workflow.structure.title')}
                    </p>
                    <p className="text-ink/70 dark:text-smoke/70">{t('workflow.structure.desc')}</p>
                  </div>
                  <div className="rounded-2xl border border-ink/10 dark:border-white/10 p-5 bg-paper/80 dark:bg-white/5">
                    <p className="font-display text-2xl font-bold text-ink dark:text-white mb-1">
                      {t('workflow.act.title')}
                    </p>
                    <p className="text-ink/70 dark:text-smoke/70">{t('workflow.act.desc')}</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-24">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            {t('principles_title')}
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {principles.map((entry) => (
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
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-4xl md:text-5xl font-bold"
          >
            {t('features_title')}
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-80px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((entry) => (
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
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">{t('tech_title')}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {tech.map((entry) => (
              <div key={entry.id} className="rounded-2xl p-5 bg-white/10 border border-white/20">
                <div className="mb-4 text-white">{entry.icon}</div>
                <h3 className="font-display text-2xl font-bold mb-2">{entry.title}</h3>
                <p className="text-white/85">{entry.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="rounded-3xl border-2 border-ink/10 dark:border-white/10 bg-gradient-to-r from-forest to-bubblegum text-white p-8 md:p-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('footer.title')}</h2>
          <p className="text-white/85 text-lg max-w-3xl">{t('footer.desc')}</p>
        </motion.div>
      </div>
    </div>
  );
}