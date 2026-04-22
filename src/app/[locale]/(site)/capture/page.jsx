import { getTranslations } from 'next-intl/server';
import CapturePageClient from './CapturePageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Capture' });
  const isItalian = locale === 'it';

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: isItalian
      ? [
          'appunti veloci',
          'app per prendere appunti offline',
          'note private offline',
          'appunti senza account',
          'to do list minimalista',
          'focus quotidiano',
          'app local-first',
        ]
      : [
          'quick capture notes app',
          'offline note taking app',
          'private notes app no account',
          'minimalist task app',
          'daily focus app',
          'local-first notes app',
        ],
    alternates: {
      canonical: `/${locale}/capture`,
      languages: {
        en: '/en/capture',
        it: '/it/capture',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/capture`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

export default async function CapturePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Capture' });

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Capture',
    url: `/${locale}/capture`,
    applicationCategory: 'ProductivityApplication',
    applicationSubCategory: 'Note Taking',
    operatingSystem: 'Android, iOS',
    inLanguage: locale,
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    description: t('meta.description'),
    featureList: [
      t('hero.badge_offline'),
      t('hero.badge_private'),
      t('hero.badge_local'),
      t('focus.item_1_title'),
    ],
    author: {
      '@type': 'Organization',
      name: 'DevOP',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      '@type': 'Question',
      name: t(`faq.q${n}`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.a${n}`),
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
      <CapturePageClient />
    </>
  );
}
