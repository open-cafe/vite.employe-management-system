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

const ResetPassword = () => {
  const [newPassword, setnewPassword] = useState('');
  const [confrmPassword, setconfirmPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const { resetPasswordChangeAction, resetPasswordchangeLoading } =
    useResetPassword();
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
    const tokenValue = urlParams.get('token');
    setToken(tokenValue);
  }, []);

  const handleSubmit = async () => {
    const resetPassowrdCredentials = {
      password: newPassword,
      token: token as string,
    };

    if (newPassword === confrmPassword) {
      resetPasswordChangeAction(resetPassowrdCredentials, {
        onSuccess: (data) => {
          navigate('/login');
        },
        onError: (data) => {
          setAlertSeverity('error');
          setAlertMessage('Token expired');
          setAlertOpen(true);
        },
      });

      setnewPassword('');
      setconfirmPassword('');
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
              <TextField
                margin="normal"
                id="newPassword"
                name="newPassword"
                label="New Password"
                type="password"
                autoComplete="current-password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                fullWidth
                required
              />
              <TextField
                margin="normal"
                id="confirmPassword"
                name="conmfirPassword"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                value={confrmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                fullWidth
                required
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={CommonStyles.button}
                onClick={() => handleSubmit()}
              >
                Reset Password
              </Button>
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
    </>
  );
};

export default ResetPassword;
