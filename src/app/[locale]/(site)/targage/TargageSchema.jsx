import { getTranslations } from 'next-intl/server';
import { localizedUrl } from '@/lib/site';

export default async function TargageSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'Targage' });
  const faq = await getTranslations({ locale, namespace: 'Targage.faq' });
  const pageUrl = localizedUrl(locale, '/targage');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Targage',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web / On-premise deployment',
      url: pageUrl,
      description: t('description'),
      creator: {
        '@type': 'Organization',
        name: 'DevOP',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
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
