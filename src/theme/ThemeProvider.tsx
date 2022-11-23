/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';

import themeCreator from './base';

export const ThemeContext = React.createContext((_: string): void => {});

type Props = {
  children: React.ReactNode;
};

const ThemeProviderWrapper = ({ children }: Props) => {
  const currentTheme = localStorage.getItem('theme') || 'DarkTheme';
  const [theme, setTheme] = useState(themeCreator(currentTheme));

  const setThemeName = useCallback((themeName: string): void => {
    localStorage.setItem('theme', themeName);
    setTheme(themeCreator(themeName));
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
