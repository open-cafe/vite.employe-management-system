import { red } from '@mui/material/colors';

const createThemeComponents = () => ({
  MuiInputBase: {
    styleOverrides: {
      root: {
        '&.MuiFormHelperText-root': {
          color: 'red !important',
        },
      },
      input: {
        '&::placeholder': {
          color: '#A6A5A5',
          fontWeight: 500,
          fontSize: '12px',
        },
        '&[type=number]': {
          MozAppearance: 'textfield',
        },
        '&::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '&::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
    error: {
      '&.MuiFormHelperText-root': {
        color: red,
      },
    },
  },
});

export default createThemeComponents;
