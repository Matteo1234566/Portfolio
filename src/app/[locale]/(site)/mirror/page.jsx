import { getTranslations } from 'next-intl/server';
import MirrorPageClient from './MirrorPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Mirror' });
  const isItalian = locale === 'it';

  return {
    title: `Mirror – ${t('tagline')}`,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/mirror`,
      languages: { en: '/en/mirror', it: '/it/mirror' },
    },
    openGraph: {
      title: `Mirror – ${t('tagline')}`,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/mirror`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Mirror – ${t('tagline')}`,
      description: t('description'),
    },
  };
}

export default function MirrorPage() {
  return <MirrorPageClient />;
}
