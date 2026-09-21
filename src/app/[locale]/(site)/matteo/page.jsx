import { getTranslations } from 'next-intl/server';
import MatteoPageClient from './MatteoPageClient';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';
import PersonSchema from '@/components/PersonSchema';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MatteoProfile' });
  const isItalian = locale === 'it';

  return {
    title: `Matteo Cese – ${t('header.role_badge')}`,
    description: t('about.p1'),
    alternates: {
      canonical: `/${locale}/matteo`,
      languages: { en: '/en/matteo', it: '/it/matteo', 'x-default': '/it/matteo' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title: `Matteo Cese – ${t('header.role_badge')}`,
      description: t('about.p1'),
      type: 'profile',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/matteo`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title: `Matteo Cese – ${t('header.role_badge')}`,
      description: t('about.p1'),
    },
  };
}

export default async function MatteoPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MatteoProfile' });
  return (
    <>
      <PageBreadcrumbs locale={locale} items={[{ name: 'Matteo Cese', href: `/${locale}/matteo` }]} />
      <PersonSchema person="matteo" locale={locale} jobTitle={t('header.role_badge')} description={t('about.p1')} />
      <MatteoPageClient />
    </>
  );
}
