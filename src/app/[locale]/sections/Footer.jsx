'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/app/[locale]/sections/ui/Button';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
// 1. Import hook
import { useTranslations } from 'next-intl';

export default function Footer() {
    // 2. Inizializza hook
    const t = useTranslations('Footer');

    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted
        ? (theme === 'system' ? systemTheme : theme)
        : 'light';

    return (
        <footer
            id="footer"
            className="bg-forest text-white pt-24 pb-12 overflow-hidden relative"
        >
            <motion.div
                animate={{
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-bubblegum opacity-10 blur-[80px] pointer-events-none"
            />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, margin: '-50px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="mb-12"
                >
                    <div className="w-24 h-24 mx-auto mb-8 relative animate-bounce">
                        <Image
                            src={
                                currentTheme === 'dark'
                                    ? '/pittogramma_flat_moon.webp'
                                    : '/pittogramma_flat_sun.webp'
                            }
                            alt={t('alt_illustration')}
                            width={96}
                            height={96}
                            className="object-contain"
                        />
                    </div>

                    <h2 className="font-display text-6xl md:text-8xl font-bold mb-6 leading-none">
                        {t('heading.start')} <br /> <span className="text-bubblegum">{t('heading.highlight')}</span>
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        {t('description')}
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a href="mailto:hello@simoneandmatteo.com" className="no-underline">
                            <Button variant="primary" className="text-lg px-10 py-4">
                                {t('cta.email')}
                            </Button>
                        </a>
                        <Button variant="outline" className="text-lg px-10 py-4">
                            {t('cta.book')}
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-center items-center text-sm text-white/40 font-mono"
                >
                    <p>
                        &copy; {new Date().getFullYear()} {t('copyright')}
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
