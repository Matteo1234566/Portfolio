import { getTranslations } from 'next-intl/server';
import AiLightsClient from './AiLightsClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AiLights' });
  const isItalian = locale === 'it';

  return {
    title: `AiLights – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/ailights`,
      languages: { en: '/en/ailights', it: '/it/ailights' },
    },
    openGraph: {
      title: `AiLights – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/ailights`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `AiLights – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function AiLightsPage() {
  return <AiLightsClient />;
}
