import { getTranslations } from 'next-intl/server';
import TargagePageClient from './TargagePageClient';
import CaseStudySchema from '../_case-studies/CaseStudySchema';

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
  return <><CaseStudySchema project="targage" locale={locale} /><TargagePageClient /></>;
}
