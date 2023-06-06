import { cookieName } from '@/constants/environment';
import { deleteCookie } from '../../utils/authCookies';
import useChangePassword from '@/hooks/useChangePassword';
import CommonStyles from '@/style/Common.styles';
import TextFieldStyles from '@/style/TextField.styles';

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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import changePasswordSchema from './changePasswordSchema';

interface ErrorData {
  errorObj: {
    message: string;
    // other properties, if applicable
  };
}

type formValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const form = useForm<formValues>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const { register, control, formState, handleSubmit, reset } = form;
  const { errors } = formState;
  const { passwordChangeAction, passwordchangeLoading } = useChangePassword();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const navigate = useNavigate();

  const onSubmit = async (data: formValues) => {
    console.log(data);
    const changePassowrdCredentials = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    if (data.newPassword === data.confirmPassword) {
      passwordChangeAction(changePassowrdCredentials, {
        onSuccess: (data) => {
          if (data) {
            deleteCookie(cookieName);
          }
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
  return (
    <MainLayout>
      <Box sx={{ marginTop: 20 }}>
        <Card variant="outlined" sx={CommonStyles.cardandbutton}>
          <CardContent>
            <Box sx={CommonStyles.cardandbutton}>
              <Typography component="h1" variant="h5">
                Change password
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={TextFieldStyles.container}>
                  <TextField
                    sx={TextFieldStyles.size}
                    margin="normal"
                    id="oldpassword"
                    label="Old Password"
                    type="password"
                    {...register('oldPassword')}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: 'red', fontSize: '14px' }}
                  >
                    {errors.oldPassword?.message}
                  </Typography>
                  <TextField
                    margin="normal"
                    id="newPassword"
                    label="New Password"
                    type="password"
                    autoComplete="current-password"
                    sx={TextFieldStyles.size}
                    {...register('newPassword')}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: 'red', fontSize: '14px' }}
                  >
                    {errors.newPassword?.message}
                  </Typography>
                  <TextField
                    margin="normal"
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    sx={TextFieldStyles.size}
                    {...register('confirmPassword')}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: 'red', fontSize: '14px' }}
                  >
                    {errors.confirmPassword?.message}
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={CommonStyles.button}
                  >
                    Change Passowrd
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
        <Snackbar
          open={alertOpen}
          autoHideDuration={60000}
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
      </Box>
      <DevTool control={control} />
    </MainLayout>
  );
};

export default ChangePassword;
