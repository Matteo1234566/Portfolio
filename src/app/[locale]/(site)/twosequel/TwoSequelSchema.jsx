import { getTranslations } from 'next-intl/server';
import { localizedUrl } from '@/lib/site';

export default async function TwoSequelSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'TwoSequel' });
  const faq = await getTranslations({ locale, namespace: 'TwoSequel.faq' });
  const pageUrl = localizedUrl(locale, '/twosequel');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: '2Sequel',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Cloud',
      url: pageUrl,
      description: t('description'),
      creator: {
        '@type': 'Organization',
        name: 'DevOP',
      },
      offers: {
        '@type': 'Offer',
        category: 'SaaS Platform',
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
