import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import createTheme from './globalTheme';
export interface LayoutProps {
  children: React.ReactNode;
}

const ThemeWrapper = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default ThemeWrapper;
