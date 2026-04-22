import { getTranslations } from 'next-intl/server';
import PusePageClient from './PusePageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Puse' });
  const isItalian = locale === 'it';

  return {
    title: `PUSE – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/puse`,
      languages: { en: '/en/puse', it: '/it/puse' },
    },
    openGraph: {
      title: `PUSE – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/puse`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `PUSE – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function PusePage() {
  return <PusePageClient />;
}
