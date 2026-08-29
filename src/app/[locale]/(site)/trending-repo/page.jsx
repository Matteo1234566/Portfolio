import TrendingRepoIndex from '@/app/[locale]/(site)/trending-repo/TrendingRepoIndex';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isItalian = locale === 'it';
  const title = isItalian ? 'Trending Repo | Open source da scoprire' : 'Trending Repo | Open source worth discovering';
  const description = isItalian
    ? 'Repository open source, strumenti liberi e progetti da scoprire ogni giorno.'
    : 'Open source repositories, free tools, and projects worth discovering every day.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/trending-repo`,
      languages: { en: '/en/trending-repo', it: '/it/trending-repo', 'x-default': '/it/trending-repo' },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/trending-repo`,
    },
  };
}

export default function TrendingRepoPage() {
  return <TrendingRepoIndex />;
}
