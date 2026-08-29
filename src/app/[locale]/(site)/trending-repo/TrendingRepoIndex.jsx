'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Github, Search, X } from 'lucide-react';
import { repositories } from './repoData';
import { REPO_TAGS } from './repoTags';

export default function TrendingRepoIndex() {
  const t = useTranslations('TrendingRepoPage');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();
  const query = searchParams.get('q') || '';
  const activeTag = searchParams.get('tag') || '';

  const filteredRepositories = repositories.filter((repository) => {
    const search = query.toLowerCase().trim();
    const matchesSearch = !search || [repository.name, repository.owner, repository.language].some((value) =>
      value.toLowerCase().includes(search)
    );
    const matchesTag = !activeTag || repository.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const updateFilters = (nextQuery, nextTag) => {
    const params = new URLSearchParams();
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    if (nextTag) params.set('tag', nextTag);
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

  return (
    <main className="min-h-screen bg-paper font-body text-ink transition-colors duration-300 dark:bg-ink dark:text-smoke">
      <section className="relative overflow-hidden bg-forest px-4 pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <div className="pointer-events-none absolute -right-20 top-24 h-64 w-64 rounded-full border-[28px] border-bubblegum/20" />
        <div className="pointer-events-none absolute bottom-[-8rem] left-[-4rem] h-64 w-64 rounded-full border-[20px] border-white/10" />
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-6xl"
        >
          <Link href={`/${locale}`} className="mb-8 inline-flex items-center text-sm font-bold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-bubblegum">
            {t('backHome')}
          </Link>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-bubblegum">{t('label')}</p>
          <h1 className="max-w-4xl font-display text-6xl font-bold leading-[0.9] md:text-8xl">
            {t('title.start')} <span className="text-bubblegum italic">{t('title.highlight')}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">{t('intro')}</p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <label className="relative block max-w-2xl">
            <span className="sr-only">{t('searchLabel')}</span>
            <Search className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-ink/50 dark:text-smoke/50" size={22} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateFilters(event.target.value, activeTag)}
              placeholder={t('searchPlaceholder')}
              className="w-full rounded-full border-2 border-ink bg-white px-14 py-4 text-lg outline-none transition-shadow placeholder:text-ink/45 focus:ring-4 focus:ring-bubblegum/40 dark:border-white/30 dark:bg-white/5 dark:placeholder:text-smoke/45"
            />
          </label>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-smoke/50">
            {t('count', { count: filteredRepositories.length })}
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-2" aria-label={t('filterLabel')}>
          <button
            type="button"
            onClick={() => updateFilters(query, '')}
            className={`shrink-0 cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${!activeTag ? 'border-ink bg-ink text-white dark:border-white dark:bg-white dark:text-ink' : 'border-ink/20 bg-transparent hover:border-ink dark:border-white/20 dark:hover:border-white'}`}
          >
            {t('allTags')}
          </button>
          {REPO_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => updateFilters(query, activeTag === tag ? '' : tag)}
              className={`shrink-0 cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${activeTag === tag ? 'border-bubblegum bg-bubblegum text-ink' : 'border-ink/20 bg-transparent hover:border-ink dark:border-white/20 dark:hover:border-white'}`}
            >
              {t(`tags.${tag}`)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredRepositories.map((repository) => (
            <motion.article
              key={repository.slug}
              layout
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="mb-6 rounded-[2rem] border-2 border-ink bg-white p-6 shadow-hard transition-transform duration-200 hover:-translate-y-1 dark:border-white/20 dark:bg-white/5 md:p-8"
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[0.16em] text-ink/50 dark:text-smoke/50">
                    <span className="inline-flex items-center gap-2"><Github size={18} aria-hidden="true" />{repository.owner}</span>
                    <span aria-hidden="true">/</span>
                    <span>{repository.language}</span>
                  </div>
                  <h2 className="mb-3 font-display text-4xl font-bold md:text-5xl">{repository.name}</h2>
                  <p className="mb-6 text-lg leading-relaxed text-ink/70 dark:text-smoke/70">{t(`repositories.${repository.slug}.description`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {repository.tags.map((tag) => <span key={tag} className="rounded-full bg-forest/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest dark:bg-white/10 dark:text-bubblegum">{t(`tags.${tag}`)}</span>)}
                  </div>
                </div>
                <Link href={`/${locale}/trending-repo/${repository.slug}`} className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border-2 border-ink bg-bubblegum px-6 py-3 font-display font-bold uppercase tracking-wide text-ink shadow-hard transition-all duration-200 hover:-translate-y-1 hover:bg-white dark:border-white">
                  {t('readArticle')}
                  <ArrowUpRight size={19} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>

        {!filteredRepositories.length && (
          <div className="rounded-[2rem] border-2 border-dashed border-ink/30 px-6 py-16 text-center dark:border-white/30">
            <X className="mx-auto mb-4 text-bubblegum" size={32} aria-hidden="true" />
            <h2 className="font-display text-3xl font-bold">{t('emptyTitle')}</h2>
            <p className="mx-auto mt-3 max-w-md text-ink/65 dark:text-smoke/65">{t('emptyDescription')}</p>
          </div>
        )}
      </section>
    </main>
  );
}
