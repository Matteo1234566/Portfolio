import { BLOG_POSTS } from '@/app/[locale]/(site)/_blogs/blogData';

export default function sitemap() {
  const SITE_URL = 'https://www.devop.sbs';
  const locales = ['en', 'it'];

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/matteo', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/simone', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/homelab-creation', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ailights', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/mirror', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/capture', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/capture/privacy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/screeba', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/pyquark', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/puse', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/targage', priority: 0.7, changeFrequency: 'monthly' },
    // { path: '/traid', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/twosequel', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blogs', priority: 0.6, changeFrequency: 'weekly' },
  ];

  const now = new Date().toISOString();

  const entries = [];

  for (const locale of locales) {
    // locale root (es. /en, /it)
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    for (const route of routes) {
      if (route.path === '') continue;

      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    for (const post of BLOG_POSTS) {
      entries.push({
        url: `${SITE_URL}/${locale}/blogs/${post.id}`,
        lastModified: new Date(post.date).toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  return entries;
}
