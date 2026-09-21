import { getTranslations } from 'next-intl/server';
import { localizedUrl } from '@/lib/site';

export default async function PyquarkSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'PyQuark' });
  const faq = await getTranslations({ locale, namespace: 'PyQuark.faq' });
  const pageUrl = localizedUrl(locale, '/pyquark');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'PyQuark',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, Linux',
      url: pageUrl,
      description: t('description'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      creator: {
        '@type': 'Organization',
        name: 'DevOP',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [0, 1, 2, 3].map((index) => ({
        '@type': 'Question',
        name: faq(`${index}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq(`${index}.answer`),
        },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
