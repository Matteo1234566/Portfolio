import { DM_Sans, Oswald } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/app/providers';
import { BUSINESS, LOCALES, SITE_URL, localizedUrl } from '@/lib/site';
import '../globals.css';
import Analytics from './Analytics';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '700'],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'DevOP – AI & Full-Stack Freelance Duo', template: '%s | DevOP' },
  description: 'Simone & Matteo — AI engineers and full-stack developers specializing in computer vision, deep learning, and scalable web systems.',
  appleWebApp: { title: 'DevOP' },
  manifest: '/manifest.json',
  openGraph: { type: 'website', siteName: 'DevOP', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', images: ['/twitter-image'] },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(LOCALES, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const entityGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: BUSINESS.name,
        url: SITE_URL,
        logo: `${SITE_URL}/pittogramma_sun.webp`,
        email: BUSINESS.email,
        founder: [
          { '@id': `${SITE_URL}/#simone-zannini` },
          { '@id': `${SITE_URL}/#matteo-cese` },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: BUSINESS.email,
          availableLanguage: ['Italian', 'English'],
        },
        areaServed: BUSINESS.areaServed,
        sameAs: Object.values(BUSINESS.profiles),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['it', 'en'],
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#simone-zannini`,
        name: 'Simone Zannini',
        url: localizedUrl(locale, '/simone'),
        worksFor: { '@id': `${SITE_URL}/#organization` },
        sameAs: [BUSINESS.profiles.simoneLinkedIn],
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#matteo-cese`,
        name: 'Matteo Cese',
        url: localizedUrl(locale, '/matteo'),
        worksFor: { '@id': `${SITE_URL}/#organization` },
        sameAs: [BUSINESS.profiles.matteoLinkedIn, BUSINESS.profiles.matteoGitHub],
      },
    ],
  };

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${oswald.variable} font-body antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }} />
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
