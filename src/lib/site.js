export const SITE_URL = 'https://www.devop.sbs';

export const BUSINESS = {
  name: 'DevOP',
  email: 'magosimo99@gmail.com',
  url: SITE_URL,
  areaServed: ['Italy', 'Europe'],
  profiles: {
    simoneLinkedIn: 'https://www.linkedin.com/in/simone-zannini-66a743225/',
    matteoLinkedIn: 'https://www.linkedin.com/in/matteo-cese-b8461422a/',
    matteoGitHub: 'https://github.com/Matteo1234566',
  },
};

export const LOCALES = ['it', 'en'];

export function localizedUrl(locale, path = '') {
  return `${SITE_URL}/${locale}${path}`;
}
