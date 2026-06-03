import { useState } from "react";
import gsap from "gsap";

// ─── Gallery con frecce ────────────────────────────────────────────────────────
export function GalleryWithArrows({ screenshots, onSelect, height = "160px" }) {
  const [idx, setIdx] = useState(0);
  const total = screenshots.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="relative" style={{ backgroundColor: "#131319" }}>
      {/* Immagine corrente */}
      <div
        className="overflow-hidden"
        style={{ height, cursor: "pointer" }}
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
        onMouseLeave={(e) => gsap.to(e.currentTarget, { borderColor: "rgba(164,255,185,0.2)", duration: 0.2 })}
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

// ─── Lightbox ──────────────────────────────────────────────────────────────────
export function Lightbox({ image, onClose }) {
  if (!image) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "rgba(10,10,15,0.92)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
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
            onClick={onClose}
            style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "0.7rem", color: "#76747b", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.1em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff716c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#76747b")}
          >
            [X]
          </button>
        </div>
        <img
          src={image}
          alt="screenshot ingrandito"
          className="w-full block"
          style={{ maxHeight: "80vh", objectFit: "contain", backgroundColor: "#0e0e13" }}
        />
      </div>
    </div>
  );
}
