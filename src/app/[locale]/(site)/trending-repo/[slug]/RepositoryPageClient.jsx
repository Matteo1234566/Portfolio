'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function RepositoryPageClient({ repository }) {
  const locale = useLocale();
  const t = useTranslations('TrendingRepoDetail');
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-paper font-body text-ink transition-colors duration-300 dark:bg-ink dark:text-smoke">
      <section className="bg-forest px-4 pb-20 pt-32 text-white md:pb-28 md:pt-40">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <Link href={`/${locale}/trending-repo`} className="mb-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/65 transition-colors hover:text-bubblegum">
            <ArrowLeft size={18} aria-hidden="true" />
            {t('backToIndex')}
          </Link>
          <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-bubblegum">
            <Github size={22} aria-hidden="true" />
            <span>{repository.owner}</span>
            <span className="text-white/40" aria-hidden="true">/</span>
            <span className="text-white/75">{repository.name}</span>
          </div>
          <h1 className="max-w-4xl font-display text-6xl font-bold leading-[0.9] md:text-8xl">{t('title', { name: repository.name })}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-white/75 md:text-2xl">{t(`repositories.${repository.slug}.description`)}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={repository.githubUrl} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full border-2 border-ink bg-bubblegum px-6 py-3 font-display font-bold uppercase tracking-wide text-ink shadow-hard-white transition-all duration-200 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-bubblegum focus:ring-offset-2 focus:ring-offset-forest">
              <Github size={20} aria-hidden="true" />
              {t('githubCta')}
              <ArrowUpRight size={19} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </a>
            {repository.websiteUrl && (
              <a href={repository.websiteUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-6 py-3 font-display font-bold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-forest focus:outline-none focus:ring-2 focus:ring-bubblegum">
                <ExternalLink size={19} aria-hidden="true" />
                {t('websiteCta')}
              </a>
            )}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:py-24 lg:grid-cols-[1.3fr_0.7fr]">
        <motion.article
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] border-2 border-ink bg-white p-6 shadow-hard dark:border-white/20 dark:bg-white/5 md:p-10"
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-bubblegum">{t('whyLabel')}</p>
          <h2 className="mb-5 font-display text-4xl font-bold md:text-5xl">{t(`repositories.${repository.slug}.whyTitle`)}</h2>
          <p className="text-lg leading-relaxed text-ink/70 dark:text-smoke/70">{t(`repositories.${repository.slug}.whyDescription`)}</p>

          <h3 className="mb-5 mt-10 font-display text-3xl font-bold">{t('highlightsTitle')}</h3>
          <ul className="space-y-4">
            {repository.highlights.map((_, index) => (
              <li key={index} className="flex items-start gap-3 text-lg leading-relaxed text-ink/75 dark:text-smoke/75">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-bubblegum" />
                {t(`repositories.${repository.slug}.highlights.${index}`)}
              </li>
            ))}
          </ul>
        </motion.article>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border-2 border-ink bg-forest p-6 text-white shadow-hard md:p-8">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-bubblegum">{t('detailsLabel')}</p>
            <dl className="space-y-5">
              <div><dt className="text-sm text-white/50">{t('author')}</dt><dd className="mt-1 text-xl font-bold">{repository.owner}</dd></div>
              <div><dt className="text-sm text-white/50">{t('language')}</dt><dd className="mt-1 text-xl font-bold">{repository.language}</dd></div>
              <div><dt className="text-sm text-white/50">{t('license')}</dt><dd className="mt-1 text-xl font-bold">{repository.license}</dd></div>
            </dl>
          </div>
          <div className="rounded-[2rem] border-2 border-ink bg-white p-6 shadow-soft dark:border-white/20 dark:bg-white/5 md:p-8">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-ink/50 dark:text-smoke/50">{t('stackLabel')}</p>
            <div className="flex flex-wrap gap-2">
              {repository.stack.map((item) => <span key={item} className="rounded-full border border-ink/15 px-3 py-2 text-sm font-bold dark:border-white/15">{item}</span>)}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
