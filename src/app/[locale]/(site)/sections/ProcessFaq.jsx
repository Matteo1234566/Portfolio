'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ProcessFaq() {
  const t = useTranslations('ProcessFaq');
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 75%', 'end 55%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

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
      <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-3 block">
            {t('label')}
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] text-ink dark:text-white mb-5">
            {t('title.start')} <br />
            <span className="text-forest dark:text-bubblegum">{t('title.highlight')}</span>
          </h2>
          <p className="text-lg leading-relaxed text-ink/70 dark:text-smoke/80 max-w-2xl mb-10">
            {t('intro')}
          </p>

          <ol ref={timelineRef} className="relative">
            {/* Track + progress line that fills while the timeline scrolls through the viewport */}
            <span aria-hidden="true" className="absolute left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 bg-smoke dark:bg-white/10" />
            <motion.span
              aria-hidden="true"
              className="absolute left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 origin-top bg-bubblegum"
              style={{ scaleY: reduceMotion ? 1 : lineProgress }}
            />
            {process.map((item, index) => (
              <motion.li
                key={item.step}
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="group relative flex gap-6 pb-10 last:pb-0"
              >
                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white font-display text-sm font-bold text-ink shadow-hard transition-colors duration-300 group-hover:bg-bubblegum group-hover:text-white dark:border-white/30 dark:bg-ink dark:text-white dark:shadow-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="pt-1">
                  <p className="sr-only">{item.step}</p>
                  <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-2 transition-colors group-hover:text-accent">{item.title}</h3>
                  <p className="text-ink/70 dark:text-smoke/75 leading-relaxed">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:sticky lg:top-32"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-accent">FAQ</p>
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-hard dark:border-white/20 dark:bg-white/5 dark:shadow-hard-white">
            {faq.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              return (
                <div key={item.question} className="border-b-2 border-smoke/60 last:border-b-0 dark:border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:bg-bubblegum/10"
                    >
                      <span className={`font-display text-xl md:text-2xl font-bold transition-colors ${isOpen ? 'text-accent' : 'text-ink group-hover:text-accent dark:text-white'}`}>
                        {item.question}
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 transition-all duration-300 ${isOpen ? 'rotate-45 border-bubblegum bg-bubblegum text-white' : 'border-ink text-ink dark:border-white/40 dark:text-white'}`}
                      >
                        <Plus size={16} strokeWidth={3} aria-hidden="true" />
                      </span>
                    </button>
                  </h3>
                  {/* Answer stays in the DOM (FAQ schema + SEO); only its height animates */}
                  <div
                    id={panelId}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-ink/70 dark:text-smoke/75 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
