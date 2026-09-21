import { getTranslations } from 'next-intl/server';
import { localizedUrl } from '@/lib/site';

export default async function AiLightsSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'AiLights' });
  const faq = await getTranslations({ locale, namespace: 'AiLights.faq' });
  const pageUrl = localizedUrl(locale, '/ailights');

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'AiLights',
      applicationCategory: 'SportsApplication',
      operatingSystem: 'Web / Camera-integrated platform',
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
