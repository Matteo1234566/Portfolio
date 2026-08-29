'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, ChevronRight, Clock3, Tag, User } from 'lucide-react';
import Button from '@/app/[locale]/(site)/sections/ui/Button';
import Card from '@/app/[locale]/(site)/sections/ui/Card';
import { useTranslations } from 'next-intl';
import { BLOG_POSTS } from '@/app/[locale]/(site)/_blogs/blogData';

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
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPost({ params }) {
  const t = useTranslations('Blog');
  const { id, locale } = use(params);
  const reduceMotion = useReducedMotion();

  const post = BLOG_POSTS.find((entry) => entry.id === id);

  if (!post) {
    return (
      <main className="min-h-screen px-4 pt-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[2rem] border-2 border-dashed border-ink/20 bg-white/75 p-12 text-center dark:border-white/20 dark:bg-white/5">
          <motion.h1
            initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            className="font-display text-6xl text-ink dark:text-white"
          >
            {t('not_found.title')}
          </motion.h1>
          <p className="mt-3 text-lg text-ink/65 dark:text-smoke/70">{t('not_found.description')}</p>
          <Link href={`/${locale}`} className="mt-8">
            <Button variant="primary">{t('not_found.button')}</Button>
          </Link>
        </div>
      </main>
    );
  }

  const content = post[locale] || post.en;
  const categoryLabel = (CATEGORY_LABELS[locale] || CATEGORY_LABELS.en)[post.category] || post.category;
  const relatedPosts = BLOG_POSTS.filter((entry) => entry.category === post.category && entry.id !== post.id).slice(0, 2);

  return (
    <article className="relative min-h-screen overflow-hidden bg-paper px-4 pb-24 pt-40 transition-colors duration-300 dark:bg-ink">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-forest/12 blur-3xl dark:bg-white/5" />
        <div className="absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-bubblegum/20 blur-3xl dark:bg-bubblegum/10" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-8">
        <nav
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/55 dark:text-smoke/65"
          aria-label="Breadcrumb"
        >
          <Link href={`/${locale}`} className="cursor-pointer transition-colors hover:text-bubblegum">
            DevOP
          </Link>
          <ChevronRight size={14} />
          <Link href={`/${locale}/blogs`} className="cursor-pointer transition-colors hover:text-bubblegum">
            Blog
          </Link>
          <ChevronRight size={14} />
          <span className="truncate text-ink/75 dark:text-smoke/85">{categoryLabel}</span>
        </nav>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          className="rounded-[2.2rem] border-2 border-ink/10 bg-white/85 p-8 shadow-soft dark:border-white/15 dark:bg-white/5 md:p-10"
        >
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}/blogs`}
              className="inline-flex cursor-pointer items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/60 transition-colors hover:text-bubblegum dark:text-smoke/70"
            >
              <ArrowLeft size={15} />
              {t('back')}
            </Link>

            <span className="inline-flex items-center rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-ink/70 dark:border-white/20 dark:bg-white/10 dark:text-smoke/80">
              {categoryLabel}
            </span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-ink dark:text-white md:text-6xl">{content.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink/75 dark:text-smoke/80">{content.excerpt}</p>

          <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-ink/10 pt-5 text-sm text-ink/65 dark:border-white/10 dark:text-smoke/70">
            <span className="inline-flex items-center gap-2">
              <User size={16} className="text-forest dark:text-bubblegum" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={16} className="text-forest dark:text-bubblegum" />
              {formatDate(post.date, locale)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={16} className="text-forest dark:text-bubblegum" />
              {post.readTime} {t('min_read')}
            </span>
          </div>
        </motion.div>

        <motion.section
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { delay: 0.05 }}
          className="overflow-hidden rounded-[2rem] border-2 border-ink/15 dark:border-white/20"
        >
          <div className={`relative bg-gradient-to-br ${post.accent} px-8 py-10 md:px-10 md:py-12`}>
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(15,23,42,0.68),rgba(15,23,42,0.25))]" />
            <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                  {locale === 'it' ? 'Sintesi rapida' : 'Quick brief'}
                </p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-white md:text-4xl">
                  {locale === 'it' ? 'Punti chiave da portare nel prossimo sprint' : 'Takeaways to carry into your next sprint'}
                </h2>
              </div>
              <ul className="space-y-3">
                {content.highlights.map((item) => (
                  <li key={item} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reduceMotion ? undefined : { delay: 0.1 }}
          className="space-y-6"
        >
          {content.content.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-ink/80 dark:text-smoke/82">
              {paragraph}
            </p>
          ))}
        </motion.section>

        <section className="rounded-[1.8rem] border-2 border-dashed border-ink/15 bg-white/70 p-7 dark:border-white/20 dark:bg-white/5">
          <div className="mb-4 flex items-center gap-2 text-ink dark:text-white">
            <Tag size={18} className="text-bubblegum" />
            <h2 className="font-display text-2xl">{t('tags_label')}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm font-bold text-ink/75 dark:border-white/20 dark:bg-white/10 dark:text-smoke/80"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="space-y-4">
            <h2 className="font-display text-3xl text-ink dark:text-white">
              {locale === 'it' ? 'Continua a leggere' : 'Keep reading'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedPosts.map((related) => {
                const relatedContent = related[locale] || related.en;

                return (
                  <Link key={related.id} href={`/${locale}/blogs/${related.id}`} className="group block h-full">
                    <Card className="flex h-full cursor-pointer flex-col justify-between gap-4 border-ink/15 bg-white/80 p-6 transition-colors duration-200 hover:border-bubblegum dark:border-white/20 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.13em] text-ink/55 dark:text-smoke/65">{formatDate(related.date, locale)}</p>
                      <h3 className="font-display text-2xl leading-tight text-ink transition-colors duration-200 group-hover:text-bubblegum dark:text-white">
                        {relatedContent.title}
                      </h3>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-ink/75 dark:text-smoke/80">
                        {locale === 'it' ? 'Apri articolo' : 'Open article'}
                        <ArrowUpRight size={16} />
                      </span>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
