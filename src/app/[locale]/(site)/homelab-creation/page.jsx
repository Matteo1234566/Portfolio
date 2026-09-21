import { getTranslations } from 'next-intl/server';
import HomeLabCreationClient from './HomeLabCreationClient';
import { BUSINESS, localizedUrl } from '@/lib/site';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomeLabCreation' });
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'HomeLab Creation | Configuratore infrastruttura domestica'
    : 'HomeLab Creation | Home Infrastructure Configurator';

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
      images: ['/opengraph-image'],
      title,
      description: t('meta_description'),
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/homelab-creation`,
    },
    twitter: {
      images: ['/twitter-image'],
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
    url: localizedUrl(locale, '/homelab-creation'),
    serviceType: 'Home infrastructure design and deployment',
    provider: {
      '@type': 'Organization',
      name: BUSINESS.name,
      url: BUSINESS.url,
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
      <PageBreadcrumbs locale={locale} items={[{ name: 'HomeLab Creation', href: `/${locale}/homelab-creation` }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HomeLabCreationClient />
    </>
  );
}
