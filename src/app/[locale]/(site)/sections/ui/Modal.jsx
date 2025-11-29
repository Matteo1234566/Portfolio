'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, X, Flame, UtensilsCrossed } from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { useTranslations } from 'next-intl';

export default function CookingModal({ isOpen, onClose }) {
    const t = useTranslations('CookingModal');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop con blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-ink/40 dark:bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-sm px-4"
                    >
                        <div className="relative bg-paper dark:bg-ink border-4 border-ink dark:border-white/20 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] overflow-hidden text-center">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-ink dark:text-white"
                            >
                                <X size={20} />
                            </button>

                            {/* Fun Animation Container */}
                            <div className="flex justify-center items-end h-32 mb-6 relative">

                                {/* Steam Particles */}
                                <motion.div
                                    animate={{ y: [-10, -25], opacity: [0, 1, 0], x: [-5, 5] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                    className="absolute bottom-20 left-1/2 -translate-x-4"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gray-400/50" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [-10, -30], opacity: [0, 1, 0], x: [5, -5] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                                    className="absolute bottom-20 left-1/2 translate-x-2"
                                >
                                    <div className="w-3 h-3 rounded-full bg-gray-400/40" />
                                </motion.div>

                                {/* Bouncing Chef Hat */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [-5, 5, -5],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="relative z-10 text-forest dark:text-bubblegum"
                                >
                                    <ChefHat size={80} strokeWidth={1.5} />
                                </motion.div>

                                {/* Fire Base */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
                                    <motion.div
                                        animate={{ scaleY: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                                        className="text-orange-500"
                                    >
                                        <Flame size={24} fill="currentColor" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ scaleY: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: 0.1 }}
                                        className="text-red-500 -ml-2"
                                    >
                                        <Flame size={28} fill="currentColor" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <h3 className="font-display text-3xl font-bold mb-3 text-ink dark:text-white">
                                {t('title')}
                            </h3>

                            <p className="text-ink/70 dark:text-smoke/70 mb-8 leading-relaxed">
                                {t('description')}
                            </p>

                            <div className="flex justify-center">
                                <Button onClick={onClose} className="w-full justify-center gap-2 group">
                                    <UtensilsCrossed size={18} className="group-hover:rotate-45 transition-transform" />
                                    {t('cta')}
                                </Button>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
