import { getTranslations } from 'next-intl/server';
import TraidPageClient from './TraidPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Traid' });
  const isItalian = locale === 'it';

  return {
    title: `Traid – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/traid`,
      languages: { en: '/en/traid', it: '/it/traid', 'x-default': '/en/traid' },
    },
    openGraph: {
      title: `Traid – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/traid`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Traid – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function TraidPage() {
  return <TraidPageClient />;
}
