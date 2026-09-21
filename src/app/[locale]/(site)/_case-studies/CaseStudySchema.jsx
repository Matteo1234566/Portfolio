import { SITE_URL, localizedUrl } from '@/lib/site';
import { getCaseStudy } from './caseStudyData';
import { servicePath } from '../_services/serviceData';

export default function CaseStudySchema({ project, locale }) {
  const study = getCaseStudy(project, locale);
  const pageUrl = localizedUrl(locale, `/${project}`);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${pageUrl}/#case-study`,
    name: `${study.name} — DevOP case study`,
    headline: study.summary,
    articleSection: 'Case Study',
    description: study.problem,
    url: pageUrl,
    inLanguage: locale,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    about: study.services.map((service) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}${servicePath(service, locale)}/#service`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
