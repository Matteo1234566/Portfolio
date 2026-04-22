'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Card from '@/app/[locale]/(site)/sections/ui/Card';

export default function ProcessFaq() {
  const t = useTranslations('ProcessFaq');

  const process = [0, 1, 2, 3].map((index) => ({
    step: t(`process.${index}.step`),
    title: t(`process.${index}.title`),
    description: t(`process.${index}.description`),
  }));

  const faq = [0, 1, 2, 3].map((index) => ({
    question: t(`faq.${index}.question`),
    answer: t(`faq.${index}.answer`),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-3 block">
            {t('label')}
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-ink dark:text-white mb-5">
            {t('title.start')} <br />
            <span className="text-forest dark:text-bubblegum">{t('title.highlight')}</span>
          </h2>
          <p className="text-lg leading-relaxed text-ink/70 dark:text-smoke/80 max-w-2xl mb-8">
            {t('intro')}
          </p>

          <div className="space-y-4">
            {process.map((item) => (
              <Card key={item.step} className="border-ink/10 dark:border-white/10 bg-white/80 dark:bg-white/5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bubblegum mb-2">{item.step}</p>
                <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-3">{item.title}</h3>
                <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{item.description}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          {faq.map((item) => (
            <Card key={item.question} className="border-ink/10 dark:border-white/10 bg-paper dark:bg-ink">
              <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-3">{item.question}</h3>
              <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{item.answer}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
