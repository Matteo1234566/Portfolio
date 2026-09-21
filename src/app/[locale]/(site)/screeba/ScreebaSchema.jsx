import { getTranslations } from 'next-intl/server';
import { localizedUrl } from '@/lib/site';

export default async function ScreebaSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'Screeba' });
  const faq = await getTranslations({ locale, namespace: 'Screeba.faq' });
  const pageUrl = localizedUrl(locale, '/screeba');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Screeba',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      url: pageUrl,
      description: t('description'),
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
