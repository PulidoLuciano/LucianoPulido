import en from "./en.json";
import es from "./es.json";

const dictionaries = { en, es };

/**
 * High-performance, compile-time translation hook for Astro templates.
 * Resolves static UI components safely based on current locale string.
 */
export function useTranslations(locale: string) {
  // Fallback cleanly to default English configuration if locale is missing
  const selectedLang = (
    locale === "es" ? "es" : "en"
  ) as keyof typeof dictionaries;
  const dictionary = dictionaries[selectedLang];

  return function t(keyPath: string): string {
    return keyPath.split(".").reduce((obj: any, key) => {
      return obj && obj[key] !== undefined ? obj[key] : keyPath;
    }, dictionary);
  };
}
