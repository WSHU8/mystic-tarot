export type Locale = 'zh' | 'en';

export const LOCALE_STORAGE_KEY = 'mystic-tarot-locale';

export function isLocale(value: unknown): value is Locale {
  return value === 'zh' || value === 'en';
}

export function normalizeLocale(value?: string | null): Locale | undefined {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();

  if (normalized.startsWith('en')) {
    return 'en';
  }

  if (normalized.startsWith('zh')) {
    return 'zh';
  }

  return undefined;
}

export function resolvePreferredLocale({
  storedLocale,
  browserLocale,
  defaultLocale = 'zh',
}: {
  storedLocale?: string | null;
  browserLocale?: string | null;
  defaultLocale?: Locale;
}): Locale {
  return normalizeLocale(storedLocale) ?? normalizeLocale(browserLocale) ?? defaultLocale;
}

export function getBrowserLocale(browserLocale?: string | null): Locale {
  return resolvePreferredLocale({ browserLocale });
}
