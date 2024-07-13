import { useState, useEffect } from 'react';

const THEME_KEY = 'app-theme';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

const getPreferredTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return Theme.DARK;
  }
  return Theme.LIGHT;
};

const useTheme = (): [Theme, () => void] => {
  const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  const [theme, setTheme] = useState<Theme>(storedTheme || getPreferredTheme());

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  useEffect(() => {
    if (!storedTheme) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (event: MediaQueryListEvent) => {
        const newPreferredTheme = event.matches ? Theme.DARK : Theme.LIGHT;
        setTheme(newPreferredTheme);
        localStorage.setItem(THEME_KEY, newPreferredTheme);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [storedTheme]);

  return [theme, toggleTheme];
};

export default useTheme;