'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
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
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';

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

  const sections = [
    {
      id: 'audience',
      icon: <UserCheck size={26} className="text-bubblegum" />,
      title: t('sections.audience.title'),
      body: t('sections.audience.body'),
    },
    {
      id: 'data',
      icon: <Database size={26} className="text-forest dark:text-bubblegum" />,
      title: t('sections.data.title'),
      body: t('sections.data.body'),
    },
    {
      id: 'usage',
      icon: <Eye size={26} className="text-ink dark:text-white" />,
      title: t('sections.usage.title'),
      body: t('sections.usage.body'),
    },
    {
      id: 'sharing',
      icon: <Lock size={26} className="text-bubblegum" />,
      title: t('sections.sharing.title'),
      body: t('sections.sharing.body'),
    },
    {
      id: 'retention',
      icon: <Trash2 size={26} className="text-forest dark:text-bubblegum" />,
      title: t('sections.retention.title'),
      body: t('sections.retention.body'),
    },
    {
      id: 'rights',
      icon: <ShieldCheck size={26} className="text-ink dark:text-white" />,
      title: t('sections.rights.title'),
      body: t('sections.rights.body'),
    },
    {
      id: 'children',
      icon: <Baby size={26} className="text-bubblegum" />,
      title: t('sections.children.title'),
      body: t('sections.children.body'),
    },
    {
      id: 'changes',
      icon: <RefreshCw size={26} className="text-forest dark:text-bubblegum" />,
      title: t('sections.changes.title'),
      body: t('sections.changes.body'),
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} className="animate-pulse" />
            <span>{t('badge')}</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] mb-4 text-ink dark:text-white">
            {t('title')}
          </h1>
          <p className="text-xl text-ink/70 dark:text-smoke/70 max-w-3xl leading-relaxed mb-4">
            {t('subtitle')}
          </p>
          <p className="text-sm font-bold uppercase tracking-widest text-ink/50 dark:text-smoke/50">
            {t('effective_date')}
          </p>

          <div className="mt-6">
            <Link href={`/${locale}/capture`}>
              <Button variant="secondary" className="px-6 py-3 text-sm gap-2">
                <ArrowLeft size={16} />
                {t('back_to_capture')}
              </Button>
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
              <Card className="h-full hover:border-bubblegum transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-smoke dark:bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {section.icon}
                </div>
                <h2 className="font-display text-3xl font-bold mb-3 text-ink dark:text-white">
                  {section.title}
                </h2>
                <p className="text-ink/70 dark:text-smoke/70 leading-relaxed">{section.body}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mt-16 rounded-3xl border-2 border-ink/10 dark:border-white/10 bg-gradient-to-r from-forest to-bubblegum text-white p-8 md:p-10"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3">{t('contact.title')}</h2>
          <p className="text-white/90 text-lg max-w-3xl mb-5">{t('contact.body')}</p>
          <a
            href="mailto:magosimo99@gmail.com"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-wide text-sm hover:opacity-85 transition-opacity"
          >
            <Mail size={16} />
            {t('contact.email_label')}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
