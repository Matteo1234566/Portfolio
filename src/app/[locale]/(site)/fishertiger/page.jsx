import { getTranslations } from 'next-intl/server';
import FishertigerPageClient from './FishertigerPageClient';

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
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/fishertiger`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default function FishertigerPage() {
  return <FishertigerPageClient />;
}
