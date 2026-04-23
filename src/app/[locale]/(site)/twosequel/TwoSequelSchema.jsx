'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function TwoSequelSchema() {
  const locale = useLocale();
  const t = useTranslations('TwoSequel');
  const faq = useTranslations('TwoSequel.faq');
  const baseUrl = 'https://devop.sbs';
  const pageUrl = `${baseUrl}/${locale}/twosequel`;

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
