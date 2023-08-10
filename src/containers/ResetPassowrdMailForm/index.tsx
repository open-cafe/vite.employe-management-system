import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import LoginLayout from '@/layout/LoginLayout';
import useSendResetEmail from '@/hooks/useSendResetEmail';
import ResetFormStyles from '@/style/ResetForm.styles';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import schema from './ResetPasswordMailFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const ResetPassowrdMailForm = () => {
  type formValues = {
    email: string;
  };

  const form = useForm<formValues>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');

  const { emailSendChangeAction, emailSendLoading } = useSendResetEmail();

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const onSubmit = async (data: formValues) => {
    const sendEmailCredentials = {
      email: data.email,
    };

    emailSendChangeAction(sendEmailCredentials, {
      onSuccess: () => {
        setAlertSeverity('success');
        setAlertMessage('Email has been sent successfully!');
        setAlertOpen(true);
      },
      onError: (data) => {
        setAlertSeverity('error');
        setAlertMessage('User with this Email id does not exist.');
        setAlertOpen(true);
      },
    });
    reset();
  };

  return (
    <LoginLayout>
      <Card variant="outlined" sx={ResetFormStyles.card}>
        <Box>
          <CardContent>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '400px',
                    alignItems: 'flex-start',
                  }}
                >
                  <TextField
                    margin="normal"
                    id="email"
                    label="Email Address"
                    autoComplete="email"
                    fullWidth
                    {...register('email')}
                  />

                  <Typography
                    variant="h6"
                    sx={{ fontSize: '14px', color: 'red' }}
                  >
                    {errors.email?.message}
                  </Typography>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={ResetFormStyles.button}
                  >
                    Send Email
                  </Button>
                </Box>
              </form>
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

export default ResetPassowrdMailForm;
