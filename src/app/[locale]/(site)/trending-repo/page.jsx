import TrendingRepoIndex from '@/app/[locale]/(site)/trending-repo/TrendingRepoIndex';
import { Suspense } from 'react';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isItalian = locale === 'it';
  const title = isItalian ? 'Trending Repo | Open source da scoprire' : 'Trending Repo | Open source worth discovering';
  const description = isItalian
    ? 'Repository open source, strumenti liberi e progetti da scoprire ogni giorno.'
    : 'Open source repositories, free tools, and projects worth discovering every day.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/trending-repo`,
      languages: { en: '/en/trending-repo', it: '/it/trending-repo', 'x-default': '/it/trending-repo' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/trending-repo`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default async function TrendingRepoPage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'Trending Repo', href: `/${locale}/trending-repo` }]} /><Suspense fallback={<main className="min-h-screen bg-paper dark:bg-ink" />}><TrendingRepoIndex /></Suspense></>;
}
