'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, HardDrive, Network, ServerCog, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Card from '@/app/[locale]/(site)/sections/ui/Card';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20 },
  },
};

export default function Services() {
  const t = useTranslations('Services');
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';

  const services = [
    {
      id: 'homelab-creation',
      title: t('items.homelab.title'),
      description: t('items.homelab.description'),
      eyebrow: t('items.homelab.eyebrow'),
      href: `/${currentLocale}/homelab-creation`,
      tags: [t('items.homelab.tags.0'), t('items.homelab.tags.1'), t('items.homelab.tags.2')],
      icons: [ServerCog, Network, HardDrive, ShieldCheck],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 relative z-10">
      <div className="mb-14 text-center md:text-left">
        <motion.span
          initial={reduceMotion ? false : { opacity: 0, x: -20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: false }}
          className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-3 block"
        >
          {t('label')}
        </motion.span>
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold text-white leading-tight"
        >
          {t('heading.top')} <br />
          <span className="text-bubblegum italic">{t('heading.highlight')}</span>
        </motion.h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
          {t('intro')}
        </p>
      </div>

      <motion.div
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? false : 'hidden'}
        whileInView={reduceMotion ? undefined : 'show'}
        viewport={{ once: false, margin: '-100px' }}
        className="grid gap-8 md:grid-cols-2"
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={reduceMotion ? undefined : item} className="h-full">
            <Link href={service.href} className="block h-full group focus:outline-none focus-visible:ring-4 focus-visible:ring-bubblegum/70 rounded-[2rem]">
              <Card dark className="relative h-full overflow-hidden !bg-ink !border-white/10 shadow-2xl backdrop-blur-md cursor-pointer">
                <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-bubblegum/20 blur-3xl transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute -bottom-28 -left-24 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-8">
                    {service.icons.map((Icon, index) => (
                      <span
                        key={index}
                        className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-bubblegum shadow-inner transition-transform duration-300 group-hover:-translate-y-1"
                      >
                        <Icon size={22} aria-hidden="true" />
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-bubblegum mb-3">
                    {service.eyebrow}
                  </p>
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 group-hover:text-bubblegum transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-white/70 max-w-2xl mb-8">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white/65">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-bubblegum transition-transform duration-300 group-hover:translate-x-2">
                    {t('cta')}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
