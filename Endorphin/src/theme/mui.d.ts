// emotion.d.ts
import '@emotion/react';

declare module '@mui/material/styles' {
  interface Palette {
    // cardButton: {
    //   main: string;
    //   light: string;
    //   dark: string;
    //   contrastText: string;
    // };

    cardButton: Palette['primary'];
    secondaryBgColors: Palette['primary'];
    primaryColors: Palette['primary'];
    secondaryColors: Palette['primary'];
    selectedColors: Palette['primary'];
    primaryBgColors: Palette['primary'];
    defaultColors: Palette['primary'];
    cardsBg: Palette['primary'];
    mainBgColors: Palette['primary'];
    navColors: Palette['primary'];
  }

  interface PaletteOptions {
    cardButton?: PaletteOptions['primary'];
    secondaryBgColors?: PaletteOptions['primary'];
    primaryColors?: PaletteOptions['primary'];
    secondaryColors?: PaletteOptions['primary'];
    selectedColors?: PaletteOptions['primary'];
    primaryBgColors?: PaletteOptions['primary'];
    defaultColors?: PaletteOptions['primary'];
    cardsBg?: PaletteOptions['primary'];
    mainBgColors?: PaletteOptions['primary'];
    navColors?: PaletteOptions['primary'];
  }
}
