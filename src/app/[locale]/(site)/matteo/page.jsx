import { getTranslations } from 'next-intl/server';
import MatteoPageClient from './MatteoPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MatteoProfile' });
  const isItalian = locale === 'it';

  return {
    title: `Matteo Cese – ${t('header.role_badge')}`,
    description: t('about.p1'),
    alternates: {
      canonical: `/${locale}/matteo`,
      languages: { en: '/en/matteo', it: '/it/matteo' },
    },
    openGraph: {
      title: `Matteo Cese – ${t('header.role_badge')}`,
      description: t('about.p1'),
      type: 'profile',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/matteo`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Matteo Cese – ${t('header.role_badge')}`,
      description: t('about.p1'),
    },
  };
}

export default function MatteoPage() {
  return <MatteoPageClient />;
}
