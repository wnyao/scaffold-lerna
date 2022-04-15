import { ThemeType } from './ThemeContext';

export interface IScTheme {
  name: ThemeType;
  colors: Record<string, string>;
}

export interface IScThemes {
  [key: string]: IScTheme;
}
