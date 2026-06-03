import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Lingua di default: italiano. Persistita in localStorage.
const DEFAULT_LANG = "it";
const STORAGE_KEY = "lang";

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {}, toggle: () => {}, t: (k) => k });

// Dizionario delle stringhe di interfaccia (il contenuto dei progetti è in data/projects.js)
const dict = {
  it: {
    nav: { home: "home", skills: "skills", projects: "projects", contact: "contact" },
    hero: {
      tag: "access_granted... initializing_profile...",
      subtitleA: "FULL STACK DEVELOPER",
      subtitleB: "ASPIRING PENETRATION TESTER",
      ctaContact: "INITIALIZE_CONTACT",
      ctaRepo: "VIEW_REPOSITORY",
    },
    skills: { kicker: "RECON_01 // CORE_COMPETENCIES", title: "TECHNICAL_STACK" },
    projects: {
      kicker: "MODULE_02 // DEPLOYED_WORK",
      title: "FEATURED_PROJECTS",
      details: "DETTAGLI",
    },
    contact: {
      kicker: "ESTABLISH_UPLINK",
      title: "Mettiamoci in contatto",
      mail: "SECURE_MAIL",
      phone: "ENCRYPTED_LINE",
    },
    detail: {
      dossier: "DOSSIER // APPROFONDIMENTO",
      role: "RUOLO",
      year: "ANNO",
      overview: "OVERVIEW",
      problem: "IL PROBLEMA",
      architecture: "ARCHITETTURA",
      highlights: "HIGHLIGHTS TECNICI",
      stack: "STACK & SCELTE",
      numbers: "NUMERI",
      nerdy: "// THE_NERDY_PART",
      next: "PROSSIMO PROGETTO",
      back: "INDIETRO",
      allProjects: "TUTTI I PROGETTI",
      notFound: "ERROR_404 // PROGETTO_NON_TROVATO",
      backToProjects: "TORNA AI PROGETTI",
    },
  },
  en: {
    nav: { home: "home", skills: "skills", projects: "projects", contact: "contact" },
    hero: {
      tag: "access_granted... initializing_profile...",
      subtitleA: "FULL STACK DEVELOPER",
      subtitleB: "ASPIRING PENETRATION TESTER",
      ctaContact: "INITIALIZE_CONTACT",
      ctaRepo: "VIEW_REPOSITORY",
    },
    skills: { kicker: "RECON_01 // CORE_COMPETENCIES", title: "TECHNICAL_STACK" },
    projects: {
      kicker: "MODULE_02 // DEPLOYED_WORK",
      title: "FEATURED_PROJECTS",
      details: "DETAILS",
    },
    contact: {
      kicker: "ESTABLISH_UPLINK",
      title: "Let's Connect",
      mail: "SECURE_MAIL",
      phone: "ENCRYPTED_LINE",
    },
    detail: {
      dossier: "DOSSIER // DEEP_DIVE",
      role: "ROLE",
      year: "YEAR",
      overview: "OVERVIEW",
      problem: "THE PROBLEM",
      architecture: "ARCHITECTURE",
      highlights: "TECHNICAL HIGHLIGHTS",
      stack: "STACK & CHOICES",
      numbers: "NUMBERS",
      nerdy: "// THE_NERDY_PART",
      next: "NEXT PROJECT",
      back: "BACK",
      allProjects: "ALL PROJECTS",
      notFound: "ERROR_404 // PROJECT_NOT_FOUND",
      backToProjects: "BACK TO PROJECTS",
    },
  },
};

// Restituisce il valore giusto da un campo che può essere stringa o { it, en }.
export function pick(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value) && ("it" in value || "en" in value)) {
    return value[lang] ?? value.it ?? value.en;
  }
  return value;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LANG;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((l) => (l === "it" ? "en" : "it")), []);

  // t("projects.details") → naviga nel dizionario
  const t = useCallback(
    (path) => {
      const parts = path.split(".");
      let node = dict[lang] || dict[DEFAULT_LANG];
      for (const p of parts) {
        node = node?.[p];
        if (node == null) return path;
      }
      return node;
    },
    [lang]
  );

  return <LangContext.Provider value={{ lang, setLang, toggle, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

// Pulsante toggle IT/EN riutilizzabile (in alto a destra).
export function LangToggle({ className = "" }) {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={lang === "it" ? "Switch to English" : "Passa all'italiano"}
      className={`flex items-center gap-1 px-2.5 py-1 rounded-sm border text-xs font-bold tracking-widest uppercase transition-colors ${className}`}
      style={{
        fontFamily: "IBM Plex Mono, monospace",
        borderColor: "rgba(164,255,185,0.3)",
        color: "#a4ffb9",
        background: "rgba(164,255,185,0.04)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(164,255,185,0.8)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(164,255,185,0.3)")}
    >
      <span style={{ color: lang === "it" ? "#a4ffb9" : "#76747b" }}>IT</span>
      <span style={{ color: "#48474d" }}>/</span>
      <span style={{ color: lang === "en" ? "#a4ffb9" : "#76747b" }}>EN</span>
    </button>
  );
}
