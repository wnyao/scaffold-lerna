import { ThemeType } from './ThemeContext';

export const colors: Record<ThemeType, Record<string, string>> = {
  [ThemeType.LIGHT]: {
    primary: '#fff',

    black: '#0c0000',
    white: '#ffffff',
    red: '#cc0403',

    gray1: '#222',
    gray2: '#888'
  }
};
