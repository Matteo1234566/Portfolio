import { getTranslations } from 'next-intl/server';
import TwoSequelPageClient from './TwoSequelPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TwoSequel' });
  const isItalian = locale === 'it';

  return {
    title: `2Sequel – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/twosequel`,
      languages: { en: '/en/twosequel', it: '/it/twosequel', 'x-default': '/it/twosequel' },
    },
    openGraph: {
      title: `2Sequel – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/twosequel`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `2Sequel – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function TwoSequelPage() {
  return <TwoSequelPageClient />;
}
