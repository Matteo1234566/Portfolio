import { getTranslations } from 'next-intl/server';
import CapturePrivacyClient from './CapturePrivacyClient';

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
      title: t('title'),
      description: t('subtitle'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/capture/privacy`,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle'),
    },
  };
}

export default function CapturePrivacyPage() {
  return <CapturePrivacyClient />;
}
