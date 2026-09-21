import { getTranslations } from 'next-intl/server';
import CapturePrivacyClient from './CapturePrivacyClient';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CapturePrivacy' });
  const isItalian = locale === 'it';

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: {
      canonical: `/${locale}/capture/privacy`,
      languages: {
        en: '/en/capture/privacy',
        it: '/it/capture/privacy',
        'x-default': '/it/capture/privacy',
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      images: ['/opengraph-image'],
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/capture/privacy`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle'),
    },
  };
}

export default async function CapturePrivacyPage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'Capture', href: `/${locale}/capture` }, { name: locale === 'it' ? 'Privacy' : 'Privacy', href: `/${locale}/capture/privacy` }]} /><CapturePrivacyClient /></>;
}
