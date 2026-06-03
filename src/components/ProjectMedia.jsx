import { useState } from "react";
import gsap from "gsap";

const AMBER = "#E0A24E";
const SURFACE = "#1B1A1E";
const LINE = "rgba(142,137,128,0.3)";
const LINE_HOVER = "rgba(224,162,78,0.7)";

// ─── Gallery con frecce ────────────────────────────────────────────────────────
export function GalleryWithArrows({ screenshots, onSelect, height = "160px" }) {
  const [idx, setIdx] = useState(0);
  const total = screenshots.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative" style={{ backgroundColor: SURFACE }}>
      {/* Immagine corrente */}
      <div
        className="overflow-hidden"
        style={{ height, cursor: "pointer" }}
        onClick={() => onSelect(screenshots[idx])}
      >
        <img
          src={screenshots[idx]}
          alt={`screenshot ${idx + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.9, transition: "opacity 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.9)}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(27,26,30,0.55) 0%, transparent 55%)" }} />
      </div>

      {/* Frecce */}
      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all"
        style={{ backgroundColor: "rgba(15,14,17,0.8)", border: `1px solid ${LINE}`, color: AMBER }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: LINE_HOVER, duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: LINE, duration: 0.2 })}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full transition-all"
        style={{ backgroundColor: "rgba(15,14,17,0.8)", border: `1px solid ${LINE}`, color: AMBER }}
        onMouseEnter={(e) => gsap.to(e.currentTarget, { borderColor: LINE_HOVER, duration: 0.2 })}
        onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: LINE, duration: 0.2 })}
      >
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-3">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            style={{
              width: i === idx ? "18px" : "6px",
              height: "4px",
              borderRadius: "2px",
              backgroundColor: i === idx ? AMBER : "rgba(142,137,128,0.3)",
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

// ─── Lightbox ──────────────────────────────────────────────────────────────────
export function Lightbox({ image, onClose }) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "rgba(10,9,12,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full mx-6 rounded-lg overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6)", border: "1px solid rgba(142,137,128,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: SURFACE, borderBottom: `1px solid rgba(142,137,128,0.2)` }}
        >
          <span style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.65rem", color: "#8E8980", letterSpacing: "0.1em" }}>
            screenshot — esc per chiudere
          </span>
          <button
            onClick={onClose}
            style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", color: "#8E8980", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = AMBER)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8E8980")}
          >
            chiudi ✕
          </button>
        </div>
        <img
          src={image}
          alt="screenshot ingrandito"
          className="w-full block"
          style={{ maxHeight: "80vh", objectFit: "contain", backgroundColor: "#0F0E11" }}
        />
      </div>
    </div>
  );
}
