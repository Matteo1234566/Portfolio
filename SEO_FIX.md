## Esito dell’audit

Il progetto ha una buona base tecnica — App Router, metadata per route, canonical localizzati, `hreflang`, status 404 corretti e numerosi contenuti tradotti — ma oggi presenta tre ostacoli principali:

1. La homepage commerciale non esiste nell’HTML iniziale: viene montata solo dopo hydration e un timer di 2,2 secondi.
2. Il sito dichiara di offrire consulenza AI, computer vision e software custom, ma non dispone di landing page dedicate a questi servizi.
3. Gran parte dell’architettura SEO e del crawl è dedicata a circa 150 pagine “Trending Repo”, mentre le pagine destinate alla generazione di lead sono poche e debolmente collegate.

Non ho modificato alcun file. Ho eseguito una build di produzione e ispezionato le risposte HTML locali.

## Verifiche tecniche effettuate

- `npm run build`: completata correttamente.
- 310 pagine generate.
- Homepage e principali landing: SSR dinamico.
- Pagine blog e Trending Repo detail: SSG tramite `generateStaticParams`.
- `/`: `308 Permanent Redirect` verso `/it`.
- `/it/nope`: vero `404` con `noindex`.
- Canonical e `hreflang`: presenti sulle principali pagine.
- `robots.txt` e `sitemap.xml`: accessibili.
- Build warning non SEO-bloccante in `src/lib/gsap-utils.js`.

---

# Problemi individuati

## 1. La homepage non contiene il contenuto SEO nell’HTML iniziale

**Gravità: critica**

**File:** [LandingPageClient.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/LandingPageClient.jsx:24), [LoadingScreen.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/LoadingScreen.jsx:4)

**Problema concreto**

Lo stato iniziale è:

```jsx
const [isLoading, setIsLoading] = useState(true);
```

e tutto il contenuto commerciale viene escluso dal render finché il timer non termina:

```jsx
{!isLoading && (
  <motion.div>
    <motion.main>
      <HomeSchema />
      <Hero />
      ...
    </motion.main>
  </motion.div>
)}
```

Il timer dura 2,2 secondi:

```jsx
setTimeout(() => {
  setIsLoading(false);
}, 2200);
```

Ho verificato che l’HTML restituito da `/it` e `/en` non contiene:

- H1;
- hero;
- servizi;
- portfolio;
- link commerciali;
- JSON-LD `Organization`, `ProfessionalService` e FAQ.

Contiene soltanto il loader “INITIALIZING”.

**Perché impatta la SEO**

Google può eseguire JavaScript, ma il contenuto passa attraverso una seconda coda di rendering. Gli altri crawler e social bot potrebbero non eseguirlo affatto. Google raccomanda SSR o prerendering proprio perché l’HTML iniziale completo è più veloce e affidabile per crawler e utenti. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Il ritardo artificiale compromette anche il Largest Contentful Paint: il vero hero non può diventare LCP prima di circa 2,2 secondi, esclusi rete, parsing e hydration. Il limite raccomandato per un LCP “good” è 2,5 secondi. [Google Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

**Modifica consigliata**

Renderizzare sempre il contenuto e sovrapporre il loader come elemento puramente visuale:

```jsx
return (
  <>
    <AnimatePresence>
      {isLoading && <LoadingScreen key="loader" />}
    </AnimatePresence>

    <div ref={mainRef}>
      <main>
        <Hero />
        <Authority />
        <Services />
        ...
      </main>
      <Footer />
    </div>
  </>
);
```

Ancora meglio:

- eliminare il timer obbligatorio;
- mostrare il loader soltanto per transizioni reali;
- rispettare `prefers-reduced-motion`;
- spostare `HomeSchema` nel Server Component `page.jsx`.

---

## 2. Mancano landing page per i servizi principali dichiarati

**Gravità: alta**

**File:** [page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/page.jsx:4), [Services.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Services.jsx:31), [messages/it.json](/home/zappaganini/WebstormProjects/Portfolio/messages/it.json), [messages/en.json](/home/zappaganini/WebstormProjects/Portfolio/messages/en.json)

**Problema concreto**

La homepage si posiziona come:

- consulenza AI;
- computer vision;
- software su misura;
- data engineering;
- AI per startup;
- sport analytics.

Ma la sezione servizi contiene una sola offerta:

```jsx
const services = [
  {
    id: 'homelab-creation',
    href: `/${currentLocale}/homelab-creation`,
  },
];
```

Non esistono URL dedicati per query commerciali come:

- consulenza AI Roma;
- sviluppo computer vision;
- sviluppo software su misura;
- MVP AI per startup;
- sistemi di video analytics;
- data engineering consulting.

Le altre pagine sono prevalentemente schede prodotto/progetto e mirano a keyword branded come AiLights, Screeba, PUSE o PyQuark.

**Perché impatta la SEO**

La homepage deve gestire contemporaneamente troppi intenti. Non può approfondire adeguatamente problema, servizio, processo, deliverable, casi studio e CTA per ciascun cluster commerciale.

Inoltre un utente che cerca “sviluppo computer vision per aziende” atterra su una homepage generalista anziché su una pagina pienamente aderente all’intento.

**Modifica consigliata**

Creare almeno:

```text
/it/consulenza-ai
/en/ai-consulting

/it/sviluppo-computer-vision
/en/computer-vision-development

/it/software-su-misura
/en/custom-software-development

/it/ai-per-startup
/en/ai-development-for-startups
```

Ogni pagina dovrebbe includere:

- H1 orientato al problema commerciale;
- pubblico e casi d’uso;
- processo;
- deliverable;
- tecnologie solo dopo i benefici;
- prove e casi studio pertinenti;
- FAQ specifiche;
- CTA di contatto;
- `Service` schema;
- collegamenti ai progetti che dimostrano quella competenza.

La homepage dovrebbe diventare una pagina hub, non l’unica pagina posizionabile.

---

## 3. Il percorso di conversione di HomeLab non ha una vera conclusione

**Gravità: alta**

**File:** [HomeLabCreationClient.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/homelab-creation/HomeLabCreationClient.jsx:101)

**Problema concreto**

Il configuratore calcola hardware, add-on e totale, ma non contiene:

- form;
- pulsante “richiedi preventivo”;
- invio della configurazione;
- `mailto` precompilato;
- link Calendly contestualizzato;
- salvataggio del preventivo;
- lead capture.

Il componente finisce con un riepilogo passivo. Su mobile il link:

```jsx
<a href="#summary">
```

punta inoltre a un `<aside id="summary" className="hidden lg:block">`, quindi al target nascosto.

**Perché impatta SEO e acquisizione**

Questa è l’unica landing realmente orientata a un servizio acquistabile, ma non permette al visitatore di trasformare la configurazione in una richiesta. Il traffico organico può quindi arrivare senza generare lead.

**Modifica consigliata**

Aggiungere al riepilogo una CTA finale:

```jsx
<a
  href={`mailto:magosimo99@gmail.com?subject=${encodeURIComponent(
    'Richiesta HomeLab'
  )}&body=${encodeURIComponent(buildQuoteSummary())}`}
>
  Richiedi una consulenza su questa configurazione
</a>
```

La soluzione preferibile è un form server-side con:

- nome;
- email aziendale;
- località;
- obiettivo;
- configurazione selezionata;
- budget indicativo;
- consenso privacy;
- thank-you page tracciabile.

---

## 4. Identità e contatti sono frammentati tra DevOP e account personali

**Gravità: alta**

**File:** [Footer.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Footer.jsx:64), [AiLightsClient.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/ailights/AiLightsClient.jsx:266), [ScreebaPageClient.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/screeba/ScreebaPageClient.jsx:146), [TargagePageClient.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/targage/TargagePageClient.jsx:151)

**Problema concreto**

Le CTA portano alternativamente a email personali, Calendly personale e `liberapay.com/MagoSimo`.

La homepage dichiara invece che il brand è DevOP.

**Perché impatta SEO e conversione**

La discontinuità riduce fiducia e chiarezza sull’entità con cui il cliente sta parlando. Questo è particolarmente sensibile per servizi B2B ad alto valore, dove brand, contatti e prove devono essere coerenti.

Indebolisce inoltre i segnali di entità: sito, schema, email, profili e organizzazione non convergono chiaramente sulla stessa identità.

**Modifica consigliata**

Centralizzare i dati:

```js
export const BUSINESS = {
  name: 'DevOP',
  url: 'https://www.devop.sbs',
  email: 'magosimo99@gmail.com',
  bookingUrl: 'https://calendly.com/devop/...',
};
```

Aggiungere una pagina `/[locale]/contact` e mantenere tutti i punti di contatto coerenti con l’identità DevOP.

---

## 5. Gran parte delle pagine principali è dinamica e non cacheabile

**Gravità: alta**

**File:** [layout.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/layout.jsx:42), [[locale]/layout.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/layout.jsx:5), [middleware.js](/home/zappaganini/WebstormProjects/Portfolio/src/middleware.js:3)

**Problema concreto**

La build mostra `ƒ Dynamic` per homepage e principali landing. Le risposte locali hanno:

```http
Cache-Control: private, no-cache, no-store, max-age=0
Set-Cookie: NEXT_LOCALE=...
```

Il root layout chiama:

```jsx
const locale = await getLocale();
```

La maggior parte dei contenuti è però stabile e potrebbe essere prerenderizzata.

**Perché impatta la SEO**

SSR dinamico non è di per sé negativo, ma:

- aumenta TTFB;
- impedisce una cache CDN efficace;
- aumenta dipendenza dal runtime;
- riduce resilienza durante picchi o cold start;
- aggrava il costo del rendering per centinaia di URL.

Next.js supporta `generateStaticParams` per generare staticamente le varianti linguistiche. [Next.js internationalization](https://nextjs.org/docs/app/guides/internationalization)

**Modifica consigliata**

Nel layout locale:

```jsx
export function generateStaticParams() {
  return [{ locale: 'it' }, { locale: 'en' }];
}
```

Validare il locale e usare la modalità di rendering statico raccomandata da `next-intl`, tipicamente con `setRequestLocale(locale)`. Valutare anche una struttura in cui il root layout locale riceva direttamente `params.locale`, evitando una lettura dinamica della request per determinare `lang`.

Dopo la modifica, verificare che la build mostri `○` o `●` e che gli header consentano cache pubblica.

---

## 6. Sitemap incompleta e mantenuta manualmente

**Gravità: alta**

**File:** [sitemap.js](/home/zappaganini/WebstormProjects/Portfolio/src/app/sitemap.js:1)

**Problema concreto**

La sitemap:

- omette `/fishertiger`;
- omette `/blogs`;
- omette tutti e tre i post del blog;
- omette 21 delle 148 pagine Trending Repo;
- replica manualmente gli slug già presenti in `repoData.js`;
- assegna `lastModified` alla data corrente a ogni build, anche senza modifica reale;
- non contiene alternate linguistiche.

Gli slug mancanti includono, tra gli altri, `ghidra`, `htmx`, `localsend`, `cline` e `screenshot-to-code`.

**Perché impatta la SEO**

Una sitemap incompleta rallenta discovery e aggiornamento. Date artificialmente sempre recenti rendono `lastmod` poco attendibile. La duplicazione manuale garantisce che dataset e sitemap continuino a divergere.

L’assenza di alternate nella sitemap non invalida gli `hreflang` HTML già presenti, ma rende più fragile la gestione multilingua.

**Modifica consigliata**

Generare le route direttamente dai dati:

```jsx
import { repositories } from './[locale]/(site)/trending-repo/repoData';
import { BLOG_POSTS } from './[locale]/(site)/_blogs/blogData';

const locales = ['it', 'en'];

return locales.flatMap((locale) => [
  {
    url: `${SITE_URL}/${locale}`,
    alternates: {
      languages: {
        it: `${SITE_URL}/it`,
        en: `${SITE_URL}/en`,
      },
    },
  },
  {
    url: `${SITE_URL}/${locale}/blogs`,
  },
  ...BLOG_POSTS.map(({ id, date }) => ({
    url: `${SITE_URL}/${locale}/blogs/${id}`,
    lastModified: date,
  })),
  ...repositories.map(({ slug, updatedAt }) => ({
    url: `${SITE_URL}/${locale}/trending-repo/${slug}`,
    lastModified: updatedAt,
  })),
]);
```

Usare date reali o omettere `lastModified`.

---

## 7. Le pagine blog sono quasi orfane

**Gravità: alta**

**File:** [Navbar.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Navbar.jsx:14), [blogs/page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/blogs/page.jsx:1)

**Problema concreto**

Il link al blog è esplicitamente disattivato:

```jsx
const SHOW_BLOG_NAV_LINK = false;
```

Le pagine non sono nella sitemap e non risultano collegate dal footer o dalla homepage.

**Perché impatta la SEO**

Una route esistente ma non raggiungibile da link crawlable e assente dalla sitemap è di fatto orfana. Anche quando viene indicizzata, riceve pochissima internal authority.

Il blog non contribuisce quindi a sostenere i cluster “AI consulting”, “computer vision”, “Next.js” e “software development”.

**Modifica consigliata**

- Riattivare il link se il blog è parte della strategia.
- Inserirlo in sitemap e footer.
- Collegare gli articoli alle landing commerciali.
- Aggiungere dalle landing link ad articoli realmente pertinenti.
- Evitare un blog generico se non si prevede continuità editoriale.

---

## 8. Internal linking dei progetti debole e non localizzato

**Gravità: alta**

**File:** [Projects.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Projects.jsx:41), [Projects.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Projects.jsx:345)

**Problema concreto**

I link sono definiti senza locale:

```jsx
link: "/ailights"
link: "/screeba"
link: "/twosequel"
```

e vengono renderizzati come collegamenti esterni in nuova scheda:

```jsx
<a href={project.link} target="_blank" rel="noopener noreferrer">
  <ExternalLink />
</a>
```

Il link è soltanto un’icona senza anchor text significativo. La card e il titolo non sono link.

**Perché impatta la SEO**

Il crawler trova URL che devono prima subire un redirect middleware verso la lingua corretta. Il testo del collegamento non comunica cosa si trova sulla pagina. Inoltre l’autorità interna trasferita dalle card portfolio è molto più debole di quanto potrebbe essere.

Google raccomanda `<a>` crawlable con testo pertinente alla destinazione. [Google SEO developer guide](https://developers.google.com/search/docs/fundamentals/get-started-developers)

**Modifica consigliata**

```jsx
<Link
  href={`/${locale}/${project.id}`}
  className="block"
>
  <article>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <span>Leggi il caso studio {project.title}</span>
  </article>
</Link>
```

Usare `target="_blank"` soltanto per siti realmente esterni.

---

## 9. Le pagine Trending Repo dominano l’indice e diluiscono il focus commerciale

**Gravità: alta**

**File:** [repoData.js](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/trending-repo/repoData.js:1), [[slug]/page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/trending-repo/[slug]/page.jsx:7)

**Problema concreto**

Sono generate 296 varianti localizzate per 148 repository. Molte pagine hanno:

- struttura identica;
- title formulaico;
- description formulaica;
- testo breve;
- contenuti principalmente derivati dal progetto GitHub di terzi;
- nessun autore o data di revisione;
- nessun collegamento verso un servizio DevOP pertinente;
- nessun Article/TechArticle schema.

**Perché impatta la SEO**

Il dominio rischia di essere interpretato principalmente come directory di repository open source, non come studio di consulenza AI e software. Le pagine possono inoltre finire nello stato “Crawled – currently not indexed” per scarsa unicità o valore aggiunto.

Non è cannibalizzazione diretta sulle keyword commerciali, ma è forte diluizione tematica e di internal authority.

**Modifica consigliata**

Scegliere una strategia netta:

- se non è un canale commerciale: `noindex, follow` sulle detail page o spostamento su progetto/subdomain separato;
- se deve restare indicizzato: pubblicare meno pagine ma molto più approfondite, con valutazione originale, autore, data, comparazioni, casi d’uso e collegamenti contestuali ai servizi.

Esempio temporaneo:

```jsx
robots: {
  index: false,
  follow: true,
}
```

Non applicarlo automaticamente senza prima verificare traffico e impression in Search Console.

---

## 10. URL errati e dominio incoerente nei dati strutturati

**Gravità: alta**

**File:** [Mirror page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/mirror/page.jsx:68), [HomeSchema.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/HomeSchema.jsx:12), [AiLightsSchema.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/ailights/AiLightsSchema.jsx:10), [Capture page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/capture/page.jsx:64)

**Problema concreto**

I canonical usano:

```text
https://www.devop.sbs
```

Molti schema usano:

```text
https://devop.sbs
```

Mirror contiene un dominio presumibilmente errato:

```jsx
url: `https://devop.it/${locale}/mirror`
```

Capture usa un URL relativo:

```jsx
url: `/${locale}/capture`
```

**Perché impatta la SEO**

Canonical, entity URL, breadcrumb e publisher dovrebbero identificare coerentemente la stessa risorsa. Dominio errato o host divergenti possono frammentare i segnali o rendere i dati strutturati meno affidabili.

**Modifica consigliata**

Creare un’unica costante:

```js
export const SITE_URL = 'https://www.devop.sbs';
```

Usarla ovunque:

```jsx
url: `${SITE_URL}/${locale}/mirror`
```

e verificare a livello hosting che:

- `http` → `https`;
- dominio non-www → `www`;
- ogni redirect sia permanente e in un solo passaggio.

Il codice corrente non contiene una regola esplicita di normalizzazione dell’host.

---

## 11. Structured data della homepage non server-rendered e poco collegato

**Gravità: alta**

**File:** [HomeSchema.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/HomeSchema.jsx:1)

**Problema concreto**

`HomeSchema` è un Client Component e, per via del loader, non compare nell’HTML iniziale.

Inoltre:

- `Organization` e `ProfessionalService` sono oggetti separati senza `@id`;
- manca `WebSite`;
- l’URL dell’organizzazione è la homepage localizzata, non l’identità canonica;
- mancano `founder`, `contactPoint` e collegamenti ai profili `Person`;
- `sameAs` dovrebbe contenere soltanto profili che rappresentano realmente la stessa entità.

**Perché impatta la SEO**

Google riceve un entity graph incompleto e tardivo. Per un sito professionale è preferibile una struttura coerente e server-rendered.

**Modifica consigliata**

Generare lo schema nel Server Component:

```jsx
const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'DevOP',
      url: SITE_URL,
      logo: `${SITE_URL}/pittogramma_sun.webp`,
      founder: [
        { '@id': `${SITE_URL}/#simone-zannini` },
        { '@id': `${SITE_URL}/#matteo-cese` },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'DevOP',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['it', 'en'],
    },
  ],
};
```

Aggiungere soltanto informazioni vere e pubblicamente verificabili.

---

## 12. FAQ schema sovrautilizzato rispetto al beneficio reale

**Gravità: bassa**

**File:** `HomeSchema.jsx` e quasi tutti i componenti `*Schema.jsx`

**Problema concreto**

Quasi ogni progetto include `FAQPage`.

**Perché impatta la SEO**

Non è una penalizzazione e non serve rimuoverlo urgentemente. Tuttavia Google mostra i FAQ rich result quasi esclusivamente per siti governativi o sanitari autorevoli, quindi per devop.sbs il beneficio visibile è molto limitato. [Google FAQ changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

**Modifica consigliata**

- Tenere lo schema solo dove le FAQ sono davvero visibili e utili.
- Non investirvi tempo prima di correggere homepage, servizi, linking e conversioni.
- Validare che il testo dello schema coincida con il testo visibile.

---

## 13. Mancano immagini Open Graph e Twitter

**Gravità: media**

**File:** [layout.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/layout.jsx:20) e tutti i `generateMetadata`

**Problema concreto**

È dichiarato:

```jsx
twitter: {
  card: 'summary_large_image',
}
```

ma non esiste:

- `src/app/opengraph-image.*`;
- `src/app/twitter-image.*`;
- `openGraph.images`;
- `twitter.images`.

**Perché impatta SEO e acquisizione**

Le condivisioni su LinkedIn, WhatsApp, Slack, X e altre piattaforme possono apparire senza immagine. Questo riduce click-through, autorevolezza percepita e diffusione dei case study.

Next.js supporta direttamente file statici o immagini dinamiche per route. [Next.js OG image metadata](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)

**Modifica consigliata**

Aggiungere almeno:

```text
src/app/opengraph-image.png
src/app/twitter-image.png
```

Poi creare immagini dedicate per:

- homepage;
- servizi;
- case study;
- articoli blog.

Formato consigliato: 1200×630, testo breve e brand leggibile.

---

## 14. Title duplicati e spesso troppo lunghi

**Gravità: media**

**File:** [layout.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/layout.jsx:20), [homepage page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/page.jsx:9), [blogs/page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/blogs/page.jsx:6), [blog post page.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/blogs/[id]/page.jsx:26)

**Problema concreto**

Il layout applica:

```jsx
template: '%s | DevOP'
```

ma diverse route includono già DevOP nel title. Il risultato reale della homepage è:

```text
DevOP | Consulenza AI, Computer Vision e Sviluppo Software a Roma | DevOP
```

Un post diventa:

```text
Titolo articolo | DevOP Blog | DevOP
```

**Perché impatta la SEO**

Title troppo lunghi vengono riscritti o troncati e sprecano spazio prezioso con il brand ripetuto.

**Modifica consigliata**

Le pagine dovrebbero restituire il solo titolo specifico:

```jsx
const title =
  locale === 'it'
    ? 'Consulenza AI e software su misura a Roma'
    : 'AI consulting and custom software development in Rome';
```

Il template aggiungerà automaticamente `| DevOP`.

---

## 15. Canonical e hreflang HTML sono buoni, ma la validazione locale è incompleta

**Gravità: media**

**File:** [[locale]/layout.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/layout.jsx:5), [middleware.js](/home/zappaganini/WebstormProjects/Portfolio/src/middleware.js:3)

**Problema concreto**

Aspetti positivi:

- ogni lingua ha self-canonical;
- `en`, `it` e `x-default` sono reciproci;
- `/` redirige permanentemente a `/it`;
- `<html lang>` è corretto.

Tuttavia il layout non valida direttamente `params.locale`. Una richiesta `/fr` produce prima un `307` verso `/it/fr`, poi un 404.

**Perché impatta la SEO**

Non è un errore grave di indicizzazione, ma genera un redirect inutile e una gestione meno deterministica degli URL non supportati.

**Modifica consigliata**

```jsx
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

const locales = ['it', 'en'];

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  ...
}
```

Le versioni linguistiche separate sono una scelta corretta; Google raccomanda URL distinti e annotazioni `hreflang`. [Google multilingual sites](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites)

---

## 16. I case study non dimostrano abbastanza l’impatto commerciale

**Gravità: alta**

**File:** pagine `ailights`, `screeba`, `mirror`, `twosequel`, `targage` e [Projects.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Projects.jsx:35)

**Problema concreto**

Le pagine sono spesso ottime descrizioni del prodotto, ma non strutturate come prove per vendere servizi DevOP. Mancano frequentemente:

- problema iniziale del cliente;
- ruolo preciso di DevOP;
- vincoli;
- architettura;
- tempi di consegna;
- risultati misurabili;
- testimonianza;
- stato del progetto;
- CTA verso il servizio pertinente.

Alcune pagine promuovono direttamente repository o prodotti esterni, senza ricondurre l’utente a un’offerta DevOP.

**Perché impatta SEO e conversione**

Le query commerciali B2B richiedono fiducia e prove. Una galleria tecnologica dimostra capacità, ma non sempre riduce il rischio percepito dal potenziale cliente.

**Modifica consigliata**

Trasformare almeno 3 progetti forti in case study:

```text
Problema
Contesto e vincoli
Soluzione progettata
Ruolo di Simone e Matteo
Architettura
Risultati e metriche
Cosa può essere replicato per altri clienti
CTA al servizio collegato
```

AiLights dovrebbe sostenere la landing computer vision; Screeba quella AI/NLP; Mirror quella data engineering.

---

## 17. Local SEO debole nonostante il targeting “Roma”

**Gravità: media**

**File:** homepage metadata, `HomeSchema.jsx`, footer

**Problema concreto**

Il title include “a Roma”, ma il sito non presenta:

- indirizzo o area operativa dettagliata;
- telefono;
- pagina contatti;
- riferimenti locali verificabili;
- `PostalAddress`;
- eventuale profilo Google Business;
- testimonianze o clienti locali;
- testo specifico sul servizio in presenza o da remoto.

**Perché impatta la SEO**

Il solo termine “Roma” nel title è un segnale debole. Per query locali commerciali Google cerca coerenza tra contenuto, entità, contatti e presenza territoriale.

**Modifica consigliata**

Se DevOP serve realmente Roma:

- creare `/it/consulenza-ai-roma` solo se vi è sufficiente contenuto specifico;
- aggiungere area servita, modalità operative e dati aziendali reali;
- usare `ProfessionalService` con indirizzo/telefono soltanto se pubblicabili e corretti;
- raccogliere testimonianze con nome, azienda e progetto.

Se il servizio è principalmente remoto, evitare di sovra-enfatizzare Roma e definire chiaramente Italia/Europa.

---

## 18. CTA e tono del footer riducono la percezione B2B

**Gravità: media**

**File:** [Footer.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Footer.jsx:64), `messages/it.json` namespace `Footer`

**Problema concreto**

Il footer usa testi come:

> “Che sia un sito web, un'app, una rete neurale o il bagno di casa…”

e mostra “Offrici un caffè” accanto alla CTA commerciale.

**Perché impatta SEO e conversione**

Non è un problema di ranking diretto, ma può indebolire la percezione di affidabilità per lead B2B ad alto valore. La CTA non qualifica il tipo di progetto e non chiarisce cosa succede dopo il contatto.

**Modifica consigliata**

Usare una CTA più concreta:

```text
Hai un prodotto AI, una pipeline video o un processo operativo da trasformare?
Raccontaci il problema: entro 2 giorni lavorativi ti proponiamo il prossimo passo tecnico.
```

Spostare la donazione fuori dal percorso commerciale principale.

---

## 19. Architettura client e animazioni eccessive per pagine content-first

**Gravità: media**

**File:** `LandingPageClient.jsx`, `Navbar.jsx`, `Hero.jsx`, `Projects.jsx`, quasi tutti i `*Client.jsx`

**Problema concreto**

La homepage carica circa 225 KB di First Load JS; le altre route generalmente 157–188 KB. Sono usati insieme:

- Framer Motion;
- GSAP;
- ScrollTrigger;
- numerosi `useEffect`;
- listener manuali hover/scroll;
- animazioni infinite;
- intere pagine dichiarate `'use client'`.

**Perché impatta la SEO**

Questo può aumentare:

- hydration time;
- main-thread work;
- INP;
- consumo su dispositivi mobili;
- rischio che il contenuto dipenda troppo dal JS.

**Modifica consigliata**

- Rendere Server Component struttura, copy, heading e link.
- Isolare in Client Components soltanto configuratori, menu e animazioni realmente necessarie.
- Usare CSS per hover e semplici reveal.
- Evitare di combinare GSAP e Framer nella stessa sezione senza necessità.
- Animare `transform` e `opacity`, rispettando sempre reduced motion.
- Misurare LCP, INP e CLS con dati reali, non soltanto Lighthouse locale.

---

## 20. Alcune immagini e semantiche possono essere rifinite

**Gravità: bassa**

**File:** [LandingPageClient.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/LandingPageClient.jsx:145), [Projects.jsx](/home/zappaganini/WebstormProjects/Portfolio/src/app/[locale]/(site)/sections/Projects.jsx:345), profili Matteo/Simone

**Problema concreto**

- Immagini decorative usano `alt="Decorative Element"` anziché `alt=""`.
- I profili usano immagini `fill` senza `sizes`.
- Il link progetto a icona non ha un nome accessibile.
- Il logo navbar è un `<button>` anziché un link crawlable alla homepage.
- Alcune pagine usano `<div>` come contenitore principale invece di `<main>`.
- La navigazione principale usa bottoni JS, anche quando un normale link sarebbe più robusto.

**Perché impatta la SEO**

Sono problemi minori, ma migliorano accessibilità, semantica, crawlability e caricamento immagini.

**Modifica consigliata**

```jsx
<Image alt="" aria-hidden="true" ... />

<Image
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Matteo Cese"
/>

<Link href={`/${locale}`} aria-label="DevOP homepage">
  <Image ... />
</Link>
```

---

## 21. Mancano strumenti visibili di misurazione SEO e conversione

**Gravità: media**

**File:** intero progetto

**Problema concreto**

Non risultano configurati:

- Search Console verification;
- analytics;
- Core Web Vitals real-user monitoring;
- eventi sulle CTA;
- conversioni form/Calendly/email;
- gestione UTM;
- thank-you page.

**Perché impatta la SEO e l’acquisizione**

Non penalizza direttamente il ranking, ma rende impossibile sapere:

- quali landing generano lead;
- quali query portano opportunità;
- dove gli utenti abbandonano;
- se il loader o le animazioni degradano i Core Web Vitals;
- quali pagine Trending Repo consumano crawl senza valore.

**Modifica consigliata**

Configurare almeno:

- Google Search Console;
- analytics rispettoso della privacy;
- eventi `cta_click`, `booking_start`, `lead_submit`;
- monitoraggio LCP/INP/CLS;
- conversione finale su pagina di ringraziamento.

---

# Cannibalizzazione e contenuti duplicati

Non ho trovato una cannibalizzazione forte tra le principali pagine commerciali, perché in realtà mancano landing commerciali sufficienti.

I rischi attuali sono diversi:

- **diluizione tematica:** centinaia di pagine open source rispetto a poche pagine sui servizi;
- **contenuti scalati e simili:** le detail Trending Repo condividono struttura, title e descrizioni molto uniformi;
- **identità frammentata:** alcuni contenuti e contatti non convergono chiaramente sul brand DevOP;
- **homepage sovraccarica:** AI consulting, computer vision, software, data engineering e sport analytics competono sulla stessa URL.

Per le pagine future va mantenuta questa separazione:

- landing servizio → intento commerciale;
- case study → prova e risultato;
- articolo → intento informativo;
- pagina prodotto → query branded/prodotto.

---

# Cosa è già impostato bene

- App Router usato correttamente.
- Metadata generati lato server.
- `params` atteso correttamente come promise in Next.js 15.
- Canonical self-referential presenti.
- `hreflang` reciproci `it`, `en`, `x-default` sulle pagine principali.
- `/` usa un redirect permanente 308 verso `/it`.
- Le route inesistenti restituiscono un vero 404 con `noindex`.
- `robots.txt` non blocca accidentalmente il sito.
- `next/image` è usato per gran parte delle immagini principali.
- Font gestiti con `next/font`.
- H1 unico presente sulle landing progetto.
- Contenuti italiani e inglesi sono realmente tradotti, non semplicemente duplicati.
- Blog post e Trending Repo detail hanno `generateStaticParams`.
- La build di produzione termina correttamente.

---

# Roadmap prioritaria

## Interventi immediati

1. Rendere homepage, H1, link e JSON-LD presenti nell’HTML iniziale.
2. Eliminare il blocco di 2,2 secondi o trasformare il loader in overlay non bloccante.
3. Correggere `https://devop.it/...`, URL relativi e incoerenza www/non-www negli schema.
4. Rigenerare la sitemap dai dataset reali, includendo blog, Fishertiger e tutte le route valide.
5. Correggere i link portfolio: localizzati, crawlable, con anchor text, senza nuova scheda.
6. Aggiungere una CTA di conversione reale al configuratore HomeLab.
7. Uniformare email, Calendly e identità DevOP.
8. Aggiungere immagini OG/Twitter.
9. Rimuovere la duplicazione `| DevOP` nei title.

## Interventi ad alto impatto

1. Creare landing dedicate a consulenza AI, computer vision, software custom e AI per startup.
2. Trasformare 3–5 progetti in veri case study collegati ai servizi.
3. Decidere se le 296 pagine Trending Repo debbano essere indicizzate, consolidate o `noindex`.
4. Rendere statiche/cacheabili le principali route localizzate.
5. Costruire una pagina contatti e un funnel con form, thank-you page e tracciamento.
6. Portare Organization/WebSite/Service schema nei Server Components e collegarli con `@id`.
7. Rafforzare trust signals: testimonianze verificabili, risultati, ruoli, ricerca, clienti e profili.
8. Uniformare brand, contatti e profili attorno a DevOP.

## Miglioramenti secondari

1. Aggiungere breadcrumb visibili e `BreadcrumbList` coerenti.
2. Migliorare `alt`, `sizes`, landmark `<main>` e nomi accessibili.
3. Ridurre GSAP/Framer e il numero di Client Components.
4. Aggiungere `Person` schema alle pagine profilo.
5. Migliorare la gestione degli URL con locale non valido.
6. Aggiungere `alternateLocale` ai metadata Open Graph.
7. Aggiornare o rilanciare il blog con contenuti legati ai cluster commerciali.
8. Configurare Search Console, analytics e Web Vitals real-user monitoring.

La priorità assoluta è rendere la homepage semanticamente completa senza JavaScript e costruire pagine dedicate ai servizi: al momento il sito dimostra molte capacità tecniche, ma non offre a Google né ai potenziali clienti percorsi abbastanza chiari tra query, servizio, prova e contatto.
