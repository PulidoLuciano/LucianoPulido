import en from "./en.json";
import es from "./es.json";

const dictionaries = { en, es };

export const locales = Object.keys(dictionaries) as Array<keyof typeof dictionaries>;
export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function useTranslations(locale: string) {
  const selectedLang = isValidLocale(locale) ? locale : defaultLocale;
  const dictionary = dictionaries[selectedLang];

  return function t(keyPath: string): string {
    return keyPath.split(".").reduce((obj: any, key) => {
      return obj && obj[key] !== undefined ? obj[key] : keyPath;
    }, dictionary);
  };
}

export function getLocaleFromUrl(pathname: string): Locale {
  const [, segment] = pathname.split("/");
  return isValidLocale(segment) ? segment : defaultLocale;
}

export function getLocalizedUrl(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return "/" + segments.join("/");
}
