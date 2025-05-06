import { useLocalStorage } from './useLocalStorage';
import { de } from '../locales/de';
import { en } from '../locales/en';
import { createContext, useContext, ReactNode } from 'react';

const translations = { de, en };
type Language = 'de' | 'en';

interface TranslationContextType {
  t: (key: keyof typeof de) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>('language', 'de');
  
  const t = (key: keyof typeof de) => {
    return translations[language]?.[key] || key;
  };
  
  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  const { t, language, setLanguage } = context;
  return { t, language, setLanguage };
}