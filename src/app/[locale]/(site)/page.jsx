import { getTranslations } from 'next-intl/server';
import LandingPageClient from './LandingPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isItalian = locale === 'it';
  const t = await getTranslations({ locale, namespace: 'Hero' });

  const title = isItalian
    ? 'DevOP | Consulenza AI, Computer Vision e Sviluppo Software a Roma'
    : 'DevOP | AI Consulting, Computer Vision and Custom Software Development in Rome';
  const description = t('description');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', it: '/it', 'x-default': '/it' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function LandingPage() {
  return <LandingPageClient />;
}
