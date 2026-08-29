'use client';

import React, { useState, useEffect, useRef } from 'react';
import Hero from "@/app/[locale]/(site)/sections/Hero";
import Authority from '@/app/[locale]/(site)/sections/Authority';
import Duo from "@/app/[locale]/(site)/sections/Duo";
import Services from "@/app/[locale]/(site)/sections/Services";
import TechnologyTracks from '@/app/[locale]/(site)/sections/TechnologyTracks';
import TrendingRepo from '@/app/[locale]/(site)/sections/TrendingRepo';
import Projects from "@/app/[locale]/(site)/sections/Projects";
import ProcessFaq from '@/app/[locale]/(site)/sections/ProcessFaq';
import { motion, AnimatePresence } from 'framer-motion';
import {LoadingScreen} from "@/app/[locale]/(site)/sections/LoadingScreen";
import Image from 'next/image';
import { useTheme } from "next-themes";
import Footer from "@/app/[locale]/(site)/sections/Footer";
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeSchema from '@/app/[locale]/(site)/sections/HomeSchema';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioLanding() {
    const [isLoading, setIsLoading] = useState(true);
    const { theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const searchParams = useSearchParams();
    const mainRef = useRef(null);
    const sectionRefs = useRef([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isLoading || !mainRef.current) return;

        const ctx = gsap.context(() => {
            sectionRefs.current.forEach((section, index) => {
                if (!section) return;

                gsap.fromTo(section,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        }, mainRef);

        return () => ctx.revert();
    }, [isLoading]);

    const currentTheme = mounted
        ? (theme === "system" ? systemTheme : theme)
        : "light";


    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("hasLoadedLanding");

        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("hasLoadedLanding", "true");
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isLoading) return;
        const section = searchParams.get('scrollTo');
        if (!section) return;

        const el = document.getElementById(section);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isLoading, searchParams]);


    return (
        <>
            <AnimatePresence mode="wait">
                {isLoading && <LoadingScreen key="loader" />}
            </AnimatePresence>

            {!isLoading && (
                <motion.div
                    ref={mainRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-screen bg-paper dark:bg-ink font-body text-ink dark:text-smoke selection:bg-bubblegum selection:text-ink overflow-x-hidden transition-colors duration-300"
                >
                    <AnimatePresence mode="wait">
                        <motion.main
                            key="home"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                        >
                            <HomeSchema />
                            <Hero/>

                            <section
                                id="authority"
                                ref={el => sectionRefs.current[0] = el}
                                className="py-24 bg-paper dark:bg-ink transition-colors duration-300"
                            >
                                <Authority />
                            </section>

                            <section
                                id="duo"
                                ref={el => sectionRefs.current[1] = el}
                                className="relative py-24 overflow-hidden transition-all duration-300"
                                style={{
                                    backgroundImage: currentTheme === 'dark'
                                        ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/moon_bg.webp')`
                                        : `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/sun_bg.webp')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                <motion.div
                                    animate={{y: [0, -15, 0], rotate: [12, 15, 12]}}
                                    transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                                    className="absolute top-10 right-[-50px] md:right-10 w-32 md:w-48 aspect-square opacity-20 md:opacity-100 pointer-events-none"
                                >
                                    <Image
                                        src={currentTheme === 'dark' ? '/pittogramma_moon.webp' : '/pittogramma_sun.webp'}
                                        alt="Decorative Element"
                                        fill
                                        sizes="(max-width: 768px) 128px, 192px"
                                        className="object-contain drop-shadow-lg"
                                    />
                                </motion.div>
                                <Duo/>
                            </section>

                            <section
                                id="services"
                                ref={el => sectionRefs.current[2] = el}
                                className="py-24 bg-forest text-white relative"
                            >
                                <motion.div
                                    animate={{y: [0, 10, 0], rotate: [-12, -10, -12]}}
                                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                                    className="absolute bottom-10 left-10 w-24 md:w-32 opacity-10 pointer-events-none"
                                >
                                    <img
                                        src={currentTheme === 'dark' ? '/moon.svg' : '/sun.svg'}
                                        alt="Decorative Element"
                                        className="w-full h-full object-contain drop-shadow-lg"
                                    />
                                </motion.div>
                                <Services/>
                            </section>

                            <section
                                id="technologies"
                                ref={el => sectionRefs.current[3] = el}
                                className="py-24 bg-forest text-white relative border-t border-white/10"
                            >
                                <TechnologyTracks />
                            </section>

                            <section
                                id="trending-repo"
                                ref={el => sectionRefs.current[4] = el}
                                className="py-24 bg-paper dark:bg-ink transition-colors duration-300"
                            >
                                <TrendingRepo />
                            </section>

                            <section
                                id="projects"
                                ref={el => sectionRefs.current[5] = el}
                                className="py-24 bg-paper dark:bg-ink transition-colors duration-300"
                            >
                                <Projects/>
                            </section>

                            <section
                                id="faq"
                                ref={el => sectionRefs.current[6] = el}
                                className="py-24 bg-smoke/40 dark:bg-white/5 transition-colors duration-300"
                            >
                                <ProcessFaq />
                            </section>
                        </motion.main>
                    </AnimatePresence>
                    <Footer />
                </motion.div>
            )}
        </>
    );
}
