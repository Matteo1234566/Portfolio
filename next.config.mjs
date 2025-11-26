import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Le tue altre config qui, se ne hai
};

export default withNextIntl(nextConfig);
