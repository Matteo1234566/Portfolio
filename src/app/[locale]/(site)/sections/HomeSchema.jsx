'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HomeSchema() {
  const pathname = usePathname();
  const locale = pathname.startsWith('/it') ? 'it' : 'en';
  const t = useTranslations('ProcessFaq');

  const baseUrl = 'https://devop.sbs';
  const localizedUrl = `${baseUrl}/${locale}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DevOP',
      url: localizedUrl,
      logo: `${baseUrl}/pittogramma_sun.webp`,
      description:
        locale === 'it'
          ? 'Boutique di ingegneria AI e sviluppo software fondata da Simone Zannini e Matteo Cese.'
          : 'Boutique AI engineering and custom software development studio founded by Simone Zannini and Matteo Cese.',
      foundingLocation: 'Rome, Italy',
      sameAs: [
        'https://4aitech.it',
        'https://www.linkedin.com/in/simone-zannini-66a743225/',
        'https://www.linkedin.com/in/matteo-cese-b8461422a/',
        'https://github.com/Matteo1234566',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'DevOP',
      url: localizedUrl,
      areaServed: ['Italy', 'Europe'],
      serviceType: [
        'AI Consulting',
        'Computer Vision Development',
        'Custom Software Development',
        'Data Engineering',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [0, 1, 2, 3].map((index) => ({
        '@type': 'Question',
        name: t(`faq.${index}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(`faq.${index}.answer`),
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
