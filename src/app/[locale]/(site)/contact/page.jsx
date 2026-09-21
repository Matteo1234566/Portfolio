import { Suspense } from 'react';
import Link from 'next/link';
import ContactForm from './ContactForm';
import { BUSINESS } from '@/lib/site';
import { SERVICE_KEYS, getService } from '../_services/serviceData';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isIt = locale === 'it';
  return {
    title: isIt ? 'Contatti e richiesta progetto' : 'Contact and project enquiry',
    description: isIt ? 'Racconta a DevOP il tuo progetto AI, computer vision o software custom.' : 'Tell DevOP about your AI, computer vision, or custom software project.',
    alternates: { canonical: `/${locale}/contact`, languages: { it: '/it/contact', en: '/en/contact', 'x-default': '/it/contact' } },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const isIt = locale === 'it';
  const serviceOptions = SERVICE_KEYS.map((key) => ({ value: key, label: getService(key, locale).shortTitle }));
  return (
    <main className="min-h-screen bg-paper px-5 pb-24 pt-36 text-ink dark:bg-ink dark:text-white">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <section>
          <p className="font-bold text-forest dark:text-bubblegum">{isIt ? 'Un primo confronto, senza pitch obbligatorio' : 'A first conversation, no pitch required'}</p>
          <h1 className="mt-5 font-display text-6xl font-bold leading-none md:text-8xl">{isIt ? 'Partiamo dal problema.' : 'Start with the problem.'}</h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink/70 dark:text-white/70">{isIt ? 'Descrivi obiettivo, vincoli e ciò che hai già provato. Ti rispondiamo con domande tecniche e un prossimo passo concreto.' : 'Describe the goal, constraints, and what you have already tried. We reply with technical questions and a concrete next step.'}</p>
          <div className="mt-10 border-l-4 border-bubblegum pl-5">
            <p className="font-bold">DevOP — Simone Zannini & Matteo Cese</p>
            <p className="mt-2">Roma · {isIt ? 'Italia ed Europa, anche da remoto' : 'Italy and Europe, remote included'}</p>
            <a className="mt-2 inline-block underline underline-offset-4" href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </div>
          <div className="mt-10 flex gap-5 text-sm font-bold">
            <Link href={`/${locale}/simone`} className="underline underline-offset-4">Simone</Link>
            <Link href={`/${locale}/matteo`} className="underline underline-offset-4">Matteo</Link>
          </div>
        </section>
        <Suspense fallback={<div className="min-h-[600px] rounded-[2rem] bg-white/50" />}><ContactForm locale={locale} services={serviceOptions} /></Suspense>
      </div>
    </main>
  );
}
