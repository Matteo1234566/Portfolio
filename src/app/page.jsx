'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/app/sections/Navbar";
import Hero from "@/app/sections/Hero";
import Duo from "@/app/sections/Duo";
import Services from "@/app/sections/Services";
import Projects from "@/app/sections/Projects";
import Footer from "@/app/sections/Footer";
import { DoodlePeace, DoodleSnap } from "@/app/sections/Doodles";
import { motion, AnimatePresence } from 'framer-motion';
import {LoadingScreen} from "@/app/sections/LoadingScreen";
import {SimoneProfile} from "@/app/sections/SimoneProfile";
import {MatteoProfile} from "@/app/sections/MatteoProfile";

export default function PortfolioLanding() {
    const [theme, setTheme] = useState('light');
    const [isLoading, setIsLoading] = useState(true);
    const [currentView, setCurrentView] = useState('home');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const handleNavigate = (view) => {
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
        setCurrentView(view);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen bg-paper dark:bg-ink font-body text-ink dark:text-smoke selection:bg-bubblegum selection:text-ink overflow-x-hidden transition-colors duration-300"
                >
                    <Navbar
                        theme={theme}
                        toggleTheme={toggleTheme}
                        currentView={currentView}
                        onNavigate={handleNavigate}
                    />

                    <AnimatePresence mode="wait">
                        {currentView === 'home' && (
                            <motion.main
                                key="home"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.3}}
                            >
                                <Hero/>

                                <section
                                    id="duo"
                                    className="relative py-24 bg-smoke/50 dark:bg-white/5 overflow-hidden transition-colors duration-300"
                                >
                                    {/* Decorative Doodle */}
                                    <motion.div
                                        animate={{y: [0, -15, 0], rotate: [12, 15, 12]}}
                                        transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                                        className="absolute top-10 right-[-50px] md:right-10 w-32 md:w-48 opacity-20 md:opacity-100 pointer-events-none"
                                    >
                                        {/* LOGICA SWAP IMMAGINE */}
                                        <img
                                            src={theme === 'dark' ? '/pittogramma_moon.webp' : '/pittogramma_sun.webp'}
                                            alt="Decorative Element"
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </motion.div>
                                    <Duo onNavigate={handleNavigate}/>
                                </section>

                                <section id="services" className="py-24 bg-forest text-white relative">
                                    <motion.div
                                        animate={{y: [0, 10, 0], rotate: [-12, -10, -12]}}
                                        transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                                        className="absolute bottom-10 left-10 w-24 md:w-32 opacity-10 pointer-events-none"
                                    >
                                        {/* Sostituzione di DoodleSnap con gli SVG sun.svg o moon.svg */}
                                        <img
                                            src={theme === 'dark' ? '/moon.svg' : '/sun.svg'}
                                            alt="Decorative Element"
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </motion.div>
                                    <Services/>
                                </section>

                                <section
                                    id="projects"
                                    className="py-24 bg-paper dark:bg-ink transition-colors duration-300"
                                >
                                    <Projects/>
                                </section>

                                <Footer theme={theme} />
                            </motion.main>
                        )}

                        {currentView === 'simone' && (
                            <motion.div
                                key="simone"
                                initial={{opacity: 0, x: 50}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 50}}
                                transition={{duration: 0.4}}
                            >
                                <SimoneProfile onBack={() => handleNavigate('home')}/>
                            </motion.div>
                        )}

                        {currentView === 'matteo' && (
                            <motion.div
                                key="matteo"
                                initial={{opacity: 0, x: 50}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: 50}}
                                transition={{duration: 0.4}}
                            >
                                <MatteoProfile onBack={() => handleNavigate('home')} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </>
    );
}
