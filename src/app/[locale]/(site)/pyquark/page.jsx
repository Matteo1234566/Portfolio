import { getTranslations } from 'next-intl/server';
import PyquarkPageClient from './PyquarkPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PyQuark' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'PyQuark | Server Python dual-protocol per Goldleaf e DBI'
    : 'PyQuark | Python dual-protocol remote server for Goldleaf and DBI';

  return {
    title,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/pyquark`,
      languages: { en: '/en/pyquark', it: '/it/pyquark', 'x-default': '/en/pyquark' },
    },
    openGraph: {
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/pyquark`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default function PyquarkPage() {
  return <PyquarkPageClient />;
}
