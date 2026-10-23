"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import {Brain, Layers, Music, Dumbbell, Wifi, Mail, Linkedin} from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ProfileToolkit from '@/app/[locale]/(site)/_profile/ProfileToolkit';
import ProfileInterests from '@/app/[locale]/(site)/_profile/ProfileInterests';

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
import { BUSINESS } from '@/lib/site';

export default function SimoneProfile() {
    const t = useTranslations('SimoneProfile');
    const pathname = usePathname();
    const currentLocale = pathname.startsWith('/it') ? 'it' : 'en';

    return (
        <main className="bg-paper dark:bg-ink min-h-screen font-body text-ink dark:text-white">

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
                                sizes="(min-width: 768px) 50vw, 100vw"
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

            <ProfileToolkit
                label={t('toolkit.label')}
                title={t('toolkit.title')}
                groups={[
                    {
                        key: 'ai', icon: Brain, title: t('toolkit.ai.title'), description: t('toolkit.ai.description'),
                        tech: [
                            { icons: [SiPython], label: 'Python' },
                            { icons: [SiTensorflow, SiRoboflow], label: 'TensorFlow / YOLO' },
                            { icons: [SiNumpy, SiScikitlearn], label: 'NumPy / Scikit-learn' },
                        ],
                    },
                    {
                        key: 'fullstack', icon: Layers, title: t('toolkit.fullstack.title'), description: t('toolkit.fullstack.description'),
                        tech: [
                            { icons: [SiReact, SiNextdotjs], label: 'React / Next.js' },
                            { icons: [SiDjango, SiNodedotjs], label: 'Django / Node.js' },
                            { icons: [SiDocker, SiRedis], label: 'Docker / Redis' },
                        ],
                    },
                    {
                        key: 'research', icon: Wifi, title: t('toolkit.research.title'), description: t('toolkit.research.description'),
                        list: [0, 1, 2].map((i) => t(`toolkit.research.list.${i}`)),
                    },
                ]}
            />

            <ProfileInterests
                title={t('interests.title')}
                subtitle={t('interests.subtitle')}
                interests={[
                    { key: 'music', scene: 'music', icon: Music, title: t('interests.music.title'), description: t('interests.music.description') },
                    { key: 'sport', scene: 'sport', icon: Dumbbell, title: t('interests.sport.title'), description: t('interests.sport.description') },
                    { key: 'learning', scene: 'learning', icon: Brain, title: t('interests.learning.title'), description: t('interests.learning.description') },
                ]}
            />

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
                                href={`mailto:${BUSINESS.email}`}
                                className="text-white/50 hover:text-white transition-colors"
                                aria-label={currentLocale === 'it' ? 'Invia un’email a Simone Zannini' : 'Email Simone Zannini'}
                            >
                                <Mail size={24} />
                            </a>

                            <a
                                href="https://www.linkedin.com/in/simone-zannini-66a743225/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/50 hover:text-white transition-colors"
                                aria-label={currentLocale === 'it' ? 'Profilo LinkedIn di Simone Zannini' : 'Simone Zannini on LinkedIn'}
                            >
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
