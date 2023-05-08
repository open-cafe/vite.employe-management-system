import MainLayout from '../MainLayout';
import Grid from '@mui/material/Grid';
import { LayoutProps } from '@/utils/themeWrapper';

const LoginLayout = ({ children }: LayoutProps) => {
  return (
    <MainLayout>
      <Grid container>{children}</Grid>
    </MainLayout>
  );
};

export default LoginLayout;
