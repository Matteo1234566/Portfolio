'use client';

import React, { useState } from 'react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { FileAudio, FileText, UploadCloud, Sparkles, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

export default function Screeba() {
    const t = useTranslations('Screeba');

    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileDrop = (e) => {
        e.preventDefault();
        setFile({ name: "lezione_diritto_privato.mp3", size: "24MB" });
    };

    const handleSimulateUpload = () => {
        if (!file) return;
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFile(null);
            }, 3000);
        }, 2000);
    };

    const steps = [
        {
            id: "upload",
            icon: <UploadCloud size={32} className="text-bubblegum" />,
            title: t('steps.upload.title'),
            desc: t('steps.upload.desc')
        },
        {
            id: "process",
            icon: <Sparkles size={32} className="text-forest dark:text-yellow-400" />,
            title: t('steps.process.title'),
            desc: t('steps.process.desc')
        },
        {
            id: "download",
            icon: <FileText size={32} className="text-ink dark:text-white" />,
            title: t('steps.download.title'),
            desc: t('steps.download.desc')
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-paper dark:bg-ink text-ink dark:text-smoke transition-colors duration-300">

            <div className="max-w-6xl mx-auto px-4 mt-5 lg:mt-16 mb-24">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 text-forest dark:text-bubblegum text-sm font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={14} />
                            <span>AI Transcription</span>
                        </div>

                        <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6 text-ink dark:text-white">
                            Screeba.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bubblegum to-purple-500 text-4xl md:text-5xl">
                        {t('tagline')}
                    </span>
                        </h1>

                        <p className="text-xl text-ink/70 dark:text-smoke/70 mb-8 leading-relaxed">
                            {t('description')}
                        </p>

                        <div className="flex items-center gap-4 text-sm font-bold text-ink/40 dark:text-white/40">
                            <span className="flex items-center gap-1"><CheckCircle size={16} /> MP3, WAV, M4A, ...</span>
                            <span className="flex items-center gap-1"><CheckCircle size={16} /> Word Output</span>
                        </div>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-5">
                            <a href="mailto:magosimo99@gmail.com">
                                <Button variant="primary" className="px-8 py-4 text-lg">
                                    {t('cta_demo')}
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:w-1/2 w-full"
                    >
                        <Card className="bg-white dark:bg-white/5 border-2 border-ink/5 dark:border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="border-b border-ink/5 dark:border-white/5 p-4 flex justify-between items-center bg-smoke/30 dark:bg-black/20">
                                <span className="font-mono text-xs font-bold uppercase tracking-widest opacity-50">Screeba MockUp</span>
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/50" />
                                </div>
                            </div>

                            <div className="p-6 md:p-8 space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">{t('demo.label_name')}</label>
                                    <input
                                        type="text"
                                        placeholder={t('demo.placeholder_name')}
                                        className="w-full bg-paper dark:bg-ink/50 border border-ink/10 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-bubblegum transition-colors"
                                    />
                                </div>

                                <div
                                    onClick={() => !file && setFile({ name: "lezione_prova.mp3", size: "12MB" })}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 relative ${
                                        file
                                            ? 'border-forest/50 bg-forest/5'
                                            : 'border-ink/10 dark:border-white/10 hover:border-bubblegum dark:hover:border-bubblegum hover:bg-bubblegum/5'
                                    }`}
                                >
                                    <AnimatePresence mode="wait">
                                        {isSuccess ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="text-forest dark:text-green-400"
                                            >
                                                <CheckCircle size={48} className="mx-auto mb-2" />
                                                <p className="font-bold">{t('demo.success')}</p>
                                            </motion.div>
                                        ) : file ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="flex items-center justify-between bg-white dark:bg-ink p-3 rounded-lg shadow-sm border border-ink/5"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-bubblegum/10 p-2 rounded text-bubblegum">
                                                        <FileAudio size={24} />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="font-bold text-sm truncate max-w-[150px]">{file.name}</p>
                                                        <p className="text-xs opacity-50">{file.size}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                                    className="p-1 hover:bg-red-500/10 hover:text-red-500 rounded transition-colors"
                                                >
                                                    <X size={18} />
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <UploadCloud size={40} className="mx-auto mb-3 text-ink/30 dark:text-white/30" />
                                                <p className="font-bold text-sm">{t('demo.drop_text')}</p>
                                                <p className="text-xs opacity-50 mt-1">{t('demo.drop_sub')}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {isUploading && (
                                        <div className="absolute inset-0 bg-paper/90 dark:bg-ink/90 flex flex-col items-center justify-center z-10">
                                            <div className="w-48 h-1 bg-ink/10 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                                                <motion.div
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '0%' }}
                                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                                    className="h-full bg-bubblegum w-full"
                                                />
                                            </div>
                                            <p className="text-xs font-mono animate-pulse">{t('demo.processing')}</p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    className="w-full py-4"
                                    disabled={!file || isUploading}
                                    onClick={handleSimulateUpload}
                                >
                                    {isUploading ? t('demo.btn_loading') : t('demo.btn_action')}
                                </Button>

                                <div className="flex items-start gap-2 text-xs text-ink/50 dark:text-white/40 bg-orange-50 dark:bg-orange-900/10 p-3 rounded-lg border border-orange-100 dark:border-orange-500/20">
                                    <AlertTriangle size={14} className="mt-0.5 text-orange-500 shrink-0" />
                                    <p>{t('demo.quality_warning')}</p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-32">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        {t('how_it_works')}
                    </h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, margin: "-50px" }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {steps.map((step) => (
                        <motion.div key={step.id} variants={item}>
                            <Card className="h-full text-center hover:border-bubblegum transition-colors group">
                                <div className="mx-auto w-16 h-16 bg-smoke dark:bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-ink/70 dark:text-smoke/70 leading-relaxed">
                                    {step.desc}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </div>
    );
}
