import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/app/sections/ui/Card';
import Button from '@/app/sections/ui/Button';
import {Brain, Layers, Cpu, Music, Dumbbell, Globe, Code, Database, Wifi} from 'lucide-react';

import {
    SiPython,
    SiTensorflow,
    SiPytorch,
    SiScikitlearn,
    SiReact,
    SiNextdotjs,
    SiDjango,
    SiNodedotjs,
    SiDocker,
    SiRedis, SiRoboflow, SiNumpy
} from "react-icons/si";

export const SimoneProfile = ({ onBack }) => {
    return (
        <div className="bg-paper dark:bg-ink min-h-screen font-body text-ink dark:text-white pb-20">

            <section
                className="relative pt-32 pb-20 px-4 overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/simone_bg_light.webp')] dark:bg-[url('/simone_bg_dark.webp')]">

                <div className="absolute inset-0 bg-paper/70 dark:bg-ink/70 z-0"/>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
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
              AI Engineer
            </span>
                        <span className="text-ink/60 dark:text-white/60 font-mono text-lg">
              // Deep learning, computer vision and data analysis
            </span>
                    </motion.div>

                    <motion.blockquote
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.6}}
                        className="text-2xl md:text-4xl font-display text-ink/80 dark:text-white/80 border-l-4 border-bubblegum pl-6 py-2 italic max-w-3xl"
                    >
                        "For the roads, they go on without end."
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
                            FROM CURIOSITY <br/> TO <span className="text-bubblegum">CODE</span>
                        </h2>
                        <div className="space-y-6 text-lg leading-relaxed text-ink/80 dark:text-smoke">
                            <p>
                                My journey into technology began in my teenage years, fueled by a curiosity for building
                                websites and experimenting with design. That spark led me to a formal path in Computer
                                Science at <strong className="text-ink dark:text-white">La Sapienza University of
                                Rome</strong>, where I graduated with top honors <span
                                className="bg-bubblegum/20 px-2 py-0.5 rounded text-bubblegum font-bold">(110/110 cum laude)</span>.
                            </p>
                            <p>
                                Today, as Co-Founder of 4AI, I bridge the gap between academic research and
                                production-ready software. I don't just write code; I architect systems. Whether it's
                                Deep Learning, Computer Vision, or Data Engineering, my goal is to transform advanced
                                concepts into innovative, usable platforms.
                            </p>
                            <p>
                                I thrive in dynamic environments where technical precision meets creative
                                problem-solving.
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
                            <img
                                src="/images/simone.webp"
                                alt="Simone Zannini"
                                loading="lazy"
                                className="
                                    absolute inset-0 w-full h-full object-cover
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
                        <span className="text-bubblegum font-bold tracking-widest uppercase text-sm mb-2 block">My Arsenal</span>
                        <h2 className="font-display text-5xl md:text-7xl font-bold">THE TOOLKIT</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card dark className="!bg-ink !border-white/10">
                            <div
                                className="mb-6 bg-bubblegum/20 w-16 h-16 rounded-2xl flex items-center justify-center">
                                <Brain className="text-bubblegum" size={32}/>
                            </div>
                            <h3 className="font-display text-2xl font-bold text-white mb-4">AI & Data</h3>
                            <p className="text-white/60 mb-6 text-sm">
                                I specialize in Computer Vision and Deep Learning, managing complex multimodal datasets.
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
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">Full
                                Stack</h3>
                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                From robust backends to responsive frontends, ensuring scalable architecture.
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
                            <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-4">R&D</h3>
                            <p className="text-ink/60 dark:text-white/60 mb-6 text-sm">
                                Research fellow focused on Wi-Fi sensing and environmental perception, exploring how
                                wireless signals can capture human presence and motion.
                            </p>
                            <ul className="space-y-2 list-disc pl-4 text-ink/80 dark:text-white/80 font-medium">
                                <li>Wi-Fi Sensing & Environmental Perception</li>
                                <li>Human Motion Analysis</li>
                                <li>Signal Processing & Preprocessing</li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-ink text-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="font-display text-5xl font-bold mb-12 text-center">SELECTED WORK</h2>

                    <div className="space-y-12">
                        <div
                            className="group border-l-2 border-white/20 pl-8 hover:border-bubblegum transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">AiLights</h3>
                                <span className="text-bubblegum font-mono font-bold">Startup Project</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                Creating a platform for automated sports statistics and live streaming.
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">My
                                    Role</h4>
                                <p className="text-white/70">
                                    Developed a new Computer Vision model to track tiny and fast objects with frequent
                                    occlusions. Contributed to develop the full-stack architecture of the platform.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group border-l-2 border-white/20 pl-8 hover:border-bubblegum transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">Screeba</h3>
                                <span className="text-bubblegum font-mono font-bold">Speech-to-Text Framework</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                Automating the transcription of university lectures.
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">My
                                    Role</h4>
                                <p className="text-white/70">
                                    Engineered advanced pre- and post-processing pipelines to ensure high-accuracy text
                                    generation.
                                </p>
                            </div>
                        </div>

                        <div
                            className="group border-l-2 border-white/20 pl-8 hover:border-bubblegum transition-colors duration-300">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                                <h3 className="font-display text-4xl font-bold">Traid</h3>
                                <span className="text-bubblegum font-mono font-bold">AI Trading Platform</span>
                            </div>
                            <p className="text-white/60 mb-4 max-w-2xl">
                                Providing AI-driven market signals.
                            </p>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h4 className="font-bold mb-2 text-sm uppercase tracking-wider text-white/80">My
                                    Role</h4>
                                <p className="text-white/70">
                                    Full-stack development with server-side inference for real-time data analysis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-4 relative overflow-hidden">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-bubblegum/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="font-display text-5xl font-bold mb-12">BEYOND THE SCREEN</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Music size={32}/>
                            </div>
                            <h3 className="font-bold text-xl mb-3">Music & Art</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                Self-taught pianist and amateur illustrator fueling technical creativity.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Dumbbell size={32}/>
                            </div>
                            <h3 className="font-bold text-xl mb-3">Sport</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                Padel, Tennis, and weightlifting for focus and energy.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div
                                className="w-20 h-20 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-6 shadow-soft">
                                <Brain size={32}/>
                            </div>
                            <h3 className="font-bold text-xl mb-3">Learning</h3>
                            <p className="text-ink/60 dark:text-white/60">
                                Learning Japanese and solving Rubik's cube variants.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 text-center bg-forest text-white">
                <h2 className="font-display text-4xl mb-2">SIMONE ZANNINI</h2>
                <p className="text-white/50 mb-8">Rome, Italy • Fluent in Italian & English</p>
                <div className="flex justify-center gap-4">
                    <a href="mailto:simone@example.com">
                        <Button>Let's Build Something</Button>
                    </a>
                </div>
            </section>
        </div>
    );
};
