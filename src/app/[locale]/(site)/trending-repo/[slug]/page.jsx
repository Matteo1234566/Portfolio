import { notFound } from 'next/navigation';
import { getRepository, repositories } from '@/app/[locale]/(site)/trending-repo/repoData';
import RepositoryPageClient from '@/app/[locale]/(site)/trending-repo/[slug]/RepositoryPageClient';

const LOCALES = ['it', 'en'];

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => repositories.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const repository = getRepository(slug);
  if (!repository) return {};

  const isItalian = locale === 'it';
  const title = `${repository.name} | Trending Repo`;
  const description = isItalian
    ? `Scopri ${repository.name}, una repository open source di ${repository.owner}.`
    : `Discover ${repository.name}, an open source repository by ${repository.owner}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/trending-repo/${repository.slug}`,
      languages: {
        en: `/en/trending-repo/${repository.slug}`,
        it: `/it/trending-repo/${repository.slug}`,
        'x-default': `/it/trending-repo/${repository.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/trending-repo/${repository.slug}`,
    },
  };
}

export default async function RepositoryPage({ params }) {
  const { slug } = await params;
  if (!getRepository(slug)) notFound();
  return <RepositoryPageClient repository={getRepository(slug)} />;
}
