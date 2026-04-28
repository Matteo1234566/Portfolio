export default function robots() {
  const baseUrl = 'https://www.devop.sbs';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
