import { getTranslations } from 'next-intl/server';
import PyquarkPageClient from './PyquarkPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PyQuark' });
  const isItalian = locale === 'it';

  return {
    title: `PyQuark – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/pyquark`,
      languages: { en: '/en/pyquark', it: '/it/pyquark' },
    },
    openGraph: {
      title: `PyQuark – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/pyquark`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `PyQuark – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function PyquarkPage() {
  return <PyquarkPageClient />;
}
