import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { title: locale === 'it' ? 'Richiesta preparata' : 'Request prepared', robots: { index: false, follow: false } };
}

export default async function ThankYouPage({ params }) {
  const { locale } = await params;
  const isIt = locale === 'it';
  return (
    <main className="grid min-h-screen place-items-center bg-forest px-5 py-32 text-white">
      <section className="max-w-3xl rounded-[2rem] border-2 border-white bg-ink p-8 shadow-hard-white md:p-14">
        <p className="font-bold text-bubblegum">{isIt ? 'Ultimo passaggio' : 'One last step'}</p>
        <h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{isIt ? 'La richiesta è pronta nel tuo client email.' : 'Your request is ready in your email client.'}</h1>
        <p className="mt-6 text-lg leading-relaxed text-white/75">{isIt ? 'Controlla il messaggio e premi Invia. Se il client non si è aperto, torna al form oppure scrivici direttamente.' : 'Review the message and press Send. If your email client did not open, return to the form or write to us directly.'}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={`/${locale}/contact`} className="rounded-full bg-bubblegum px-6 py-3 font-bold text-ink">{isIt ? 'Torna al form' : 'Back to the form'}</Link>
          <Link href={`/${locale}`} className="rounded-full border-2 border-white px-6 py-3 font-bold">{isIt ? 'Vai alla home' : 'Go home'}</Link>
        </div>
      </section>
    </main>
  );
}
