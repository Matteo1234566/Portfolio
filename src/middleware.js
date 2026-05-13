import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'it'],
    defaultLocale: 'it',
    localePrefix: 'always',
    alternateLinks: false,
});

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|.*\\..*).*)'
    ]
};
