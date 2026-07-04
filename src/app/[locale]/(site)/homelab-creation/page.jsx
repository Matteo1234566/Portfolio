import { getTranslations } from 'next-intl/server';
import HomeLabCreationClient from './HomeLabCreationClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomeLabCreation' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'HomeLab Creation | Configuratore infrastruttura domestica DevOP'
    : 'HomeLab Creation | DevOP Home Infrastructure Configurator';

  return {
    title,
    description: t('meta_description'),
    keywords: isItalian
      ? ['homelab', 'NAS domestico', 'server domestico', 'WireGuard VPN', 'backup automatici', 'rete domestica avanzata']
      : ['homelab', 'home NAS', 'home server', 'WireGuard VPN', 'automated backups', 'advanced home network'],
    alternates: {
      canonical: `/${locale}/homelab-creation`,
      languages: { en: '/en/homelab-creation', it: '/it/homelab-creation', 'x-default': '/it/homelab-creation' },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description: t('meta_description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/homelab-creation`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('meta_description'),
    },
  };
}

export default async function HomeLabCreationPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomeLabCreation' });

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'HomeLab Creation',
    url: `https://www.devop.sbs/${locale}/homelab-creation`,
    serviceType: 'Home infrastructure design and deployment',
    provider: {
      '@type': 'Organization',
      name: 'DevOP',
      url: 'https://www.devop.sbs',
    },
    areaServed: 'Italy',
    inLanguage: locale === 'it' ? 'it' : 'en',
    description: t('meta_description'),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '1670',
      highPrice: '5690',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HomeLabCreationClient />
    </>
  );
}
