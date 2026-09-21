import { getTranslations } from 'next-intl/server';
import SimonePageClient from './SimonePageClient';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PersonSchema from '@/components/PersonSchema';

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
      images: ['/opengraph-image'],
      title: `Simone Zannini – ${t('header.role_badge')}`,
      description: t('about.p1'),
      type: 'profile',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/simone`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title: `Simone Zannini – ${t('header.role_badge')}`,
      description: t('about.p1'),
    },
  };
}

export default async function SimonePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SimoneProfile' });
  return (
    <>
      <PageBreadcrumbs locale={locale} items={[{ name: 'Simone Zannini', href: `/${locale}/simone` }]} />
      <PersonSchema person="simone" locale={locale} jobTitle={t('header.role_badge')} description={t('about.p1')} />
      <SimonePageClient />
    </>
  );
}
