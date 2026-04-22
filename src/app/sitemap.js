export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const locales = ['en', 'it'];

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/matteo', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/simone', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/ailights', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/mirror', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/capture', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/capture/privacy', priority: 0.4, changeFrequency: 'yearly' },
    { path: '/screeba', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/pyquark', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/puse', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/targage', priority: 0.7, changeFrequency: 'monthly' },
  ];

  const entries = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}
