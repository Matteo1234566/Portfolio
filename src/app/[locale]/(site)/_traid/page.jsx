import { getTranslations } from 'next-intl/server';
import TraidPageClient from './TraidPageClient';
import TraidSchema from './TraidSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Traid' });
  const isItalian = locale === 'it';

  return {
    title: `Traid – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/traid`,
      languages: { en: '/en/traid', it: '/it/traid', 'x-default': '/it/traid' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title: `Traid – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/traid`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title: `Traid – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default async function TraidPage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'Traid', href: `/${locale}/traid` }]} /><TraidSchema locale={locale} /><TraidPageClient /></>;
}
