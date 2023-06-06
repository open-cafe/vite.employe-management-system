import { LockOutlined, Password } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Snackbar,
  Alert,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { setCookie } from '../../utils/authCookies';
import { useForm } from 'react-hook-form';
import { cookieName } from '../../constants/environment';
import { useState } from 'react';
import LoginLayout from '@/layout/LoginLayout';
import useAuth from '@/hooks/useAuth';
import useCurrentUser from '@/hooks/useCurrentUser';
import { DevTool } from '@hookform/devtools';
import schema from './LoginSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const Login = () => {
  type formValues = {
    email: string;
    password: string;
  };

  const form = useForm<formValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors, isSubmitting, isValid } = formState;

  const navigate = useNavigate();
  const { loginAction, loginLoading } = useAuth();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const onSubmit = (data: formValues) => {
    const loginCredentials = {
      email: data.email,
      password: data.password,
    };
    loginAction(loginCredentials, {
      onSuccess: (value) => {
        if (value) {
          setCookie(cookieName, value?.data?.data?.access_token);
          if (value?.data?.data?.role === 'Employee') {
            if (value?.data?.data?.employeeDetail) {
              navigate(`/`);
            } else {
              navigate('/employeeonboarding');
            }
          } else {
            navigate(`/`);
          }
        }
      },
      onError: (data) => {
        setAlertSeverity('error');
        setAlertMessage('email or password is incorrect');
        setAlertOpen(true);
      },
    });
  };

  return (
    <LoginLayout>
      <Card
        variant="outlined"
        sx={{
          m: 'auto',
          mt: '10%',
          maxWidth: '400px',
          borderRadius: '20px',
          p: '30px',
        }}
      >
        <Box>
          <Avatar sx={{ m: 'auto', background: '#FFA086' }}>
            <LockOutlined />
          </Avatar>
          <CardContent>
            <Box>
              <Box>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <Box sx={{ minWidth: '300px', maxWidth: '350px' }}>
                    <TextField
                      margin="normal"
                      id="email"
                      label="Email Address"
                      autoComplete="email"
                      {...register('email')}
                      fullWidth
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '14px', color: 'red' }}
                    >
                      {errors.email?.message}
                    </Typography>
                  </Box>

                  <Box sx={{ minWidth: '200px', maxWidth: '350px' }}>
                    <TextField
                      margin="normal"
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      {...register('password')}
                      fullWidth
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '14px', color: 'red' }}
                    >
                      {errors.password?.message}
                    </Typography>
                  </Box>

                  <Button
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log In
                  </Button>
                </form>

                <Grid container>
                  <Grid item xs>
                    <Link to="/sendresetpasswordmail">Forgot password?</Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <DevTool control={control} />
    </LoginLayout>
  );
};

export default Login;
