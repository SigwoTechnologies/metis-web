import { createTheme } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
import '@mui/lab/themeAugmentation';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#4cb600',
      light: '#6FC433',
      dark: '#357F00',
      contrastText: '#000000',
    },
    secondary: {
      main: '#e55c01',
      light: '#EA7C33',
      dark: '#A04000',
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#3c3c3c',
    },
    text: {
      primary: '#FFFFFF',
      //   light: '#6FC433',
      //   dark: '#357F00',
      //   contrastText: '#000000',
    },
    error: {
      main: '#f95849',
      light: '#FA796D',
      dark: '#AE3D33',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#ffae30',
      light: '#FFBE59',
      dark: '#B27921',
      contrastText: '#000000',
    },
    info: {
      main: '#1fb6ff',
      light: '#4BC4FF',
      dark: '#157FB2',
      contrastText: '#000000',
    },
    success: {
      main: '#60d956',
      light: '#7FE077',
      dark: '#43973C',
      contrastText: '#000000',
    },
    divider: '#3e3e3e',
  },
  colors: {
    blue1: '#009EEB',
    blue2: '#89DCFF',
    blue3: '#89DCFF',
    blue4: '#B7EAFB',
    green1: '#44C553',
    green2: '#60D956',
    green3: '#87DC72',
    green4: '#ADEA9E',
    green5: '#CFF4D2',
    orange1: '#FD6F3C',
    orange2: '#FF977A',
    orange3: '#FFB6A1',
    orange4: '#FFCEBD',
    yellow1: '#A36300',
    yellow2: '#FFAE30',
    yellow3: '#FFC772',
    yellow4: '#FFD79B',
    purple1: '#AD6EDD',
    purple2: '#C896EA',
    purple3: '#D6AFF1',
    purple4: '#DFC7F0',
    teal1: '#60D2C9',
    teal2: '#8FDFDA',
    teal3: '#BBEDED',
    teal4: '#DDF6F6',
    black1: '#000000',
    white1: '#FFFFFF',
  },
  typography: {
    fontFamily: '"Helvetica", "Arial", sans-serif',
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
};

export default createTheme(themeOptions);
