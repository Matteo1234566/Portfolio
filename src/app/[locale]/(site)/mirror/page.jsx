import { getTranslations } from 'next-intl/server';
import MirrorPageClient from './MirrorPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Mirror' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'Mirror – Piattaforma Data Ops ISTAT | Open Data per Tutti'
    : 'Mirror – ISTAT Data Ops Platform | Open Data for Everyone';

  return {
    title,
    description: t('meta_description'),
    keywords: isItalian
      ? [
          'dati ISTAT',
          'open data ISTAT',
          'API ISTAT',
          'dataset statistici italiani',
          'data ops',
          'esplora dati ISTAT',
          'query linguaggio naturale ISTAT',
          'ISTAT data explorer',
          'SDMX REST API',
          'IstatData alternativa',
        ]
      : [
          'ISTAT data',
          'ISTAT API',
          'Italian open data',
          'ISTAT dataset browser',
          'data ops platform',
          'ISTAT natural language query',
          'Italian statistical data',
          'ISTAT explorer',
          'SDMX REST API',
          'IstatData alternative',
        ],
    alternates: {
      canonical: `/${locale}/mirror`,
      languages: { en: '/en/mirror', it: '/it/mirror' },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description: t('meta_description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/mirror`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('meta_description'),
    },
  };
}

export default async function MirrorPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Mirror' });

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mirror',
    url: `https://devop.it/${locale}/mirror`,
    applicationCategory: 'DataApplication',
    applicationSubCategory: 'Open Data Platform',
    operatingSystem: 'Web',
    inLanguage: locale === 'it' ? 'it' : 'en',
    isAccessibleForFree: true,
    description: t('meta_description'),
    featureList: [
      t('phases.docs.title'),
      t('phases.postman.title'),
      t('phases.guides.title'),
      t('features.browse.title'),
      t('features.visualize.title'),
      t('features.ai.title'),
      t('features.explain.title'),
    ],
    author: {
      '@type': 'Organization',
      name: 'DevOP',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [0, 1, 2, 3].map((n) => ({
      '@type': 'Question',
      name: t(`faq.${n}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.${n}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MirrorPageClient />
    </>
  );
}
