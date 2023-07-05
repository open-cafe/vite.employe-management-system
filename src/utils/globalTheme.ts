import { createTheme as createMuiTheme } from '@mui/material';
import { useMemo } from 'react';
import createThemeComponents from './themeComponents';

const createTheme = () => {
  // Create base theme

  const baseTheme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: '#36454f',
          },
          secondary: {
            main: '#f7f7f7',
          },
          info: {
            main: '#596167',
          },
        },
        typography: {
          fontFamily: 'Nunito, sans-serif',
        },
        components: {
          MuiInputBase: {
            styleOverrides: {
              root: {
                '&.MuiFormHelperText-root': {
                  color: 'red !important',
                },
              },
            },
          },
        },
      }),
    []
  );

  // const baseTheme = createMuiTheme({
  //   palette,
  // });

  // Inject base theme to be used in components
  return createMuiTheme(
    {
      // components: createThemeComponents(baseTheme) as any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      components: createThemeComponents() as any,
    },
    baseTheme
  );
};

export default createTheme;
