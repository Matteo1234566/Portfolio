import { notFound } from 'next/navigation';
import { getRepository, repositories } from '@/app/[locale]/(site)/trending-repo/repoData';
import RepositoryPageClient from '@/app/[locale]/(site)/trending-repo/[slug]/RepositoryPageClient';
import PageBreadcrumbs from '@/components/PageBreadcrumbs';

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
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/trending-repo/${repository.slug}`,
      languages: {
        en: `/en/trending-repo/${repository.slug}`,
        it: `/it/trending-repo/${repository.slug}`,
        'x-default': `/it/trending-repo/${repository.slug}`,
      },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description,
      type: 'article',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url: `/${locale}/trending-repo/${repository.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image'],
    },
  };
}

export default async function RepositoryPage({ params }) {
  const { locale, slug } = await params;
  const repository = getRepository(slug);
  if (!repository) notFound();
  return <><PageBreadcrumbs locale={locale} items={[{ name: 'Trending Repo', href: `/${locale}/trending-repo` }, { name: repository.name, href: `/${locale}/trending-repo/${slug}` }]} /><RepositoryPageClient repository={repository} /></>;
}
