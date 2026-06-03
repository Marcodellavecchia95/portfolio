// ─── Project data ────────────────────────────────────────────────────────────
// Ogni progetto ha i campi "card" (home) + un oggetto `detail` (pagina dedicata).
// I campi testuali sono bilingui: { it: "...", en: "..." }. Usa pick(value, lang)
// (da ../i18n.jsx) per leggere il valore nella lingua corrente.

export const projects = [
  {
    slug: "sushi-sales",
    title: "Sushi Sales — AI Outbound Engine",
    status: "BETA",
    statusClass: "text-primary bg-primary/10 border-primary/20",
    hoverBorder: "hover:border-primary/40",
    desc: {
      it: "Piattaforma end-to-end di vendita outbound B2B AI-driven: dal CSV grezzo di Sales Navigator ad aziende arricchite e scorate, ricerca dei decision maker, waterfall email/LinkedIn, icebreaker personalizzati generati da LLM, sequenze multi-touchpoint orchestrate, fino al reply detection e handoff all'operatore umano. Monolite Laravel 12 + Vue 3/Inertia con sidecar NLP Python FastAPI e pipeline a coda.",
      en: "End-to-end AI-driven B2B outbound sales platform: from raw Sales Navigator CSV to enriched & scored companies, decision-maker lookup, email/LinkedIn waterfall, LLM-generated personalized icebreakers, orchestrated multi-touchpoint sequences, through reply detection and human handoff. Laravel 12 + Vue 3/Inertia monolith with a Python FastAPI NLP sidecar and a queue-driven pipeline.",
    },
    tags: ["#PHP8.2", "#Laravel12", "#Vue3", "#FastAPI", "#Python", "#NeuronAI", "#Horizon"],
    links: [],
    screenshots: ["/img/sushi1.png", "/img/sushi2.png", "/img/sushi3.png", "/img/sushi4.png"],
    detail: {
      role: { it: "AI Engineering / Full-stack", en: "AI Engineering / Full-stack" },
      year: "2026",
      tagline: {
        it: "Un operatore umano gestisce 10× account: la piattaforma automatizza l'intero ciclo outbound tranne ciò che richiede giudizio umano.",
        en: "One human operator runs 10× the accounts: the platform automates the entire outbound cycle except what needs human judgement.",
      },
      intro: {
        it: "Sushi Sales è una piattaforma multi-tenant che esegue l'intero ciclo di vendita outbound per un'agenzia. Il percorso è completo: import del CSV di Sales Navigator → arricchimento e scoring delle aziende → ricerca multi-decision-maker → waterfall email/LinkedIn → icebreaker personalizzati generati da AI → sequenze multi-touchpoint orchestrate → reply detection e handoff all'umano. L'agenzia automatizza tutto tranne le parti che richiedono giudizio: template iniziale, gestione delle risposte reali, call e demo.",
        en: "Sushi Sales is a multi-tenant platform that runs an agency's full outbound sales cycle. The path is complete: Sales Navigator CSV import → company enrichment and scoring → multi-decision-maker lookup → email/LinkedIn waterfall → AI-generated personalized icebreakers → orchestrated multi-touchpoint sequences → reply detection and human handoff. The agency automates everything except the parts that need judgement: the initial template, real reply handling, calls and demos.",
      },
      problem: {
        it: "Le agenzie di vendita sprecano oltre il 70% del tempo degli operatori in lavoro outbound ripetitivo: arricchimento, scoring, ricerca prospect, validazione email, personalizzazione copy, scheduling, tracking dei follow-up. La piattaforma automatizza tutto questo, mantenendo l'umano solo dove serve davvero. Risultato: un operatore gestisce 10× gli account con qualità delle risposte più alta.",
        en: "Sales agencies waste 70%+ of operator time on repetitive outbound work: enrichment, scoring, prospect finding, email validation, copy personalization, scheduling, follow-up tracking. The platform automates all of it, keeping the human only where it truly matters. Result: one operator manages 10× the accounts at higher reply quality.",
      },
      architecture: {
        it: "Monolite Laravel 12 + Vue 3/Inertia con Horizon per le code, affiancato da un sidecar NLP in Python (FastAPI, spaCy, KeyBERT, sentence-transformers) che espone endpoint /extract e /embed: il PHP lo chiama via HTTP, tenendo Laravel libero da dipendenze ML pesanti.\n\nLa pipeline è guidata dalle code: ogni stadio è un job Laravel idempotente e ritentabile, dispatchato sulle transizioni di stato di aziende/contatti — import CSV, arricchimento Apollo, profiling tech-stack (BuiltWith/DetectZeStack), scoring, ricerca key player, waterfall email, costruzione dossier, orchestrazione sequenze, reply detection.\n\nLo scoring è ibrido per design: l'LLM estrae 3 fatti binari (fit, strutturale, trigger), poi uno scorer deterministico in Python calcola un punteggio 1–5. L'LLM estrae i fatti, il codice calcola il numero — output verificabile e non allucinato.\n\nL'orchestrazione AI usa agenti Neuron AI con un registro di tool tipizzati: ogni tool incapsula un'API esterna con schema rigido, e gli agenti li compongono per task (scoring agent vs dossier agent vs reply classifier). Ogni chiamata LLM è registrata in AiRun (prompt, risposta, costo, latenza) per audit e cost tracking.",
        en: "A Laravel 12 + Vue 3/Inertia monolith with Horizon for queues, paired with a Python NLP sidecar (FastAPI, spaCy, KeyBERT, sentence-transformers) exposing /extract and /embed endpoints: PHP calls it over HTTP, keeping Laravel free of heavy ML deps.\n\nThe pipeline is queue-driven: each stage is an idempotent, retryable Laravel job dispatched on company/contact state transitions — CSV import, Apollo enrichment, tech-stack profiling (BuiltWith/DetectZeStack), scoring, key-player lookup, email waterfall, dossier building, sequence orchestration, reply detection.\n\nScoring is hybrid by design: the LLM extracts 3 binary facts (fit, structural, trigger), then a deterministic Python scorer computes a 1–5 score. The LLM extracts the facts, code computes the number — verifiable, non-hallucinated output.\n\nAI orchestration uses Neuron AI agents with a typed tool registry: each tool wraps an external API with a strict schema, and agents compose them per task (scoring agent vs dossier agent vs reply classifier). Every LLM call is recorded in AiRun (prompt, response, cost, latency) for audit and cost tracking.",
      },
      highlights: [
        {
          title: { it: "Scoring ibrido LLM + deterministico", en: "Hybrid LLM + deterministic scoring" },
          body: {
            it: "L'LLM estrae solo fatti binari, lo scorer Python calcola il punteggio 1–5. Il numero non è mai allucinato: separa il giudizio linguistico dal calcolo verificabile.",
            en: "The LLM only extracts binary facts; the Python scorer computes the 1–5 score. The number is never hallucinated: it separates linguistic judgement from verifiable computation.",
          },
        },
        {
          title: { it: "Pipeline a code idempotente", en: "Idempotent queue pipeline" },
          body: {
            it: "Ogni stadio è un job Laravel/Horizon idempotente, ritentabile e tenant-scoped, dispatchato sulle transizioni di stato. State machine, retry e throttling per inbox.",
            en: "Each stage is an idempotent, retryable, tenant-scoped Laravel/Horizon job dispatched on state transitions. State machines, retries and per-inbox throttling.",
          },
        },
        {
          title: { it: "Architettura poliglotta", en: "Polyglot architecture" },
          body: {
            it: "Monolite PHP + sidecar Python su HTTP: ogni linguaggio nella sua zona di forza. Laravel per l'orchestrazione, FastAPI/spaCy per l'NLP pesante.",
            en: "PHP monolith + Python sidecar over HTTP: each language in its strength zone. Laravel for orchestration, FastAPI/spaCy for heavy NLP.",
          },
        },
        {
          title: { it: "Email waterfall + validazione", en: "Email waterfall + validation" },
          body: {
            it: "Apollo → pattern guess → validazione SMTP NeverBounce, con routing del contatto su email_first o linkedin_only. Mai un invio a indirizzo non validato.",
            en: "Apollo → pattern guess → NeverBounce SMTP validation, routing the contact to email_first or linkedin_only. Never a send to an unvalidated address.",
          },
        },
        {
          title: { it: "Orchestrazione multi-canale", en: "Multi-channel orchestration" },
          body: {
            it: "StepScheduler calcola lo slot di invio per contatto considerando timezone, orari lavorativi e suppression (spatie/opening-hours). Cadenza Email → LinkedIn → follow-up → call.",
            en: "StepScheduler computes the send slot per contact considering timezone, working hours and suppression (spatie/opening-hours). Email → LinkedIn → follow-up → call cadence.",
          },
        },
        {
          title: { it: "Compliance & multi-tenancy", en: "Compliance & multi-tenancy" },
          body: {
            it: "Suppression GDPR, token di unsubscribe firmati, ComplianceEvent log e isolamento dati per tenant (Tenant + Spatie Permission). Ogni job/query è tenant-scoped.",
            en: "GDPR suppression, signed unsubscribe tokens, ComplianceEvent log and per-tenant data isolation (Tenant + Spatie Permission). Every job/query is tenant-scoped.",
          },
        },
      ],
      stack: [
        { tech: "PHP 8.2 + Laravel 12", why: { it: "Monolite applicativo, orchestrazione e dominio", en: "Application monolith, orchestration and domain" } },
        { tech: "Horizon (queues)", why: { it: "Pipeline a code: job idempotenti, retry, throttling", en: "Queue pipeline: idempotent jobs, retries, throttling" } },
        { tech: "Vue 3 + Inertia + Tailwind v4", why: { it: "Cockpit operatore: viste aziende, contatti, campagne", en: "Operator cockpit: companies, contacts, campaign views" } },
        { tech: "Python + FastAPI", why: { it: "Sidecar NLP (spaCy, KeyBERT, embeddings) via HTTP", en: "NLP sidecar (spaCy, KeyBERT, embeddings) over HTTP" } },
        { tech: "Neuron AI", why: { it: "Agenti + registro di tool tipizzati per orchestrare gli LLM", en: "Agents + typed tool registry to orchestrate the LLMs" } },
        { tech: "Apollo / NeverBounce / Instantly / HeyReach", why: { it: "Adapter verso 7+ servizi esterni dietro classi pulite", en: "Adapters to 7+ external services behind clean classes" } },
        { tech: "MySQL", why: { it: "Persistenza del dominio multi-tenant", en: "Multi-tenant domain persistence" } },
      ],
      metrics: [
        { value: "10×", label: { it: "account per operatore", en: "accounts per operator" } },
        { value: "7+", label: { it: "servizi esterni integrati", en: "external services integrated" } },
        { value: "~10", label: { it: "stadi di pipeline a code", en: "queue pipeline stages" } },
        { value: "1–5", label: { it: "scoring LLM + Python", en: "LLM + Python scoring" } },
      ],
      deepDive: {
        it: "Il pezzo di ingegneria più interessante è la divisione del lavoro tra LLM e codice deterministico. Nello scoring, l'LLM non produce mai direttamente il punteggio — estrae solo 3 fatti binari (l'azienda è in target? ha la struttura giusta? c'è un trigger event?), e uno scorer Python combina questi fatti con pesi calibrabili per produrre un 1–5. Questo rende l'output auditabile e stabile: lo stesso insieme di fatti dà sempre lo stesso punteggio, e i pesi si ricalibrano col feedback loop dagli esiti CRM. Lo stesso principio guida il dossier (l'AI sceglie il miglior angolo tra 5 per l'icebreaker) e il reply detection (email-reply-parser + classificatore: gli out-of-office rischedulano, le risposte reali mettono in pausa la sequenza e allertano l'umano). Ogni chiamata LLM finisce in AiRun con costo e latenza, così l'intera spesa AI è tracciabile per tenant.",
        en: "The most interesting engineering piece is the division of labor between LLM and deterministic code. In scoring, the LLM never produces the score directly — it only extracts 3 binary facts (is the company in target? does it have the right structure? is there a trigger event?), and a Python scorer combines these facts with calibratable weights to produce a 1–5. This makes the output auditable and stable: the same set of facts always yields the same score, and weights recalibrate via the feedback loop from CRM outcomes. The same principle drives the dossier (the AI picks the best of 5 angles for the icebreaker) and reply detection (email-reply-parser + classifier: out-of-office reschedules, real replies pause the sequence and alert the human). Every LLM call lands in AiRun with cost and latency, so the entire AI spend is traceable per tenant.",
      },
    },
  },
  {
    slug: "wink-admin-agent",
    title: "Wink Suite — AI Admin Agent",
    status: "BETA",
    statusClass: "text-primary bg-primary/10 border-primary/20",
    hoverBorder: "hover:border-primary/40",
    desc: {
      it: "Copilota AI in-app per Wink Suite (SaaS marketing engagement multi-tenant): gli admin gestiscono iniziative, plugin, utenti e analytics in linguaggio naturale, riducendo l'onboarding da ore a minuti. Agente PHP-native su Neuron AI con 8 tool tipizzati, approval gate Human-in-the-Loop server-side, isolamento per tenant strutturale e provider LLM intercambiabile cloud/on-prem.",
      en: "In-app AI copilot for Wink Suite (multi-tenant marketing-engagement SaaS): admins run initiatives, plugins, users and analytics in natural language, cutting onboarding from hours to minutes. PHP-native agent on Neuron AI with 8 typed tools, server-side Human-in-the-Loop approval gate, structural per-tenant isolation and a swappable cloud/on-prem LLM provider.",
    },
    tags: ["#PHP8.2", "#Laravel11", "#NeuronAI", "#Vue3", "#Inertia", "#DeepSeek", "#Ollama"],
    links: [],
    screenshots: ["/img/wink1.png", "/img/wink2.png", "/img/wink3.png", "/img/wink4.png"],
    detail: {
      role: { it: "AI Engineering / Full-stack", en: "AI Engineering / Full-stack" },
      year: "2026",
      tagline: {
        it: "Un copilota AI che esegue operazioni di piattaforma in linguaggio naturale — interamente in PHP, senza sidecar Python.",
        en: "An AI copilot that runs platform operations in natural language — entirely in PHP, no Python sidecar.",
      },
      intro: {
        it: "Wink Suite è un SaaS multi-tenant di marketing engagement (campagne gamificate, instant-win, loyalty, punti, redemption) costruito su Laravel + Inertia + Vue 3. Il Wink Admin Agent è un copilota AI in-app che permette agli admin di workspace di pilotare la piattaforma a voce: configurare iniziative, gestire modalità e plugin, interrogare analytics, generare dati demo, modificare widget e amministrare utenti — tutto via chat.",
        en: "Wink Suite is a multi-tenant marketing-engagement SaaS (gamified campaigns, instant-win, loyalty, points, redemption) built on Laravel + Inertia + Vue 3. The Wink Admin Agent is an in-app AI copilot that lets workspace admins drive the platform conversationally: configure initiatives, manage modalities and plugins, query analytics, seed demo data, edit widgets and manage users — all through chat.",
      },
      problem: {
        it: "La superficie admin di una piattaforma di engagement è enorme: decine di plugin, modalità, regole punti, impostazioni campagna, matrici di ruoli e permessi. Onboardare un nuovo tenant admin richiedeva ore di click. L'agente collassa tutto in una conversazione: \"imposta la soglia di redemption a 500 pt, abilita il plugin instant-win, genera 50 utenti demo\" — eseguito, con approvazione umana sulle operazioni distruttive.",
        en: "The admin surface of an engagement platform is huge: dozens of plugins, modalities, points rules, campaign settings, role/permission matrices. Onboarding a new tenant admin took hours of clicking. The agent collapses it into a conversation: \"set the redemption threshold to 500 pts, enable the instant-win plugin, seed 50 demo users\" — executed, with human approval on destructive operations.",
      },
      architecture: {
        it: "Il cuore è un agente PHP-native sul framework Neuron AI (neuron-core/neuron-ai). La classe custom WinkAdminAgent estende NeuronAI\\Agent\\Agent e inietta il contesto dell'iniziativa corrente, così l'agente vede e tocca solo i dati del tenant attivo.\n\nIl provider LLM è pluggable: DeepSeek (cloud, deepseek-chat) oppure Ollama locale (llama3.1:8b), commutabile via env AI_PROVIDER senza toccare il codice dell'agente. Lo stesso loop gira quindi sia in cloud che in ambiente air-gapped.\n\nIl layer di sicurezza è difensivo a più livelli: l'ApprovalGate intercetta server-side ogni tool distruttivo (delete utenti, reset demo, overwrite settings) e richiede approvazione esplicita prima dell'esecuzione, a prescindere dall'intento dell'LLM — difesa diretta contro la prompt injection. Il middleware EnsureAIAccess gatekeepa le route AI per ruolo + feature flag per tenant. ToolResultCache memoizza i risultati dei tool read-only per tagliare i round-trip verso l'LLM.",
        en: "At the core is a PHP-native agent on the Neuron AI framework (neuron-core/neuron-ai). The custom WinkAdminAgent class extends NeuronAI\\Agent\\Agent and injects the current initiative's context, so the agent only sees and touches the active tenant's data.\n\nThe LLM provider is pluggable: DeepSeek (cloud, deepseek-chat) or local Ollama (llama3.1:8b), switched via the AI_PROVIDER env without touching agent code. The same loop runs both in the cloud and in an air-gapped environment.\n\nThe safety layer is defense-in-depth: the ApprovalGate intercepts every destructive tool server-side (user delete, demo reset, settings overwrite) and requires explicit approval before execution, regardless of the LLM's intent — a direct defense against prompt injection. The EnsureAIAccess middleware gatekeeps AI routes by role + per-tenant feature flag. ToolResultCache memoizes read-only tool results to cut LLM round-trips.",
      },
      highlights: [
        {
          title: { it: "LLM agent PHP-native", en: "PHP-native LLM agent" },
          body: {
            it: "Nessun sidecar Python/Node: l'intero loop dell'agente gira dentro il processo Laravel via Neuron AI. Meno superficie operativa, deploy unico.",
            en: "No Python/Node sidecar: the whole agent loop runs inside the Laravel process via Neuron AI. Less operational surface, a single deploy.",
          },
        },
        {
          title: { it: "Provider abstraction cloud/on-prem", en: "Cloud/on-prem provider abstraction" },
          body: {
            it: "Lo stesso codice gira su DeepSeek (cloud) o Ollama (locale, air-gapped). Swap config-driven, zero modifiche al codice — utile per clienti con vincoli di data residency.",
            en: "The same code runs on DeepSeek (cloud) or Ollama (local, air-gapped). Config-driven swap, zero code changes — useful for clients with data-residency constraints.",
          },
        },
        {
          title: { it: "Human-in-the-Loop by design", en: "Human-in-the-Loop by design" },
          body: {
            it: "Ogni tool dichiara se richiede approvazione; il gate la impone lato server indipendentemente da cosa decide l'LLM. Defense-in-depth contro la prompt injection.",
            en: "Every tool declares whether it needs approval; the gate enforces it server-side regardless of what the LLM decides. Defense-in-depth against prompt injection.",
          },
        },
        {
          title: { it: "Isolamento multi-tenant strutturale", en: "Structural multi-tenant isolation" },
          body: {
            it: "L'agente è costruito con un contesto Initiative; i tool risolvono le query solo attraverso quello scope. Il leakage cross-tenant è impossibile by construction, non per convenzione.",
            en: "The agent is built with an Initiative context; tools resolve queries only through that scope. Cross-tenant leakage is impossible by construction, not by convention.",
          },
        },
        {
          title: { it: "Loop di self-improvement", en: "Self-improvement loop" },
          body: {
            it: "Il PatternStore registra triple (prompt, sequenza di tool, esito); i prompt futuri recuperano i top-k pattern simili come esempi few-shot in-context. Chiude un feedback loop senza fine-tuning.",
            en: "The PatternStore records (prompt, tool sequence, outcome) triples; future prompts retrieve the top-k similar patterns as in-context few-shot examples. Closes a feedback loop without fine-tuning.",
          },
        },
        {
          title: { it: "Strict typing", en: "Strict typing" },
          body: {
            it: "declare(strict_types=1), argomenti dei tool tipizzati, codebase PHPStan-friendly.",
            en: "declare(strict_types=1), typed tool arguments, PHPStan-friendly codebase.",
          },
        },
      ],
      stack: [
        { tech: "PHP 8.2 + Laravel 11", why: { it: "Runtime e framework della piattaforma; l'agente vive nello stesso processo", en: "Platform runtime and framework; the agent lives in the same process" } },
        { tech: "Neuron AI SDK", why: { it: "Framework agentico PHP-native: loop, tool calling, memoria", en: "PHP-native agentic framework: loop, tool calling, memory" } },
        { tech: "Vue 3 + Inertia", why: { it: "AIChat.vue: chat streaming, visualizzazione tool-call, modali di approvazione inline", en: "AIChat.vue: streaming chat, tool-call visualization, inline approval modals" } },
        { tech: "DeepSeek / Ollama", why: { it: "Due backend LLM (cloud + locale) dietro un'unica interfaccia", en: "Two LLM backends (cloud + local) behind one interface" } },
      ],
      metrics: [
        { value: "8", label: { it: "tool tipizzati", en: "typed tools" } },
        { value: "2", label: { it: "backend LLM (cloud + locale)", en: "LLM backends (cloud + local)" } },
        { value: "~750", label: { it: "LoC solo per HITL + access layer", en: "LoC for HITL + access layer alone" } },
        { value: "30/min", label: { it: "rate limit per utente", en: "rate limit per user" } },
      ],
      deepDive: {
        it: "Il dettaglio interessante è il modello di threat: un agente LLM con accesso a tool distruttivi è un bersaglio classico di prompt injection. La scelta architetturale è non fidarsi mai dell'intento dell'LLM. L'ApprovalGate è un pipeline server-side (~105 LoC) che, per ogni tool marcato come distruttivo, emette una richiesta di approvazione con diff/intent renderizzato nella UI; solo dopo il click dell'utente il tool esegue. Combinato con l'iniezione del contesto Initiative — che rende le query cross-tenant strutturalmente irrappresentabili — l'agente resta utile pur essendo confinato. La temperatura è pinnata a 0.3 per determinismo operativo e c'è un cap di 10 esecuzioni di tool per turno.",
        en: "The interesting detail is the threat model: an LLM agent with access to destructive tools is a classic prompt-injection target. The architectural choice is to never trust the LLM's intent. The ApprovalGate is a server-side pipeline (~105 LoC) that, for every tool marked destructive, emits an approval request with diff/intent rendered in the UI; only after the user clicks does the tool run. Combined with Initiative-context injection — which makes cross-tenant queries structurally unrepresentable — the agent stays useful while being boxed in. Temperature is pinned at 0.3 for operational determinism, with a cap of 10 tool runs per turn.",
      },
    },
  },
  {
    slug: "porta-un-amico-banco-desio",
    title: "Porta un Amico — Banco Desio",
    status: "LIVE",
    statusClass: "text-secondary bg-secondary/10 border-secondary/20",
    hoverBorder: "hover:border-secondary/40",
    desc: {
      it: "Piattaforma MGM (Member Get Member) per campagna referral Banco Desio. Registrazione con codice presentatore univoco, gestione premi voucher via API Jakala, pannello admin SPA con analytics real-time.",
      en: "MGM (Member-Get-Member) platform for Banco Desio's referral campaign. Sign-up with a unique referrer code, voucher reward handling via the Jakala API, SPA admin panel with real-time analytics.",
    },
    tags: ["#PHP", "#Vue.js", "#MySQL", "#REST_API", "#PHPMailer"],
    links: [{ label: "LIVE SITE", url: "https://portaunamico.bancodesio.it" }],
    screenshots: ["/img/bancodesio1.png", "/img/bancodesio2.png", "/img/bancodesio3.png"],
    detail: {
      role: { it: "Full-stack", en: "Full-stack" },
      year: "2025",
      tagline: {
        it: "Una piattaforma referral bancaria con tracciamento codice presentatore e premiazione voucher via API esterna.",
        en: "A banking referral platform with referrer-code tracking and voucher rewards via an external API.",
      },
      intro: {
        it: "Porta un Amico è la piattaforma Member-Get-Member di Banco Desio: un cliente esistente (presentatore) invita un amico, e al completamento dell'azione entrambi ricevono un premio. Il sistema gestisce l'intero funnel — registrazione con codice univoco, validazione, attribuzione del referral e consegna del voucher — con un pannello admin SPA per il monitoraggio in tempo reale.",
        en: "Porta un Amico is Banco Desio's Member-Get-Member platform: an existing customer (referrer) invites a friend, and on action completion both receive a reward. The system handles the full funnel — unique-code sign-up, validation, referral attribution and voucher delivery — with an SPA admin panel for real-time monitoring.",
      },
      problem: {
        it: "Una campagna referral bancaria ha requisiti stringenti: ogni invito deve essere attribuito senza ambiguità al presentatore corretto, i premi devono essere erogati una sola volta, e il flusso deve reggere picchi senza double-spending. Il tutto integrandosi con il provider premi esterno (Jakala).",
        en: "A banking referral campaign has strict requirements: every invite must be attributed unambiguously to the right referrer, rewards must be granted exactly once, and the flow must survive spikes without double-spending — all while integrating with the external reward provider (Jakala).",
      },
      architecture: {
        it: "Backend PHP con API REST che espone gli endpoint di registrazione, validazione codice e attribuzione. Ogni presentatore ha un codice univoco; alla registrazione dell'invitato il codice viene validato e il referral tracciato in MySQL con vincoli che prevengono attribuzioni duplicate.\n\nL'erogazione premi avviene via integrazione con le API Jakala: a evento completato il backend richiede il voucher e lo associa all'utente. PHPMailer gestisce le notifiche transazionali (conferma registrazione, premio disponibile).\n\nIl frontend è una SPA Vue.js per gli admin, con dashboard di analytics real-time sullo stato della campagna (inviti, conversioni, premi erogati).",
        en: "PHP backend with a REST API exposing sign-up, code-validation and attribution endpoints. Each referrer has a unique code; on invitee sign-up the code is validated and the referral tracked in MySQL with constraints that prevent duplicate attributions.\n\nReward delivery happens through the Jakala API integration: on event completion the backend requests the voucher and binds it to the user. PHPMailer handles transactional notifications (sign-up confirmation, reward available).\n\nThe frontend is a Vue.js SPA for admins, with a real-time analytics dashboard on campaign state (invites, conversions, rewards granted).",
      },
      highlights: [
        { title: { it: "Attribuzione referral affidabile", en: "Reliable referral attribution" }, body: { it: "Codice presentatore univoco + vincoli DB che rendono impossibili attribuzioni duplicate o premi erogati due volte.", en: "Unique referrer code + DB constraints that make duplicate attributions or double-granted rewards impossible." } },
        { title: { it: "Integrazione premi esterna", en: "External reward integration" }, body: { it: "Erogazione voucher via API Jakala, disaccoppiata dal flusso di registrazione.", en: "Voucher delivery via the Jakala API, decoupled from the sign-up flow." } },
        { title: { it: "Email transazionali", en: "Transactional email" }, body: { it: "PHPMailer per conferme e notifiche premio, separando il template dalla logica di business.", en: "PHPMailer for confirmations and reward notifications, separating templates from business logic." } },
        { title: { it: "Dashboard real-time", en: "Real-time dashboard" }, body: { it: "Pannello admin SPA con metriche di campagna aggiornate per il monitoraggio live.", en: "SPA admin panel with live campaign metrics for real-time monitoring." } },
      ],
      stack: [
        { tech: "PHP", why: { it: "Backend e API REST della piattaforma", en: "Platform backend and REST API" } },
        { tech: "Vue.js", why: { it: "SPA del pannello admin con analytics", en: "Admin-panel SPA with analytics" } },
        { tech: "MySQL", why: { it: "Persistenza referral con vincoli di integrità anti-duplicato", en: "Referral persistence with anti-duplicate integrity constraints" } },
        { tech: "API Jakala", why: { it: "Provider esterno per l'erogazione dei voucher premio", en: "External provider for voucher reward delivery" } },
        { tech: "PHPMailer", why: { it: "Email transazionali di conferma e notifica premio", en: "Transactional confirmation and reward emails" } },
      ],
      metrics: [
        { value: "LIVE", label: { it: "in produzione", en: "in production" } },
        { value: "1:1", label: { it: "attribuzione presentatore → invitato", en: "referrer → invitee attribution" } },
      ],
      deepDive: {
        it: "Il nodo tecnico è l'idempotenza dell'erogazione premi: tra il completamento dell'azione e la risposta dell'API esterna possono esserci retry, timeout e doppi click. La soluzione combina vincoli di unicità a livello DB con uno stato esplicito sul referral, così che una seconda richiesta per lo stesso evento non generi mai un secondo voucher.",
        en: "The technical crux is reward-delivery idempotency: between action completion and the external API's response there can be retries, timeouts and double clicks. The solution combines DB-level uniqueness constraints with an explicit state on the referral, so a second request for the same event never produces a second voucher.",
      },
    },
  },
  {
    slug: "tuttipremiati",
    title: "TuttiPremiati",
    status: "LIVE",
    statusClass: "text-secondary bg-secondary/10 border-secondary/20",
    hoverBorder: "hover:border-secondary/40",
    desc: {
      it: "Migrazione completa da stack legacy .NET/SSIS a Laravel 11 + Vue 3. Architettura backend/frontend separata, autenticazione Sanctum/Fortify, import SFTP/Excel e UI moderna con PrimeVue.",
      en: "Full migration from a legacy .NET/SSIS stack to Laravel 11 + Vue 3. Decoupled backend/frontend architecture, Sanctum/Fortify auth, SFTP/Excel ingestion and a modern PrimeVue UI.",
    },
    tags: ["#Laravel", "#Vue3", "#PHP8", "#Sanctum", "#PrimeVue", "#Tailwind"],
    links: [{ label: "LIVE SITE", url: "https://tuttipremiati.it" }],
    screenshots: ["/img/tuttipremiati1.png", "/img/tuttipremiati2.png", "/img/tuttipremiati3.png"],
    detail: {
      role: { it: "Full-stack", en: "Full-stack" },
      year: "2025",
      tagline: {
        it: "Replatforming completo di un sistema loyalty da .NET/SSIS a uno stack Laravel 11 + Vue 3 disaccoppiato.",
        en: "Full replatforming of a loyalty system from .NET/SSIS to a decoupled Laravel 11 + Vue 3 stack.",
      },
      intro: {
        it: "TuttiPremiati è un programma loyalty migrato da uno stack legacy basato su .NET e pipeline SSIS a un'architettura moderna Laravel 11 + Vue 3. L'obiettivo: mantenere la continuità del servizio e dei dati storici, modernizzando manutenibilità, sicurezza e UX.",
        en: "TuttiPremiati is a loyalty program migrated from a legacy stack built on .NET and SSIS pipelines to a modern Laravel 11 + Vue 3 architecture. The goal: preserve service continuity and historical data while modernizing maintainability, security and UX.",
      },
      problem: {
        it: "I sistemi legacy con ETL in SSIS sono fragili da evolvere: logica sparsa tra database, package SSIS e applicazione, con import dati che girano su schedule opachi. Riportare tutto su uno stack PHP moderno significava ricostruire l'ingestione dati, l'autenticazione e l'intera UI senza perdere i flussi esistenti.",
        en: "Legacy systems with SSIS ETL are brittle to evolve: logic scattered across the database, SSIS packages and the application, with data imports running on opaque schedules. Moving everything onto a modern PHP stack meant rebuilding data ingestion, authentication and the whole UI without losing existing flows.",
      },
      architecture: {
        it: "Architettura disaccoppiata: backend Laravel 11 come API, frontend Vue 3 separato. L'autenticazione usa Laravel Sanctum + Fortify per session/token-based auth con i flussi standard (login, reset password, ecc.) gestiti server-side.\n\nL'ingestione dati legacy — prima in SSIS — è stata riscritta come import SFTP/Excel: i file vengono prelevati da SFTP, parsati e validati prima dell'inserimento, sostituendo le pipeline SSIS con codice applicativo testabile e versionato.\n\nLa UI è costruita con PrimeVue + Tailwind, per componenti ricchi (tabelle, form, data view) con uno stile coerente e moderno.",
        en: "Decoupled architecture: Laravel 11 backend as the API, separate Vue 3 frontend. Authentication uses Laravel Sanctum + Fortify for session/token-based auth, with the standard flows (login, password reset, etc.) handled server-side.\n\nLegacy data ingestion — previously in SSIS — was rewritten as SFTP/Excel imports: files are pulled from SFTP, parsed and validated before insertion, replacing SSIS pipelines with testable, version-controlled application code.\n\nThe UI is built with PrimeVue + Tailwind for rich components (tables, forms, data views) with a coherent, modern style.",
      },
      highlights: [
        { title: { it: "Migrazione legacy → moderno", en: "Legacy → modern migration" }, body: { it: "Da .NET/SSIS a Laravel 11 + Vue 3, preservando dati e flussi di business esistenti.", en: "From .NET/SSIS to Laravel 11 + Vue 3, preserving existing data and business flows." } },
        { title: { it: "ETL riscritto in applicazione", en: "ETL rewritten in the app" }, body: { it: "Import SFTP/Excel al posto delle pipeline SSIS: logica versionata, testabile e trasparente.", en: "SFTP/Excel imports instead of SSIS pipelines: version-controlled, testable, transparent logic." } },
        { title: { it: "Auth robusta", en: "Robust auth" }, body: { it: "Sanctum + Fortify per autenticazione con i flussi standard gestiti lato server.", en: "Sanctum + Fortify for authentication with the standard flows handled server-side." } },
        { title: { it: "Frontend disaccoppiato", en: "Decoupled frontend" }, body: { it: "Backend API + SPA Vue 3 separati, con UI PrimeVue/Tailwind.", en: "Separate API backend + Vue 3 SPA, with a PrimeVue/Tailwind UI." } },
      ],
      stack: [
        { tech: "Laravel 11 + PHP 8", why: { it: "Backend API e logica di business", en: "API backend and business logic" } },
        { tech: "Vue 3", why: { it: "SPA frontend disaccoppiata dal backend", en: "Frontend SPA decoupled from the backend" } },
        { tech: "Sanctum + Fortify", why: { it: "Autenticazione e flussi account server-side", en: "Authentication and server-side account flows" } },
        { tech: "PrimeVue + Tailwind", why: { it: "Componenti UI ricchi con styling coerente", en: "Rich UI components with coherent styling" } },
        { tech: "SFTP + Excel", why: { it: "Ingestione dati che sostituisce le pipeline SSIS legacy", en: "Data ingestion replacing the legacy SSIS pipelines" } },
      ],
      metrics: [
        { value: "LIVE", label: { it: "in produzione", en: "in production" } },
        { value: ".NET→PHP", label: { it: "stack migrato", en: "stack migrated" } },
      ],
      deepDive: {
        it: "La parte delicata di un replatforming è la parità funzionale durante l'import: i file Excel/SFTP del sistema legacy hanno formati e casi limite consolidati negli anni. La pipeline di import valida ogni riga prima dell'inserimento e isola i record problematici, così un file parzialmente malformato non blocca l'intero batch — un comportamento che in SSIS era implicito e difficile da osservare.",
        en: "The delicate part of a replatforming is functional parity during import: the legacy system's Excel/SFTP files carry formats and edge cases hardened over the years. The import pipeline validates each row before insertion and isolates problematic records, so a partially malformed file never blocks the whole batch — behavior that was implicit and hard to observe in SSIS.",
      },
    },
  },
  {
    slug: "e-commerce-tech",
    title: "E-commerce Tech",
    status: "STABLE",
    statusClass: "text-primary bg-primary/10 border-primary/20",
    hoverBorder: "hover:border-primary/40",
    desc: {
      it: "Sito e-commerce per prodotti tecnologici con frontend React, backend Express e database MySQL. Catalogo prodotti, carrello e CRUD.",
      en: "E-commerce site for tech products with a React frontend, Express backend and MySQL database. Product catalog, cart and CRUD.",
    },
    tags: ["#React", "#NodeJS", "#MySQL", "#Axios"],
    links: [
      { label: "FRONTEND", url: "https://github.com/Marcodellavecchia95/e-commerce-project-work" },
      { label: "BACKEND", url: "https://github.com/Marcodellavecchia95/backend-e-commerce" },
    ],
    screenshots: ["/img/ecommerce1.png", "/img/ecommerce2.png", "/img/ecommerce3.png", "/img/ecommerce4.png", "/img/ecommerce5.png"],
    detail: {
      role: { it: "Full-stack", en: "Full-stack" },
      year: "2024",
      tagline: {
        it: "E-commerce full-stack per prodotti tech con catalogo, carrello e API REST separata.",
        en: "Full-stack e-commerce for tech products with catalog, cart and a separate REST API.",
      },
      intro: {
        it: "Un e-commerce completo per prodotti tecnologici, costruito come progetto full-stack con frontend React e backend Express/Node su database MySQL. Copre il flusso classico: navigazione catalogo, dettaglio prodotto, carrello e gestione CRUD dei prodotti lato admin.",
        en: "A complete e-commerce for tech products, built as a full-stack project with a React frontend and an Express/Node backend on MySQL. It covers the classic flow: catalog browsing, product detail, cart and admin-side product CRUD.",
      },
      problem: {
        it: "Un e-commerce, anche didattico, richiede di mettere insieme bene le parti: un frontend reattivo, un'API pulita e uno schema dati coerente per prodotti, categorie e ordini, con la comunicazione client-server gestita in modo ordinato.",
        en: "An e-commerce, even a learning one, requires fitting the parts together well: a reactive frontend, a clean API and a coherent data schema for products, categories and orders, with client-server communication handled tidily.",
      },
      architecture: {
        it: "Frontend React che consuma l'API tramite Axios, con componenti per catalogo, dettaglio prodotto e carrello. Backend Express che espone endpoint REST per le operazioni CRUD sui prodotti e per la gestione del carrello, persistendo su MySQL.\n\nLa separazione frontend/backend in due repository distinti rende chiaro il contratto API e permette di evolvere le due parti in modo indipendente.",
        en: "A React frontend consuming the API via Axios, with components for catalog, product detail and cart. An Express backend exposing REST endpoints for product CRUD and cart handling, persisting to MySQL.\n\nSplitting frontend and backend into two distinct repositories makes the API contract explicit and lets the two sides evolve independently.",
      },
      highlights: [
        { title: { it: "Architettura separata", en: "Separated architecture" }, body: { it: "Repository frontend e backend distinti, contratto API esplicito via REST.", en: "Distinct frontend and backend repositories, explicit REST API contract." } },
        { title: { it: "CRUD completo", en: "Full CRUD" }, body: { it: "Gestione prodotti end-to-end: creazione, lettura, aggiornamento, cancellazione.", en: "End-to-end product management: create, read, update, delete." } },
        { title: { it: "Carrello", en: "Cart" }, body: { it: "Logica di carrello lato client con sincronizzazione verso il backend.", en: "Client-side cart logic synchronized with the backend." } },
        { title: { it: "Comunicazione via Axios", en: "Axios-based communication" }, body: { it: "Layer HTTP centralizzato per le chiamate all'API Express.", en: "Centralized HTTP layer for calls to the Express API." } },
      ],
      stack: [
        { tech: "React", why: { it: "Frontend SPA con catalogo e carrello", en: "SPA frontend with catalog and cart" } },
        { tech: "Node.js + Express", why: { it: "API REST per prodotti e carrello", en: "REST API for products and cart" } },
        { tech: "MySQL", why: { it: "Persistenza relazionale di prodotti e ordini", en: "Relational persistence for products and orders" } },
        { tech: "Axios", why: { it: "Client HTTP per la comunicazione frontend ↔ backend", en: "HTTP client for frontend ↔ backend communication" } },
      ],
      metrics: [
        { value: "STABLE", label: { it: "stato", en: "status" } },
        { value: "2 repo", label: { it: "frontend + backend", en: "frontend + backend" } },
      ],
      deepDive: {
        it: "Il valore del progetto è didattico-architetturale: tenere separati frontend e backend forza a ragionare sul contratto API come prima cosa, invece di accoppiare la UI alla forma del database. Ogni schermata consuma endpoint ben definiti, e lo schema MySQL modella prodotti e ordini in modo che il carrello possa essere ricostruito in modo consistente.",
        en: "The project's value is architectural-educational: keeping frontend and backend separate forces you to reason about the API contract first, instead of coupling the UI to the database shape. Each screen consumes well-defined endpoints, and the MySQL schema models products and orders so the cart can be reconstructed consistently.",
      },
    },
  },
  {
    slug: "inventario-firebase",
    title: "Inventario Firebase",
    status: "LIVE",
    statusClass: "text-secondary bg-secondary/10 border-secondary/20",
    hoverBorder: "hover:border-secondary/40",
    desc: {
      it: "Sistema inventario real-time con React, Express e Firebase Realtime Database. CRUD completa e aggiornamenti in tempo reale.",
      en: "Real-time inventory system with React, Express and Firebase Realtime Database. Full CRUD and live updates.",
    },
    tags: ["#Firebase", "#NoSQL", "#React", "#Express"],
    links: [
      { label: "FRONTEND", url: "https://github.com/Marcodellavecchia95/inventario-frontend" },
      { label: "BACKEND", url: "https://github.com/Marcodellavecchia95/backend-inventario" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0OUo_ZMV7bxpqlZWGKkpZha_-HiOzgObsQcLQfPVxR5aIBdn9yNCimuDW3Pp0uFiSOPz8VORsXCOoTmhffy4_AxULVajgCdxsQ1HmE39YGCg2Eux5M4W-VVsW9UGvoC2uaFwBs5YuOacx12an-YamzJRllAYj6oc-gNO9azd1wRcyQOaPRc61MgfofULKd5nAoflsgYGR58qpRGZ7IDP5mIC7Vx7RqIUaJREIMKEHUKmzaEUI-UnDmC7I3BFAwcmtJjYSfTAognk",
    detail: {
      role: { it: "Full-stack", en: "Full-stack" },
      year: "2024",
      tagline: {
        it: "Gestione inventario con aggiornamenti live multi-client via Firebase Realtime Database.",
        en: "Inventory management with live multi-client updates via Firebase Realtime Database.",
      },
      intro: {
        it: "Un sistema di gestione inventario in tempo reale: ogni modifica allo stock si propaga istantaneamente a tutti i client connessi grazie a Firebase Realtime Database. Frontend React, backend Express e CRUD completa sugli articoli.",
        en: "A real-time inventory management system: every stock change propagates instantly to all connected clients thanks to Firebase Realtime Database. React frontend, Express backend and full CRUD on items.",
      },
      problem: {
        it: "In un inventario condiviso, più operatori possono modificare gli stessi dati contemporaneamente. Senza aggiornamenti in tempo reale si rischiano viste disallineate e conflitti. Serve un meccanismo che mantenga tutti i client sincronizzati senza polling continuo.",
        en: "In a shared inventory, multiple operators can edit the same data simultaneously. Without real-time updates you risk out-of-sync views and conflicts. You need a mechanism that keeps all clients synchronized without continuous polling.",
      },
      architecture: {
        it: "Il dato vive su Firebase Realtime Database (NoSQL): i client React si sottoscrivono ai nodi di interesse e ricevono push automatici a ogni cambiamento, eliminando il polling. Il backend Express fa da layer applicativo per le operazioni e la logica server-side.\n\nLa CRUD completa permette di creare, leggere, aggiornare ed eliminare articoli, con la UI che riflette lo stato del database in tempo reale.",
        en: "Data lives in Firebase Realtime Database (NoSQL): React clients subscribe to the nodes of interest and receive automatic pushes on every change, eliminating polling. The Express backend acts as the application layer for operations and server-side logic.\n\nFull CRUD lets you create, read, update and delete items, with the UI reflecting database state in real time.",
      },
      highlights: [
        { title: { it: "Real-time senza polling", en: "Real-time without polling" }, body: { it: "Le sottoscrizioni Firebase fanno push dei cambiamenti ai client, mantenendo tutte le viste sincronizzate.", en: "Firebase subscriptions push changes to clients, keeping all views in sync." } },
        { title: { it: "Modello NoSQL", en: "NoSQL model" }, body: { it: "Realtime Database per uno schema flessibile orientato al documento/nodo.", en: "Realtime Database for a flexible document/node-oriented schema." } },
        { title: { it: "CRUD completa", en: "Full CRUD" }, body: { it: "Gestione articoli end-to-end con riflesso immediato in UI.", en: "End-to-end item management with immediate UI reflection." } },
        { title: { it: "React + Express", en: "React + Express" }, body: { it: "Frontend reattivo e backend applicativo separati.", en: "Reactive frontend and application backend, separated." } },
      ],
      stack: [
        { tech: "Firebase Realtime DB", why: { it: "Persistenza NoSQL con sincronizzazione push in tempo reale", en: "NoSQL persistence with real-time push synchronization" } },
        { tech: "React", why: { it: "Frontend con sottoscrizioni live ai dati", en: "Frontend with live data subscriptions" } },
        { tech: "Express", why: { it: "Layer applicativo e logica server-side", en: "Application layer and server-side logic" } },
      ],
      metrics: [
        { value: "LIVE", label: { it: "in produzione", en: "in production" } },
        { value: "real-time", label: { it: "sync multi-client", en: "multi-client sync" } },
      ],
      deepDive: {
        it: "Il cuore è il modello di sincronizzazione: invece di interrogare il server a intervalli, i client si abbonano ai nodi del Realtime Database e reagiscono agli eventi di cambiamento. Questo riduce latenza e carico, ma sposta la complessità sulla strutturazione dei dati — modellare i nodi in modo che le sottoscrizioni siano granulari quanto basta da non ricevere aggiornamenti inutili.",
        en: "The core is the synchronization model: instead of polling the server at intervals, clients subscribe to Realtime Database nodes and react to change events. This cuts latency and load, but shifts the complexity onto data structuring — modeling nodes so subscriptions are granular enough not to receive useless updates.",
      },
    },
  },
  {
    slug: "amazon-monitor-bot",
    title: "Amazon Monitor Bot",
    status: "ACTIVE",
    statusClass: "text-error bg-error/10 border-error/20",
    hoverBorder: "hover:border-error/40",
    desc: {
      it: "Bot che monitora prezzi e disponibilità di prodotti Amazon tramite ASIN configurabile. Notifiche automatiche su variazioni di prezzo.",
      en: "Bot that monitors Amazon product prices and availability via a configurable ASIN. Automatic notifications on price changes.",
    },
    tags: ["#JavaScript", "#Automation", "#SetInterval"],
    links: [{ label: "CODICE", url: "https://github.com/Marcodellavecchia95/inventario-frontend" }],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA37CKqOZVmqRpe_AD0B4xWaMGrS5Z9CI2EV83318BBNNP120Zh4P6S7xqfy92s5R6e06yYHQqHjZasf-KI7dTRgc6lWWhl0XoSQZHsRarLnzhA7SW8d8TDW1MItC2mDMfpXjjqhNjEPahIuWy50V5VO88Kav6MsWOTwfXH12kIwqf_JFv0jQnLhurBq_mMx1SoLQeim5xEBjcGhqNNiPNmakUzDxY6_CjWSYIwHR4ZMFC0hSj5eEOjGBoyigB4ck0u-6iJYXRfluw",
    detail: {
      role: { it: "Automation", en: "Automation" },
      year: "2024",
      tagline: {
        it: "Bot di monitoraggio prezzi/disponibilità Amazon con notifiche automatiche su variazione.",
        en: "Amazon price/availability monitoring bot with automatic notifications on change.",
      },
      intro: {
        it: "Un bot in JavaScript che tiene d'occhio prezzo e disponibilità di prodotti Amazon, identificati tramite ASIN configurabile. Quando il prezzo varia o un prodotto torna disponibile, invia una notifica automatica.",
        en: "A JavaScript bot that watches the price and availability of Amazon products, identified by a configurable ASIN. When the price changes or a product comes back in stock, it sends an automatic notification.",
      },
      problem: {
        it: "Tracciare manualmente prezzi e disponibilità di più prodotti è tedioso e si perde la finestra utile (drop di prezzo, restock). Un bot che controlla a intervalli regolari e notifica solo sui cambiamenti rilevanti risolve il problema.",
        en: "Manually tracking prices and availability across multiple products is tedious and you miss the useful window (price drop, restock). A bot that checks at regular intervals and notifies only on relevant changes solves it.",
      },
      architecture: {
        it: "Il bot è configurabile per ASIN: si imposta la lista di prodotti da monitorare. A intervalli regolari (setInterval) interroga la pagina/prezzo del prodotto, confronta con l'ultimo valore noto e, se rileva una variazione significativa, scatena la notifica.\n\nLa logica mantiene lo stato dell'ultimo prezzo osservato per ogni ASIN, così da notificare solo sulle differenze e non a ogni ciclo.",
        en: "The bot is configurable per ASIN: you set the list of products to monitor. At regular intervals (setInterval) it queries the product page/price, compares with the last known value and, if it detects a significant change, fires the notification.\n\nThe logic keeps the last observed price per ASIN, so it notifies only on differences and not on every cycle.",
      },
      highlights: [
        { title: { it: "Monitoraggio per ASIN", en: "Per-ASIN monitoring" }, body: { it: "Lista di prodotti configurabile tramite codice ASIN.", en: "Product list configurable via ASIN code." } },
        { title: { it: "Polling a intervalli", en: "Interval polling" }, body: { it: "Controlli periodici via setInterval con confronto sullo stato precedente.", en: "Periodic checks via setInterval comparing against previous state." } },
        { title: { it: "Notifiche sulle variazioni", en: "Change-based notifications" }, body: { it: "Alert solo quando prezzo o disponibilità cambiano, evitando rumore.", en: "Alerts only when price or availability change, avoiding noise." } },
      ],
      stack: [
        { tech: "JavaScript", why: { it: "Linguaggio del bot e della logica di polling", en: "Language of the bot and the polling logic" } },
        { tech: "setInterval", why: { it: "Scheduling dei controlli periodici", en: "Scheduling of periodic checks" } },
        { tech: "Automation", why: { it: "Confronto stato e invio notifiche automatiche", en: "State comparison and automatic notification sending" } },
      ],
      metrics: [
        { value: "ACTIVE", label: { it: "stato", en: "status" } },
        { value: "per-ASIN", label: { it: "monitoraggio configurabile", en: "configurable monitoring" } },
      ],
      deepDive: {
        it: "Il dettaglio non banale è evitare le notifiche spurie: confrontando ogni lettura con l'ultimo valore persistito per ASIN, il bot notifica solo sui delta reali. Il vero limite di un approccio a polling è la cadenza — troppo frequente rischia rate-limiting, troppo rada perde i drop; il setInterval va calibrato sul trade-off tra reattività e robustezza.",
        en: "The non-trivial detail is avoiding spurious notifications: by comparing each reading with the last persisted value per ASIN, the bot only notifies on real deltas. The real limit of a polling approach is cadence — too frequent risks rate-limiting, too sparse misses the drops; the setInterval must be calibrated on the trade-off between responsiveness and robustness.",
      },
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
