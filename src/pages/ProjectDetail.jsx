import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { getProjectBySlug, projects } from "../data/projects.js";
import { GalleryWithArrows, Lightbox } from "../components/ProjectMedia.jsx";
import { navigate } from "../hooks/useHashRoute.js";
import { useLang, pick, LangToggle } from "../i18n.jsx";

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const BackArrow = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

// Etichetta sezione stile terminale
function SectionLabel({ index, children, color = "#a4ffb9" }) {
  return (
    <span
      className="text-xs tracking-widest uppercase mb-3 block"
      style={{ fontFamily: "IBM Plex Mono, monospace", color }}
    >
      {String(index).padStart(2, "0")} // {children}
    </span>
  );
}

// Paragrafi multipli da stringa con doppio newline
function Prose({ text }) {
  return (
    <>
      {String(text).split("\n\n").map((para, i) => (
        <p key={i} className="text-base leading-relaxed mb-4" style={{ color: "#acaab1" }}>
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

  // Scroll in cima al cambio progetto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  // Esc chiude lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.from(".pd-fade", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, [slug, project]);

  // 404
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8" style={{ backgroundColor: "#0e0e13" }}>
        <span style={{ fontFamily: "IBM Plex Mono, monospace", color: "#ff716c" }} className="mb-4">
          {t("detail.notFound")}
        </span>
        <button
          onClick={() => navigate("#projects")}
          className="inline-flex items-center gap-2 text-sm tracking-widest font-bold uppercase"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9", background: "none", border: "none", cursor: "pointer" }}
        >
          <BackArrow /> {t("detail.backToProjects")}
        </button>
      </div>
    );
  }

  const d = project.detail || {};
  const media = project.screenshots || (project.img ? [project.img] : []);

  // Progetto successivo per la navigazione in fondo
  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return (
    <div ref={rootRef} className="dark relative" style={{ backgroundColor: "#0e0e13", minHeight: "100vh" }}>
      {/* Scanline overlay */}
      <div className="scanline-overlay fixed inset-0 z-[100] pointer-events-none" />

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 w-full z-50 bg-[#0e0e13]/80 backdrop-blur-xl border-b border-[#00ff88]/10">
        <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <button
            onClick={() => navigate("#projects")}
            className="inline-flex items-center gap-2 text-sm tracking-widest font-bold uppercase transition-colors"
            style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => gsap.to(e.currentTarget, { x: -3, color: "#00fd87", duration: 0.2 })}
            onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, color: "#a4ffb9", duration: 0.2 })}
          >
            <BackArrow /> {t("detail.back")}
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("#/")}
              className="text-lg font-black tracking-tighter text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]"
              style={{ fontFamily: "Space Grotesk, sans-serif", background: "none", border: "none", cursor: "pointer" }}
            >
              MARCO_DV
            </button>
            <LangToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 md:px-12 py-12 md:py-16">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <div className="pd-fade flex items-center gap-3 mb-4">
            <span
              className={`text-[10px] px-2 py-1 rounded-sm border ${project.statusClass}`}
              style={{ fontFamily: "IBM Plex Mono, monospace" }}
            >
              {project.status}
            </span>
            <span className="text-xs" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}>
              {t("detail.dossier")}
            </span>
          </div>

          <h1
            className="pd-fade font-black tracking-tight mb-4 leading-[1.02]"
            style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            {project.title}
          </h1>

          {d.tagline && (
            <p className="pd-fade text-lg md:text-xl mb-6 max-w-3xl" style={{ color: "#acaab1", fontFamily: "Space Grotesk, sans-serif" }}>
              {pick(d.tagline, lang)}
            </p>
          )}

          {/* Meta riga */}
          <div className="pd-fade flex flex-wrap gap-x-8 gap-y-2 mb-6">
            {d.role && (
              <div>
                <span className="text-[10px] uppercase block" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}>{t("detail.role")}</span>
                <span className="text-sm" style={{ color: "#f9f5fd", fontFamily: "Space Grotesk, sans-serif" }}>{pick(d.role, lang)}</span>
              </div>
            )}
            {d.year && (
              <div>
                <span className="text-[10px] uppercase block" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}>{t("detail.year")}</span>
                <span className="text-sm" style={{ color: "#f9f5fd", fontFamily: "Space Grotesk, sans-serif" }}>{d.year}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="pd-fade flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[11px]" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#00d2fd" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          {project.links && project.links.length > 0 && (
            <div className="pd-fade flex flex-wrap gap-4">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-widest font-bold uppercase px-4 py-2 rounded-sm border transition-all"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9", borderColor: "rgba(164,255,185,0.3)" }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.9)", backgroundColor: "rgba(164,255,185,0.06)", duration: 0.2 })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.3)", backgroundColor: "transparent", duration: 0.2 })}
                >
                  {l.label} <ArrowIcon />
                </a>
              ))}
            </div>
          )}
        </header>

        {/* ── Media ────────────────────────────────────────────────────── */}
        {media.length > 0 && (
          <div className="pd-fade mb-14 rounded-sm border overflow-hidden" style={{ borderColor: "rgba(72,71,77,0.3)" }}>
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
              <SectionLabel index={2} color="#00d2fd">{t("detail.problem")}</SectionLabel>
              <Prose text={pick(d.problem, lang)} />
            </section>
          )}

          {d.architecture && (
            <section className="pd-fade">
              <SectionLabel index={3}>{t("detail.architecture")}</SectionLabel>
              <Prose text={pick(d.architecture, lang)} />
            </section>
          )}

          {/* Highlights */}
          {d.highlights && d.highlights.length > 0 && (
            <section className="pd-fade">
              <SectionLabel index={4} color="#00d2fd">{t("detail.highlights")}</SectionLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {d.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-sm border"
                    style={{ backgroundColor: "#19191f", borderColor: "rgba(72,71,77,0.25)" }}
                  >
                    <h3 className="font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9" }}>
                      {pick(h.title, lang)}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#acaab1" }}>{pick(h.body, lang)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Stack */}
          {d.stack && d.stack.length > 0 && (
            <section className="pd-fade">
              <SectionLabel index={5}>{t("detail.stack")}</SectionLabel>
              <div className="rounded-sm border overflow-hidden" style={{ borderColor: "rgba(72,71,77,0.25)" }}>
                {d.stack.map((row, i) => (
                  <div
                    key={row.tech}
                    className="flex flex-col md:flex-row md:items-center gap-1 md:gap-6 px-5 py-3"
                    style={{
                      backgroundColor: i % 2 === 0 ? "#19191f" : "#15151b",
                      borderTop: i === 0 ? "none" : "1px solid rgba(72,71,77,0.18)",
                    }}
                  >
                    <span className="md:w-56 shrink-0 font-bold text-sm" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#00d2fd" }}>
                      {row.tech}
                    </span>
                    <span className="text-sm" style={{ color: "#acaab1" }}>{pick(row.why, lang)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Metrics */}
          {d.metrics && d.metrics.length > 0 && (
            <section className="pd-fade">
              <SectionLabel index={6} color="#00d2fd">{t("detail.numbers")}</SectionLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {d.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-sm border text-center"
                    style={{ backgroundColor: "#19191f", borderColor: "rgba(72,71,77,0.25)" }}
                  >
                    <div className="font-black mb-1" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9", fontSize: "1.6rem", textShadow: "0 0 14px rgba(164,255,185,0.4)" }}>
                      {m.value}
                    </div>
                    <div className="text-[11px] uppercase leading-snug" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}>
                      {pick(m.label, lang)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Deep dive */}
          {d.deepDive && (
            <section className="pd-fade">
              <SectionLabel index={7}>{t("detail.nerdy")}</SectionLabel>
              <div
                className="p-6 rounded-sm border-l-2"
                style={{ backgroundColor: "#131319", borderColor: "#a4ffb9" }}
              >
                <Prose text={pick(d.deepDive, lang)} />
              </div>
            </section>
          )}
        </div>

        {/* ── Next project ─────────────────────────────────────────────── */}
        {nextProject && nextProject.slug !== project.slug && (
          <div className="pd-fade mt-16 pt-10 border-t" style={{ borderColor: "rgba(72,71,77,0.2)" }}>
            <span className="text-xs uppercase block mb-2" style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}>
              {t("detail.next")}
            </span>
            <button
              onClick={() => navigate(`#/project/${nextProject.slug}`)}
              className="inline-flex items-center gap-3 text-left"
              style={{ background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => gsap.to(e.currentTarget, { x: 4, duration: 0.2 })}
              onMouseLeave={(e) => gsap.to(e.currentTarget, { x: 0, duration: 0.2 })}
            >
              <span className="font-black tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd", fontSize: "1.5rem" }}>
                {nextProject.title}
              </span>
              <span style={{ color: "#a4ffb9" }}><ArrowIcon /></span>
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="w-full border-t" style={{ backgroundColor: "#0e0e13", borderColor: "rgba(164,255,185,0.05)" }}>
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-8 gap-4 max-w-5xl mx-auto">
          <span className="font-bold uppercase tracking-widest text-sm" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9" }}>
            MARCO DELLA VECCHIA
          </span>
          <button
            onClick={() => navigate("#projects")}
            className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase"
            style={{ fontFamily: "IBM Plex Mono, monospace", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00d2fd")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
          >
            <BackArrow /> {t("detail.allProjects")}
          </button>
        </div>
      </footer>

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
