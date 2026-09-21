import { getTranslations } from 'next-intl/server';
import PyquarkPageClient from './PyquarkPageClient';
import PyquarkSchema from './PyquarkSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

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
      languages: { en: '/en/pyquark', it: '/it/pyquark', 'x-default': '/it/pyquark' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/pyquark`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function PyquarkPage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'PyQuark', href: `/${locale}/pyquark` }]} /><PyquarkSchema locale={locale} /><PyquarkPageClient /></>;
}
