import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Lingua di default: italiano. Persistita in localStorage.
const DEFAULT_LANG = "it";
const STORAGE_KEY = "lang";

const LangContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  toggle: () => {},
  t: (k) => k,
});

// Dizionario delle stringhe di interfaccia (il contenuto dei progetti è in data/projects.js)
const dict = {
  it: {
    nav: {
      home: "home",
      skills: "competenze",
      projects: "progetti",
      contact: "contatti",
    },
    hero: {
      eyebrow: "full-stack developer — secure by habit",
      namePhrase: "Marco della Vecchia,\ncostruisco",
      emWord: "software",
      lede: "Full-stack su PHP/Laravel e Vue, con un debole per i sistemi AI-driven e per la sicurezza applicativa.",
      metaRoleK: "Ruolo",
      metaRoleV: "Full-stack / AI engineering",
      metaStackK: "Stack",
      metaStackV: "Laravel · Vue · Python",
      metaBaseK: "Base",
      metaBaseV: "Italia · IT/EN",
      ctaContact: "Contattami",
      ctaRepo: "GitHub",
    },
    skills: { kicker: "§ Stack", title: "Competenze tecniche" },
    projects: {
      kicker: "§ Lavori selezionati",
      title: "Progetti",
      details: "Dettagli",
    },
    contact: {
      kicker: "§ Contatti",
      title: "Mettiamoci in contatto",
      mail: "Email",
      phone: "Telefono",
    },
    detail: {
      dossier: "Dossier — approfondimento",
      role: "Ruolo",
      year: "Anno",
      overview: "Overview",
      problem: "Il problema",
      architecture: "Architettura",
      highlights: "Highlights tecnici",
      stack: "Stack & scelte",
      numbers: "Numeri",
      nerdy: "Dettagli tecnici",
      next: "Prossimo progetto",
      back: "Indietro",
      allProjects: "Tutti i progetti",
      notFound: "404 — Progetto non trovato",
      backToProjects: "Torna ai progetti",
    },
  },
  en: {
    nav: {
      home: "home",
      skills: "skills",
      projects: "work",
      contact: "contact",
    },
    hero: {
      eyebrow: "full-stack developer — secure by habit",
      namePhrase: "Marco della Vecchia,\nI build",
      emWord: "software",
      lede: "Full-stack on PHP/Laravel and Vue, with a soft spot for AI-driven systems and application security.",
      metaRoleK: "Role",
      metaRoleV: "Full-stack / AI engineering",
      metaStackK: "Stack",
      metaStackV: "Laravel · Vue · Python",
      metaBaseK: "Based",
      metaBaseV: "Italy · IT/EN",
      ctaContact: "Get in touch",
      ctaRepo: "GitHub",
    },
    skills: { kicker: "§ Stack", title: "Technical skills" },
    projects: {
      kicker: "§ Selected work",
      title: "Work",
      details: "Details",
    },
    contact: {
      kicker: "§ Contact",
      title: "Let's Connect",
      mail: "Email",
      phone: "Phone",
    },
    detail: {
      dossier: "Dossier — deep dive",
      role: "Role",
      year: "Year",
      overview: "Overview",
      problem: "The problem",
      architecture: "Architecture",
      highlights: "Technical highlights",
      stack: "Stack & choices",
      numbers: "Numbers",
      nerdy: "Technical details",
      next: "Next project",
      back: "Back",
      allProjects: "All projects",
      notFound: "404 — Project not found",
      backToProjects: "Back to projects",
    },
  },
};

// Restituisce il valore giusto da un campo che può essere stringa o { it, en }.
export function pick(value, lang) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    ("it" in value || "en" in value)
  ) {
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
  const toggle = useCallback(
    () => setLangState((l) => (l === "it" ? "en" : "it")),
    [],
  );

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
    [lang],
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
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
      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs tracking-wider transition-colors ${className}`}
      style={{
        fontFamily: "IBM Plex Mono, monospace",
        borderColor: "rgba(142,137,128,0.35)",
        color: "#A39E95",
        background: "transparent",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(224,162,78,0.7)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(142,137,128,0.35)")
      }
    >
      <span
        style={{
          color: lang === "it" ? "#E0A24E" : "#8E8980",
          fontWeight: lang === "it" ? 600 : 400,
        }}
      >
        IT
      </span>
      <span style={{ color: "#48474d" }}>/</span>
      <span
        style={{
          color: lang === "en" ? "#E0A24E" : "#8E8980",
          fontWeight: lang === "en" ? 600 : 400,
        }}
      >
        EN
      </span>
    </button>
  );
}
