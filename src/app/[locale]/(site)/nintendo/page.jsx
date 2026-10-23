import { getTranslations } from 'next-intl/server';
import NintendoPageClient from './NintendoPageClient';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Nintendo.page' });
  const isItalian = locale === 'it';
  const title = t('metaTitle');
  const description = t('metaDescription');

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/nintendo`,
      languages: { en: '/en/nintendo', it: '/it/nintendo', 'x-default': '/it/nintendo' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/nintendo`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default async function NintendoPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Nintendo.page' });
  return <><PageBreadcrumbs locale={locale} items={[{ name: t('breadcrumb'), href: `/${locale}/nintendo` }]} tone="light" /><NintendoPageClient /></>;
}
