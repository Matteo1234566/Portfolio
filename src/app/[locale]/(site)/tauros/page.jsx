import { getTranslations } from 'next-intl/server';
import TaurosPageClient from './TaurosPageClient';
import TaurosSchema from './TaurosSchema';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Tauros' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'Tauros | Editor ROM Hack Pokémon con Rust, Tauri, MCP e mGBA'
    : 'Tauros | All-in-one Pokémon ROM Hack Editor with Rust, Tauri, MCP & mGBA';

  return {
    title,
    description: t('description'),
    alternates: {
      canonical: `/${locale}/tauros`,
      languages: { en: '/en/tauros', it: '/it/tauros', 'x-default': '/it/tauros' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description: t('description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/tauros`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description: t('description'),
    },
  };
}

export default async function TaurosPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <PageBreadcrumbs locale={locale} items={[{ name: 'Tauros', href: `/${locale}/tauros` }]} />
      <TaurosSchema locale={locale} />
      <TaurosPageClient />
    </>
  );
}
