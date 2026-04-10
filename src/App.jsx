import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Icons ──────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TerminalIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
);

// ─── Data ────────────────────────────────────────────────────────────────────

function GalleryWithArrows({ screenshots, onSelect }) {
  const [idx, setIdx] = useState(0);
  const total = screenshots.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative" style={{ backgroundColor: "#131319" }}>
      {/* Immagine corrente */}
      <div
        className="overflow-hidden"
        style={{ height: "160px", cursor: "pointer" }}
        onClick={() => onSelect(screenshots[idx])}
      >
        <img
          src={screenshots[idx]}
          alt={`screenshot ${idx + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85, transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.85)}
        />
        {/* Gradient bottom */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #131319 0%, transparent 60%)" }} />
      </div>

      {/* Frecce */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-sm transition-all"
        style={{ backgroundColor: "rgba(14,14,19,0.85)", border: "1px solid rgba(164,255,185,0.2)", color: "#a4ffb9" }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.7)", duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.2)", duration: 0.2 })}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-sm transition-all"
        style={{ backgroundColor: "rgba(14,14,19,0.85)", border: "1px solid rgba(164,255,185,0.2)", color: "#a4ffb9" }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.7)", duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.7)", duration: 0.2 })}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-2">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            style={{
              width: i === idx ? "16px" : "6px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: i === idx ? "#a4ffb9" : "rgba(164,255,185,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.25s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const projects = [
  {
    title: "E-commerce Tech",
    status: "STABLE",
    statusClass: "text-primary bg-primary/10 border-primary/20",
    hoverBorder: "hover:border-primary/40",
    desc: "Sito e-commerce per prodotti tecnologici con frontend React, backend Express e database MySQL. Catalogo prodotti, carrello e CRUD.",
    tags: ["#React", "#NodeJS", "#MySQL", "#Axios"],
    links: [
      { label: "FRONTEND", url: "https://github.com/Marcodellavecchia95/e-commerce-project-work" },
      { label: "BACKEND", url: "https://github.com/Marcodellavecchia95/backend-e-commerce" },
    ],
    screenshots: [
      "/img/ecommerce1.png",
      "/img/ecommerce2.png",
      "/img/ecommerce3.png",
      "/img/ecommerce4.png",
      "/img/ecommerce5.png",
    ],
  },
  {
    title: "Inventario Firebase",
    status: "LIVE",
    statusClass: "text-secondary bg-secondary/10 border-secondary/20",
    hoverBorder: "hover:border-secondary/40",
    desc: "Sistema inventario real-time con React, Express e Firebase Realtime Database. CRUD completa e aggiornamenti in tempo reale.",
    tags: ["#Firebase", "#NoSQL", "#React", "#Express"],
    links: [
      { label: "FRONTEND", url: "https://github.com/Marcodellavecchia95/inventario-frontend" },
      { label: "BACKEND", url: "https://github.com/Marcodellavecchia95/backend-inventario" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0OUo_ZMV7bxpqlZWGKkpZha_-HiOzgObsQcLQfPVxR5aIBdn9yNCimuDW3Pp0uFiSOPz8VORsXCOoTmhffy4_AxULVajgCdxsQ1HmE39YGCg2Eux5M4W-VVsW9UGvoC2uaFwBs5YuOacx12an-YamzJRllAYj6oc-gNO9azd1wRcyQOaPRc61MgfofULKd5nAoflsgYGR58qpRGZ7IDP5mIC7Vx7RqIUaJREIMKEHUKmzaEUI-UnDmC7I3BFAwcmtJjYSfTAognk",
  },
  {
    title: "Amazon Monitor Bot",
    status: "ACTIVE",
    statusClass: "text-error bg-error/10 border-error/20",
    hoverBorder: "hover:border-error/40",
    desc: "Bot che monitora prezzi e disponibilità di prodotti Amazon tramite ASIN configurabile. Notifiche automatiche su variazioni di prezzo.",
    tags: ["#JavaScript", "#Automation", "#SetInterval"],
    links: [
      { label: "CODICE", url: "https://github.com/Marcodellavecchia95/inventario-frontend" },
    ],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA37CKqOZVmqRpe_AD0B4xWaMGrS5Z9CI2EV83318BBNNP120Zh4P6S7xqfy92s5R6e06yYHQqHjZasf-KI7dTRgc6lWWhl0XoSQZHsRarLnzhA7SW8d8TDW1MItC2mDMfpXjjqhNjEPahIuWy50V5VO88Kav6MsWOTwfXH12kIwqf_JFv0jQnLhurBq_mMx1SoLQeim5xEBjcGhqNNiPNmakUzDxY6_CjWSYIwHR4ZMFC0hSj5eEOjGBoyigB4ck0u-6iJYXRfluw",
  },
];

const skills = [
  { label: "HTML / CSS",              sigla: "</>",  color: "#a4ffb9", glow: "0 0 28px rgba(164,255,185,0.45)", category: "FRONTEND" },
  { label: "JAVASCRIPT / REACT",      sigla: "JS",   color: "#a4ffb9", glow: "0 0 28px rgba(164,255,185,0.45)", category: "FRONTEND" },
  { label: "NODE.JS / EXPRESS",       sigla: "{}",   color: "#a4ffb9", glow: "0 0 28px rgba(164,255,185,0.45)", category: "BACKEND"  },
  { label: "PHP / LARAVEL",           sigla: "PHP",  color: "#00d2fd", glow: "0 0 28px rgba(0,210,253,0.45)",   category: "BACKEND"  },
  { label: "SQL",                     sigla: "SQL",  color: "#00d2fd", glow: "0 0 28px rgba(0,210,253,0.45)",   category: "DATABASE" },
  { label: "KALI LINUX & PENTESTING", sigla: "☠",   color: "#ff716c", glow: "0 0 28px rgba(255,113,108,0.45)", category: "SECURITY" },
];

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // Refs for GSAP targets
  const navRef         = useRef(null);
  const heroTagRef     = useRef(null);
  const heroTitleRef   = useRef(null);
  const heroSubRef     = useRef(null);
  const heroBtnsRef    = useRef(null);
  const skillsRef      = useRef(null);
  const skillBarsRef   = useRef([]);
  const projectsRef    = useRef(null);
  const projectCardsRef = useRef([]);
  const contactRef     = useRef(null);
  const terminalRef    = useRef(null);

  // Dark mode persistence
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // ── GSAP: Hero entrance ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Navbar slide down
      tl.from(navRef.current, { y: -80, opacity: 0, duration: 0.6 });

      // System tag fade in
      tl.from(heroTagRef.current, { opacity: 0, x: -30, duration: 0.5 }, "-=0.2");

      // Title: letters stagger from below
      tl.from(
        gsap.utils.toArray(".hero-char"),
        { y: 80, opacity: 0, stagger: 0.035, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.1"
      );

      // Subtitle word stagger
      tl.from(heroSubRef.current, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

      // CTA buttons
      tl.from(heroBtnsRef.current?.children ? Array.from(heroBtnsRef.current.children) : [], {
        opacity: 0, y: 30, stagger: 0.15, duration: 0.5,
      }, "-=0.2");

      // Glitch loop on title after intro
      tl.call(() => startGlitch());
    });

    return () => ctx.revert();
  }, []);

  // ── GSAP: glitch loop ─────────────────────────────────────────────────────
  function startGlitch() {
    const glitchChars = "!<>-_\\/[]{}—=+*^?#@$%&";
    const titleEl = heroTitleRef.current;
    if (!titleEl) return;

    const loop = gsap.timeline({ repeat: -1, repeatDelay: 4 });
    loop.call(() => {
      let iterations = 0;
      const original = titleEl.dataset.text || titleEl.innerText;
      titleEl.dataset.text = original;

      const interval = setInterval(() => {
        titleEl.innerText = original
          .split("")
          .map((char, i) => {
            if (char === "\n" || char === " ") return char;
            if (i < iterations) return original[i];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join("");
        iterations += 1.5;
        if (iterations >= original.length) {
          clearInterval(interval);
          titleEl.innerText = original;
        }
      }, 40);
    }).to({}, { duration: 1.5 }); // wait between glitches
  }

  // ── GSAP: ScrollTrigger animations ────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Skills section heading
      gsap.from(".skills-heading", {
        scrollTrigger: { trigger: skillsRef.current, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.7, ease: "power3.out",
      });

      // ── Skill bars: stagger + width animate from 0
      skillBarsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 92%" },
          opacity: 0,
          y: 40,
          scale: 0.88,
          duration: 0.5,
          delay: i * 0.07,
          ease: "back.out(1.4)",
        });
      });

      // ── Terminal widget typing
      if (terminalRef.current) {
        const lines = terminalRef.current.querySelectorAll(".term-line");
        gsap.from(lines, {
          scrollTrigger: { trigger: terminalRef.current, start: "top 85%" },
          opacity: 0, y: 8, stagger: 0.25, duration: 0.4, ease: "power1.out",
        });
      }

      // ── Projects section heading
      gsap.from(".projects-heading", {
        scrollTrigger: { trigger: projectsRef.current, start: "top 80%" },
        opacity: 0, y: 50, duration: 0.7, ease: "power3.out",
      });

      // ── Project cards: stagger fan-in
      projectCardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%" },
          opacity: 0,
          y: 60,
          rotateX: 8,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });

      // ── Contact section
      gsap.from(".contact-card", {
        scrollTrigger: { trigger: contactRef.current, start: "top 80%" },
        opacity: 0, scale: 0.95, duration: 0.7, ease: "power3.out",
      });

      // ── Parallax on hero blobs
      gsap.to(".hero-blob-1", {
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
        y: -120, x: 60,
      });
      gsap.to(".hero-blob-2", {
        scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: true },
        y: -80, x: -40,
      });
    });

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────

  const heroTitle = "MARCO DELLA\nVECCHIA";

  return (
    <div className="dark">
      {/* Scanline overlay */}
      <div className="scanline-overlay fixed inset-0 z-[100] pointer-events-none" />

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-[#0e0e13]/80 backdrop-blur-xl border-b border-[#00ff88]/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
      >
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-black tracking-tighter text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            MARCO_DV
          </div>
          <div className="hidden md:flex gap-8 items-center">
            {["home","skills","projects","contact"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="tracking-[0.15rem] uppercase text-sm font-bold text-white/60 hover:text-[#00ff88] transition-colors duration-200"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative">

        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <section className="min-h-screen flex flex-col justify-center items-start px-8 md:px-20 pt-24 relative overflow-hidden" id="home">
          {/* Background blobs */}
          <div className="hero-blob-1 absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[140px] opacity-10 pointer-events-none" />
          <div className="hero-blob-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[140px] opacity-10 pointer-events-none" />

          <div className="z-10 w-full max-w-5xl">
            {/* System tag */}
            <div
              ref={heroTagRef}
              className="mb-5 flex items-center gap-2 text-sm"
              style={{ fontFamily: "IBM Plex Mono, monospace", color: "#00d2fd" }}
            >
              <span className="opacity-40">[SYSTEM_INFO]</span>
              <span className="animate-pulse">access_granted... initializing_profile...</span>
            </div>

            {/* Title — split chars for GSAP stagger + glitch */}
            <h1
              ref={heroTitleRef}
              data-text={heroTitle}
              className="font-black tracking-tighter text-on-background mb-4 leading-[0.95] whitespace-pre-line"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
              }}
            >
              {heroTitle.split("").map((char, i) =>
                char === "\n" ? (
                  <br key={i} />
                ) : (
                  <span key={i} className="hero-char inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                )
              )}
            </h1>

            {/* Subtitle */}
            <p
              ref={heroSubRef}
              className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase mb-12"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                color: "#acaab1",
              }}
            >
              FULL STACK DEVELOPER{" "}
              <span style={{ color: "#00d2fd", opacity: 0.5 }} className="px-2">//</span>{" "}
              ASPIRING PENETRATION TESTER
            </p>

            {/* CTA buttons */}
            <div ref={heroBtnsRef} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-4 font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 transition-all active:scale-95"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  background: "linear-gradient(135deg, #a4ffb9, #00fd87)",
                  color: "#006532",
                  boxShadow: "0 0 20px rgba(164,255,185,0.4)",
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { boxShadow: "0 0 35px rgba(164,255,185,0.7)", scale: 1.03, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { boxShadow: "0 0 20px rgba(164,255,185,0.4)", scale: 1, duration: 0.25 })}
              >
                INITIALIZE_CONTACT <TerminalIcon />
              </a>
              <a
                href="https://github.com/Marcodellavecchia95"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 font-bold uppercase tracking-widest rounded-sm flex items-center justify-center gap-3 transition-all active:scale-95"
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  border: "1px solid rgba(164,255,185,0.3)",
                  color: "#a4ffb9",
                }}
                onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.9)", backgroundColor: "rgba(164,255,185,0.06)", scale: 1.03, duration: 0.25 })}
                onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.3)", backgroundColor: "transparent", scale: 1, duration: 0.25 })}
              >
                VIEW_REPOSITORY <CodeIcon />
              </a>
            </div>
          </div>

          {/* Scroll arrow */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#a4ffb9" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </section>

        {/* ── Skills ─────────────────────────────────────────────────────── */}
        <section
          ref={skillsRef}
          className="py-24 px-8 md:px-20"
          style={{ backgroundColor: "#131319" }}
          id="skills"
        >
          <div className="max-w-7xl mx-auto">
            <div className="skills-heading flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div className="max-w-xl">
                <span
                  className="text-sm tracking-widest uppercase mb-2 block"
                  style={{ fontFamily: "IBM Plex Mono, monospace", color: "#00d2fd" }}
                >
                  RECON_01 // CORE_COMPETENCIES
                </span>
                <h2
                  className="text-4xl md:text-6xl font-black tracking-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd" }}
                >
                  TECHNICAL_STACK
                </h2>
              </div>
              <div
                className="text-sm border-l pl-4 py-2"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b", borderColor: "#48474d" }}
              >
                OS: KALI_LINUX_v2024.1<br />
                KERNEL: 6.6.0-AMD64
              </div>
            </div>

            {/* Skill card grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
              {skills.map((s, i) => (
                <div
                  key={s.label}
                  ref={(el) => (skillBarsRef.current[i] = el)}
                  className="relative flex flex-col items-center justify-center gap-3 p-6 rounded-sm border cursor-default"
                  style={{ backgroundColor: "#19191f", borderColor: "rgba(72,71,77,0.25)" }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, {
                    boxShadow: s.glow,
                    borderColor: s.color + "66",
                    duration: 0.25,
                    ease: "power2.out",
                  })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, {
                    boxShadow: "none",
                    borderColor: "rgba(72,71,77,0.25)",
                    duration: 0.35,
                    ease: "power2.inOut",
                  })}
                >
                  {/* Sigla */}
                  <span
                    className="font-black select-none"
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: "2rem",
                      lineHeight: 1,
                      color: s.color,
                      textShadow: `0 0 14px ${s.color}99`,
                    }}
                  >
                    {s.sigla}
                  </span>
                  {/* Label */}
                  <span
                    className="text-center"
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#f9f5fd",
                    }}
                  >
                    {s.label}
                  </span>
                  {/* Category tag */}
                  <span
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      color: s.color,
                      opacity: 0.5,
                    }}
                  >
                    {s.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Terminal widget — full width */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div />{/* spacer */}
              <div>
                {/* Terminal widget */}
                <div
                  ref={terminalRef}
                  className="p-4 rounded-sm border"
                  style={{ backgroundColor: "#25252d", borderColor: "rgba(72,71,77,0.3)" }}
                >
                  <div className="flex gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff716c" }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#a4ffb9" }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#00d2fd" }} />
                  </div>
                  <div
                    className="text-[11px] leading-relaxed space-y-1"
                    style={{ fontFamily: "IBM Plex Mono, monospace", color: "#acaab1" }}
                  >
                    <p className="term-line" style={{ color: "#a4ffb9" }}>&gt; system_integrity_check --verbose</p>
                    <p className="term-line">&gt; Scanning security protocols...</p>
                    <p className="term-line" style={{ color: "#00d2fd" }}>&gt; OWASP_TOP_10 familiarity established</p>
                    <p className="term-line" style={{ color: "#a4ffb9" }}>&gt; Full-stack architecture validated</p>
                    <p className="term-line cursor-blink">_</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Projects ───────────────────────────────────────────────────── */}
        <section
          ref={projectsRef}
          className="py-24 px-8 md:px-20"
          style={{ backgroundColor: "#0e0e13" }}
          id="projects"
        >
          <div className="max-w-7xl mx-auto">
            <div className="projects-heading text-center mb-16">
              <span
                className="text-sm tracking-widest uppercase mb-2 block"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: "#a4ffb9" }}
              >
                MODULE_02 // DEPLOYED_WORK
              </span>
              <h2
                className="text-4xl md:text-6xl font-black tracking-tight"
                style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd" }}
              >
                FEATURED_PROJECTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((p, i) => (
                <div
                  key={p.title}
                  ref={(el) => (projectCardsRef.current[i] = el)}
                  className={`group relative rounded-sm border glow-border ${p.hoverBorder} transition-colors duration-500`}
                  style={{ backgroundColor: "#1f1f26", borderColor: "rgba(72,71,77,0.2)" }}
                  onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -8, duration: 0.3, ease: "power2.out" })}
                  onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "power2.inOut" })}
                >
                  {p.screenshots ? (
                    <GalleryWithArrows
                      screenshots={p.screenshots}
                      onSelect={setSelectedImage}
                    />
                  ) : (
                    /* Cover singola per gli altri progetti */
                    <div className="h-48 overflow-hidden relative rounded-t-sm">
                      <img
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        src={p.img}
                        alt={p.title}
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, #1f1f26, transparent)" }}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3
                        className="font-bold text-xl"
                        style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd" }}
                      >
                        {p.title}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-1 rounded-sm border ${p.statusClass}`}
                        style={{ fontFamily: "IBM Plex Mono, monospace" }}
                      >
                        {p.status}
                      </span>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed" style={{ color: "#acaab1" }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px]"
                          style={{ fontFamily: "IBM Plex Mono, monospace", color: "#00d2fd" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {p.links.map((l) => (
                        <a
                          key={l.label}
                          href={l.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-xs tracking-widest font-bold uppercase transition-colors"
                          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9" }}
                          onMouseEnter={(e) => gsap.to(e.currentTarget, { color: "#00fd87", x: 3, duration: 0.2 })}
                          onMouseLeave={(e) => gsap.to(e.currentTarget, { color: "#a4ffb9", x: 0, duration: 0.2 })}
                        >
                          {l.label} <ArrowIcon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <section
          ref={contactRef}
          className="py-24 px-8 md:px-20 border-t"
          style={{ backgroundColor: "#131319", borderColor: "rgba(72,71,77,0.15)" }}
          id="contact"
        >
          <div className="max-w-4xl mx-auto">
            <div
              className="contact-card rounded-sm p-8 md:p-12 relative overflow-hidden"
              style={{ backgroundColor: "#25252d" }}
            >
              <div className="relative z-10 text-center">
                <span
                  className="text-sm tracking-widest uppercase mb-4 block"
                  style={{ fontFamily: "IBM Plex Mono, monospace", color: "#00d2fd" }}
                >
                  ESTABLISH_UPLINK
                </span>
                <h2
                  className="text-4xl md:text-5xl font-black tracking-tight mb-8 uppercase"
                  style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd" }}
                >
                  Let's Connect
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div
                    className="p-6 rounded-sm border flex flex-col items-center transition-all duration-300 hover:border-primary/40"
                    style={{ backgroundColor: "rgba(14,14,19,0.5)", borderColor: "rgba(72,71,77,0.2)" }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -4, duration: 0.25 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, duration: 0.3 })}
                  >
                    <span style={{ color: "#a4ffb9" }} className="mb-4"><MailIcon /></span>
                    <span
                      className="text-xs uppercase mb-1"
                      style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}
                    >
                      SECURE_MAIL
                    </span>
                    <a
                      href="mailto:mdellavecchia95@gmail.com"
                      className="font-bold text-base transition-colors"
                      style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#a4ffb9")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#f9f5fd")}
                    >
                      mdellavecchia95@gmail.com
                    </a>
                  </div>
                  <div
                    className="p-6 rounded-sm border flex flex-col items-center transition-all duration-300 hover:border-secondary/40"
                    style={{ backgroundColor: "rgba(14,14,19,0.5)", borderColor: "rgba(72,71,77,0.2)" }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -4, duration: 0.25 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, duration: 0.3 })}
                  >
                    <span style={{ color: "#00d2fd" }} className="mb-4"><PhoneIcon /></span>
                    <span
                      className="text-xs uppercase mb-1"
                      style={{ fontFamily: "IBM Plex Mono, monospace", color: "#76747b" }}
                    >
                      ENCRYPTED_LINE
                    </span>
                    <span
                      className="font-bold text-base"
                      style={{ fontFamily: "Space Grotesk, sans-serif", color: "#f9f5fd" }}
                    >
                      +39 392 726 6095
                    </span>
                  </div>
                </div>
                <div className="flex justify-center gap-5">
                  {[
                    { href: "https://github.com/Marcodellavecchia95", icon: <GithubIcon />, label: "GitHub", hoverColor: "#a4ffb9" },
                    { href: "https://www.linkedin.com/in/marco-della-vecchia-840b7a96/", icon: <LinkedinIcon />, label: "LinkedIn", hoverColor: "#00d2fd" },
                  ].map(({ href, icon, label, hoverColor }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="w-14 h-14 flex items-center justify-center rounded-sm border transition-all active:scale-95"
                      style={{ backgroundColor: "#19191f", borderColor: "rgba(72,71,77,0.2)", color: "#acaab1" }}
                      onMouseEnter={(e) => {
                        gsap.to(e.currentTarget, { scale: 1.12, duration: 0.2 });
                        e.currentTarget.style.color = hoverColor;
                        e.currentTarget.style.borderColor = hoverColor + "55";
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                        e.currentTarget.style.color = "#acaab1";
                        e.currentTarget.style.borderColor = "rgba(72,71,77,0.2)";
                      }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Lightbox ───────────────────────────────────────────────────── */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: "rgba(10,10,15,0.92)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelectedImage(null)}
        >
          {/* Cornice neon */}
          <div
            className="relative max-w-5xl w-full mx-6"
            style={{ boxShadow: "0 0 40px rgba(164,255,185,0.2), 0 0 80px rgba(164,255,185,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra titolo stile terminale */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ backgroundColor: "#19191f", borderBottom: "1px solid rgba(164,255,185,0.15)" }}
            >
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff716c" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#a4ffb9" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#00d2fd" }} />
              </div>
              <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#76747b", letterSpacing: "0.1em" }}>
                SCREENSHOT_VIEWER // ESC TO CLOSE
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", color: "#76747b", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff716c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#76747b")}
              >
                [X]
              </button>
            </div>
            <img
              src={selectedImage}
              alt="screenshot ingrandito"
              className="w-full block"
              style={{ maxHeight: "80vh", objectFit: "contain", backgroundColor: "#0e0e13" }}
            />
          </div>
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer
        className="w-full border-t"
        style={{ backgroundColor: "#0e0e13", borderColor: "rgba(164,255,185,0.05)" }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-10 gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span
              className="font-bold uppercase tracking-widest"
              style={{ fontFamily: "Space Grotesk, sans-serif", color: "#a4ffb9" }}
            >
              MARCO DELLA VECCHIA
            </span>
            <span className="text-white/20 hidden md:inline">|</span>
            <p
              className="text-[10px] tracking-widest uppercase"
              style={{ fontFamily: "IBM Plex Mono, monospace", color: "rgba(255,255,255,0.25)" }}
            >
              © {new Date().getFullYear()} // TERMINAL_ACCESS_GRANTED
            </p>
          </div>
          <div className="flex gap-8">
            {[
              { label: "GITHUB", href: "https://github.com/Marcodellavecchia95" },
              { label: "LINKEDIN", href: "https://www.linkedin.com/in/marco-della-vecchia-840b7a96/" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] tracking-widest uppercase transition-colors"
                style={{ fontFamily: "IBM Plex Mono, monospace", color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#00d2fd")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
