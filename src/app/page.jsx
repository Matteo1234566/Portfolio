'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/app/sections/Navbar";
import Hero from "@/app/sections/Hero";
import { DoodlePeace, DoodleSnap } from "@/app/sections/Doodles";
import Duo from "@/app/sections/Duo";
import Services from "@/app/sections/Services";
import Projects from "@/app/sections/Projects";
import Footer from "@/app/sections/Footer";
import { motion } from 'framer-motion';

export default function PortfolioLanding() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div className="min-h-screen bg-paper dark:bg-ink font-body text-ink dark:text-smoke selection:bg-bubblegum selection:text-ink overflow-x-hidden transition-colors duration-300">
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <main>
                <Hero />

                <section id="duo" className="relative py-24 bg-smoke/50 dark:bg-white/5 overflow-hidden transition-colors duration-300">
                    {/* Decorative Doodle */}
                    <motion.div
                        animate={{ y: [0, -15, 0], rotate: [12, 15, 12] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 right-[-50px] md:right-10 w-32 md:w-48 opacity-20 md:opacity-100 pointer-events-none text-ink dark:text-white"
                    >
                        <DoodlePeace className="text-ink dark:text-white" />
                    </motion.div>
                    <Duo />
                </section>

                <section id="services" className="py-24 bg-forest text-white relative">
                    <motion.div
                        animate={{ y: [0, 10, 0], rotate: [-12, -10, -12] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-10 left-10 w-24 md:w-32 opacity-10 pointer-events-none"
                    >
                        <DoodleSnap className="text-white" />
                    </motion.div>
                    <Services />
                </section>

                <section id="projects" className="py-24 bg-paper dark:bg-ink transition-colors duration-300">
                    <Projects />
                </section>
            </main>

            <Footer />
        </div>
    );
};
