import React, { FC, createContext, useContext, useEffect, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import { IScTheme } from './types';
import { Themes } from '.';

export enum ThemeType {
  LIGHT = 'LIGHT'
}

interface IThemeContext {
  theme: ThemeType;
  themeProps: IScTheme | undefined;
  colors: Record<string, string>;
  setTheme: (theme: ThemeType) => void;
}

const defaultContextData = {
  theme: ThemeType.LIGHT,
  themeProps: undefined,
  colors: {},
  setTheme: () => {}
};

const ThemeContext = createContext<IThemeContext>(defaultContextData);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: FC = ({ children }) => {
  const [hasThemeMounted, setThemeMounted] = useState(false);
  const [theme, setTheme] = useState(ThemeType.LIGHT);

  const themeProps = Themes[theme];
  const { colors } = themeProps;

  const changeTheme = (theme: ThemeType) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const localTheme = (window.localStorage.getItem('theme') as ThemeType) || ThemeType.LIGHT;

    if (localTheme) {
      setTheme(localTheme);
      setThemeMounted(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.id = `theme-${theme.toLocaleLowerCase()}`;
  }, [theme]);

  if (!hasThemeMounted) {
    return <div />;
  }

  return (
    <StyledThemeProvider theme={themeProps}>
      <ThemeContext.Provider value={{ theme, themeProps, colors, setTheme: changeTheme }}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
