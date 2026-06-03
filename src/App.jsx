import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "./data/projects.js";
import { navigate } from "./hooks/useHashRoute.js";
import { useLang, pick, LangToggle } from "./i18n.jsx";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── Icons ──────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const ArrowIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

const skills = [
  { label: "HTML / CSS",              sigla: "</>", category: "FRONTEND" },
  { label: "JavaScript / React",      sigla: "JS",  category: "FRONTEND" },
  { label: "Node.js / Express",       sigla: "{ }", category: "BACKEND"  },
  { label: "PHP / Laravel",           sigla: "PHP", category: "BACKEND"  },
  { label: "SQL / MySQL",             sigla: "SQL", category: "DATABASE" },
  { label: "Kali Linux & Pentesting", sigla: "§",   category: "SECURITY" },
];

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const { lang, t } = useLang();

  const rootRef = useRef(null);

  // ── Reveal sobri allo scroll (rispetta prefers-reduced-motion) ─────────────
  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Hero: entrata in cascata, discreta
      gsap.from(".hero-stagger > *", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.09,
        ease: "power2.out",
      });

      // Reveal generico per elementi marcati .reveal
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "power2.out",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const goToProject = (slug) => navigate(`#/project/${slug}`);
  const [namePhrase1, namePhrase2] = t("hero.namePhrase").split("\n");

  return (
    <div ref={rootRef} style={{ backgroundColor: "var(--color-background)" }}>
      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50" style={{ backgroundColor: "rgba(20,19,22,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--color-outline-variant)" }}>
        <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-6xl mx-auto">
          <a
            href="#home"
            className="text-lg tracking-tight"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 600, color: "#F6F1E9" }}
          >
            Marco della Vecchia
          </a>
          <div className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex gap-7 items-center">
              {["home", "skills", "projects", "contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className="link-anim text-sm transition-colors"
                  style={{ color: "var(--color-on-surface-variant)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F6F1E9")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-on-surface-variant)")}
                >
                  {t(`nav.${link}`)}
                </a>
              ))}
            </div>
            <LangToggle />
          </div>
        </div>
      </nav>

      <main className="relative max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 pb-16">
          <div className="amber-glow absolute -top-24 -left-24 w-[520px] h-[520px]" />

          <div className="hero-stagger relative z-10 w-full max-w-3xl">
            {/* Eyebrow — accenno security sobrio */}
            <div className="flex items-center gap-2.5 mb-8" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-on-surface-variant)" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#E0A24E", boxShadow: "0 0 0 4px rgba(224,162,78,0.12)" }} />
              {t("hero.eyebrow")}
            </div>

            {/* Titolo serif */}
            <h1
              style={{
                fontFamily: "Fraunces, serif",
                fontWeight: 500,
                fontSize: "clamp(44px, 7.5vw, 92px)",
                lineHeight: 1.02,
                letterSpacing: "-0.015em",
                color: "#F6F1E9",
              }}
            >
              {namePhrase1}<br />
              {namePhrase2}{" "}
              <em style={{ fontStyle: "italic", color: "#E0A24E" }}>{t("hero.emWord")}</em>.
            </h1>

            {/* Lede */}
            <p className="mt-7 max-w-xl" style={{ fontSize: "18px", color: "#C4BEB3", lineHeight: 1.6 }}>
              {t("hero.lede")}
            </p>

            {/* Meta */}
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "13px" }}>
              {[["metaRoleK", "metaRoleV"], ["metaStackK", "metaStackV"], ["metaBaseK", "metaBaseV"]].map(([k, v]) => (
                <div key={k}>
                  <span className="block mb-1" style={{ color: "var(--color-on-surface-variant)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "11px" }}>{t(`hero.${k}`)}</span>
                  <span style={{ color: "#ECE7DF" }}>{t(`hero.${v}`)}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full transition-all active:scale-95"
                style={{ fontWeight: 600, fontSize: "15px", backgroundColor: "#E0A24E", color: "#2A1C08" }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.03, duration: 0.2 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.2 })}
              >
                {t("hero.ctaContact")} <ArrowIcon />
              </a>
              <a
                href="https://github.com/Marcodellavecchia95"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full transition-all active:scale-95"
                style={{ fontWeight: 500, fontSize: "15px", border: "1px solid var(--color-outline-variant)", color: "#ECE7DF" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(224,162,78,0.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-outline-variant)")}
              >
                <GithubIcon /> {t("hero.ctaRepo")}
              </a>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-0 animate-bounce" style={{ opacity: 0.4 }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#E0A24E" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>

        {/* ── Skills ─────────────────────────────────────────────────────── */}
        <section id="skills" className="py-20 md:py-28">
          <div className="reveal rule pt-5 flex items-baseline gap-4 mb-10">
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: "#E0A24E" }}>{t("skills.kicker")}</span>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(26px,4vw,38px)", color: "#F6F1E9" }}>{t("skills.title")}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {skills.map((s) => (
              <div
                key={s.label}
                className="reveal flex items-center gap-4 p-5 rounded-lg transition-all"
                style={{ backgroundColor: "var(--color-surface-container-low)", border: "1px solid var(--color-outline-variant)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(224,162,78,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-outline-variant)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "20px", color: "#E0A24E", minWidth: "44px" }}>{s.sigla}</span>
                <span>
                  <span className="block" style={{ fontWeight: 600, fontSize: "14px", color: "#ECE7DF" }}>{s.label}</span>
                  <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "10px", letterSpacing: "0.12em", color: "var(--color-on-surface-variant)" }}>{s.category}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects (indice editoriale) ───────────────────────────────── */}
        <section id="projects" className="py-20 md:py-28">
          <div className="reveal rule pt-5 flex items-baseline gap-4 mb-6">
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: "#E0A24E" }}>{t("projects.kicker")}</span>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(26px,4vw,38px)", color: "#F6F1E9" }}>{t("projects.title")}</h2>
          </div>

          <div>
            {projects.map((p, i) => {
              const thumb = p.screenshots ? p.screenshots[0] : p.img;
              return (
                <div
                  key={p.slug}
                  onClick={() => goToProject(p.slug)}
                  className="reveal project-row group grid items-center gap-5 md:gap-7 cursor-pointer transition-all"
                  style={{
                    gridTemplateColumns: "auto 96px 1fr auto",
                    padding: "26px 0",
                    borderBottom: "1px solid var(--color-outline-variant)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "12px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
                >
                  {/* numero */}
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", color: "#E0A24E", width: "30px" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* thumb */}
                  <div className="hidden sm:block overflow-hidden rounded-md" style={{ width: "96px", height: "64px", border: "1px solid var(--color-outline-variant)", backgroundColor: "var(--color-surface-container-low)" }}>
                    {thumb && (
                      <img
                        src={thumb}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        style={{ opacity: 0.85 }}
                      />
                    )}
                  </div>

                  {/* contenuto */}
                  <div className="min-w-0">
                    <h3
                      className="transition-colors"
                      style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(20px,2.5vw,26px)", color: "#F6F1E9" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-1.5 hidden md:block" style={{ fontSize: "14px", color: "var(--color-on-surface-variant)", maxWidth: "560px", lineHeight: 1.55 }}>
                      {pick(p.desc, lang)}
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-3">
                      {p.tags.slice(0, 4).map((tag) => (
                        <span key={tag} style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", color: "#7d786f" }}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* meta */}
                  <div className="text-right whitespace-nowrap flex flex-col items-end gap-2">
                    <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: "var(--color-on-surface-variant)" }}>
                      <span className={`px-2 py-0.5 rounded-full border ${p.statusClass}`}>{p.status}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: "#E0A24E" }}>
                      <span className="hidden md:inline">{t("projects.details")}</span>
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"><ArrowIcon /></span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 md:py-28">
          <div className="reveal rule pt-5 flex items-baseline gap-4 mb-10">
            <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: "#E0A24E" }}>{t("contact.kicker")}</span>
            <h2 style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(28px,5vw,52px)", color: "#F6F1E9" }}>{t("contact.title")}</h2>
          </div>

          <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <a
              href="mailto:mdellavecchia95@gmail.com"
              className="p-6 rounded-lg transition-all"
              style={{ backgroundColor: "var(--color-surface-container-low)", border: "1px solid var(--color-outline-variant)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(224,162,78,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-outline-variant)"; }}
            >
              <span className="block mb-1" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)" }}>{t("contact.mail")}</span>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", color: "#F6F1E9" }}>mdellavecchia95@gmail.com</span>
            </a>
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "var(--color-surface-container-low)", border: "1px solid var(--color-outline-variant)" }}
            >
              <span className="block mb-1" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-on-surface-variant)" }}>{t("contact.phone")}</span>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", color: "#F6F1E9" }}>+39 392 726 6095</span>
            </div>
          </div>

          <div className="reveal flex gap-4 mt-8">
            {[
              { href: "https://github.com/Marcodellavecchia95", icon: <GithubIcon />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/marco-della-vecchia-840b7a96/", icon: <LinkedinIcon />, label: "LinkedIn" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
                style={{ border: "1px solid var(--color-outline-variant)", color: "var(--color-on-surface-variant)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#E0A24E"; e.currentTarget.style.borderColor = "rgba(224,162,78,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-on-surface-variant)"; e.currentTarget.style.borderColor = "var(--color-outline-variant)"; }}
              >
                {icon}
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--color-outline-variant)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-10 py-8 max-w-6xl mx-auto">
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "15px", color: "#ECE7DF" }}>Marco della Vecchia</span>
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", color: "var(--color-on-surface-variant)" }}>
            © {new Date().getFullYear()} — secure by habit · key a1:b2:c3
          </span>
        </div>
      </footer>
    </div>
  );
}
