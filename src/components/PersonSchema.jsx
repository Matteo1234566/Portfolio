import { BUSINESS, SITE_URL, localizedUrl } from '@/lib/site';

const PEOPLE = {
  simone: {
    name: 'Simone Zannini',
    image: '/images/simone.webp',
    sameAs: [BUSINESS.profiles.simoneLinkedIn],
    knowsAbout: ['Artificial intelligence', 'Machine learning', 'Full-stack development', 'MLOps'],
  },
  matteo: {
    name: 'Matteo Cese',
    image: '/images/matteo.webp',
    sameAs: [BUSINESS.profiles.matteoLinkedIn, BUSINESS.profiles.matteoGitHub],
    knowsAbout: ['Computer vision', 'Artificial intelligence', 'Backend development', 'Cloud architecture'],
  },
};

export default function PersonSchema({ person, locale, jobTitle, description }) {
  const profile = PEOPLE[person];
  const url = localizedUrl(locale, `/${person}`);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#${person === 'simone' ? 'simone-zannini' : 'matteo-cese'}`,
    name: profile.name,
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}${profile.image}`,
    jobTitle,
    description,
    knowsAbout: profile.knowsAbout,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    sameAs: profile.sameAs,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
