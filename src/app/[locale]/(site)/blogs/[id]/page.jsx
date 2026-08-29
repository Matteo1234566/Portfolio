import { notFound } from 'next/navigation';
import BlogPost from '@/app/[locale]/(site)/_blogs/[id]/page';
import { BLOG_POSTS } from '@/app/[locale]/(site)/_blogs/blogData';

const LOCALES = ['it', 'en'];
const SITE_URL = 'https://www.devop.sbs';

function getPost(id) {
  return BLOG_POSTS.find((post) => post.id === id);
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => BLOG_POSTS.map((post) => ({ locale, id: post.id })));
}

export async function generateMetadata({ params }) {
  const { id, locale } = await params;
  const post = getPost(id);

  if (!post) notFound();

  const isItalian = locale === 'it';
  const content = post[locale] || post.en;
  const url = `/${locale}/blogs/${post.id}`;

  return {
    title: `${content.title} | DevOP Blog`,
    description: content.excerpt,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/blogs/${post.id}`,
        it: `/it/blogs/${post.id}`,
        'x-default': `/it/blogs/${post.id}`,
      },
    },
    openGraph: {
      title: content.title,
      description: content.excerpt,
      type: 'article',
      locale: isItalian ? 'it_IT' : 'en_US',
      siteName: 'DevOP',
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: content.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { id, locale } = await params;
  const post = getPost(id);

  if (!post) notFound();

  const content = post[locale] || post.en;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: content.title,
    description: content.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevOP',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/${locale}/blogs/${post.id}`,
    keywords: content.tags.join(', '),
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlogPost params={params} />
    </>
  );
}
