import React, { useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTranslation } from '../hooks/useTranslation';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'system');
  const { t } = useTranslation();

  const applyTheme = (newTheme: Theme) => {
    const isDark = newTheme === 'system' 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : newTheme === 'dark';
    
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  };

  useEffect(() => {
    applyTheme(theme);
    
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme('system');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const nextTheme = (): Theme => {
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    return themes[(currentIndex + 1) % themes.length];
  };

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(nextTheme())}
      aria-label={t(theme === 'light' ? 'darkMode' : 'lightMode')}
    >
      {theme === 'light' && <Sun size={20} />}
      {theme === 'dark' && <Moon size={20} />}
      {theme === 'system' && <Monitor size={20} />}
    </button>
  );
}