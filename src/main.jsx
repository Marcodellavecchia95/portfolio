import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/index.css";
import App from "./App.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import { useHashRoute } from "./hooks/useHashRoute.js";
import { LangProvider } from "./i18n.jsx";

function Router() {
  const route = useHashRoute();

  if (route.name === "project") {
    return <ProjectDetail slug={route.params.slug} />;
  }
  return <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <Router />
    </LangProvider>
  </StrictMode>
);
