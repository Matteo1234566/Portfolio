'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Clock } from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import { useTranslations } from 'next-intl';

// --- MOCK DATA ---
// Nota: In produzione questi dati verrebbero da un CMS o DB.
// Mantengo la struttura multilingua qui per simulare il fetch dei dati.
const BLOG_POSTS = [
    {
        id: 'ai-revolution',
        author: 'Matteo',
        date: '2023-11-28',
        readTime: 5,
        en: {
            title: 'The Quiet Revolution of AI in Everyday Code',
            category: 'Tech',
            content: [
                "Artificial Intelligence isn't just about robots taking over the world; it's about the subtle optimizations in our daily workflows.",
                "As developers, we often fear replacement, but the reality is augmentation. Tools like Copilot or ChatGPT are not architects; they are the ultimate bricklayers.",
                "In this article, we explore how we integrated AI into our startup's core loop without losing the 'human touch' that defines our brand."
            ],
            tags: ['AI', 'DevExp', 'Future']
        },
        it: {
            title: 'La rivoluzione silenziosa dell\'IA nel codice quotidiano',
            category: 'Tech',
            content: [
                "L'Intelligenza Artificiale non riguarda solo i robot che conquistano il mondo; riguarda le sottili ottimizzazioni nei nostri flussi di lavoro quotidiani.",
                "Come sviluppatori, spesso temiamo di essere sostituiti, ma la realtà è l'aumento delle capacità. Strumenti come Copilot o ChatGPT non sono architetti; sono i muratori definitivi.",
                "In questo articolo esploriamo come abbiamo integrato l'IA nel core loop della nostra startup senza perdere il 'tocco umano' che definisce il nostro brand."
            ],
            tags: ['IA', 'Sviluppo', 'Futuro']
        }
    },
    {
        id: 'duo-dynamic',
        author: 'Simone',
        date: '2023-10-15',
        readTime: 3,
        en: {
            title: 'Designing for Chaos: The Duo Philosophy',
            category: 'Design',
            content: [
                "When we started working together, our styles clashed. One loved structure, the other loved chaos.",
                "We realized that the sweet spot wasn't compromise, but collision. This website is a result of that collision.",
                "We use 'Bubblegum' pink to disrupt the seriousness of the 'Forest' green. It's intentional dissonance."
            ],
            tags: ['Design', 'UI/UX', 'Process']
        },
        it: {
            title: 'Progettare per il Caos: La filosofia del Duo',
            category: 'Design',
            content: [
                "Quando abbiamo iniziato a lavorare insieme, i nostri stili si scontravano. Uno amava la struttura, l'altro il caos.",
                "Abbiamo capito che il punto ideale non era il compromesso, ma la collisione. Questo sito web è il risultato di quella collisione.",
                "Usiamo il rosa 'Bubblegum' per disturbare la serietà del verde 'Forest'. È una dissonanza intenzionale."
            ],
            tags: ['Design', 'UI/UX', 'Processo']
        }
    }
];

export default function BlogPost({ params }) {
    // 1. Hook per le traduzioni UI
    const t = useTranslations('Blog');

    // 2. Unwrapping dei params (Next.js 15 / React 19)
    const { id, locale } = use(params);

    // 3. Recupero Dati (Simulazione DB)
    const post = BLOG_POSTS.find((p) => p.id === id);

    // UI 404 - Utilizza le traduzioni
    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-6xl font-bold text-ink dark:text-white mb-4"
                >
                    {t('not_found.title')}
                </motion.h1>
                <p className="text-xl text-ink/60 dark:text-smoke/60 mb-8">
                    {t('not_found.description')}
                </p>
                <Link href={`/${locale}`}>
                    <Button variant="primary">{t('not_found.button')}</Button>
                </Link>
            </div>
        );
    }

    // Seleziona il contenuto in base alla lingua (fallback su inglese)
    const content = post[locale] || post['en'];

    // Formatta la data
    const formattedDate = new Date(post.date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <article className="min-h-screen pt-32 pb-24 px-4 overflow-hidden relative">
            {/* Background Decorativo */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-forest/5 dark:bg-white/5 -z-10 rounded-b-[4rem]" />

            <div className="max-w-3xl mx-auto relative z-10">

                {/* Pulsante Indietro */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <Link
                        href={`/${locale}/blogs`}
                        className="mt-5 inline-flex items-center gap-2 text-ink/60 dark:text-smoke/60 hover:text-bubblegum dark:hover:text-bubblegum transition-colors font-bold uppercase tracking-wider text-sm"
                    >
                        <ArrowLeft size={18} />
                        {t('back')}
                    </Link>
                </motion.div>

                {/* Header Articolo */}
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block bg-bubblegum/20 text-bubblegum font-mono text-xs font-bold px-3 py-1 rounded mb-4 uppercase">
                          {content.category}
                        </span>

                        <h1 className="font-display text-4xl md:text-6xl font-bold text-ink dark:text-white leading-[1.1] mb-8">
                            {content.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-ink/60 dark:text-smoke/60 border-y border-ink/10 dark:border-white/10 py-6">
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-forest dark:text-bubblegum" />
                                <span className="text-ink dark:text-white">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-forest dark:text-bubblegum" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-forest dark:text-bubblegum" />
                                <span>{post.readTime} {t('min_read')}</span>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Immagine Featured (Placeholder) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl border-2 border-ink dark:border-white/20 relative group"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-forest to-ink flex items-center justify-center">
                        <span className="font-display text-white/20 text-6xl font-bold">{content.category}</span>
                    </div>
                </motion.div>

                {/* Contenuto Articolo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-p:text-ink/80 dark:prose-p:text-smoke/80 prose-a:text-bubblegum max-w-none"
                >
                    {content.content.map((paragraph, index) => (
                        <p key={index} className="mb-6 text-lg leading-relaxed">
                            {paragraph}
                        </p>
                    ))}
                </motion.div>

                {/* Tags Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t-2 border-dashed border-ink/10 dark:border-white/10"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Tag size={20} className="text-bubblegum" />
                        <span className="font-bold text-ink dark:text-white">{t('tags_label')}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {content.tags.map(tag => (
                            <span key={tag} className="px-4 py-2 bg-paper dark:bg-white/5 border border-ink/10 dark:border-white/10 rounded-full text-sm font-bold text-ink/70 dark:text-smoke/70 hover:border-bubblegum transition-colors cursor-default">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </article>
    );
}
