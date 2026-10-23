'use client';

import React, { useEffect, useRef } from 'react';
import { Music, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function Duo() {
  const t = useTranslations('Duo');
  const pathname = usePathname();
  const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const profiles = [
    {
      id: "simone",
      name: t('simone.name'),
      role: t('simone.role'),
      description: t('simone.description'),
      stats: [t('simone.stats.0'), t('simone.stats.1'), t('simone.stats.2')],
      iconSmall: <Music size={18} className="text-ink" />,
      smallIconColorClass: "bg-bubblegum",
      link: `/${currentLocale}/simone`
    },
    {
      id: "matteo",
      name: t('matteo.name'),
      role: t('matteo.role'),
      description: t('matteo.description'),
      stats: [t('matteo.stats.0'), t('matteo.stats.1'), t('matteo.stats.2')],
      iconSmall: <Search size={18} className="text-ink" />,
      smallIconColorClass: "bg-yellow-400",
      link: `/${currentLocale}/matteo`
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <div ref={sectionRef} className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl font-bold mb-4 text-ink dark:text-white"
          >
            {t('title_start')} <span className="text-forest dark:text-bubblegum">{t('title_highlight')}</span>
          </motion.h2>
            <motion.blockquote
                ref={subtitleRef}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative max-w-xl mx-auto pl-6 text-lg italic text-ink/70 dark:text-smoke/70"
            >
              <span className="absolute left-0 top-0 text-4xl leading-none text-primary/40">
                “
              </span>

                        {t('subtitle')}

                        <span className="absolute right-0 bottom-0 text-4xl leading-none text-primary/40">
                ”
              </span>
            </motion.blockquote>

        </div>

        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8"
        >
          {profiles.map((profile) => (
              <motion.div key={profile.id} variants={item} className="group h-full">
                <Link
                  href={profile.link}
                  className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-smoke/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-bubblegum hover:shadow-2xl dark:border-white/10 dark:bg-ink/50 dark:hover:border-bubblegum"
                >
                  <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-bubblegum/30 opacity-0 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

                  <div className="mb-4 flex items-start justify-between p-6 pb-0">
                    <span className="rounded bg-green-100 px-2 py-1 font-mono text-xs font-bold uppercase text-forest dark:bg-forest/20 dark:text-green-300">
                      {profile.role}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-ink/70 transition-colors group-hover:text-accent dark:text-white/60">
                      {t('cta_profile')}
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-4 px-6">
                    <h3 className="font-display text-4xl font-bold text-ink transition-colors group-hover:text-accent dark:text-white">
                      {profile.name}
                    </h3>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink ${profile.smallIconColorClass} transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 dark:border-white`}>
                      {profile.iconSmall}
                    </span>
                  </div>

                  <p className="relative mb-8 flex-grow px-6 text-lg text-ink/80 dark:text-smoke/80">
                    {profile.description}
                  </p>

                  <div className="relative flex flex-wrap gap-2 border-t-2 border-smoke px-6 pb-6 pt-6 dark:border-white/10">
                    {profile.stats.map((stat) => (
                      <span key={stat} className="cursor-default text-sm font-bold text-ink/70 transition-colors hover:text-accent dark:text-white/60">
                        #{stat}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
          ))}
        </motion.div>
      </div>
  );
}
