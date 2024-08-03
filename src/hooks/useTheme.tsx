import { useEffect } from 'react';

import useLocalStorage from './useLocalStorage';

const THEME_KEY = 'light';

export enum ThemeTypes {
  LIGHT = 'light',
  DARK = 'dark',
}

const getPreferredTheme = (): ThemeTypes => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return ThemeTypes.DARK;
  }
  return ThemeTypes.LIGHT;
};

const useTheme = (): [ThemeTypes, () => void] => {
  const [theme, setTheme] = useLocalStorage<ThemeTypes>(
    THEME_KEY,
    getPreferredTheme()
  );

  const toggleTheme = () => {
    if (theme === ThemeTypes.DARK) {
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
    setTheme(theme === ThemeTypes.LIGHT ? ThemeTypes.DARK : ThemeTypes.LIGHT);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      const newPreferredTheme = event.matches
        ? ThemeTypes.DARK
        : ThemeTypes.LIGHT;
      setTheme(newPreferredTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return [theme, toggleTheme];
};

export default useTheme;
