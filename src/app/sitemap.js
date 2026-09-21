import { BLOG_POSTS } from '@/app/[locale]/(site)/_blogs/blogData';
import { LOCALES, SITE_URL } from '@/lib/site';
import { SERVICE_KEYS, servicePath } from '@/app/[locale]/(site)/_services/serviceData';

const STATIC_ROUTES = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/matteo', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/simone', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/homelab-creation', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/ailights', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/mirror', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/capture', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/capture/privacy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/screeba', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/pyquark', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/puse', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/targage', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/twosequel', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/fishertiger', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/blogs', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/trending-repo', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' },
];

function languageAlternates(path) {
  return Object.fromEntries([
    ...LOCALES.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
    ['x-default', `${SITE_URL}/it${path}`],
  ]);
}

function localizedEntries({ path, ...metadata }) {
  const languages = languageAlternates(path);

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    alternates: { languages },
    ...metadata,
  }));
}

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.flatMap(localizedEntries);

  const serviceEntries = SERVICE_KEYS.flatMap((key) => {
    const languages = Object.fromEntries([
      ...LOCALES.map((locale) => [locale, `${SITE_URL}${servicePath(key, locale)}`]),
      ['x-default', `${SITE_URL}${servicePath(key, 'it')}`],
    ]);
    return LOCALES.map((locale) => ({
      url: `${SITE_URL}${servicePath(key, locale)}`,
      alternates: { languages },
      changeFrequency: 'monthly',
      priority: 0.9,
    }));
  });

  const blogEntries = BLOG_POSTS.flatMap((post) => localizedEntries({
    path: `/blogs/${post.id}`,
    lastModified: post.date,
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}
