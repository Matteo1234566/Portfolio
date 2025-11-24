import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Server, Wifi, Plane, Film, Code } from 'lucide-react';
import Card from '@/app/sections/ui/Card';
import Button from '@/app/sections/ui/Button';

// 1. IMPORTO LE ICONE UFFICIALI
// Uso 'si' (Simple Icons) per la maggior parte dei brand
import {
    SiPython,
    SiDjango,
    SiTensorflow,
    SiOpencv,
    SiReact,
    SiNextdotjs,
    SiSpring,
    SiJenkins,
    SiGooglecloud
} from "react-icons/si";

// Uso 'fa' (FontAwesome) per Java perché l'icona della tazza è più iconica del duca di OpenJDK
import { FaJava } from "react-icons/fa";

export const MatteoProfile = ({ onBack }) => {
    return (
        <div className="bg-paper dark:bg-ink min-h-screen font-body text-ink dark:text-white pb-20">

            {/* Hero Section */}
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
                        <button
                            onClick={onBack}
                            className="z-100 flex items-center gap-2 text-ink/50 dark:text-white/50 hover:text-bubblegum transition-colors uppercase tracking-widest font-bold text-sm"
                        >
                            ← Back to Home
                        </button>
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
              Co-Founder & Full Stack AI Engineer
            </span>
                        <span className="text-ink/60 dark:text-white/60 font-mono text-lg">
              // The Builder
            </span>
                    </motion.div>

                    <motion.blockquote
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-2xl md:text-4xl font-display text-ink/80 dark:text-white/80 border-l-4 border-forest dark:border-bubblegum pl-6 py-2 italic max-w-3xl"
                    >
                        "Faber est suae quisque fortunae."
                        <span className="block text-lg font-body text-ink/50 dark:text-white/50 mt-2 not-italic">
              (Every man is the architect of his own fortune)
            </span>
                    </motion.blockquote>
                </div>
            </section>

            {/* About Me */}
            <section className="py-20 px-4 bg-smoke/30 dark:bg-white/5">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-5xl font-bold mb-8">
                            BUILDING THE <br/> <span className="text-forest dark:text-bubblegum">FUTURE</span>
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-ink/80 dark:text-smoke">
                            <p>
                                <strong className="text-ink dark:text-white">Architecting Scalable Intelligence.</strong> I am a builder at heart. My approach to technology is grounded in a sociable and optimistic nature, believing that the best solutions come from open dialogue and teamwork. With a solid foundation in Computer Science from <strong className="text-ink dark:text-white">La Sapienza University</strong> (graduating with 110/110 Cum Laude), I have always sought to understand how things work to make them work better.
                            </p>
                            <p>
                                My background bridges two worlds: the rigorous standards of enterprise IT consulting and the agile innovation of the startup ecosystem. Today, as Co-Founder of 4AI, I design the architectures that power our vision, ensuring that our AI models run on robust, scalable, and efficient full-stack systems.
                            </p>
                            <p>
                                I am driven by the challenge of connecting academic research with real-world applications.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <Card className="!p-0 overflow-hidden bg-forest relative aspect-square md:aspect-[4/5] flex items-center justify-center">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/40 via-forest to-forest"></div>
                            <div className="relative z-10 text-center p-8">
                                <Code size={80} className="text-white mx-auto mb-6 opacity-80" />
                                <h3 className="font-display text-3xl text-white uppercase mb-2">The Builder</h3>
                                <div className="w-16 h-1 bg-blue-500 mx-auto"></div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* Toolkit */}
            <section className="py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div className="mb-16">
            <span className="text-forest dark:text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block">
              Engineering Core
            </span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold">THE TOOLKIT</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Full Stack Column */}
                        <Card dark className="!bg-ink !border-white/10">
                            <div className="mb-6 bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Server className="text-blue-500" size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-white mb-4">Full Stack Arch.</h3>
                            <p className="text-white/60 mb-6 text-sm">
                                I manage the entire development lifecycle, from robust backends to scalable infrastructure.
                            </p>
                            <div className="space-y-4">
                                {/* REPLACED: Java & Spring */}
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 opacity-80">
                                        <FaJava className="w-5 h-5" />
                                        <SiSpring className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">Java / Spring Boot</span>
                                </div>
                                {/* REPLACED: React & Next */}
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 opacity-80">
                                        <SiReact className="w-5 h-5" />
                                        <SiNextdotjs className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">React / Next.js</span>
                                </div>
                                {/* REPLACED: Jenkins & GCP */}
                                <div className="flex items-center gap-3 text-white/90">
                                    <div className="flex gap-2 opacity-80">
                                        <SiJenkins className="w-5 h-5" />
                                        <SiGooglecloud className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">Jenkins / GCP</span>
                                </div>
                            </div>
                        </Card>

                        {/* AI/CV Column */}
                        <Card className="bg-paper border-ink/10">
                            <div className="mb-6 bg-forest/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Brain className="text-forest dark:text-white" size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">Computer Vision</h3>
                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                Translating visual data into actionable insights using state-of-the-art frameworks.
                            </p>
                            <div className="space-y-4">
                                {/* REPLACED: Python & Django */}
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiPython className="w-5 h-5" />
                                        <SiDjango className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">Python / Django</span>
                                </div>
                                {/* REPLACED: TF */}
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiTensorflow className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">TensorFlow / YOLO</span>
                                </div>
                                {/* REPLACED: OpenCV */}
                                <div className="flex items-center gap-3 text-ink dark:text-white">
                                    <div className="flex gap-2 opacity-80">
                                        <SiOpencv className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">OpenCV</span>
                                </div>
                            </div>
                        </Card>

                        {/* Research Column */}
                        <Card className="bg-white border-ink/10 dark:bg-white/5">
                            <div className="mb-6 bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Wifi className="text-purple-500" size={32} />
                            </div>
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">Applied Research</h3>
                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                Exploring the frontier of Wi-Fi Sensing for environmental perception.
                            </p>
                            <ul className="space-y-2 list-disc pl-4 text-ink/80 dark:text-white/80 font-medium">
                                <li>Wi-Fi Sensing</li>
                                <li>Motion Analysis</li>
                                <li>Signal Preprocessing</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Selected Work */}
            <section className="py-20 px-4 bg-ink text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-display text-5xl font-bold mb-12 text-center">SELECTED WORK</h2>

                    <div className="space-y-12">
                        {/* Project 1 */}
                        <div className="group border-l-2 border-white/20 pl-8 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">Traid</h3>
                                <span className="text-blue-400 font-mono font-bold">AI-FinTech Platform</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                Making financial markets accessible through intelligence.
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">
                                    My Role
                                </h4>
                                <p className="text-white/70">
                                    Built the web platform delivering AI-assisted trading signals and performance dashboards based on neural time-series models.
                                </p>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="group border-l-2 border-white/20 pl-8 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">Wi-Fi Sensing</h3>
                                <span className="text-blue-400 font-mono font-bold">Research Project</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                Research at La Sapienza University.
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">
                                    The Tech
                                </h4>
                                <p className="text-white/70">
                                    Developed AI pipelines for signal preprocessing and real-time inference to detect movement using standard Wi-Fi signals.
                                </p>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="group border-l-2 border-white/20 pl-8 hover:border-blue-500 transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">Gesture Analysis</h3>
                                <span className="text-blue-400 font-mono font-bold">Deep Learning</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                Hand Gesture Recognition & Lie Detection.
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">
                                    My Role
                                </h4>
                                <p className="text-white/70">
                                    Created neural networks capable of recognizing American Sign Language (ASL) digits and analyzing hand gestures to detect deception in video feeds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beyond Code */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="font-display text-5xl font-bold mb-12">BEYOND THE CODE</h2>
                    <p className="text-xl text-ink/70 dark:text-white/70 mb-12 max-w-2xl mx-auto">
                        Technology is my profession, but discovery is my passion.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Plane size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Culture & Travel</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                I love traveling and discovering new cultures; they are my constant sources of inspiration.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Film size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Cinema</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                A passionate movie buff, finding creativity in storytelling.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Brain size={32} />
                            </div>
                            <h3 className="font-bold text-xl mb-3">Philosophy</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                "Faber est suae quisque fortunae"—I apply this proactive philosophy to my life and code.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Contact */}
            <section className="py-20 text-center bg-forest text-white">
                <h2 className="font-display text-4xl mb-2">MATTEO CESE</h2>
                <p className="text-white/50 mb-8">Rome, Italy • Full Stack & AI Expert</p>
                <div className="flex justify-center gap-4">
                    <a href="mailto:matteo@example.com">
                        <Button>Let's Build Your Solution</Button>
                    </a>
                </div>
            </section>
        </div>
    );
};
