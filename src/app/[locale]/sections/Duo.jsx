'use client';

import React from 'react';
import Card from '@/app/[locale]/sections/ui/Card';
import { Cpu, Code, Music, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// 1. Import Hook
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export default function Duo({ onNavigate }) {
  // 2. Inizializzazione Hook
  const t = useTranslations('Duo');
  const pathname = usePathname();
  const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';

  // 3. Array Profiles ricostruito DENTRO il componente per usare t()
  const profiles = [
    {
      id: "simone", // Utile per link univoci se servisse
      name: t('simone.name'),
      role: t('simone.role'),
      description: t('simone.description'),
      // Mappiamo manualmente le chiavi stats 0, 1, 2
      stats: [t('simone.stats.0'), t('simone.stats.1'), t('simone.stats.2')],
      iconBig: <Cpu size={120} />,
      iconSmall: <Music size={24} className="text-ink" />,
      smallIconColorClass: "bg-bubblegum",
      link: `/${currentLocale}/simone`
    },
    {
      id: "matteo",
      name: t('matteo.name'),
      role: t('matteo.role'),
      description: t('matteo.description'),
      stats: [t('matteo.stats.0'), t('matteo.stats.1'), t('matteo.stats.2')],
      iconBig: <Code size={120} />,
      iconSmall: <Search size={24} className="text-ink" />,
      smallIconColorClass: "bg-yellow-400",
      link: `/${currentLocale}/matteo`
    }
  ];

  return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl font-bold mb-4 text-ink dark:text-white"
          >
            {t('title_start')} <span className="text-forest dark:text-bubblegum">{t('title_highlight')}</span>
          </motion.h2>
          <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-ink/70 dark:text-smoke/70 max-w-xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
        >
          {/* Mappiamo l'array profiles per evitare codice duplicato */}
          {profiles.map((profile, index) => (
              <motion.div
                  key={index}
                  variants={item}
              >
                <Card className="relative overflow-hidden group text-ink dark:text-smoke h-full border-ink dark:border-white/20 hover:border-bubblegum dark:hover:border-bubblegum transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-ink dark:text-white">
                    {profile.iconBig}
                  </div>
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="font-display text-3xl font-bold text-ink dark:text-white group-hover:text-bubblegum transition-colors">
                        {profile.name}
                      </h3>
                      <span className="inline-block bg-forest text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider mt-1">
                      {profile.role}
                    </span>
                    </div>
                    {/* Icona piccola dinamica */}
                    <div className={`w-16 h-16 ${profile.smallIconColorClass} rounded-full border-2 border-ink dark:border-white flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      {profile.iconSmall}
                    </div>
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">{profile.description}</p>
                  <div className="space-y-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                      {profile.stats.map(stat => (
                          <span
                              key={stat}
                              className="px-3 py-1 bg-smoke dark:bg-white/10 rounded-full text-sm font-bold border border-gray-200 dark:border-white/10"
                          >
                      {stat}
                    </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Link
                        href={profile.link}
                        className="flex items-center text-bubblegum font-bold uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform"
                    >
                      {t('cta_profile')}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
          ))}
        </motion.div>
      </div>
  );
}
