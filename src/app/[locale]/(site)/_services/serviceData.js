export const SERVICE_KEYS = [
  'ai-consulting',
  'computer-vision',
  'custom-software',
  'startup-ai',
];

const sharedProcess = {
  it: [
    ['Diagnosi', 'Chiariamo obiettivo, dati, vincoli e metrica di successo prima di scegliere la tecnologia.'],
    ['Prova tecnica', 'Riduciamo il rischio con un prototipo misurabile o una vertical slice del prodotto.'],
    ['Consegna', 'Costruiamo, integriamo e documentiamo una soluzione che il tuo team può mantenere.'],
  ],
  en: [
    ['Diagnosis', 'We clarify the goal, data, constraints, and success metric before choosing technology.'],
    ['Technical proof', 'We reduce risk with a measurable prototype or a product vertical slice.'],
    ['Delivery', 'We build, integrate, and document a solution your team can maintain.'],
  ],
};

export const services = {
  'ai-consulting': {
    slugs: { it: 'consulenza-ai', en: 'ai-consulting' },
    serviceType: 'AI Consulting',
    it: {
      title: 'Consulenza AI per trasformare un problema operativo in un sistema affidabile',
      shortTitle: 'Consulenza AI',
      description: 'Dalla fattibilità ai dati, dal prototipo al deployment: una guida tecnica concreta per aziende che vogliono applicare l’AI senza rincorrere demo.',
      audience: 'Per team prodotto e aziende che devono decidere dove l’AI crea valore, cosa costruire e come portarlo in produzione.',
      uses: ['Valutazione di fattibilità e ROI tecnico', 'RAG, NLP e automazione di processi', 'Architetture LLM e modelli locali', 'Audit di pipeline, dati e deployment'],
      deliverables: ['Mappa di opportunità e rischi', 'Architettura e piano di implementazione', 'Proof of concept misurabile', 'Roadmap tecnica con priorità e stime'],
      faq: [
        ['Partite sempre da un modello AI?', 'No. Partiamo dalla decisione o dal processo da migliorare. Se una soluzione deterministica è migliore, lo diciamo.'],
        ['Potete lavorare con il nostro team interno?', 'Sì. Possiamo affiancare prodotto e engineering, trasferendo scelte, codice e documentazione.'],
      ],
    },
    en: {
      title: 'AI consulting that turns an operational problem into a reliable system',
      shortTitle: 'AI consulting',
      description: 'From feasibility and data to prototype and deployment: practical technical direction for companies applying AI beyond the demo.',
      audience: 'For product teams and companies deciding where AI creates value, what to build, and how to ship it.',
      uses: ['Technical feasibility and ROI assessment', 'RAG, NLP, and process automation', 'LLM architectures and local models', 'Pipeline, data, and deployment audits'],
      deliverables: ['Opportunity and risk map', 'Architecture and implementation plan', 'Measurable proof of concept', 'Prioritized technical roadmap'],
      faq: [
        ['Do you always start with an AI model?', 'No. We start from the decision or process to improve. If a deterministic solution is better, we say so.'],
        ['Can you work with our internal team?', 'Yes. We can work alongside product and engineering, transferring decisions, code, and documentation.'],
      ],
    },
  },
  'computer-vision': {
    slugs: { it: 'sviluppo-computer-vision', en: 'computer-vision-development' },
    serviceType: 'Computer Vision Development',
    it: {
      title: 'Computer vision progettata per immagini, video e condizioni reali',
      shortTitle: 'Computer vision',
      description: 'Pipeline di visione artificiale dalla raccolta dati all inferenza: rilevamento, tracking, classificazione e video analytics integrati nel prodotto.',
      audience: 'Per aziende con flussi video, ispezioni, monitoraggio o prodotti che devono comprendere il mondo fisico.',
      uses: ['Object detection e tracking', 'Video analytics in tempo reale', 'Classificazione e segmentazione', 'Edge inference e ottimizzazione'],
      deliverables: ['Audit di dati e condizioni operative', 'Benchmark di modelli e metriche', 'Pipeline di training e inferenza', 'API, dashboard o integrazione edge'],
      faq: [
        ['Lavorate anche con video in tempo reale?', 'Sì. Progettiamo latenza, throughput e deployment in base all’hardware e alle condizioni operative.'],
        ['Serve già un dataset?', 'Non necessariamente. Possiamo definire raccolta, annotazione e strategia di validazione prima del training.'],
      ],
    },
    en: {
      title: 'Computer vision built for real images, video, and operating conditions',
      shortTitle: 'Computer vision',
      description: 'Vision pipelines from data collection to inference: detection, tracking, classification, and video analytics integrated into your product.',
      audience: 'For companies working with video streams, inspection, monitoring, or products that need to understand the physical world.',
      uses: ['Object detection and tracking', 'Real-time video analytics', 'Classification and segmentation', 'Edge inference and optimization'],
      deliverables: ['Data and operating-condition audit', 'Model and metric benchmark', 'Training and inference pipeline', 'API, dashboard, or edge integration'],
      faq: [
        ['Do you work with real-time video?', 'Yes. We design latency, throughput, and deployment around the available hardware and operating conditions.'],
        ['Do we need an existing dataset?', 'Not necessarily. We can define collection, annotation, and validation strategy before training.'],
      ],
    },
  },
  'custom-software': {
    slugs: { it: 'software-su-misura', en: 'custom-software-development' },
    serviceType: 'Custom Software Development',
    it: {
      title: 'Software su misura per processi che un prodotto standard non risolve',
      shortTitle: 'Software su misura',
      description: 'Applicazioni web, API e sistemi dati progettati attorno al tuo flusso operativo, senza vincolare il prodotto a una demo fragile.',
      audience: 'Per imprese e team che devono sostituire fogli, passaggi manuali o strumenti che non comunicano tra loro.',
      uses: ['Web app e portali operativi', 'API e integrazioni tra sistemi', 'Dashboard e strumenti interni', 'Modernizzazione di prototipi esistenti'],
      deliverables: ['Analisi del flusso e specifica tecnica', 'UX e vertical slice validabile', 'Applicazione testabile e documentata', 'Deployment, osservabilita e handover'],
      faq: [
        ['Realizzate anche solo un MVP?', 'Si, purche abbia un perimetro verificabile e una base tecnica che non debba essere buttata dopo la validazione.'],
        ['Chi gestisce il software dopo la consegna?', 'Possiamo seguirne l’evoluzione oppure trasferire codice, infrastruttura e documentazione al team interno.'],
      ],
    },
    en: {
      title: 'Custom software for workflows an off-the-shelf product cannot solve',
      shortTitle: 'Custom software',
      description: 'Web applications, APIs, and data systems designed around your operation, without locking the product into a fragile demo.',
      audience: 'For companies and teams replacing spreadsheets, manual handoffs, or tools that do not communicate.',
      uses: ['Web apps and operational portals', 'APIs and system integrations', 'Dashboards and internal tools', 'Modernization of existing prototypes'],
      deliverables: ['Workflow analysis and technical specification', 'UX and testable vertical slice', 'Documented, testable application', 'Deployment, observability, and handover'],
      faq: [
        ['Can you build only an MVP?', 'Yes, provided it has a testable scope and a technical base that will not need to be discarded after validation.'],
        ['Who manages the software after delivery?', 'We can continue its evolution or transfer code, infrastructure, and documentation to your internal team.'],
      ],
    },
  },
  'startup-ai': {
    slugs: { it: 'ai-per-startup', en: 'ai-development-for-startups' },
    serviceType: 'AI Development for Startups',
    it: {
      title: 'AI per startup: validare il rischio tecnico prima di scalare il prodotto',
      shortTitle: 'AI per startup',
      description: 'Affianchiamo founder e team early-stage per trasformare un’ipotesi AI in un MVP misurabile, con costi e limiti espliciti.',
      audience: 'Per startup che devono dimostrare fattibilità, arrivare a una demo credibile o preparare una base solida per il team engineering.',
      uses: ['Discovery e scoping tecnico', 'MVP e proof of concept AI', 'Valutazione make-or-buy', 'Preparazione al passaggio di scala'],
      deliverables: ['Ipotesi e metriche di validazione', 'Prototipo end-to-end', 'Stima di costi, latenza e qualità', 'Backlog tecnico e piano di handover'],
      faq: [
        ['Potete partire da un pitch o da un’idea?', 'Sì. La traduciamo in assunzioni verificabili, dati necessari e un perimetro tecnico che possa essere dimostrato.'],
        ['L’MVP sarà pronto per scalare?', 'Progettiamo una base evolvibile, ma distinguiamo chiaramente ciò che serve a validare da ciò che serve a scalare.'],
      ],
    },
    en: {
      title: 'AI for startups: validate technical risk before scaling the product',
      shortTitle: 'AI for startups',
      description: 'We work with founders and early-stage teams to turn an AI hypothesis into a measurable MVP with explicit costs and limits.',
      audience: 'For startups proving feasibility, building a credible demo, or preparing a solid foundation for an engineering team.',
      uses: ['Technical discovery and scoping', 'AI MVPs and proofs of concept', 'Make-or-buy assessment', 'Preparation for scale'],
      deliverables: ['Validation assumptions and metrics', 'End-to-end prototype', 'Cost, latency, and quality estimate', 'Technical backlog and handover plan'],
      faq: [
        ['Can you start from a pitch or an idea?', 'Yes. We translate it into testable assumptions, required data, and a technical scope that can be demonstrated.'],
        ['Will the MVP be ready to scale?', 'We design an evolvable base while clearly separating what validates the idea from what is required at scale.'],
      ],
    },
  },
};

export function getService(key, locale) {
  const service = services[key];
  return { ...service, ...service[locale], process: sharedProcess[locale] };
}

export function servicePath(key, locale) {
  return `/${locale}/${services[key].slugs[locale]}`;
}
