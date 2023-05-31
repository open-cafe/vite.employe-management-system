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

interface ErrorData {
  errorObj: {
    message: string;
    // other properties, if applicable
  };
}

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confrmPassword, setconfirmPassword] = useState('');
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

  const handleSubmit = async () => {
    const changePassowrdCredentials = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    if (newPassword === confrmPassword) {
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
      setoldPassword('');
      setnewPassword('');
      setconfirmPassword('');
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
              <Box sx={TextFieldStyles.container}>
                <TextField
                  sx={TextFieldStyles.size}
                  margin="normal"
                  id="oldpassword"
                  name="oldpassword"
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setoldPassword(e.target.value)}
                  required
                />
                <TextField
                  margin="normal"
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  sx={TextFieldStyles.size}
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
                  sx={TextFieldStyles.size}
                  required
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={CommonStyles.button}
                  onClick={() => handleSubmit()}
                >
                  Change Passowrd
                </Button>
              </Box>
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
    </MainLayout>
  );
};

export default ChangePassword;
