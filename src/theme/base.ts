import { Theme } from '@mui/material';
import LightTheme from './schemes/LightTheme';
import DarkTheme from './schemes/DarkTheme';

const themeMap: { [key: string]: Theme } = {
  LightTheme,
  DarkTheme,
};

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      blue1: string;
      blue2: string;
      blue3: string;
      blue4: string;
      green1: string;
      green2: string;
      green3: string;
      green4: string;
      orange1: string;
      orange2: string;
      orange3: string;
      orange4: string;
      yellow1: string;
      yellow2: string;
      yellow3: string;
      yellow4: string;
      purple1: string;
      purple2: string;
      purple3: string;
      purple4: string;
      teal1: string;
      teal2: string;
      teal3: string;
      teal4: string;
      black1: string;
      white1: string;
    };
  }

  interface ThemeOptions {
    colors: {
      blue1: string;
      blue2: string;
      blue3: string;
      blue4: string;
      green1: string;
      green2: string;
      green3: string;
      green4: string;
      orange1: string;
      orange2: string;
      orange3: string;
      orange4: string;
      yellow1: string;
      yellow2: string;
      yellow3: string;
      yellow4: string;
      purple1: string;
      purple2: string;
      purple3: string;
      purple4: string;
      teal1: string;
      teal2: string;
      teal3: string;
      teal4: string;
      black1: string;
      white1: string;
    };
  }
}

export default function themeCreator(theme: string): Theme {
  return themeMap[theme];
}
