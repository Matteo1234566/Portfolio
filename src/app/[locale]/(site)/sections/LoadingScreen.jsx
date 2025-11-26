import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
    const text = "INITIALIZING";

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-paper text-ink"
        >
            <div className="flex items-center gap-1 py-4">
                <div className="flex">
                    {text.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            className="font-display text-4xl md:text-6xl font-bold tracking-tighter"
                            animate={{
                                y: [0, -15, 0],
                                opacity: [0.3, 1, 0.3],
                                color: ["#0f172a", "#6366f1", "#0f172a"]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: index * 0.1,
                                ease: "easeInOut",
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                <motion.div
                    animate={{opacity: [1, 1, 0, 0, 1, 1]}}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="w-4 h-8 md:w-6 md:h-12 bg-bubblegum ml-2"
                />
            </div>

            <motion.div
                initial={{width: 0}}
                animate={{width: 200}}
                transition={{duration: 2.2, ease: "easeInOut"}}
                className="h-1 bg-ink/10 mt-8 rounded-full overflow-hidden"
            >
                <div className="h-full bg-bubblegum w-full" />
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 font-mono text-xs uppercase tracking-widest"
            >
                Simone & Matteo AI Duo
            </motion.p>
        </motion.div>
    );
};
