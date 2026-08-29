'use client';

import React, { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Clock3,
  Compass,
  Cpu,
  PenTool,
  SearchX,
  Sparkles,
} from 'lucide-react';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import { useTranslations } from 'next-intl';
import { BLOG_CATEGORIES, BLOG_POSTS } from '@/app/[locale]/(site)/_blogs/blogData';

const CATEGORY_ICONS = {
  engineering: Cpu,
  design: PenTool,
  strategy: Compass,
};

const CATEGORY_LABELS = {
  en: {
    engineering: 'Engineering',
    design: 'Design',
    strategy: 'Strategy',
  },
  it: {
    engineering: 'Ingegneria',
    design: 'Design',
    strategy: 'Strategia',
  },
};

function formatDate(value, locale) {
  return new Date(value).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function BlogList({ params }) {
  const t = useTranslations('BlogList');
  const { locale } = use(params);
  const reduceMotion = useReducedMotion();

  const [activeCategory, setActiveCategory] = useState('all');

  const categoryLabels = CATEGORY_LABELS[locale] || CATEGORY_LABELS.en;
  const localizedUi =
    locale === 'it'
      ? {
          sectionLabel: 'Dispatch Editoriale',
          postCountSuffix: 'articoli',
          intro: 'Insight tecnici, decisioni di prodotto e note operative dal nostro lavoro quotidiano.',
          latest: 'Ultime uscite',
          highlights: 'Key takeaways',
          categories: 'Categorie',
          noItems: 'Nessun articolo in questa categoria',
          emptyHint: 'Cambia filtro o torna piu tardi per nuovi contenuti.',
        }
      : {
          sectionLabel: 'Editorial Dispatch',
          postCountSuffix: 'articles',
          intro: 'Technical insights, product decisions, and practical notes from our daily build process.',
          latest: 'Latest dispatches',
          highlights: 'Key takeaways',
          categories: 'Categories',
          noItems: 'No articles in this category',
          emptyHint: 'Switch filters or check back later for new posts.',
        };

  const posts = useMemo(
    () =>
      BLOG_POSTS.map((post) => ({
        ...post,
        content: post[locale] || post.en,
      })),
    [locale],
  );

  const totals = useMemo(() => {
    const byCategory = posts.reduce(
      (acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      },
      { all: posts.length },
    );
    return byCategory;
  }, [posts]);

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts[0];
  const secondaryPosts = filteredPosts.slice(1);

  const enterFromTop = reduceMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0, transition: { duration: 0.45 } };

  return (
    <main className="relative min-h-screen overflow-hidden bg-paper px-4 pb-24 pt-32 text-ink transition-colors duration-300 dark:bg-ink dark:text-smoke">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-28 -top-16 h-80 w-80 rounded-full bg-bubblegum/20 blur-3xl dark:bg-bubblegum/10" />
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-forest/15 blur-3xl dark:bg-white/5" />
        <div className="absolute bottom-0 left-0 h-40 w-full bg-[linear-gradient(0deg,rgba(15,23,42,0.08),transparent)] dark:bg-[linear-gradient(0deg,rgba(248,250,252,0.06),transparent)]" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <motion.header
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={enterFromTop}
          className="grid gap-8 rounded-[2.5rem] border-2 border-ink/10 bg-white/80 p-8 shadow-soft backdrop-blur-sm dark:border-white/15 dark:bg-white/5 md:grid-cols-[1.35fr_1fr] md:p-10"
        >
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ink/70 dark:border-white/20 dark:bg-white/5 dark:text-smoke/80">
              <Sparkles size={14} />
              {localizedUi.sectionLabel}
            </span>
            <h1 className="font-display text-5xl leading-[0.92] text-ink dark:text-white md:text-7xl">
              {t('header.title_line1')}
              <br />
              <span className="bg-gradient-to-r from-forest to-bubblegum bg-clip-text text-transparent">
                {t('header.title_line2')}
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-ink/70 dark:text-smoke/80">{localizedUi.intro}</p>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <p className="max-w-md text-lg leading-relaxed text-ink/75 dark:text-smoke/80">{t('header.description')}</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-ink/10 bg-paper p-3 text-center dark:border-white/15 dark:bg-white/5">
                <p className="font-display text-2xl text-ink dark:text-white">{posts.length}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink/55 dark:text-smoke/65">{localizedUi.postCountSuffix}</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-paper p-3 text-center dark:border-white/15 dark:bg-white/5">
                <p className="font-display text-2xl text-ink dark:text-white">3</p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink/55 dark:text-smoke/65">{localizedUi.categories}</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-paper p-3 text-center dark:border-white/15 dark:bg-white/5">
                <p className="font-display text-2xl text-ink dark:text-white">2023</p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink/55 dark:text-smoke/65">Archive</p>
              </div>
            </div>
          </div>
        </motion.header>

        <motion.section
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={enterFromTop}
          transition={reduceMotion ? undefined : { delay: 0.06 }}
          className="flex flex-wrap gap-3"
          aria-label={localizedUi.categories}
        >
          {BLOG_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const label = category === 'all' ? t('filters.all') : categoryLabels[category];

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer rounded-full border-2 px-5 py-2 text-sm font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                  isActive
                    ? 'border-ink bg-ink text-white shadow-hard dark:border-white dark:bg-white dark:text-ink dark:shadow-hard-white'
                    : 'border-ink/15 bg-white text-ink/70 hover:border-bubblegum hover:text-bubblegum dark:border-white/20 dark:bg-white/5 dark:text-smoke/75 dark:hover:border-bubblegum dark:hover:text-bubblegum'
                }`}
              >
                {label} <span className="ml-2 text-xs opacity-70">{totals[category] || 0}</span>
              </button>
            );
          })}
        </motion.section>

        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.section
              key="empty"
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={enterFromTop}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              className="rounded-[2rem] border-2 border-dashed border-ink/20 bg-white/70 p-16 text-center dark:border-white/25 dark:bg-white/5"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 bg-paper dark:border-white/25 dark:bg-white/10">
                <SearchX className="text-ink/70 dark:text-smoke/80" size={24} />
              </div>
              <h2 className="font-display text-3xl text-ink dark:text-white">{localizedUi.noItems}</h2>
              <p className="mt-2 text-ink/65 dark:text-smoke/70">{localizedUi.emptyHint}</p>
            </motion.section>
          ) : (
            <motion.section
              key={activeCategory}
              initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
              animate={enterFromTop}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              className="space-y-8"
            >
              {featuredPost && (
                <Link href={`/${locale}/blogs/${featuredPost.id}`} className="group block">
                  <Card className="overflow-hidden border-ink/20 bg-white/90 p-0 dark:border-white/20 dark:bg-white/5">
                    <div className="grid gap-0 lg:grid-cols-[1.2fr_1fr]">
                      <div className="relative border-b border-ink/10 p-8 dark:border-white/10 lg:border-b-0 lg:border-r">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${featuredPost.accent} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(15,23,42,0.65),rgba(15,23,42,0.25))]" />
                        <div className="relative flex h-full min-h-64 flex-col justify-between text-white">
                          <div className="space-y-4">
                            <p className="font-body text-xs uppercase tracking-[0.18em] text-white/80">{localizedUi.latest}</p>
                            <h2 className="font-display text-3xl leading-tight md:text-5xl">{featuredPost.content.title}</h2>
                          </div>
                          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/85">
                            <span>{formatDate(featuredPost.date, locale)}</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock3 size={14} />
                              {featuredPost.readTime} {locale === 'it' ? 'min' : 'min'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-8">
                        <div className="space-y-6">
                          <p className="text-base leading-relaxed text-ink/75 dark:text-smoke/80">{featuredPost.content.excerpt}</p>
                          <div>
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 dark:text-smoke/70">{localizedUi.highlights}</p>
                            <ul className="space-y-2">
                              {featuredPost.content.highlights.slice(0, 3).map((highlight) => (
                                <li key={highlight} className="text-sm text-ink/75 dark:text-smoke/78">
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <span className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-ink/20 bg-paper px-4 py-2 text-xs font-bold uppercase tracking-[0.13em] text-ink transition-colors duration-200 group-hover:border-bubblegum group-hover:text-bubblegum dark:border-white/25 dark:bg-white/10 dark:text-white">
                          {t('card.read_more')}
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {secondaryPosts.map((post, index) => {
                  const Icon = CATEGORY_ICONS[post.category] || Sparkles;
                  const cardDelay = reduceMotion ? 0 : 0.06 * (index + 1);

                  return (
                    <motion.div
                      key={post.id}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
                      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      transition={reduceMotion ? undefined : { delay: cardDelay, duration: 0.3 }}
                    >
                      <Link href={`/${locale}/blogs/${post.id}`} className="group block h-full">
                        <Card className="flex h-full cursor-pointer flex-col gap-6 border-ink/15 bg-white/90 p-7 transition-all duration-300 hover:border-bubblegum dark:border-white/20 dark:bg-white/5">
                          <div className="flex items-start justify-between gap-4">
                            <span className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink/70 dark:border-white/20 dark:bg-white/10 dark:text-smoke/80">
                              <Icon size={14} />
                              {categoryLabels[post.category]}
                            </span>
                            <span className="text-xs uppercase tracking-[0.12em] text-ink/45 dark:text-smoke/55">
                              {formatDate(post.date, locale)}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-200 group-hover:text-bubblegum dark:text-white">
                              {post.content.title}
                            </h3>
                            <p className="line-clamp-3 text-sm leading-relaxed text-ink/70 dark:text-smoke/78">{post.content.excerpt}</p>
                          </div>

                          <div className="mt-auto flex items-center justify-between border-t border-ink/10 pt-4 dark:border-white/10">
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink/55 dark:text-smoke/65">
                              {post.readTime} {locale === 'it' ? 'min lettura' : 'min read'}
                            </span>
                            <span className="inline-flex items-center gap-1 text-sm font-bold text-ink transition-colors duration-200 group-hover:text-bubblegum dark:text-white">
                              {t('card.read_more')}
                              <ArrowUpRight size={16} />
                            </span>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
