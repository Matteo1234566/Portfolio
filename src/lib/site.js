export const SITE_URL = 'https://www.devop.sbs';

export const BUSINESS = {
  name: 'DevOP',
  email: 'magosimo99@gmail.com',
  url: SITE_URL,
};

export const LOCALES = ['it', 'en'];

export function localizedUrl(locale, path = '') {
  return `${SITE_URL}/${locale}${path}`;
}
