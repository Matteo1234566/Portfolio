"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Server, Wifi, Plane, Film, Code, Mail, Linkedin } from 'lucide-react';
import Card from '@/app/[locale]/sections/ui/Card';
import Button from '@/app/[locale]/sections/ui/Button';
import Image from 'next/image';
// 1. Import Hook
import { useTranslations } from 'next-intl';

import {
    SiPython,
    SiDjango,
    SiTensorflow,
    SiOpencv,
    SiReact,
    SiNextdotjs,
    SiSpring,
    SiJenkins,
    SiDocker
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

export default function MatteoProfile({ onBack }) {
    // 2. Inizializza Hook
    const t = useTranslations('MatteoProfile');

    return (
        <div className="bg-paper dark:bg-ink min-h-screen font-body text-ink dark:text-white">

            <section className="relative pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 dark:opacity-5 pointer-events-none">
                    <Code size={400} />
                </div>

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex items-center gap-4"
                    >
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-display text-7xl md:text-9xl font-bold uppercase leading-[0.9] mb-4"
                    >
                        Matteo <br/> <span className="text-bubblegum">Cese</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-12"
                    >
            <span className="bg-bubblegum text-white px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm md:text-base">
              {t('header.role_badge')}
            </span>
                        <span className="text-ink/60 dark:text-white/60 font-mono text-lg">
              {t('header.role_mono')}
            </span>
                    </motion.div>

                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-2xl md:text-4xl font-display text-ink/80 dark:text-white/80 border-l-4 border-forest dark:border-bubblegum pl-6 py-2 italic max-w-3xl"
                    >
                        {t('header.quote')}
                        <span className="block text-lg font-body text-ink/50 dark:text-white/50 mt-2 not-italic">
            </span>
                    </motion.blockquote>
                </div>
            </section>

            <section className="py-20 px-4 bg-smoke/30 dark:bg-white/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-5xl font-bold mb-8">
                            {t('about.title_start')} <br/> <span className="text-forest dark:text-bubblegum">{t('about.title_highlight')}</span>
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-ink/80 dark:text-smoke">
                            <p>
                                {/* t.rich permette di usare tag HTML come <strong> dentro la stringa JSON */}
                                {t.rich('about.p1', {
                                    strong: (chunks) => <strong className="text-ink dark:text-white">{chunks}</strong>
                                })}
                            </p>
                            <p>
                                {t('about.p2')}
                            </p>
                            <p>
                                {t('about.p3')}
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 80, damping: 18 }}
                        className="relative"
                    >
                        <Card className="!p-0 overflow-hidden bg-forest relative aspect-square md:aspect-[4/5] flex items-center justify-center group">
                            <Image
                                src="/images/matteo.webp" // Assicurati che il percorso immagine esista
                                alt="Matteo Cese"
                                fill
                                loading="lazy"
                                className="
                                    absolute inset-0 object-cover
                                    transition-transform duration-700 ease-out
                                    group-hover:scale-[1.03]
                                  "
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/25 via-forest/55 to-forest/90" />
                            <div className="absolute inset-0 bg-black/10" />
                        </Card>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div className="mb-16">
            <span className="text-forest dark:text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block">
              {t('toolkit.label')}
            </span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold">{t('toolkit.title')}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card dark className="!bg-ink !border-white/10">
                            <div className="mb-6 bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Server className="text-blue-500" size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-white mb-4">{t('toolkit.fullstack.title')}</h3>
                            <p className="text-white/60 mb-6 text-sm">
                                {t('toolkit.fullstack.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 opacity-80">
                                        <FaJava className="w-5 h-5" />
                                        <SiSpring className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">Java / Spring Boot</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 opacity-80">
                                        <SiReact className="w-5 h-5" />
                                        <SiNextdotjs className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">React / Next.js</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 opacity-80">
                                        <SiDocker className="w-5 h-5" />
                                        <SiJenkins className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">Docker / Jenkins</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-paper border-ink/10">
                            <div className="mb-6 bg-forest/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Brain className="text-forest dark:text-white" size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">{t('toolkit.vision.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                {t('toolkit.vision.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiPython className="w-5 h-5" />
                                        <SiDjango className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">Python / Django</span>
                                </div>
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiTensorflow className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">TensorFlow / YOLO</span>
                                </div>
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiOpencv className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">OpenCV</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white border-ink/10 dark:bg-white/5">
                            <div className="mb-6 bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Wifi className="text-purple-500" size={32} />
                            </div>

                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">
                                {t('toolkit.research.title')}
                            </h3>

                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                {t('toolkit.research.description')}
                            </p>

                            <ul className="space-y-2 list-disc pl-4 text-ink/80 dark:text-white/80 font-medium">
                                <li>{t('toolkit.research.list.0')}</li>
                                <li>{t('toolkit.research.list.1')}</li>
                                <li>{t('toolkit.research.list.2')}</li>
                            </ul>
                        </Card>

                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-ink text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-display text-5xl font-bold mb-12 text-center">{t('work.title')}</h2>

                    <div className="space-y-12">
                        {/* TRAID */}
                        <div className="group border-l-2 border-white/20 pl-8 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">{t('work.traid.title')}</h3>
                                <span className="text-blue-400 font-mono font-bold">{t('work.traid.tag')}</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                {t('work.traid.subtitle')}
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">
                                    {t('work.role_label')}
                                </h4>
                                <p className="text-white/70">
                                    {t('work.traid.description')}
                                </p>
                            </div>
                        </div>

                        {/* AILIGHTS */}
                        <div className="group border-l-2 border-white/20 pl-8 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">{t('work.ailights.title')}</h3>
                                <span className="text-blue-400 font-mono font-bold">{t('work.ailights.tag')}</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                {t('work.ailights.subtitle')}
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">{t('work.role_label')}</h4>
                                <p className="text-white/70">
                                    {t('work.ailights.description')}
                                </p>
                            </div>
                        </div>

                        {/* GESTURE */}
                        <div className="group border-l-2 border-white/20 pl-8 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">{t('work.gesture.title')}</h3>
                                <span className="text-blue-400 font-mono font-bold">{t('work.gesture.tag')}</span>
                            </div>

                            <p className="text-white/60 mb-4 max-w-2xl">
                                {t('work.gesture.subtitle')}
                            </p>

                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                                <div>
                                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">
                                        {t('work.role_label')}
                                    </h4>
                                    <p className="text-white/70">
                                        {/* Qui usiamo t.rich per gestire i <br/> */}
                                        {t.rich('work.gesture.description', {
                                            br: () => <br />
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="font-display text-5xl font-bold mb-12">{t('interests.title')}</h2>
                    <p className="text-xl text-ink/70 dark:text-white/70 mb-12 max-w-2xl mx-auto">
                        {t('interests.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Plane size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">{t('interests.travel.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                {t('interests.travel.description')}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Film size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">{t('interests.cinema.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                {t('interests.cinema.description')}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Brain size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">{t('interests.learning.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                {t('interests.learning.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-20 pb-10 text-center bg-forest text-white">
                <h2 className="font-display text-4xl mb-2">MATTEO CESE</h2>
                <p className="text-white/50 mb-8">{t('contact.location')}</p>
                <div className="flex justify-center gap-4">
                    <a
                        href="/cv/matteo.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button>
                            {t('contact.cv_button')}
                        </Button>
                    </a>
                </div>
            </section>
            <div className="bg-forest text-white pb-12 overflow-hidden relative">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 }}
                        className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-center items-center text-sm text-white/40 font-mono"
                    >
                        <div className="flex justify-center gap-6 mb-10">
                            <a
                                href="mailto:matteo.cese@4aitech.it"
                                className="text-white/50 hover:text-white transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={24} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/matteo-cese-b8461422a"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
