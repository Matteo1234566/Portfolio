import { getTranslations } from 'next-intl/server';
import TargagePageClient from './TargagePageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Targage' });
  const isItalian = locale === 'it';

  return {
    title: `Targage – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/targage`,
      languages: { en: '/en/targage', it: '/it/targage', 'x-default': '/it/targage' },
    },
    openGraph: {
      title: `Targage – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/targage`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Targage – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function TargagePage() {
  return <TargagePageClient />;
}
