'use client';

import React from 'react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { ArrowDoodle } from '@/app/[locale]/(site)/sections/Doodles';
import { motion } from 'framer-motion';
import { ExternalLink } from "lucide-react";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Hero() {
  const t = useTranslations('Hero');
  const pathname = usePathname();

  const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';

  return (
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] dark:bg-[radial-gradient(#f8fafc_1px,transparent_1px)] [background-size:16px_16px] transition-all duration-300"></div>

        <div className="mt-10 relative z-10 max-w-5xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 inline-flex items-center space-x-2 bg-white dark:bg-white/5 border border-ink dark:border-white/20 px-4 py-1 rounded-full shadow-soft transform -rotate-2 hover:rotate-0 transition-transform"
          >
            <span className="w-2 h-2 bg-bubblegum rounded-full animate-pulse"></span>
            <span className="text-sm font-bold tracking-wide text-ink/70 dark:text-white/70 uppercase">
            {t('badge')}
          </span>
          </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] mb-8 text-ink dark:text-white transition-colors duration-300"
          >
            {t('headline.start')}
            <br />
            {t('headline.middle')}{" "}
            <span className="relative inline-block ml-2 md:ml-4">
            <motion.span
                className="absolute inset-0 bg-bubblegum transform -skew-x-3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
                style={{ originX: 0 }}
            ></motion.span>
            <span className="relative z-10 px-2 text-white">{t('headline.highlight')}</span>
          </span>
          </motion.h1>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl max-w-2xl mx-auto text-ink/80 dark:text-smoke/80 mb-10 leading-relaxed transition-colors duration-300"
          >
            {t('bio.intro')} <span className="font-bold text-bubblegum">{t('bio.names')}</span>.
            {" "}{t('bio.role_start')}{" "}

            <span className="relative inline-block font-bold mx-1 text-ink dark:text-white">
            {t('bio.human')}
              <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-bubblegum"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{ originX: 0 }}
              />
            </span>
            {t('bio.role_end')}{" "}

            <span className="relative inline-block font-bold mx-1 text-ink dark:text-white">
            {t('bio.startup_name')}
              <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-bubblegum"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{ originX: 0 }}
              />
            </span>
            {t('bio.startup_desc')}
            {" "}{t('bio.podcast_start')}

            <span className="relative inline-block font-bold mx-1 text-ink dark:text-white">
              <a
                  href="https://your-podcast-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-bubblegum transition-colors"
              >
                {t('bio.podcast_link')}
                <ExternalLink size={16} />
              </a>

              <motion.span
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-bubblegum"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  style={{ originX: 0 }}
              />
            </span>.

          </motion.p>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button>
              <Link
                  href={`/${currentLocale}#projects`}
              >
                {t('buttons.work')}
              </Link>
            </Button>
            <Link
                href={`/${currentLocale}#duo`}
                className="group flex items-center gap-2 font-display font-bold text-lg hover:underline decoration-wavy decoration-bubblegum underline-offset-4 text-ink dark:text-white"
            >
              {t('buttons.duo')}
              <ArrowDoodle className="w-8 h-8 transform group-hover:translate-x-1 transition-transform text-ink dark:text-white" />
            </Link>
          </motion.div>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-bubblegum/20 rounded-full blur-3xl pointer-events-none"
        ></motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-1/4 -right-24 w-80 h-80 bg-forest/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"
        ></motion.div>
      </section>
  );
}
