"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import {Brain, Layers, Music, Dumbbell, Wifi, Mail, Linkedin} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import {
    SiPython,
    SiTensorflow,
    SiScikitlearn,
    SiReact,
    SiNextdotjs,
    SiDjango,
    SiNodedotjs,
    SiDocker,
    SiRedis, SiRoboflow, SiNumpy
} from "react-icons/si";
import {usePathname} from "next/navigation";

export default function SimoneProfile() {
    const t = useTranslations('SimoneProfile');
    const pathname = usePathname();
    const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';

    return (
        <div className="bg-paper dark:bg-ink min-h-screen font-body text-ink dark:text-white">

            <section
                className="relative pt-32 pb-20 px-4 overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/simone_bg_light.webp')] dark:bg-[url('/simone_bg_dark.webp')]">

                <div className="absolute inset-0 bg-paper/70 dark:bg-ink/70 z-0"/>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="mb-6 flex items-center gap-4"
                    >
                    </motion.div>

                    <motion.h1
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                        className="font-display text-7xl md:text-9xl font-bold uppercase leading-[0.9] mb-4"
                    >
                        Simone <br/> <span className="text-bubblegum">Zannini</span>
                    </motion.h1>

                    <motion.div
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.4}}
                        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-12"
                    >
            <span
                className="bg-forest text-white px-4 py-2 rounded-full font-bold uppercase tracking-wider text-sm md:text-base">
              {t('header.role_badge')}
            </span>
                    </motion.div>

                    <motion.blockquote
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.6}}
                        className="text-2xl md:text-4xl font-display text-ink/80 dark:text-white/80 border-l-4 border-bubblegum pl-6 py-2 italic max-w-3xl"
                    >
                        {t('header.quote')}
                    </motion.blockquote>
                </div>
            </section>

            <section className="py-20 px-4 bg-smoke/30 dark:bg-white/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                    >
                        <h2 className="font-display text-5xl font-bold mb-8">
                            {t('about.title_start')} <br/> <span
                            className="text-bubblegum">{t('about.title_highlight')}</span>
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-ink/80 dark:text-smoke">
                            <p>
                                {t.rich('about.p1', {
                                    strong: (chunks) => <strong className="text-ink dark:text-white">{chunks}</strong>,
                                    highlight: (chunks) => (
                                        <span className="bg-bubblegum/20 px-2 py-0.5 rounded text-bubblegum font-bold">
                                            {chunks}
                                        </span>
                                    )
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
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                        className="relative"
                    >
                        <Card
                            className="!p-0 overflow-hidden bg-forest relative aspect-square md:aspect-[4/5] flex items-center justify-center group">
                            <Image
                                src="/images/simone.webp"
                                alt="Simone Zannini"
                                fill
                                loading="lazy"
                                className="
                                    absolute inset-0 object-cover
                                    transition-transform duration-700 ease-out
                                    group-hover:scale-[1.03]
                                  "
                            />
                            <div
                                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/25 via-forest/55 to-forest/90"/>
                            <div className="absolute inset-0 bg-black/10"/>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div className="mb-16">
                        <span
                            className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block">{t('toolkit.label')}</span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold">{t('toolkit.title')}</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card dark className="!bg-ink !border-white/10">
                            <div
                                className="mb-6 bg-bubblegum/20 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Brain className="text-bubblegum" size={32}/>
                            </div>
                            <h3 className="font-display text-2xl font-bold text-white mb-4">{t('toolkit.ai.title')}</h3>
                            <p className="text-white/60 mb-6 text-sm">
                                {t('toolkit.ai.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-white/90">
                                    <SiPython className="w-5 h-5"/> <span className="font-bold">Python</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 text-white/80">
                                        <SiTensorflow className="w-5 h-5"/>
                                        <SiRoboflow className="w-5 h-5"/>
                                    </div>
                                    <span className="font-bold">TensorFlow / YOLO</span>
                                </div>
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 text-white/80">
                                        <SiNumpy className="w-5 h-5"/>
                                        <SiScikitlearn className="w-5 h-5"/>
                                    </div>
                                    <span className="font-bold">NumPy / Scikit-learn</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-paper border-ink/10">
                            <div className="mb-6 bg-forest/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Layers className="text-forest dark:text-white" size={32}/>
                            </div>
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">{t('toolkit.fullstack.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                {t('toolkit.fullstack.description')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiReact className="w-5 h-5"/>
                                        <SiNextdotjs className="w-5 h-5"/>
                                    </div>
                                    <span className="font-bold">React / Next.js</span>
                                </div>
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiDjango className="w-5 h-5"/>
                                        <SiNodedotjs className="w-5 h-5"/>
                                    </div>
                                    <span className="font-bold">Django / Node.js</span>
                                </div>
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiDocker className="w-5 h-5"/>
                                        <SiRedis className="w-5 h-5"/>
                                    </div>
                                    <span className="font-bold">Docker / Redis</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-white border-ink/10 dark:bg-white/5">
                            <div
                                className="mb-6 bg-orange-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Wifi className="text-orange-500" size={32}/>
                            </div>
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">{t('toolkit.research.title')}</h3>
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

            <section className="py-24 px-4 relative overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bubblegum/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="font-display text-5xl font-bold mb-12">{t('interests.title')}</h2>
                    <p className="text-xl text-ink/70 dark:text-white/70 mb-12 max-w-2xl mx-auto italic">
                        {t('interests.subtitle')}
                    </p>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Music size={32}/>
                            </div>
                            <h3 className="font-bold text-xl mb-3">{t('interests.music.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                {t('interests.music.description')}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Dumbbell size={32}/>
                            </div>
                            <h3 className="font-bold text-xl mb-3">{t('interests.sport.title')}</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                {t('interests.sport.description')}
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Brain size={32}/>
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
                <h2 className="font-display text-4xl mb-2">SIMONE ZANNINI</h2>
                <p className="text-white/50 mb-8">{t('contact.location')}</p>
                <div className="flex justify-center gap-4">
                    <a
                        href={currentLocale === "it" ? "/cv/simone_it.pdf" : "/cv/simone_en.pdf"}
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
                                href="mailto:simone.zannini@4aitech.it"
                                className="text-white/50 hover:text-white transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={24} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/simone-zannini-66a743225/"
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
}
