import { getTranslations } from 'next-intl/server';
import FishertigerPageClient from './FishertigerPageClient';
import FishertigerSchema from './FishertigerSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Fishertiger' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'fishertiger | Advisor locale per aste Fantacalcio Classic'
    : 'fishertiger | Local-first Classic Fantacalcio auction advisor';

  return {
    title,
    description: t('description'),
    keywords: isItalian
      ? ['fantacalcio', 'asta fantacalcio', 'advisor asta', 'simulazione Monte Carlo', 'quotazioni FVM', 'Serie A']
      : ['fantacalcio', 'fantasy football auction', 'auction advisor', 'Monte Carlo simulation', 'FVM values', 'Serie A'],
    alternates: {
      canonical: `/${locale}/fishertiger`,
      languages: { en: '/en/fishertiger', it: '/it/fishertiger', 'x-default': '/it/fishertiger' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/fishertiger`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function FishertigerPage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'fishertiger', href: `/${locale}/fishertiger` }]} /><FishertigerSchema locale={locale} /><FishertigerPageClient /></>;
}
