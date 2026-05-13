import { getTranslations } from 'next-intl/server';
import AiLightsClient from './AiLightsClient';

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
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/ailights`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default function AiLightsPage() {
  return <AiLightsClient />;
}
