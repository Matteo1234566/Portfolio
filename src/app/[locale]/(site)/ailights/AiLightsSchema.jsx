'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { localizedUrl } from '@/lib/site';

export default function AiLightsSchema() {
  const locale = useLocale();
  const t = useTranslations('AiLights');
  const faq = useTranslations('AiLights.faq');
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
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'DevOP',
          item: localizedUrl(locale),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AiLights',
          item: pageUrl,
        },
      ],
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
