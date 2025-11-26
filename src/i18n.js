import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    // Se requestLocale è una promise (nelle nuove versioni), la risolviamo
    let locale = await requestLocale;

    // Se il locale non è valido o manca, usiamo 'it' come fallback
    if (!locale || !['it', 'en'].includes(locale)) {
        locale = 'it';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
