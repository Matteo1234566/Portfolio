'use client';

import React from 'react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { Camera, Eye, Activity, PlayCircle, Target, Sun, Moon, BarChart3, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from "next/image";
import {useTheme} from "next-themes";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

export default function AiLights() {
    const t = useTranslations('AiLights');
    const { resolvedTheme } = useTheme();

    const features = [
        {
            id: "camera",
            icon: <Camera size={40} className="text-bubblegum" />,
            title: t('features.camera.title'),
            desc: t('features.camera.desc')
        },
        {
            id: "lens",
            icon: <Eye size={40} className="text-forest dark:text-bubblegum" />,
            title: t('features.lens.title'),
            desc: t('features.lens.desc')
        },
        {
            id: "ai",
            icon: <Activity size={40} className="text-ink dark:text-white" />,
            title: t('features.ai.title'),
            desc: t('features.ai.desc')
        }
    ];

    const sports = [
        {
            id: "futsal",
            title: "Futsal & Calcio a 8",
            metrics: [t('sports.futsal.0'), t('sports.futsal.1'), t('sports.futsal.2')],
            icon: <PlayCircle size={24} />
        },
        {
            id: "tennis",
            title: "Tennis",
            metrics: [t('sports.tennis.0'), t('sports.tennis.1'), t('sports.tennis.2')],
            icon: <Target size={24} />
        },
        {
            id: "padel",
            title: "Padel",
            metrics: [t('sports.padel.0'), t('sports.padel.1'), t('sports.padel.2')],
            icon: <BarChart3 size={24} />
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16 mb-24">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bubblegum/10 text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
                            <Wifi size={14} className="animate-pulse" />
                            <span>{t('badge')}</span>
                        </div>

                        <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white">
                            AiLights
                            <span
                                className="
                                block text-transparent bg-clip-text
                                bg-gradient-to-r from-forest to-bubblegum
                                dark:bg-gradient-to-r dark:from-violet-300 dark:to-pink-300
                                text-4xl md:text-5xl mt-2
                              "
                                                        >
                              {t('tagline')}
                            </span>
                        </h1>

                        <p className="text-xl text-ink/70 dark:text-smoke/70 mb-8 leading-relaxed max-w-lg">
                            {t('description')}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="mailto:magosimo99@gmail.com">
                                <Button variant="primary" className="px-8 py-4 text-lg">
                                    {t('cta_demo')}
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 relative"
                    >
                        <div className="relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-tr from-forest/20 to-bubblegum/20 rounded-full blur-3xl animate-pulse" />
                            <Card
                                className="
                                    relative
                                    h-full
                                    overflow-hidden
                                    p-0
                                    border-forest/30
                                    dark:border-white/10
                                    bg-white/50
                                    dark:bg-ink/50
                                    backdrop-blur-xl
                                  "
                            >
                                <Image
                                    src={resolvedTheme === "dark" ? "/ailights_dark.webp" : "/ailights.webp"}
                                    alt="Profile"
                                    fill
                                    className="object-cover select-none pointer-events-none"
                                />
                            </Card>

                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -right-10 bg-paper dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-ink/10 dark:border-white/10"
                            >
                                <Activity className="text-bubblegum" size={32} />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mb-32">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-100px" }}
                    className="grid md:grid-cols-3 gap-6"
                >
                    {features.map((feature, idx) => (
                        <motion.div key={feature.id} variants={item} className="h-full">
                            <Card className="h-full hover:border-bubblegum transition-colors group">
                                <div className="mb-6 p-4 bg-smoke dark:bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-3 text-ink dark:text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-ink/70 dark:text-smoke/70 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="bg-forest text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="font-display text-4xl md:text-6xl font-bold mb-4"
                        >
                            {t('sports_title')} <span className="text-bubblegum">Smart Stats</span>
                        </motion.h2>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg">
                            {t('sports_subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {sports.map((sport, index) => (
                            <motion.div
                                key={sport.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-colors"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="font-display text-3xl font-bold">{sport.title}</h3>
                                    <div className="p-2 bg-bubblegum rounded-full text-white">
                                        {sport.icon}
                                    </div>
                                </div>

                                <ul className="space-y-4">
                                    {sport.metrics.map((metric, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg font-medium text-white/90">
                                            <span className="w-1.5 h-1.5 rounded-full bg-bubblegum shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                            {metric}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
