import Link from 'next/link';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { BUSINESS, SITE_URL, localizedUrl } from '@/lib/site';
import { getService, servicePath } from './serviceData';
import { getServiceCaseStudies } from '../_case-studies/caseStudyData';

export function buildServiceMetadata(key, locale) {
  const service = getService(key, locale);
  const path = servicePath(key, locale);
  return {
    title: service.shortTitle,
    description: service.description,
    alternates: {
      canonical: path,
      languages: {
        it: servicePath(key, 'it'),
        en: servicePath(key, 'en'),
        'x-default': servicePath(key, 'it'),
      },
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: path,
      type: 'website',
      locale: locale === 'it' ? 'it_IT' : 'en_US',
      alternateLocale: locale === 'it' ? ['en_US'] : ['it_IT'],
    },
  };
}

export default function ServiceLanding({ serviceKey, locale }) {
  const service = getService(serviceKey, locale);
  const path = servicePath(serviceKey, locale);
  const isIt = locale === 'it';
  const relatedCaseStudies = getServiceCaseStudies(serviceKey, locale);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${localizedUrl(locale, `/${service.slugs[locale]}`)}/#service`,
        name: service.shortTitle,
        description: service.description,
        url: localizedUrl(locale, `/${service.slugs[locale]}`),
        serviceType: service.serviceType,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: ['Italy', 'Europe'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'DevOP', item: localizedUrl(locale) },
          { '@type': 'ListItem', position: 2, name: service.shortTitle, item: localizedUrl(locale, `/${service.slugs[locale]}`) },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-white pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="mx-auto max-w-6xl px-5 pb-20 md:pb-28">
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-ink/60 dark:text-white/60">
          <Link href={`/${locale}`} className="underline underline-offset-4">DevOP</Link>
          <span aria-hidden="true"> / </span>
          <span>{service.shortTitle}</span>
        </nav>
        <div className="grid gap-12 lg:grid-cols-[1.45fr_.55fr] lg:items-end">
          <div>
            <p className="mb-5 max-w-xl text-base font-bold text-forest dark:text-bubblegum">{service.audience}</p>
            <h1 className="font-display text-5xl font-bold leading-[1.02] md:text-7xl lg:text-8xl">{service.title}</h1>
          </div>
          <div className="border-l-4 border-bubblegum pl-6">
            <p className="text-lg leading-relaxed text-ink/75 dark:text-white/75">{service.description}</p>
            <Link href={`/${locale}/contact?service=${serviceKey}`} data-event="cta_click" data-service={serviceKey} className="mt-7 inline-flex items-center gap-2 rounded-full bg-bubblegum px-6 py-3 font-bold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest">
              {isIt ? 'Parliamo del problema' : 'Discuss the problem'} <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-forest py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-6xl">{isIt ? 'Dove interveniamo' : 'Where we help'}</h2>
            <ul className="mt-8 space-y-4">
              {service.uses.map((item) => <li key={item} className="flex gap-3 text-lg"><Check className="mt-1 shrink-0 text-bubblegum" size={20} />{item}</li>)}
            </ul>
          </div>
          <div className="rounded-[2rem] border-2 border-white/20 bg-ink p-8 shadow-hard-white">
            <h2 className="font-display text-4xl font-bold">{isIt ? 'Cosa resta al tuo team' : 'What your team receives'}</h2>
            <ul className="mt-8 space-y-5">
              {service.deliverables.map((item) => <li key={item} className="border-b border-white/15 pb-4 text-lg">{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2 className="font-display text-4xl font-bold md:text-6xl">{isIt ? 'Dal dubbio a una consegna verificabile' : 'From uncertainty to a verifiable delivery'}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {service.process.map(([title, text], index) => (
            <article key={title} className="border-t-4 border-forest pt-5 dark:border-bubblegum">
              <p className="mb-3 text-sm font-bold text-forest dark:text-bubblegum">{index + 1} / 3</p>
              <h3 className="font-display text-3xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink/70 dark:text-white/70">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <h2 className="font-display text-4xl font-bold md:text-6xl">{isIt ? 'Progetti che rendono il servizio concreto' : 'Projects that make the service concrete'}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{isIt ? 'Problemi, vincoli, architetture e risultati osservabili: ogni progetto mostra come trasformiamo una capacità tecnica in un sistema utilizzabile.' : 'Problems, constraints, architectures, and observable results: each project shows how we turn technical capability into a usable system.'}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedCaseStudies.map((study) => (
                <Link key={study.key} href={`/${locale}/${study.key}#case-study`} className="group rounded-[2rem] border-2 border-white/20 bg-white/5 p-6 transition-colors hover:border-bubblegum hover:bg-white/10">
                  <h3 className="font-display text-3xl font-bold group-hover:text-bubblegum">{study.name}</h3>
                  <p className="mt-3 leading-relaxed text-white/65">{study.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-bold text-bubblegum">{isIt ? 'Leggi il case study' : 'Read the case study'} <ArrowUpRight size={17} /></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-ink/10 bg-white py-20 dark:border-white/10 dark:bg-white/5">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <h2 className="font-display text-4xl font-bold md:text-5xl">{isIt ? 'Le persone, non una scatola nera' : 'People, not a black box'}</h2>
              <p className="mt-5 leading-relaxed text-ink/70 dark:text-white/70">
                {isIt ? 'Simone Zannini e Matteo Cese seguono analisi, sviluppo e consegna. Ruoli, profili e curriculum sono pubblici.' : 'Simone Zannini and Matteo Cese stay involved through analysis, development, and delivery. Roles, profiles, and CVs are public.'}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {['simone', 'matteo'].map((person) => (
                <Link key={person} href={`/${locale}/${person}`} className="rounded-3xl border-2 border-ink p-6 font-display text-3xl font-bold shadow-hard transition-transform hover:-translate-y-1 dark:border-white dark:shadow-hard-white">
                  {person === 'simone' ? 'Simone Zannini' : 'Matteo Cese'} <ArrowUpRight className="mt-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 md:py-28">
        <h2 className="font-display text-4xl font-bold md:text-6xl">{isIt ? 'Domande prima di iniziare' : 'Questions before starting'}</h2>
        <div className="mt-10 divide-y-2 divide-ink/10 dark:divide-white/10">
          {service.faq.map(([question, answer]) => <article key={question} className="py-7"><h3 className="font-display text-2xl font-bold">{question}</h3><p className="mt-3 text-lg leading-relaxed text-ink/70 dark:text-white/70">{answer}</p></article>)}
        </div>
        <div className="mt-14 rounded-[2rem] bg-bubblegum p-8 text-ink md:p-12">
          <h2 className="font-display text-4xl font-bold">{isIt ? 'Portaci il problema, non una specifica perfetta.' : 'Bring the problem, not a perfect specification.'}</h2>
          <p className="mt-4 max-w-2xl text-lg">{isIt ? 'Rispondiamo entro due giorni lavorativi con le prime domande tecniche e il prossimo passo sensato.' : 'We reply within two working days with the first technical questions and a sensible next step.'}</p>
          <Link href={`/${locale}/contact?service=${serviceKey}`} data-event="cta_click" data-service={serviceKey} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-bold text-white"><Mail size={18} /> {BUSINESS.email}</Link>
        </div>
      </section>
    </main>
  );
}
