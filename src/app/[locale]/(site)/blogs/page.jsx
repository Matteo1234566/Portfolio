'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Tag, Zap, Palette, Terminal, Rocket } from 'lucide-react'; // Ho aggiunto icone specifiche
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import { useTranslations } from 'next-intl';

// --- DATI MOCK CON CONFIGURAZIONE VISUAL (GRADIENTI & ICONE) ---
const ALL_POSTS = [
    {
        id: 'ai-revolution',
        category: 'Tech',
        date: '2023-11-28',
        readTime: '5 min',
        visual: {
            gradient: "from-blue-600 to-violet-600",
            icon: <Terminal size={80} />
        },
        en: { title: 'The Quiet Revolution of AI in Everyday Code', excerpt: 'AI isn\'t just about robots; it\'s about the subtle optimizations in our daily workflows.' },
        it: { title: 'La rivoluzione silenziosa dell\'IA nel codice', excerpt: 'L\'IA non riguarda solo i robot; riguarda le sottili ottimizzazioni nel nostro lavoro quotidiano.' }
    },
    {
        id: 'duo-dynamic',
        category: 'Design',
        date: '2023-10-15',
        readTime: '3 min',
        visual: {
            gradient: "from-pink-500 to-rose-500", // Bubblegum vibes
            icon: <Palette size={80} />
        },
        en: { title: 'Designing for Chaos: The Duo Philosophy', excerpt: 'When structure meets chaos. How we used clashing styles to build our brand identity.' },
        it: { title: 'Progettare per il Caos: La filosofia del Duo', excerpt: 'Quando la struttura incontra il caos. Come abbiamo usato stili contrastanti per il nostro brand.' }
    },
    {
        id: 'nextjs-performance',
        category: 'Tech',
        date: '2023-09-10',
        readTime: '7 min',
        visual: {
            gradient: "from-emerald-500 to-teal-500", // Forest vibes
            icon: <Zap size={80} />
        },
        en: { title: 'Cracking the Code on Next.js 14 Server Actions', excerpt: 'Why we moved 80% of our backend logic directly into our frontend components.' },
        it: { title: 'Decifrare le Server Actions di Next.js 14', excerpt: 'Perché abbiamo spostato l\'80% della logica backend direttamente nei componenti frontend.' }
    },
    {
        id: 'startup-life',
        category: 'Business',
        date: '2023-08-22',
        readTime: '4 min',
        visual: {
            gradient: "from-amber-500 to-orange-500",
            icon: <Rocket size={80} />
        },
        en: { title: 'From Zero to One: The First 3 Months', excerpt: 'The honest truth about sleepless nights, coffee overdoses, and the first client win.' },
        it: { title: 'Da Zero a Uno: I primi 3 mesi', excerpt: 'La verità onesta su notti insonni, overdose di caffè e la prima vittoria con un cliente.' }
    }
];

const CATEGORIES = ['All', 'Tech', 'Design', 'Business'];

export default function BlogList({ params }) {
    const t = useTranslations('BlogList');
    const { locale } = use(params);

    const [filter, setFilter] = useState('All');
    const [hoveredCard, setHoveredCard] = useState(null);

    const filteredPosts = filter === 'All'
        ? ALL_POSTS
        : ALL_POSTS.filter(post => post.category === filter);

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden bg-paper dark:bg-ink transition-colors duration-300">

            {/* --- BACKGROUND DECORATION --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-bubblegum/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-forest/10 dark:bg-white/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        <h1 className="font-display text-7xl md:text-9xl font-bold text-ink dark:text-white leading-[0.85] tracking-tight">
                            {t('header.title_line1')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-bubblegum">
                                {t('header.title_line2')}
                            </span>
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
                                className="inline-block ml-4 text-6xl md:text-8xl align-top"
                            >
                                ⚡️
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-right max-w-xs"
                    >
                        <p className="text-ink/60 dark:text-smoke/60 text-lg leading-relaxed">
                            {t('header.description')}
                        </p>
                    </motion.div>
                </div>

                {/* --- FILTERS --- */}
                <motion.div
                    className="flex flex-wrap gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`
                                px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 border-2
                                ${filter === cat
                                ? 'bg-ink text-white border-ink dark:bg-white dark:text-ink dark:border-white scale-105 shadow-lg'
                                : 'bg-transparent text-ink/50 border-ink/10 dark:text-white/50 dark:border-white/10 hover:border-bubblegum hover:text-bubblegum'}
                              `}
                        >
                            {cat === 'All' ? t('filters.all') : cat}
                        </button>
                    ))}
                </motion.div>

                {/* --- GRID --- */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredPosts.map((post, index) => {
                            const content = post[locale] || post['en'];

                            return (
                                <motion.div
                                    layout
                                    key={post.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    onMouseEnter={() => setHoveredCard(post.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <Link href={`/${locale}/blogs/${post.id}`} className="block h-full group perspective-1000">
                                        <Card className={`
                                              h-full flex flex-col p-6 transition-all duration-500 transform-style-3d relative overflow-hidden
                                              ${hoveredCard === post.id ? 'border-bubblegum dark:border-bubblegum shadow-2xl -translate-y-2' : ''}
                                            `}>

                                            {/* --- MOCK IMAGE SECTION --- */}
                                            <div className="w-full h-48 mb-6 rounded-2xl overflow-hidden relative border-2 border-ink/5 dark:border-white/5 shadow-inner">
                                                {/* Gradiente di sfondo animato */}
                                                <div className={`
                                                    absolute inset-0 bg-gradient-to-br ${post.visual.gradient}
                                                    transition-transform duration-700 ease-out group-hover:scale-110
                                                `} />

                                                {/* Overlay scuro per contrasto */}
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                                                {/* Icona "Watermark" Centrale */}
                                                <div className="absolute inset-0 flex items-center justify-center text-white/30 mix-blend-overlay transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                                                    {post.visual.icon}
                                                </div>

                                                {/* Badge Categoria sopra l'immagine */}
                                                <div className="absolute top-3 left-3">
                                                    <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-ink bg-white/90 backdrop-blur-sm px-2 py-1 rounded uppercase shadow-sm">
                                                        <Tag size={10} /> {post.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* --- CONTENT SECTION --- */}
                                            <div className="flex flex-col flex-grow">
                                                <div className="flex justify-between items-center mb-3 text-xs font-mono text-ink/40 dark:text-white/40">
                                                    <span>{post.date}</span>
                                                    <span>{post.readTime}</span>
                                                </div>

                                                <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-ink dark:text-white group-hover:text-bubblegum transition-colors leading-tight">
                                                    {content.title}
                                                </h2>

                                                <p className="text-ink/70 dark:text-smoke/70 line-clamp-3 text-base mb-6 flex-grow">
                                                    {content.excerpt}
                                                </p>

                                                {/* Footer Action */}
                                                <div className="flex items-center justify-between border-t border-ink/10 dark:border-white/10 pt-4 mt-auto">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-ink/40 dark:text-white/40 group-hover:text-ink dark:group-hover:text-white transition-colors">
                                                      {t('card.read_more')}
                                                    </span>
                                                    <div className="w-8 h-8 rounded-full bg-paper dark:bg-white/10 flex items-center justify-center group-hover:bg-bubblegum group-hover:text-white transition-all duration-300 group-hover:rotate-45 text-ink dark:text-white">
                                                        <ArrowUpRight size={16} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Decorative Hover Glow on the Card itself */}
                                            <div className={`
                                                absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bubblegum/5 opacity-0 transition-opacity duration-500 pointer-events-none
                                                ${hoveredCard === post.id ? 'opacity-100' : ''}
                                              `} />

                                        </Card>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* --- EMPTY STATE --- */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🌪️</div>
                        <h3 className="font-display text-2xl font-bold text-ink dark:text-white mb-2">
                            {t('empty_state.title')}
                        </h3>
                        <p className="text-ink/60 dark:text-smoke/60">
                            {t('empty_state.description')}
                        </p>
                    </motion.div>
                )}

            </div>
        </div>
    );
}
