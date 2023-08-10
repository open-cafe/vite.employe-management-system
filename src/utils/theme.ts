import { createTheme } from '@mui/material';

const theme = createTheme({
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: '5px',
          color: 'red !important',
        },
      },
    },
  },
});
export default theme;
