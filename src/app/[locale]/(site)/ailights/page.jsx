import { getTranslations } from 'next-intl/server';
import AiLightsClient from './AiLightsClient';
import CaseStudySchema from '../_case-studies/CaseStudySchema';
import AiLightsSchema from './AiLightsSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AiLights' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'AiLights | Telecamere sportive AI per calcio, futsal, tennis e padel'
    : 'AiLights | AI sports cameras for football, futsal, tennis and padel';

  return {
    title,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/ailights`,
      languages: { en: '/en/ailights', it: '/it/ailights', 'x-default': '/it/ailights' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/ailights`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function AiLightsPage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'AiLights', href: `/${locale}/ailights` }]} /><AiLightsSchema locale={locale} /><CaseStudySchema project="ailights" locale={locale} /><AiLightsClient /></>;
}
