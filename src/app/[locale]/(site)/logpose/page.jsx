import { getTranslations } from 'next-intl/server';
import LogposePageClient from './LogposePageClient';
import LogposeSchema from './LogposeSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Logpose' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'Logpose | Board locale per progetti, stato Git e sessioni Claude Code & Codex'
    : 'Logpose | Local-first side-project board for Git hygiene & agent sessions';

  return {
    title,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/logpose`,
      languages: { en: '/en/logpose', it: '/it/logpose', 'x-default': '/it/logpose' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/logpose`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function LogposePage({ params }) {
  const { locale } = await params;
  return (
    <>
      <PageBreadcrumbs locale={locale} items={[{ name: 'Logpose', href: `/${locale}/logpose` }]} />
      <LogposeSchema locale={locale} />
      <LogposePageClient />
    </>
  );
}
