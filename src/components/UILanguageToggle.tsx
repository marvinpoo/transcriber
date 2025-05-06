import React, { useCallback } from 'react';
import { Globe2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

type Language = 'de' | 'en';

export function UILanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const handleLanguageToggle = useCallback(() => {
    const newLanguage: Language = language === 'de' ? 'en' : 'de';
    setLanguage(newLanguage);
  }, [language, setLanguage]);

  return (
    <button
      className="ui-language-toggle"
      onClick={handleLanguageToggle}
      aria-label={`Switch to ${language === 'de' ? 'English' : 'German'}`}
    >
      <Globe2 size={20} />
      <span>{language.toUpperCase()}</span>
    </button>
  );
}