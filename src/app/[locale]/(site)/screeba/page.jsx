import { getTranslations } from 'next-intl/server';
import ScreebaPageClient from './ScreebaPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Screeba' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'Screeba | Trascrivi lezioni audio in testo e scarica appunti Word'
    : 'Screeba | Transcribe lecture audio to text and export Word notes';

  return {
    title,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/screeba`,
      languages: { en: '/en/screeba', it: '/it/screeba', 'x-default': '/it/screeba' },
    },
    openGraph: {
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/screeba`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default function ScreebaPage() {
  return <ScreebaPageClient />;
}
