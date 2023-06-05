import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';

import { useState } from 'react';
import LoginLayout from '@/layout/LoginLayout';
import useSendResetEmail from '@/hooks/useSendResetEmail';
import ResetFormStyles from '@/style/ResetForm.styles';

const ResetPassowrdMailForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');

  const { emailSendChangeAction, emailSendLoading } = useSendResetEmail();

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSubmit = async () => {
    const sendEmailCredentials = {
      email: enteredEmail,
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
    setEnteredEmail('');
  };

  return (
    <LoginLayout>
      <Card variant="outlined" sx={ResetFormStyles.card}>
        <Box>
          <CardContent>
            <Box>
              <Box>
                <TextField
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  fullWidth
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={ResetFormStyles.button}
                  onClick={() => handleSubmit()}
                >
                  Send Email
                </Button>
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
    </LoginLayout>
  );
};

export default ResetPassowrdMailForm;
