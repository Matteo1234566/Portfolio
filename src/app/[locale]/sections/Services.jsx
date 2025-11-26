'use client';

import React from 'react';
import Card from '@/app/[locale]/sections/ui/Card';
import { Brain, Layers, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
// 1. Import hook
import { useTranslations } from 'next-intl';

export default function Services() {
  // 2. Inizializza hook
  const t = useTranslations('Services');

  // 3. Ricostruisci l'array usando le traduzioni
  const services = [
    {
      id: 'ai',
      title: t('items.ai.title'),
      icon: <Brain size={48} className="text-bubblegum" />,
      description: t('items.ai.description'),
      tags: [t('items.ai.tags.0'), t('items.ai.tags.1'), t('items.ai.tags.2')],
    },
    {
      id: 'fullstack',
      title: t('items.fullstack.title'),
      icon: <Layers size={48} className="text-bubblegum" />,
      description: t('items.fullstack.description'),
      tags: [t('items.fullstack.tags.0'), t('items.fullstack.tags.1'), t('items.fullstack.tags.2')],
    },
    {
      id: 'product',
      title: t('items.product.title'),
      icon: <Smartphone size={48} className="text-bubblegum" />,
      description: t('items.product.description'),
      tags: [t('items.product.tags.0'), t('items.product.tags.1'), t('items.product.tags.2')],
    },
    {
      id: 'consulting',
      title: t('items.consulting.title'),
      icon: <Zap size={48} className="text-bubblegum" />,
      description: t('items.consulting.description'),
      tags: [t('items.consulting.tags.0'), t('items.consulting.tags.1'), t('items.consulting.tags.2')],
    },
  ];

  return (
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="mb-24 text-center md:text-left">
          <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block"
          >
            {t('label')}
          </motion.span>
          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-tight"
          >
            {t('heading.top')} <br />
            {t('heading.bottom')} <span className="text-bubblegum italic">{t('heading.highlight')}</span>
          </motion.h2>
        </div>

        <div className="flex flex-col relative pb-20" style={{ perspective: '2000px' }}>
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
                <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 100, rotateX: -15 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      rotateX: 5,
                      rotateZ: isEven ? -2 : 2,
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateX: 0,
                      rotateZ: 0,
                      zIndex: 50,
                      transition: { duration: 0.2, ease: 'easeOut' },
                    }}
                    viewport={{ once: false, margin: '-10%' }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                    className={`
                w-full md:w-[90%] 
                ${index !== 0 ? '-mt-16 md:-mt-24' : ''} 
                ${isEven ? 'mr-auto' : 'ml-auto'}
                relative transition-all
              `}
                    style={{
                      zIndex: index + 1,
                      transformStyle: 'preserve-3d',
                    }}
                >
                  <Card dark className="!bg-ink !border-white/10 shadow-2xl backdrop-blur-md overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-bubblegum/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-bubblegum/20 transition-colors duration-500 pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 relative z-10 p-2">
                      <div className="shrink-0 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-display text-3xl font-bold text-white mb-3 group-hover:text-bubblegum transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed max-w-2xl">
                          {service.description}
                        </p>
                      </div>

                      <div className="flex flex-row md:flex-col gap-2 flex-wrap justify-end md:w-32 shrink-0 mt-4 md:mt-0">
                        {service.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-[10px] uppercase font-bold tracking-widest text-right text-white/50 border-r-2 border-transparent pr-2 group-hover:border-bubblegum group-hover:text-white transition-all"
                            >
                        {tag}
                      </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
            );
          })}
        </div>
      </div>
  );
}
