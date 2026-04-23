export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.devop.sbs';
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
    { path: '/traid', priority: 0.8, changeFrequency: 'monthly' },
  ];

  const now = new Date().toISOString();

  const entries = [];

  // ✅ homepage root (IMPORTANTE)
  entries.push({
    url: baseUrl,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  for (const locale of locales) {
    // locale root (es. /en, /it)
    entries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });

    for (const route of routes) {
      if (route.path === '') continue;

      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return entries;
}