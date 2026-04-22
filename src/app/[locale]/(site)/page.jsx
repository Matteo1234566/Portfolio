import LandingPageClient from './LandingPageClient';

const titles = {
  it: 'DevOP – Duo Freelance AI & Full-Stack',
  en: 'DevOP – AI & Full-Stack Freelance Duo',
};

const descriptions = {
  it: 'Simone & Matteo — ingegneri AI e sviluppatori full-stack specializzati in computer vision, deep learning e sistemi web scalabili. Co-fondatori di DevOP.',
  en: 'Simone & Matteo — AI engineers and full-stack developers specializing in computer vision, deep learning, and scalable web systems. Co-founders of DevOP.',
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isItalian = locale === 'it';
  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', it: '/it' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function LandingPage() {
  return <LandingPageClient />;
}
