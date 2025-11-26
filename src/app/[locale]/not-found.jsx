'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from "@/app/[locale]/(site)/sections/ui/Button";

export default function NotFoundHero() {
    const t = useTranslations('NotFound');

    // Animazione "Glitch" per il testo 404
    const glitchAnimation = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        },
        hover: {
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 2, -2, 0],
            transition: {
                repeat: Infinity,
                duration: 0.3,
                ease: "linear"
            }
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-paper dark:bg-ink transition-colors duration-300">

            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0 opacity-5 dark:opacity-10 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] dark:bg-[radial-gradient(#f8fafc_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-bubblegum/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-forest/10 dark:bg-white/5 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">

                {/* ICONA ANIMATA */}
                <motion.div
                    initial={{ rotate: 0, scale: 0.8 }}
                    animate={{ rotate: [0, -10, 10, -5, 5, 0], scale: 1 }}
                    transition={{
                        delay: 0.5,
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                    className="mb-6 relative"
                >
                    <div className="absolute inset-0 bg-bubblegum blur-2xl opacity-20 animate-pulse"></div>
                    <AlertTriangle size={80} className="text-ink dark:text-white relative z-10" />
                </motion.div>

                {/* 404 GLITCH TEXT */}
                <motion.div
                    className="relative font-display font-bold text-[10rem] md:text-[12rem] leading-none text-ink dark:text-white select-none"
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={glitchAnimation}
                >
                    <span className="relative z-10">404</span>
                    <motion.span
                        className="absolute top-0 left-0 -ml-1 text-bubblegum opacity-70 z-0 mix-blend-multiply dark:mix-blend-screen"
                        animate={{ x: [-2, 2, -1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.2, repeatType: "mirror" }}
                    >
                        404
                    </motion.span>
                    <motion.span
                        className="absolute top-0 left-0 ml-1 text-forest opacity-70 z-0 mix-blend-multiply dark:mix-blend-screen"
                        animate={{ x: [2, -2, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.3, repeatType: "mirror" }}
                    >
                        404
                    </motion.span>
                </motion.div>

                {/* HEADLINE */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-display font-bold mb-4 text-ink dark:text-white"
                >
                    {t('title')}
                </motion.h2>

                {/* DESCRIPTION */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-ink/70 dark:text-smoke/70 mb-8 max-w-md"
                >
                    {t('description')}
                </motion.p>

                {/* FAKE TERMINAL */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="w-full max-w-md bg-ink text-green-400 font-mono text-xs md:text-sm p-4 rounded-lg shadow-xl mb-10 text-left border border-white/10 relative overflow-hidden group"
                >
                    <div className="flex gap-2 mb-3 border-b border-white/10 pb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-1 opacity-80">
                        <p><span className="text-bubblegum">$</span> systemctl status page-module</p>
                        <p className="text-white">Loaded: loaded (/etc/simone-matteo/pages)</p>
                        <p className="text-red-400">Active: failed (Result: exit-code)</p>
                        <p><span className="text-bubblegum">$</span> ai-agent --find-content</p>
                        <p className="animate-pulse">Error: Content hallucination detected...</p>
                    </div>
                </motion.div>

                {/* CTA BUTTON */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button>
                        <Link href="/" className="flex items-center gap-2">
                            <Home size={18} />
                            {t('cta')}
                        </Link>
                    </Button>
                </motion.div>

            </div>
        </section>
    );
}
