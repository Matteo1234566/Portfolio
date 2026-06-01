'use client';

import React, {useEffect, useRef} from 'react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { ArrowDoodle } from '@/app/[locale]/(site)/sections/Doodles';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import SocialPopover from "@/app/[locale]/(site)/sections/ui/SocialPopover";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const t = useTranslations('Hero');
  const pathname = usePathname();
  const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';
  const proofItems = [0, 1, 2, 3].map((index) => t(`proof.${index}`));

  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const titleCharsRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const ctaChildren = ctaRef.current ? Array.from(ctaRef.current.children) : [];

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 }
      )
      .fromTo(titleRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.3'
      )
      .fromTo(bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(bgRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.2 },
        '-=1'
      );

      if (ctaChildren.length) {
        tl.fromTo(ctaChildren,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.4'
        );
      }

      gsap.to('.hero-glow', {
        scale: 1.2,
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
      <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] dark:bg-[radial-gradient(#f8fafc_1px,transparent_1px)] [background-size:16px_16px] transition-all duration-300"></div>

        <div className="mt-10 relative z-10 max-w-5xl mx-auto">
          <motion.div
              ref={badgeRef}
              className="mb-6 inline-flex items-center space-x-2 bg-white dark:bg-white/5 border border-ink dark:border-white/20 px-4 py-1 rounded-full shadow-soft transform -rotate-2 hover:rotate-0 transition-transform"
          >
            <span className="w-2 h-2 bg-bubblegum rounded-full animate-pulse"></span>
            <span className="text-sm font-bold tracking-wide text-ink/70 dark:text-white/70 uppercase">
            {t('eyebrow')}
          </span>
          </motion.div>

          <motion.h1
              ref={titleRef}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.92] mb-8 text-ink dark:text-white transition-colors duration-300"
          >
            {t('title.start')}
            <br />
            {t('title.middle')}{" "}
            <span className="relative inline-block mx-2 md:mx-3">
            <motion.span
                className="absolute inset-0 bg-bubblegum transform -skew-x-3"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "circOut" }}
                style={{ originX: 0 }}
            ></motion.span>
            <span ref={titleCharsRef} className="relative z-10 px-2 text-white">{t('title.highlight')}</span>
          </span>
            {t('title.end')}
          </motion.h1>

          <motion.p
              ref={bioRef}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
               className="text-lg md:text-xl max-w-3xl mx-auto text-ink/80 dark:text-smoke/80 mb-6 leading-relaxed transition-colors duration-300"
           >
            {t('description')}
          </motion.p>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="text-base md:text-lg max-w-3xl mx-auto text-ink/65 dark:text-smoke/70 mb-8 leading-relaxed"
          >
            {t('support.start')}{' '}
            <a
                href="https://4aitech.it"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-ink dark:text-white hover:text-bubblegum transition-colors"
            >
              {t('support.link')}
              <ExternalLink size={16} />
            </a>
            {' '}{t('support.end')}{' '}
            <SocialPopover triggerLabel={t('support.secondaryLink')} />
            .
          </motion.div>

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
              className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {proofItems.map((item) => (
                <span
                    key={item}
                    className="rounded-full border border-ink/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm font-bold text-ink/70 dark:text-smoke/80 shadow-soft"
                >
                  {item}
                </span>
            ))}
          </motion.div>

          <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button>
              <Link
                  href={`/${currentLocale}#projects`}
              >
                {t('buttons.projects')}
              </Link>
            </Button>
            <Link
                href={`/${currentLocale}#technologies`}
                className="group flex items-center gap-2 font-display font-bold text-lg hover:underline decoration-wavy decoration-bubblegum underline-offset-4 text-ink dark:text-white"
            >
              {t('buttons.technologies')}
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
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
            ref={bgRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -bottom-24 -left-24 w-64 h-64 bg-bubblegum/20 rounded-full blur-3xl pointer-events-none hero-glow"
        ></motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-1/4 -right-24 w-80 h-80 bg-forest/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none hero-glow"
        ></motion.div>
      </section>
  );
}
