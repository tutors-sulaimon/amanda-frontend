import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/global.css";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import language_en from "./components/locales/en/language.json";
import language_es from "./components/locales/es/language.json";
import { I18nextProvider } from "react-i18next";

const storedLanguage = localStorage.getItem("language") || "es"; // Default to Spanish

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: storedLanguage, // Set initial language from localStorage
  fallbackLng: "es", // Fallback to Spanish if language is missing
  resources: {
    en: {
      translation: language_en,
    },
    es: {
      translation: language_es,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>,
);
