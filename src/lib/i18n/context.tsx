"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  type Locale,
  DEFAULT_LOCALE,
  LOCALES,
  getTranslation,
  productTranslations,
} from "./translations";

/** Returns the translated field for a product, falling back to the English original */
function getProductField(locale: Locale, productId: string, field: "name" | "shortName" | "description", fallback: string): string {
  const pt = productTranslations[productId];
  if (!pt) return fallback;
  return pt[field]?.[locale] ?? fallback;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  /** Translate a product field: tp(productId, "name" | "shortName" | "description", englishFallback) */
  tp: (productId: string, field: "name" | "shortName" | "description", fallback: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "sukaj-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage / cookie on client mount only.
  // SSR always renders DEFAULT_LOCALE (sq) — preventing hydration mismatch.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && (LOCALES as readonly string[]).includes(stored)) {
        setLocaleState(stored as Locale);
      }
    } catch {
      // localStorage may be blocked — silently use default
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = next;
    }
  }, []);

  const t = useCallback(
    (key: string) => getTranslation(locale, key),
    [locale],
  );

  const tp = useCallback(
    (productId: string, field: "name" | "shortName" | "description", fallback: string) =>
      getProductField(locale, productId, field, fallback),
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tp }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    // Server-render path or missing provider — return default-locale fallback
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key: string) => getTranslation(DEFAULT_LOCALE, key),
      tp: (productId: string, field: "name" | "shortName" | "description", fallback: string) =>
        getProductField(DEFAULT_LOCALE, productId, field, fallback),
    };
  }
  return ctx;
}

/** Re-exports for convenience */
export { LOCALES, DEFAULT_LOCALE };
export type { Locale };
