'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Importiamo il componente Image
import Button from '@/app/sections/ui/Button';
import { motion } from 'framer-motion';

export default function Footer({theme}) {

    return (
        <footer id="footer" className="bg-forest text-white pt-24 pb-12 overflow-hidden relative">
            <motion.div
                animate={{
                    opacity: [0.1, 0.15, 0.1],
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-bubblegum opacity-10 blur-[80px] pointer-events-none"
            />

            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-12"
                >
                    {/* Sostituzione Doodle con Image */}
                    <div className="w-24 h-24 mx-auto mb-8 relative animate-bounce">
                        {/* Mostriamo l'immagine solo quando il componente è montato lato client */}
                        <Image
                            src={theme === 'dark' ? '/pittogramma_flat_moon.webp' : '/pittogramma_flat_sun.webp'}
                            alt="Theme illustration"
                            width={96} // 24 * 4 (w-24)
                            height={96} // 24 * 4 (h-24)
                            className="object-contain"
                        />
                    </div>

                    <h2 className="font-display text-6xl md:text-8xl font-bold mb-6 leading-none">
                        READY TO <br/> <span className="text-bubblegum">BUILD?</span>
                    </h2>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                        Whether it's a complex AI pipeline or a fresh MVP,
                        we are ready to turn your chaos into code.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <a href="mailto:hello@simoneandmatteo.com" className="no-underline">
                            <Button variant="primary" className="text-lg px-10 py-4">
                                Email Us
                            </Button>
                        </a>
                        <Button variant="outline" className="text-lg px-10 py-4">
                            Book a Call
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-center items-center text-sm text-white/40 font-mono"
                >
                    <p>&copy; {new Date().getFullYear()} Simone & Matteo. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};
