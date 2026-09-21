import { notFound } from 'next/navigation';
import BlogPost from '@/app/[locale]/(site)/_blogs/[id]/page';
import { BLOG_POSTS } from '@/app/[locale]/(site)/_blogs/blogData';
import { SITE_URL } from '@/lib/site';

const LOCALES = ['it', 'en'];

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
    title: `${content.title} | Blog`,
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
      images: ['/opengraph-image'],
      title: content.title,
      description: content.excerpt,
      type: 'article',
      locale: isItalian ? 'it_IT' : 'en_US',
      alternateLocale: isItalian ? ['en_US'] : ['it_IT'],
      siteName: 'DevOP',
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: content.tags,
    },
    twitter: {
      images: ['/twitter-image'],
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
  const articleSchema = {
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
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/${locale}/blogs` },
      { '@type': 'ListItem', position: 3, name: content.title, item: `${SITE_URL}/${locale}/blogs/${post.id}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema]) }} />
      <BlogPost params={params} />
    </>
  );
}
