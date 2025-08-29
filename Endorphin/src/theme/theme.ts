import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  cssVariables: true,

  typography: {
    fontFamily: ['Montserrat', 'serif'].join(','),
    fontSize: 16,
  },

  palette: {
    mode: 'light',

    primary: {
      main: '#282735ff',
    },
    primaryColors: {
      main: '#282735ff',
      light: '#fff',
    },

    secondaryColors: {
      main: '#71717aff',
      light: '#71717a45',
    },

    selectedColors: {
      main: '#7c3bedff',
    },

    defaultColors: {
      main: '#282735ff',
    },

    info: {
      main: '#6c11c1ff',
    },

    mainBgColors: {
      main: '#21212cff',
    },

    primaryBgColors: {
      main: '#F5F3F6',
      light: '#E2DCE5',
    },

    secondaryBgColors: {
      main: '#7c3aed',
      light: '#e2dce5ff',
    },

    navColors: {
      main: '#F0EDF2',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          maxWidth: '1400px',
          margin: '0 auto',
          fontFamily: ['Montserrat', 'serif'].join(','),
        },
        body: {
          fontFamily: ['Montserrat', 'serif'].join(','),
          fontSize: '16px',
          lineHeight: 1.5,
          fontWeight: 400,
          backgroundColor: '#FAF9FB',

          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 12px',
          position: 'relative',

          height: '100%',
          width: '100%',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        'a:visited': {
          color: 'inherit !important',
        },
        h1: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h2: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h3: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h4: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h5: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h6: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  cssVariables: true,

  typography: {
    fontFamily: ['Montserrat', 'serif'].join(','),
    fontSize: 16,
  },

  palette: {
    mode: 'dark',

    primary: {
      main: '#ffffffff',
    },

    primaryColors: {
      main: '#352727ff',
      light: '#fff',
    },

    secondaryColors: {
      main: '#71717aff',
      light: '#71717a45',
    },

    defaultColors: {
      main: '#ffffffff',
    },

    selectedColors: {
      main: '#7c3bedff',
    },

    primaryBgColors: {
      main: '#05050fff',
      light: '#282735',
    },

    info: {
      main: '#6c11c1ff',
    },

    secondaryBgColors: {
      main: '#7c3aed',
      light: '#e2dce5ff',
      dark: '#282735ff',
    },

    navColors: {
      main: '#1B1A23',
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          maxWidth: '1400px',
          margin: '0 auto',
          fontFamily: ['Montserrat', 'serif'].join(','),
        },
        body: {
          fontFamily: ['Montserrat', 'serif'].join(','),
          fontSize: '16px',
          lineHeight: 1.5,
          fontWeight: 400,
          backgroundColor: '#0E0E11',

          maxWidth: '100%',
          margin: '0 auto',
          padding: '0 8px',
          position: 'relative',

          height: '100%',
          width: '100%',
        },
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
        'a:visited': {
          color: 'inherit !important',
        },
        h1: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h2: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h3: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h4: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h5: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
        h6: {
          fontSize: 'inherit',
          fontWeight: 'inherit',
        },
      },
    },
  },
});
