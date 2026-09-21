import { getTranslations } from 'next-intl/server';
import TargagePageClient from './TargagePageClient';
import CaseStudySchema from '../_case-studies/CaseStudySchema';
import TargageSchema from './TargageSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

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
      images: ['/opengraph-image'],
      title: `Targage – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/targage`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title: `Targage – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default async function TargagePage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'Targage', href: `/${locale}/targage` }]} /><TargageSchema locale={locale} /><CaseStudySchema project="targage" locale={locale} /><TargagePageClient /></>;
}
