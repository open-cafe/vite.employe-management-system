import useResetPassword from '@/hooks/useResetPassword';

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonStyles from '@/style/Common.styles';
import { AxiosError } from 'axios';
import { verifyToken } from '@/hooks/useVerifyToken/request';
import useVerifyToken from '@/hooks/useVerifyToken';
import schema from './ResetPasswordSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

interface ErrorData {
  errorObj: {
    message: string;
    // other properties, if applicable
  };
}

type formValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const form = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { register, control, reset, formState, handleSubmit } = form;
  const { errors, isValid } = formState;

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserID] = useState<string | null>(null);

  const { resetPasswordChangeAction, resetPasswordchangeLoading } =
    useResetPassword();
  const { verifyTokenAction, verifyTokenLoading } = useVerifyToken();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenEncoded = urlParams.get('token');
    const userIdEncoded = urlParams.get('userId');

    if (userIdEncoded && tokenEncoded) {
      const userId = atob(userIdEncoded);
      const tokenValue = atob(tokenEncoded);
      const verifyTokenCredentials = {
        userId: userId,
      };
      verifyTokenAction(verifyTokenCredentials, {
        onError: (error) => {
          const axiosError = error as AxiosError;

          setAlertSeverity('error');
          setAlertMessage(
            (axiosError.response?.data as ErrorData)?.errorObj?.message
          );
          setAlertOpen(true);
        },
      });
      setUserID(userId);
      setToken(tokenValue);
    }
  }, []);

  console.log(errors);

  const onSubmit = async (data: formValues) => {
    console.log(data);
    const resetPassowrdCredentials = {
      password: data.newPassword,
      token: token as string,
      userId: userId as string,
    };

    if (data.newPassword === data.confirmPassword) {
      resetPasswordChangeAction(resetPassowrdCredentials, {
        onSuccess: (data) => {
          navigate('/login');
        },
        onError: (error) => {
          const axiosError = error as AxiosError;

          setAlertSeverity('error');
          setAlertMessage(
            (axiosError.response?.data as ErrorData)?.errorObj?.message
          );
          setAlertOpen(true);
        },
      });

      reset();
    } else {
      setAlertSeverity('warning');
      setAlertMessage('confrim password is not equal to new password');
      setAlertOpen(true);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Card variant="outlined" sx={CommonStyles.cardandbutton}>
        <CardContent>
          <Box sx={CommonStyles.cardandbutton}>
            <Typography component="h1" variant="h5">
              Reset password
            </Typography>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  margin="normal"
                  id="newPassword"
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  helperText={errors.newPassword?.message}
                  {...register('newPassword')}
                />
                <TextField
                  margin="normal"
                  id="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  {...register('confirmPassword')}
                  helperText={errors.confirmPassword?.message}
                />

                <Button
                  disabled={!isValid}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={CommonStyles.button}
                >
                  Reset Password
                </Button>
              </form>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={alertOpen}
        autoHideDuration={1500}
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
    </>
  );
};

export default ResetPassword;
