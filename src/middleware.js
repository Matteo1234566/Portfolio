import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['en', 'it'],
    defaultLocale: 'it',
    localePrefix: 'always',
    alternateLinks: false,
});

export default function middleware(request) {
    const [, firstSegment] = request.nextUrl.pathname.split('/');

    if (firstSegment && /^[a-z]{2}(?:-[a-z]{2})?$/i.test(firstSegment) && !['en', 'it'].includes(firstSegment.toLowerCase())) {
        const url = request.nextUrl.clone();
        url.pathname = '/it';
        return NextResponse.redirect(url, 308);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!api|_next|_vercel|robots\\.txt|sitemap\\.xml|opengraph-image|twitter-image|.*\\..*).*)'
    ]
};
