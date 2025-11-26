'use client';

import React from 'react';
import Card from '@/app/[locale]/sections/ui/Card';
import Button from '@/app/[locale]/sections/ui/Button';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
// 1. Import hook
import { useTranslations } from 'next-intl';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20 },
  },
};

export default function Projects() {
  // 2. Inizializza hook
  const t = useTranslations('Projects');

  // 3. Ricostruzione dell'array projects
  const projects = [
    {
      id: 'ailights',
      title: t('items.ailights.title'),
      category: t('items.ailights.category'),
      description: t('items.ailights.description'),
      techStack: [
        t('items.ailights.techStack.0'),
        t('items.ailights.techStack.1'),
        t('items.ailights.techStack.2'),
        t('items.ailights.techStack.3')
      ],
      highlight: true,
      link: ""
    },
    {
      id: 'traid',
      title: t('items.traid.title'),
      category: t('items.traid.category'),
      description: t('items.traid.description'),
      techStack: [
        t('items.traid.techStack.0'),
        t('items.traid.techStack.1'),
        t('items.traid.techStack.2'),
        t('items.traid.techStack.3')
      ],
      link: "https://traid.it/it/"
    },
    {
      id: 'screeba',
      title: t('items.screeba.title'),
      category: t('items.screeba.category'),
      description: t('items.screeba.description'),
      techStack: [
        t('items.screeba.techStack.0'),
        t('items.screeba.techStack.1'),
        t('items.screeba.techStack.2')
      ],
      link: ""
    },
    {
      id: 'sensing',
      title: t('items.sensing.title'),
      category: t('items.sensing.category'),
      description: t('items.sensing.description'),
      techStack: [
        t('items.sensing.techStack.0'),
        t('items.sensing.techStack.1'),
        t('items.sensing.techStack.2')
      ],
      link: ""
    },
  ];

  return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-5xl font-bold mb-2 text-ink dark:text-white leading-tight">
              {t('heading')} <br />
              <span className="relative inline-block">
              <span className="relative z-10 px-2 text-slate-50">{t('heading_highlight')}</span>
              <motion.span
                  className="absolute inset-0 bg-bubblegum"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2, ease: 'circOut' }}
                  style={{ originX: 0, zIndex: 0 }}
              />
            </span>
            </h2>
          </motion.div>
          <motion.p
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-ink/60 dark:text-smoke/60 max-w-xs mt-4 md:mt-0 text-right hidden md:block"
          >
            {/* Gestione delle "a capo" nel sottotitolo */}
            {t.rich('subtitle', {
              br: () => <br />
            })}
          </motion.p>
        </div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: '-100px' }}
            className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
              <motion.div key={project.id} variants={item} className="group h-full">
                <Card
                    className={`h-full flex flex-col ${
                        project.highlight ? 'border-bubblegum border-4' : ''
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-xs font-bold text-forest bg-green-100 px-2 py-1 rounded uppercase">
                  {project.category}
                </span>
                    {project.link !== "" && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink/30 dark:text-white/30 group-hover:text-ink dark:group-hover:text-white transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                    )}

                  </div>

                  <h3 className="font-display text-4xl font-bold mb-4 text-ink dark:text-white group-hover:text-forest dark:group-hover:text-bubblegum transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-lg text-ink/80 dark:text-smoke/80 mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="pt-6 border-t-2 border-smoke dark:border-white/10 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="text-sm font-bold text-ink/50 dark:text-white/50"
                        >
                    #{tech}
                  </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
          ))}
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="mt-16 text-center"
        >
          <a
              href="https://www.4aitech.it/"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Button variant="secondary">
              {t('cta')}
            </Button>
          </a>
        </motion.div>
      </div>
  );
}
