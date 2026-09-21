import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/it',
        permanent: true,
      },
      { source: '/en/consulenza-ai', destination: '/en/ai-consulting', permanent: true },
      { source: '/it/ai-consulting', destination: '/it/consulenza-ai', permanent: true },
      { source: '/en/sviluppo-computer-vision', destination: '/en/computer-vision-development', permanent: true },
      { source: '/it/computer-vision-development', destination: '/it/sviluppo-computer-vision', permanent: true },
      { source: '/en/software-su-misura', destination: '/en/custom-software-development', permanent: true },
      { source: '/it/custom-software-development', destination: '/it/software-su-misura', permanent: true },
      { source: '/en/ai-per-startup', destination: '/en/ai-development-for-startups', permanent: true },
      { source: '/it/ai-development-for-startups', destination: '/it/ai-per-startup', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
