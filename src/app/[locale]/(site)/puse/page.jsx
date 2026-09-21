import { getTranslations } from 'next-intl/server';
import PusePageClient from './PusePageClient';
import PuseSchema from './PuseSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Puse' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'PUSE | Party, PC, Borsa e Checksum | Pokémon Unbound Save Editor'
    : 'PUSE | Party, PC, Bag and Checksum | Pokémon Unbound Save Editor';

  return {
    title,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/puse`,
      languages: { en: '/en/puse', it: '/it/puse', 'x-default': '/it/puse' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/puse`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function PusePage({ params }) {
  const { locale } = await params;
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'PUSE', href: `/${locale}/puse` }]} /><PuseSchema locale={locale} /><PusePageClient /></>;
}
