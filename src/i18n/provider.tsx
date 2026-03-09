'use client';

import {
  useCallback,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import {
  isLocale,
  Locale,
  LOCALE_STORAGE_KEY,
  resolvePreferredLocale,
} from '@/i18n/locale';
import { getLocaleMessages, TarotMessages } from '@/i18n/messages';

interface TarotI18nContextValue {
  locale: Locale;
  messages: TarotMessages;
  setLocale: (locale: Locale) => void;
}

const TarotI18nContext = createContext<TarotI18nContextValue | null>(null);
const localeListeners = new Set<() => void>();

function subscribeToLocale(listener: () => void) {
  localeListeners.add(listener);
  return () => localeListeners.delete(listener);
}

function getLocaleSnapshot(): Locale {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  return resolvePreferredLocale({
    storedLocale: window.localStorage.getItem(LOCALE_STORAGE_KEY),
    browserLocale: window.navigator.language,
  });
}

function getLocaleServerSnapshot(): Locale {
  return 'zh';
}

function notifyLocaleChange() {
  localeListeners.forEach((listener) => listener());
}

function syncDocumentMetadata(locale: Locale, messages: TarotMessages) {
  document.documentElement.lang = locale;
  document.title = messages.metadata.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', messages.metadata.description);
  }
}

export function TarotI18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot
  );

  const setLocale = useCallback((nextLocale: Locale) => {
    if (!isLocale(nextLocale) || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    notifyLocaleChange();
  }, []);

  const messages = useMemo(() => getLocaleMessages(locale), [locale]);

  useEffect(() => {
    syncDocumentMetadata(locale, messages);
    const metadataTimer = window.setTimeout(() => {
      syncDocumentMetadata(locale, messages);
    }, 50);

    return () => {
      window.clearTimeout(metadataTimer);
    };
  }, [locale, messages]);

  const value = useMemo(
    () => ({
      locale,
      messages,
      setLocale,
    }),
    [locale, messages, setLocale]
  );

  return (
    <TarotI18nContext.Provider value={value}>
      <NextIntlClientProvider locale={locale} messages={messages as never}>
        {children}
      </NextIntlClientProvider>
    </TarotI18nContext.Provider>
  );
}

export function useTarotI18n() {
  const context = useContext(TarotI18nContext);

  if (!context) {
    throw new Error('useTarotI18n must be used within TarotI18nProvider');
  }

  return context;
}
