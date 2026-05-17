import { en } from "./en";
import { es } from "./es";

export type Locale = "en" | "es";

export const dictionaries = { en, es };

export function readStoredLocale(): Locale {
  const stored = window.localStorage.getItem("playbookops-locale");
  return stored === "es" || stored === "en" ? stored : "en";
}

export function writeStoredLocale(locale: Locale) {
  window.localStorage.setItem("playbookops-locale", locale);
}
