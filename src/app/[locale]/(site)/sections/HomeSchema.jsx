import { getTranslations } from 'next-intl/server';
import { BUSINESS, SITE_URL, localizedUrl } from '@/lib/site';

export default async function HomeSchema({ locale }) {
  const t = await getTranslations({ locale, namespace: 'ProcessFaq' });
  const pageUrl = localizedUrl(locale);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
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
  ]};

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
