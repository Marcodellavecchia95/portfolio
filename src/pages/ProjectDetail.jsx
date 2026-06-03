import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { getProjectBySlug, projects } from "../data/projects.js";
import { GalleryWithArrows, Lightbox } from "../components/ProjectMedia.jsx";
import { navigate } from "../hooks/useHashRoute.js";
import { useLang, pick, LangToggle } from "../i18n.jsx";

const AMBER = "#E0A24E";
const INK = "#F6F1E9";
const BODY = "#C4BEB3";
const MUTED = "#8E8980";
const LINE = "var(--color-outline-variant)";
const SURFACE = "#1B1A1E";

const prefersReduced =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ArrowIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const BackArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

// Kicker di sezione editoriale: "01 — Overview"
function SectionLabel({ index, children }) {
  return (
    <span
      className="block mb-4"
      style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", letterSpacing: "0.08em", color: MUTED, textTransform: "uppercase" }}
    >
      <span style={{ color: AMBER }}>{String(index).padStart(2, "0")}</span> — {children}
    </span>
  );
}

function Prose({ text }) {
  return (
    <>
      {String(text).split("\n\n").map((para, i) => (
        <p key={i} className="mb-4" style={{ fontSize: "16px", lineHeight: 1.65, color: BODY }}>
          {para}
        </p>
      ))}
    </>
  );
}

export default function ProjectDetail({ slug }) {
  const { lang, t } = useLang();
  const project = getProjectBySlug(slug);
  const [selectedImage, setSelectedImage] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSelectedImage(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!project || prefersReduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".pd-fade", { opacity: 0, y: 24, duration: 0.6, stagger: 0.07, ease: "power2.out" });
    }, rootRef);
    return () => ctx.revert();
  }, [slug, project]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ backgroundColor: "var(--color-background)" }}>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", color: "#C96A5A" }} className="mb-4">
          {t("detail.notFound")}
        </span>
        <button
          onClick={() => navigate("#projects")}
          className="inline-flex items-center gap-2 text-sm"
          style={{ color: AMBER, background: "none", border: "none", cursor: "pointer" }}
        >
          <BackArrow /> {t("detail.backToProjects")}
        </button>
      </div>
    );
  }

  const d = project.detail || {};
  const media = project.screenshots || (project.img ? [project.img] : []);
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div ref={rootRef} className="relative" style={{ backgroundColor: "var(--color-background)", minHeight: "100vh" }}>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 w-full z-50" style={{ backgroundColor: "rgba(20,19,22,0.8)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${LINE}` }}>
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-4xl mx-auto">
          <button
            onClick={() => navigate("#projects")}
            className="inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: AMBER, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: -3, duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
          >
            <BackArrow /> {t("detail.back")}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("#/")}
              style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: "15px", color: INK, background: "none", border: "none", cursor: "pointer" }}
            >
              Marco della Vecchia
            </button>
            <LangToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="pd-fade flex items-center gap-3 mb-5" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: MUTED }}>
            <span className={`px-2 py-0.5 rounded-full border ${project.statusClass}`}>{project.status}</span>
            <span style={{ letterSpacing: "0.06em" }}>{t("detail.dossier")}</span>
          </div>

          <h1
            className="pd-fade mb-5"
            style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "clamp(34px,6vw,60px)", lineHeight: 1.04, letterSpacing: "-0.015em", color: INK }}
          >
            {project.title}
          </h1>

          {d.tagline && (
            <p className="pd-fade mb-7 max-w-2xl" style={{ fontSize: "19px", lineHeight: 1.55, color: BODY }}>
              {pick(d.tagline, lang)}
            </p>
          )}

          <div className="pd-fade flex flex-wrap gap-x-9 gap-y-3 mb-6" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "13px" }}>
            {d.role && (
              <div>
                <span className="block mb-1" style={{ color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "11px" }}>{t("detail.role")}</span>
                <span style={{ color: INK }}>{pick(d.role, lang)}</span>
              </div>
            )}
            {d.year && (
              <div>
                <span className="block mb-1" style={{ color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "11px" }}>{t("detail.year")}</span>
                <span style={{ color: INK }}>{d.year}</span>
              </div>
            )}
          </div>

          <div className="pd-fade flex flex-wrap gap-3 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", color: "#7d786f" }}>{tag}</span>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="pd-fade flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all"
                  style={{ color: AMBER, border: `1px solid ${LINE}` }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(224,162,78,0.6)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-outline-variant)")}
                >
                  {l.label} <ArrowIcon />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ── Media ────────────────────────────────────────────────────── */}
        {media.length > 0 && (
          <div className="pd-fade mb-14 rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
            {media.length > 1 ? (
              <GalleryWithArrows screenshots={media} onSelect={setSelectedImage} height="420px" />
            ) : (
              <img
                src={media[0]}
                alt={project.title}
                onClick={() => setSelectedImage(media[0])}
                className="w-full block"
                style={{ maxHeight: "440px", objectFit: "cover", cursor: "pointer" }}
              />
            )}
          </div>
        )}

        {/* ── Sezioni ──────────────────────────────────────────────────── */}
        <div className="space-y-14">
          {d.intro && (
            <section className="pd-fade">
              <SectionLabel index={1}>{t("detail.overview")}</SectionLabel>
              <Prose text={pick(d.intro, lang)} />
            </section>
          )}

          {d.problem && (
            <section className="pd-fade">
              <SectionLabel index={2}>{t("detail.problem")}</SectionLabel>
              <Prose text={pick(d.problem, lang)} />
            </section>
          )}

          {d.architecture && (
            <section className="pd-fade">
              <SectionLabel index={3}>{t("detail.architecture")}</SectionLabel>
              <Prose text={pick(d.architecture, lang)} />
            </section>
          )}

          {d.highlights && d.highlights.length > 0 && (
            <section className="pd-fade">
              <SectionLabel index={4}>{t("detail.highlights")}</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.highlights.map((h, i) => (
                  <div key={i} className="p-5 rounded-lg" style={{ backgroundColor: SURFACE, border: `1px solid ${LINE}` }}>
                    <h3 className="mb-2" style={{ fontFamily: "Fraunces, serif", fontWeight: 500, fontSize: "18px", color: INK }}>{pick(h.title, lang)}</h3>
                    <p style={{ fontSize: "14px", lineHeight: 1.6, color: BODY }}>{pick(h.body, lang)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {d.stack && d.stack.length > 0 && (
            <section className="pd-fade">
              <SectionLabel index={5}>{t("detail.stack")}</SectionLabel>
              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
                {d.stack.map((row, i) => (
                  <div
                    key={row.tech}
                    className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 px-5 py-3.5"
                    style={{
                      backgroundColor: i % 2 === 0 ? SURFACE : "#161519",
                      borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
                    }}
                  >
                    <span className="md:w-64 shrink-0" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "13px", color: AMBER }}>{row.tech}</span>
                    <span style={{ fontSize: "14px", color: BODY }}>{pick(row.why, lang)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {d.metrics && d.metrics.length > 0 && (
            <section className="pd-fade">
              <SectionLabel index={6}>{t("detail.numbers")}</SectionLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {d.metrics.map((m, i) => (
                  <div key={i} className="p-5 rounded-lg" style={{ backgroundColor: SURFACE, border: `1px solid ${LINE}` }}>
                    <div className="mb-1" style={{ fontFamily: "Fraunces, serif", fontWeight: 500, color: INK, fontSize: "32px", lineHeight: 1 }}>{m.value}</div>
                    <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.04em", color: MUTED, lineHeight: 1.4 }}>{pick(m.label, lang)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {d.deepDive && (
            <section className="pd-fade">
              <SectionLabel index={7}>{t("detail.nerdy")}</SectionLabel>
              <div className="p-6 rounded-lg" style={{ backgroundColor: SURFACE, borderLeft: `2px solid ${AMBER}` }}>
                <Prose text={pick(d.deepDive, lang)} />
              </div>
            </section>
          )}
        </div>

        {/* ── Next project ─────────────────────────────────────────────── */}
        {nextProject && nextProject.slug !== project.slug && (
          <div className="pd-fade mt-16 pt-10" style={{ borderTop: `1px solid ${LINE}` }}>
            <span className="block mb-2" style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", color: MUTED }}>
              {t("detail.next")}
            </span>
            <button
              onClick={() => navigate(`#/project/${nextProject.slug}`)}
              className="group inline-flex items-center gap-3 text-left"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span style={{ fontFamily: "Fraunces, serif", fontWeight: 500, color: INK, fontSize: "26px" }}>{nextProject.title}</span>
              <span style={{ color: AMBER }} className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"><ArrowIcon /></span>
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${LINE}` }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 md:px-8 py-8 max-w-4xl mx-auto">
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "15px", color: INK }}>Marco della Vecchia</span>
          <button
            onClick={() => navigate("#projects")}
            className="inline-flex items-center gap-2 transition-colors"
            style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "12px", color: MUTED, background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
            onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
          >
            <BackArrow /> {t("detail.allProjects")}
          </button>
        </div>
      </footer>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
