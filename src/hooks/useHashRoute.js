import { useState, useEffect } from "react";

// Router hash-based minimale.
// Le route applicative usano il prefisso "#/" (es. "#/project/wink-admin-agent"),
// così gli anchor di scroll della home ("#home", "#skills", ...) restano intatti.

export function parseHash() {
  const raw = window.location.hash || "";
  // Solo gli hash che iniziano con "#/" sono route; il resto è scroll-anchor.
  if (!raw.startsWith("#/")) return { name: "home", params: {} };

  const path = raw.slice(2); // togli "#/"
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "project" && segments[1]) {
    return { name: "project", params: { slug: decodeURIComponent(segments[1]) } };
  }
  return { name: "home", params: {} };
}

export function navigate(to) {
  window.location.hash = to;
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}
