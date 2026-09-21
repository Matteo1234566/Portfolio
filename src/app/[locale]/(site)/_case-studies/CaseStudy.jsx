'use client';

import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getCaseStudy } from './caseStudyData';
import { servicePath } from '../_services/serviceData';

export default function CaseStudy({ project }) {
  const locale = useLocale();
  const isIt = locale === 'it';
  const study = getCaseStudy(project, locale);

  return (
    <section id="case-study" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <div className="border-y-4 border-ink py-10 text-ink dark:border-white dark:text-white md:py-14">
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="font-bold text-forest dark:text-bubblegum">{isIt ? 'Case study DevOP' : 'DevOP case study'}</p>
            <h2 className="mt-4 font-display text-5xl font-bold leading-none md:text-7xl">{study.name}</h2>
            <p className="mt-6 text-xl leading-relaxed text-ink/70 dark:text-white/70">{study.summary}</p>
            <p className="mt-8 text-sm font-bold text-ink/55 dark:text-white/55">{isIt ? 'Ruolo DevOP' : 'DevOP role'}</p>
            <p className="mt-2 leading-relaxed">{study.role}</p>
          </div>

          <div className="grid gap-8">
            <article className="rounded-[2rem] bg-forest p-7 text-white md:p-9">
              <h3 className="font-display text-3xl font-bold">{isIt ? 'Il problema' : 'The problem'}</h3>
              <p className="mt-4 text-lg leading-relaxed text-white/80">{study.problem}</p>
              <h4 className="mt-7 font-bold text-bubblegum">{isIt ? 'Vincoli affrontati' : 'Constraints addressed'}</h4>
              <ul className="mt-4 space-y-3">{study.context.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-bubblegum" size={18} />{item}</li>)}</ul>
            </article>

            <article>
              <h3 className="font-display text-3xl font-bold">{isIt ? 'Architettura della soluzione' : 'Solution architecture'}</h3>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {study.architecture.map((item, index) => <li key={item} className="border-l-4 border-bubblegum bg-white p-4 font-bold text-ink dark:bg-white/5 dark:text-white"><span className="mr-2 text-forest dark:text-bubblegum">{index + 1}.</span>{item}</li>)}
              </ol>
            </article>

            <article>
              <h3 className="font-display text-3xl font-bold">{isIt ? 'Risultati verificabili nel progetto' : 'Results verifiable in the project'}</h3>
              <ul className="mt-5 space-y-3">{study.evidence.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-forest dark:text-bubblegum" size={19} />{item}</li>)}</ul>
            </article>

            <article className="border-t-2 border-ink/15 pt-7 dark:border-white/15">
              <h3 className="font-display text-3xl font-bold">{isIt ? 'Cosa possiamo replicare' : 'What we can replicate'}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink/70 dark:text-white/70">{study.reusable}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {study.services.map((service) => (
                  <Link key={service} href={servicePath(service, locale)} className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-2.5 font-bold dark:border-white">
                    {isIt ? 'Vedi il servizio' : 'View the service'} <ArrowUpRight size={17} />
                  </Link>
                ))}
                <Link href={`/${locale}/contact?case=${project}`} data-event="cta_click" data-service={study.services[0]} className="inline-flex items-center gap-2 rounded-full bg-bubblegum px-5 py-2.5 font-bold text-ink">
                  {isIt ? 'Parliamo di un progetto simile' : 'Discuss a similar project'} <ArrowUpRight size={17} />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
