import { getTranslations } from 'next-intl/server';
import SimonePageClient from './SimonePageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SimoneProfile' });
  const isItalian = locale === 'it';

  return {
    title: `Simone Zannini – ${t('header.role_badge')}`,
    description: t('about.p1'),
    alternates: {
      canonical: `/${locale}/simone`,
      languages: { en: '/en/simone', it: '/it/simone', 'x-default': '/it/simone' },
    },
    openGraph: {
      title: `Simone Zannini – ${t('header.role_badge')}`,
      description: t('about.p1'),
      type: 'profile',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/simone`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Simone Zannini – ${t('header.role_badge')}`,
      description: t('about.p1'),
    },
  };
}

export default function SimonePage() {
  return <SimonePageClient />;
}
