import { colors } from './colors';
import { ThemeType } from './ThemeContext';
import { IScTheme } from './types';

export const Themes: Record<ThemeType, IScTheme> = {
  [ThemeType.LIGHT]: {
    name: ThemeType.LIGHT,
    colors: colors[ThemeType.LIGHT]
  }
};

export * from './ThemeContext';
