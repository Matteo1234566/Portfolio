export const caseStudies = {
  ailights: {
    services: ['computer-vision', 'startup-ai'],
    it: {
      name: 'AiLights',
      summary: 'Una piattaforma di produzione video sportiva automatizzata che unisce regia, streaming, highlight e analytics.',
      problem: 'Portare capacità video normalmente riservate ai grandi eventi in club e impianti locali, senza richiedere una troupe dedicata.',
      context: ['Flussi video continui e vincoli real-time', 'Sport e inquadrature con dinamiche diverse', 'Esperienza utilizzabile da operatori non tecnici'],
      role: 'Product framing, architettura computer vision, pipeline video, prodotto full-stack e percorso di deployment.',
      architecture: ['Acquisizione video', 'Rilevamento e tracking', 'Logica di regia automatica', 'Streaming, highlight e analytics'],
      evidence: ['Un flusso end-to-end definito dalla camera all’output', 'Moduli distinti per calcio, futsal, tennis e padel', 'Un prodotto pensato per club, gestori di impianti e media locali'],
      reusable: 'Lo stesso approccio è applicabile a sorveglianza, ispezione, monitoraggio e qualsiasi pipeline video che debba diventare un prodotto operativo.',
    },
    en: {
      name: 'AiLights',
      summary: 'An automated sports video production platform combining direction, streaming, highlights, and analytics.',
      problem: 'Bring video capabilities usually reserved for major events to local clubs and venues without requiring a dedicated crew.',
      context: ['Continuous video streams and real-time constraints', 'Sports and framing patterns with different dynamics', 'An experience usable by non-technical operators'],
      role: 'Product framing, computer-vision architecture, video pipeline, full-stack product, and deployment path.',
      architecture: ['Video acquisition', 'Detection and tracking', 'Automated direction logic', 'Streaming, highlights, and analytics'],
      evidence: ['A defined end-to-end path from camera to output', 'Distinct modules for football, futsal, tennis, and padel', 'A product shaped for clubs, venue operators, and local media'],
      reusable: 'The same approach applies to surveillance, inspection, monitoring, and any video pipeline that must become an operational product.',
    },
  },
  screeba: {
    services: ['ai-consulting', 'startup-ai', 'custom-software'],
    it: {
      name: 'Screeba',
      summary: 'Un prodotto AI che trasforma registrazioni di lezioni in appunti Word strutturati e pronti da studiare.',
      problem: 'Ridurre il lavoro manuale di sbobinatura senza consegnare agli studenti una trascrizione grezza e difficile da usare.',
      context: ['Audio di qualità e durata variabili', 'Terminologia specifica per corso o materia', 'Output DOCX leggibile, modificabile e stampabile'],
      role: 'Definizione del flusso prodotto, orchestrazione della trascrizione, pulizia e strutturazione del testo, UX e generazione documenti.',
      architecture: ['Upload e validazione audio', 'Contesto didattico', 'Trascrizione AI e pulizia', 'Composizione ed esportazione DOCX'],
      evidence: ['Una pipeline completa dall’audio al documento', 'Gestione esplicita di formati, qualità e stati di errore', 'Output orientato allo studio anziché alla sola trascrizione'],
      reusable: 'Il pattern può automatizzare verbali, interviste, note operative e altri flussi audio-to-document con formati controllati.',
    },
    en: {
      name: 'Screeba',
      summary: 'An AI product that turns lecture recordings into structured Word notes ready for study.',
      problem: 'Reduce manual transcription work without handing students a raw transcript that is difficult to use.',
      context: ['Audio with variable quality and duration', 'Course- or subject-specific terminology', 'Readable, editable, and printable DOCX output'],
      role: 'Product-flow definition, transcription orchestration, text cleaning and structuring, UX, and document generation.',
      architecture: ['Audio upload and validation', 'Learning context', 'AI transcription and cleaning', 'DOCX composition and export'],
      evidence: ['A complete pipeline from audio to document', 'Explicit handling of formats, quality, and error states', 'Output designed for studying rather than transcription alone'],
      reusable: 'The pattern can automate minutes, interviews, operational notes, and other audio-to-document workflows with controlled formats.',
    },
  },
  mirror: {
    services: ['ai-consulting', 'custom-software'],
    it: {
      name: 'Mirror',
      summary: 'Una piattaforma Data Ops che rende l’open data ISTAT più accessibile tramite documentazione, API, ricerca e interfacce guidate.',
      problem: 'I dati sono pubblici, ma portali frammentati, formati SDMX e interfacce multidimensionali ne rendono difficile l’uso.',
      context: ['Ecosistema di fonti e formati eterogenei', 'Utenti tecnici e non tecnici', 'Necessità di preservare provenienza e significato statistico'],
      role: 'Analisi del dominio, architettura dei dati e delle API, documentazione developer, dataset browser e livello di interrogazione assistita.',
      architecture: ['Ingestion e normalizzazione', 'Catalogo e metadati', 'REST API e documentazione', 'Browser, visualizzazioni e query in linguaggio naturale'],
      evidence: ['Roadmap separata tra fondamenta developer e prodotto utente', 'Accesso previsto via API, Postman e interfaccia web', 'Un modello coerente per esplorare migliaia di dataset pubblici'],
      reusable: 'L’architettura si applica a cataloghi aziendali, knowledge base e patrimoni dati frammentati che devono diventare interrogabili.',
    },
    en: {
      name: 'Mirror',
      summary: 'A Data Ops platform making ISTAT open data easier to use through documentation, APIs, search, and guided interfaces.',
      problem: 'The data is public, but fragmented portals, SDMX formats, and multidimensional interfaces make it difficult to use.',
      context: ['An ecosystem of heterogeneous sources and formats', 'Technical and non-technical users', 'A need to preserve provenance and statistical meaning'],
      role: 'Domain analysis, data and API architecture, developer documentation, dataset browser, and assisted-query layer.',
      architecture: ['Ingestion and normalization', 'Catalog and metadata', 'REST API and documentation', 'Browser, visualization, and natural-language queries'],
      evidence: ['A roadmap separating developer foundations from the user product', 'Access designed through API, Postman, and a web interface', 'A coherent model for exploring thousands of public datasets'],
      reusable: 'The architecture applies to enterprise catalogs, knowledge bases, and fragmented data estates that need to become queryable.',
    },
  },
  twosequel: {
    services: ['ai-consulting', 'custom-software'],
    it: {
      name: '2Sequel',
      summary: 'Un’interfaccia enterprise text-to-SQL progettata per rendere i dati interrogabili senza rinunciare a controllo e auditabilità.',
      problem: 'Consentire anche ai ruoli non tecnici di interrogare database aziendali senza creare query non autorizzate o poco verificabili.',
      context: ['Schemi e metadati aziendali complessi', 'Permessi diversi per ruolo e campo', 'Compatibilità con più motori SQL'],
      role: 'Architettura del flusso LLM, grounding sui metadati, controlli di autorizzazione, UX di interrogazione e tracciamento delle query.',
      architecture: ['Intento in linguaggio naturale', 'Recupero di schema e contesto', 'Generazione SQL vincolata', 'Validazione, esecuzione e audit trail'],
      evidence: ['Supporto progettato per Postgres, MySQL e SQL Server', 'Controlli field-level e data masking nel modello di sicurezza', 'Query spiegabili e tracciabili come requisito di prodotto'],
      reusable: 'Lo stesso schema consente di costruire copiloti dati e assistenti interni che operano entro permessi e fonti controllate.',
    },
    en: {
      name: '2Sequel',
      summary: 'An enterprise text-to-SQL interface designed to make data queryable without giving up control or auditability.',
      problem: 'Let non-technical roles query company databases without creating unauthorized or opaque queries.',
      context: ['Complex enterprise schemas and metadata', 'Different permissions by role and field', 'Compatibility with multiple SQL engines'],
      role: 'LLM-flow architecture, metadata grounding, authorization controls, query UX, and query tracing.',
      architecture: ['Natural-language intent', 'Schema and context retrieval', 'Constrained SQL generation', 'Validation, execution, and audit trail'],
      evidence: ['Designed support for Postgres, MySQL, and SQL Server', 'Field-level controls and data masking in the security model', 'Explainable and traceable queries as a product requirement'],
      reusable: 'The same design supports data copilots and internal assistants operating within controlled permissions and sources.',
    },
  },
  targage: {
    services: ['computer-vision', 'custom-software'],
    it: {
      name: 'Targage',
      summary: 'Un layer di computer vision che rende ricercabili per targa i flussi video di garage e parcheggi esistenti.',
      problem: 'Evitare ore di revisione manuale dei filmati quando un operatore deve ricostruire un ingresso, un’uscita o una contestazione.',
      context: ['Infrastruttura DVR/NVR già installata', 'Flussi ONVIF/RTSP e hardware eterogeneo', 'Dati sensibili da trattare in ambienti controllati'],
      role: 'Analisi del workflow, pipeline di rilevamento e OCR, indice temporale, ricerca operativa e architettura di deployment locale.',
      architecture: ['Ingestion dei flussi', 'Plate detection e OCR', 'Indicizzazione temporale', 'Ricerca targa e recupero clip'],
      evidence: ['Integrazione pensata sopra l’infrastruttura esistente', 'Demo interattiva del percorso di ricerca', 'Deployment locale e tracciabilità considerati fin dall’architettura'],
      reusable: 'Il pattern è replicabile per ispezione, sicurezza e ricerca eventi in archivi video senza sostituire l’hardware sul campo.',
    },
    en: {
      name: 'Targage',
      summary: 'A computer-vision layer that makes existing garage and parking video streams searchable by license plate.',
      problem: 'Avoid hours of manual footage review when an operator must reconstruct an entry, exit, or dispute.',
      context: ['Existing DVR/NVR infrastructure', 'Heterogeneous ONVIF/RTSP streams and hardware', 'Sensitive data requiring controlled environments'],
      role: 'Workflow analysis, detection and OCR pipeline, temporal index, operational search, and local-deployment architecture.',
      architecture: ['Stream ingestion', 'Plate detection and OCR', 'Temporal indexing', 'Plate search and clip retrieval'],
      evidence: ['Integration designed around existing infrastructure', 'An interactive demonstration of the search path', 'Local deployment and traceability considered from the architecture stage'],
      reusable: 'The pattern is reusable for inspection, security, and event search in video archives without replacing field hardware.',
    },
  },
};

export function getCaseStudy(key, locale) {
  return { key, ...caseStudies[key], ...caseStudies[key][locale] };
}

export function getServiceCaseStudies(serviceKey, locale) {
  return Object.keys(caseStudies)
    .filter((key) => caseStudies[key].services.includes(serviceKey))
    .map((key) => getCaseStudy(key, locale));
}
