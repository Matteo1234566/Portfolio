import { getTranslations } from 'next-intl/server';
import LandingPageClient from './LandingPageClient';
import HomeSchema from './sections/HomeSchema';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isItalian = locale === 'it';
  const t = await getTranslations({ locale, namespace: 'Hero' });

  const title = isItalian
    ? 'Sviluppo AI e Software su Misura'
    : 'AI and Custom Software Development';
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', it: '/it', 'x-default': '/it' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function LandingPage({ params }) {
  const { locale } = await params;

  return (
    <>
      <HomeSchema locale={locale} />
      <Suspense fallback={<main className="min-h-screen bg-paper dark:bg-ink" />}><LandingPageClient /></Suspense>
    </>
  );
}
