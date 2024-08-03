import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import useTheme, { ThemeTypes } from './hooks/useTheme';

const Theme = ({ children }) => {
  const [theme] = useTheme();

  useEffect(() => {
    if (theme === ThemeTypes.DARK) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  });

  return <ThemeProvider theme={{ mode: theme }}>{children}</ThemeProvider>;
};

export default Theme;
