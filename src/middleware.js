import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // La lista delle lingue supportate
    locales: ['en', 'it'],

    // La lingua di default se l'utente arriva senza prefisso
    defaultLocale: 'it'
});

export const config = {
    // Ignora i file statici, immagini, favicon, ecc.
    matcher: ['/', '/(it|en)/:path*']
};
