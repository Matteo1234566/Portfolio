import { getTranslations } from 'next-intl/server';
import { BUSINESS, SITE_URL, localizedUrl } from '@/lib/site';

export default async function HomeSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'ProcessFaq' });
  const pageUrl = localizedUrl(locale);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: BUSINESS.name,
      url: SITE_URL,
      logo: `${SITE_URL}/pittogramma_sun.webp`,
      email: BUSINESS.email,
      description:
        locale === 'it'
          ? 'Boutique di ingegneria AI e sviluppo software fondata da Simone Zannini e Matteo Cese.'
          : 'Boutique AI engineering and custom software development studio founded by Simone Zannini and Matteo Cese.',
      foundingLocation: 'Rome, Italy',
      founder: [
        { '@id': `${SITE_URL}/#simone-zannini` },
        { '@id': `${SITE_URL}/#matteo-cese` },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: BUSINESS.email,
        availableLanguage: ['Italian', 'English'],
      },
      sameAs: [
        'https://www.linkedin.com/in/simone-zannini-66a743225/',
        'https://www.linkedin.com/in/matteo-cese-b8461422a/',
        'https://github.com/Matteo1234566',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['it', 'en'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${pageUrl}/#service`,
      name: BUSINESS.name,
      url: pageUrl,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: ['Italy', 'Europe'],
      serviceType: [
        'AI Consulting',
        'Computer Vision Development',
        'Custom Software Development',
        'Data Engineering',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}/#faq`,
      mainEntity: [0, 1, 2, 3].map((index) => ({
        '@type': 'Question',
        name: t(`faq.${index}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(`faq.${index}.answer`),
        },
      })),
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#simone-zannini`,
      name: 'Simone Zannini',
      url: localizedUrl(locale, '/simone'),
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#matteo-cese`,
      name: 'Matteo Cese',
      url: localizedUrl(locale, '/matteo'),
    },
  ]};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
