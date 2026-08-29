export const BLOG_CATEGORIES = ['all', 'engineering', 'design', 'strategy'];

export const BLOG_POSTS = [
  {
    id: 'ai-revolution',
    category: 'engineering',
    author: 'Matteo Cese',
    date: '2023-11-28',
    readTime: 5,
    accent: 'from-forest to-bubblegum',
    en: {
      title: 'The Quiet Revolution of AI in Everyday Code',
      excerpt:
        'How we use AI as an execution amplifier for product teams without compromising architecture quality.',
      highlights: [
        'AI assistants are strongest in repetitive engineering loops.',
        'Guardrails matter more than raw prompting speed.',
        'Operational quality beats flashy demos every time.',
      ],
      content: [
        "Artificial intelligence did not replace software engineering in our workflow. It compressed the repetitive parts and gave us more bandwidth for the hard decisions.",
        "The gain does not come from asking for complete systems in one shot. The gain comes from reducing friction in tasks like first-draft APIs, migration scaffolds, test fixtures, and documentation structure.",
        "The teams that benefit the most set strict constraints before they ask for acceleration. Data contracts, naming conventions, and error semantics still need human ownership.",
        "In practice, we use AI where ambiguity is low and validation is fast. We avoid depending on it for domain logic that requires contextual judgment.",
        "The result is not less craftsmanship. It is more output with the same engineering standards, because senior focus moves from typing to evaluating trade-offs.",
      ],
      tags: ['AI Systems', 'Dev Experience', 'Execution'],
    },
    it: {
      title: 'La rivoluzione silenziosa dell\'AI nel codice quotidiano',
      excerpt:
        'Come usiamo l\'AI come moltiplicatore operativo per team di prodotto senza sacrificare la qualita architetturale.',
      highlights: [
        'Gli assistenti AI rendono al massimo nei loop tecnici ripetitivi.',
        'I guardrail contano piu della velocita di prompting.',
        'La qualita operativa batte sempre le demo appariscenti.',
      ],
      content: [
        "L'intelligenza artificiale non ha sostituito l'ingegneria software nel nostro flusso. Ha compresso le parti ripetitive e ci ha dato piu spazio sulle decisioni difficili.",
        "Il vantaggio non nasce dal chiedere sistemi completi in un colpo solo. Nasce dalla riduzione dell'attrito in task come bozza API, scaffold di migrazione, fixture di test e struttura della documentazione.",
        "I team che ottengono risultati migliori impongono vincoli chiari prima di accelerare. Contratti dati, convenzioni di naming e semantica degli errori restano responsabilita umane.",
        "In pratica usiamo l'AI dove l'ambiguita e bassa e la validazione e rapida. Evitiamo di delegare logiche di dominio che richiedono giudizio contestuale.",
        "Il risultato non e meno cura artigianale. E piu output con gli stessi standard ingegneristici, perche il focus senior passa dalla digitazione alla valutazione dei trade-off.",
      ],
      tags: ['Sistemi AI', 'Developer Experience', 'Execution'],
    },
  },
  {
    id: 'duo-dynamic',
    category: 'design',
    author: 'Simone Zannini',
    date: '2023-10-15',
    readTime: 4,
    accent: 'from-bubblegum to-rose-500',
    en: {
      title: 'Designing for Tension: Our Duo Visual Language',
      excerpt:
        'Why we intentionally combine strict structure and playful disruption to make technical brands memorable.',
      highlights: [
        'Brand tension creates stronger recognition than visual neutrality.',
        'Editorial hierarchy improves both UX and storytelling.',
        'Consistency is a system, not a static style guide.',
      ],
      content: [
        'Most technical websites look correct and feel forgettable. We wanted the opposite: an interface with backbone and personality.',
        'Our baseline is strict hierarchy, clear spacing math, and strong readability. On top of that, we inject contrast through accent color, skewed badges, and bold display typography.',
        'This is not random decoration. It is controlled tension. Users get visual momentum while still understanding exactly where to click and what to read first.',
        'The key is consistency under variation: component shapes, spacing rhythm, and interaction rules remain stable while visual accents shift section by section.',
        'When structure and character coexist, the interface becomes easier to remember and easier to trust.',
      ],
      tags: ['UI System', 'Brand Design', 'Frontend Craft'],
    },
    it: {
      title: 'Progettare con tensione: il nostro linguaggio visivo',
      excerpt:
        'Perche uniamo intenzionalmente struttura rigorosa e disruption visiva per rendere memorabili i brand tecnici.',
      highlights: [
        'La tensione visiva genera piu riconoscibilita della neutralita.',
        'La gerarchia editoriale migliora UX e storytelling.',
        'La coerenza e un sistema, non uno style guide statico.',
      ],
      content: [
        'Molti siti tecnici sembrano corretti ma risultano dimenticabili. Noi volevamo il contrario: un\'interfaccia con struttura e carattere.',
        'La base e una gerarchia rigorosa, spacing matematico e leggibilita forte. Sopra questa base inseriamo contrasto con colore accento, badge inclinati e typography display decisa.',
        'Non e decorazione casuale. E tensione controllata. L\'utente percepisce ritmo visivo ma capisce subito dove cliccare e cosa leggere prima.',
        'La chiave e la coerenza dentro la variazione: forme dei componenti, ritmo dello spazio e regole di interazione restano stabili mentre gli accenti cambiano tra le sezioni.',
        'Quando struttura e personalita convivono, l\'interfaccia e piu memorabile e piu affidabile.',
      ],
      tags: ['Sistema UI', 'Brand Design', 'Frontend Craft'],
    },
  },
  {
    id: 'nextjs-performance',
    category: 'strategy',
    author: 'DevOP Team',
    date: '2023-09-10',
    readTime: 6,
    accent: 'from-emerald-500 to-forest',
    en: {
      title: 'How We Plan Next.js Work for Speed and Stability',
      excerpt:
        'A practical framework for deciding what belongs in server components, client components, and shared infrastructure.',
      highlights: [
        'Architecture decisions should be tied to delivery speed.',
        'Hydration cost is a product decision, not just a technical metric.',
        'Stable component contracts reduce long-term rewrite risk.',
      ],
      content: [
        'Performance starts long before optimization tickets. It starts with route boundaries, data flow ownership, and clear separation between static and interactive concerns.',
        'We default to server components for content-heavy surfaces and isolate client logic only where interaction demands it. This keeps payloads lean and rendering predictable.',
        'On top of that, we reserve layout space aggressively so asynchronous UI does not cause visual jumps. Stability is a trust signal, especially on content pages.',
        'The architectural question is always the same: does this piece need browser state, or can it be resolved on the server and streamed as HTML?',
        'Teams move faster when this rule is explicit. Fewer components become accidental clients, and refactors stay incremental instead of becoming rewrites.',
      ],
      tags: ['Next.js', 'Architecture', 'Product Delivery'],
    },
    it: {
      title: 'Come pianifichiamo il lavoro Next.js tra velocita e stabilita',
      excerpt:
        'Un framework pratico per decidere cosa tenere in server component, client component e infrastruttura condivisa.',
      highlights: [
        'Le scelte architetturali devono migliorare anche il delivery.',
        'Il costo di hydration e una decisione di prodotto, non solo tecnica.',
        'Contratti componenti stabili riducono il rischio di riscrittura.',
      ],
      content: [
        'Le performance iniziano prima delle ottimizzazioni. Iniziano dai confini delle route, dalla proprieta del dato e dalla separazione tra contenuto statico e interazione.',
        'Noi partiamo dai server component per superfici ricche di contenuto e isoliamo la logica client solo quando l\'interazione lo richiede. Questo mantiene payload leggeri e rendering prevedibile.',
        'In parallelo riserviamo spazio di layout in modo rigoroso, cosi la UI asincrona non produce salti visivi. La stabilita e un segnale di fiducia, soprattutto nelle pagine editoriali.',
        'La domanda architetturale resta sempre la stessa: questo blocco ha davvero bisogno di stato browser o puo essere risolto lato server e inviato come HTML?',
        'Quando questa regola e esplicita, i team avanzano piu veloci. Meno componenti diventano client per errore e i refactor restano incrementali invece di trasformarsi in riscritture complete.',
      ],
      tags: ['Next.js', 'Architettura', 'Delivery Prodotto'],
    },
  },
];
