'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

export default function TraidSchema() {
  const locale = useLocale();
  const t = useTranslations('Traid');
  const faq = useTranslations('Traid.faq');
  const baseUrl = 'https://devop.sbs';
  const pageUrl = `${baseUrl}/${locale}/traid`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Traid',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
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
