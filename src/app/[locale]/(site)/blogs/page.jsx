import BlogList from '@/app/[locale]/(site)/_blogs/page';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isItalian = locale === 'it';
  const title = isItalian
    ? 'Appunti su AI, design e sviluppo software'
    : 'Notes on AI, design, and software development';
  const description = isItalian
    ? 'Insight tecnici, decisioni di prodotto e note operative dal lavoro quotidiano di DevOP.'
    : 'Technical insights, product decisions, and practical notes from DevOP daily build work.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/blogs`,
      languages: { en: '/en/blogs', it: '/it/blogs', 'x-default': '/it/blogs' },
    },
    openGraph: {
      images: ['/opengraph-image'],
      title,
      description,
      type: 'website',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url: `/${locale}/blogs`,
    },
    twitter: {
      images: ['/twitter-image'],
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function BlogsPage({ params }) {
  return <BlogList params={params} />;
}
