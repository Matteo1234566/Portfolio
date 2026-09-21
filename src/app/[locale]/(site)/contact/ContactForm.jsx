'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BUSINESS } from '@/lib/site';

function track(name, detail) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...detail });
  window.dispatchEvent(new CustomEvent('devop:analytics', { detail: { event: name, ...detail } }));
}

export default function ContactForm({ locale, services }) {
  const isIt = locale === 'it';
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialService = searchParams.get('service') || '';
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get('website')) return;
    if (!form.get('privacy')) {
      setError(isIt ? 'Conferma di aver letto come useremo i dati del messaggio.' : 'Confirm that you have read how we use the message data.');
      return;
    }

    const service = form.get('service') || (isIt ? 'Da definire' : 'To be defined');
    const subject = `DevOP — ${service} — ${form.get('name')}`;
    const utm = ['utm_source', 'utm_medium', 'utm_campaign']
      .map((key) => `${key}: ${searchParams.get(key) || '-'}`)
      .join('\n');
    const body = [
      `${isIt ? 'Nome' : 'Name'}: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      `${isIt ? 'Azienda' : 'Company'}: ${form.get('company') || '-'}`,
      `${isIt ? 'Servizio' : 'Service'}: ${service}`,
      `${isIt ? 'Budget indicativo' : 'Indicative budget'}: ${form.get('budget') || '-'}`,
      '',
      `${isIt ? 'Obiettivo' : 'Goal'}:`,
      form.get('goal'),
      '',
      utm,
    ].join('\n');

    track('lead_submit', { service, locale, method: 'email' });
    window.location.href = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => router.push(`/${locale}/thank-you?method=email`), 600);
  }

  const inputClass = 'mt-2 w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 text-ink outline-none focus:ring-4 focus:ring-bubblegum dark:border-white/70';

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border-2 border-ink bg-white p-6 shadow-hard dark:border-white dark:bg-white/5 dark:shadow-hard-white md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="font-bold">{isIt ? 'Nome e cognome' : 'Full name'}<input className={inputClass} name="name" autoComplete="name" required /></label>
        <label className="font-bold">Email<input className={inputClass} name="email" type="email" autoComplete="email" required /></label>
        <label className="font-bold">{isIt ? 'Azienda (facoltativa)' : 'Company (optional)'}<input className={inputClass} name="company" autoComplete="organization" /></label>
        <label className="font-bold">{isIt ? 'Ambito' : 'Area'}
          <select className={inputClass} name="service" defaultValue={initialService}>
            <option value="">{isIt ? 'Da definire insieme' : 'Define it together'}</option>
            {services.map((service) => <option key={service.value} value={service.value}>{service.label}</option>)}
          </select>
        </label>
        <label className="font-bold sm:col-span-2">{isIt ? 'Budget indicativo (facoltativo)' : 'Indicative budget (optional)'}
          <select className={inputClass} name="budget" defaultValue="">
            <option value="">{isIt ? 'Non ancora definito' : 'Not defined yet'}</option>
            <option>€2k–€5k</option><option>€5k–€15k</option><option>€15k–€40k</option><option>€40k+</option>
          </select>
        </label>
        <label className="font-bold sm:col-span-2">{isIt ? 'Quale problema vuoi risolvere?' : 'What problem do you want to solve?'}
          <textarea className={`${inputClass} min-h-40 resize-y`} name="goal" required minLength={30} placeholder={isIt ? 'Contesto, utenti, dati disponibili, vincoli e risultato atteso…' : 'Context, users, available data, constraints, and expected outcome…'} />
        </label>
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-ink/70 dark:text-white/70">
        <input type="checkbox" name="privacy" value="accepted" className="mt-1 h-5 w-5 accent-forest" />
        <span>{isIt ? `Accetto che DevOP usi questi dati soltanto per rispondere alla richiesta. Il form apre il tuo client email: il sito non salva il messaggio.` : `I agree that DevOP may use this data only to answer my request. The form opens your email client; the website does not store the message.`}</span>
      </label>
      <input name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />
      {error && <p role="alert" className="mt-4 font-bold text-red-700 dark:text-red-300">{error}</p>}
      <button type="submit" className="mt-7 w-full rounded-full bg-bubblegum px-7 py-4 text-lg font-bold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-forest">
        {isIt ? 'Prepara la richiesta via email' : 'Prepare the request by email'}
      </button>
      <p className="mt-4 text-center text-sm text-ink/60 dark:text-white/60">{isIt ? 'Risposta prevista entro 2 giorni lavorativi.' : 'Expected reply within 2 working days.'}</p>
    </form>
  );
}
