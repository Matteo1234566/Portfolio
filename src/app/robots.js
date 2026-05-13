export default function robots() {
  const SITE_URL = 'https://www.devop.sbs';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
