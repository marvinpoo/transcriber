import React from 'react';
import { Languages } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface LanguageToggleProps {
  inputLang: string;
  outputLang: string;
  translateEnabled: boolean;
  onTranslateToggle: (enabled: boolean) => void;
  onInputLangChange: (lang: string) => void;
  onOutputLangChange: (lang: string) => void;
}

const LANGUAGES = {
  en: "English",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese"
};

export function LanguageToggle({ 
  inputLang, 
  outputLang, 
  translateEnabled,
  onTranslateToggle,
  onInputLangChange, 
  onOutputLangChange 
}: LanguageToggleProps) {
  const { t } = useTranslation();

  return (
    <div className="language-toggle">
      <div className="language-toggle__select-group">
        <label htmlFor="inputLang">{t('inputLanguage')}</label>
        <select
          id="inputLang"
          value={inputLang}
          onChange={(e) => onInputLangChange(e.target.value)}
        >
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="language-toggle__translate-toggle">
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={translateEnabled}
            onChange={(e) => onTranslateToggle(e.target.checked)}
          />
          <span className="toggle-slider" />
          <span className="toggle-label">{t('enableTranslation')}</span>
        </label>
      </div>
      
      {translateEnabled && <div className="language-toggle__select-group">
        <label htmlFor="outputLang">{t('outputLanguage')}</label>
        <select
          id="outputLang"
          value={outputLang}
          onChange={(e) => onOutputLangChange(e.target.value)}
        >
          {Object.entries(LANGUAGES).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>}
    </div>
  );
}