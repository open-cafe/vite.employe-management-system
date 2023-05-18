import { cookieName } from '@/constants/environment';
import { deleteCookie } from '../../utils/authCookies';
import useResetPassword from '@/hooks/useResetPassword';
import queryString from 'query-string';

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setnewPassword] = useState('');
  const [confrmPassword, setconfirmPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const { resetPasswordChangeAction, resetPasswordchangeLoading } =
    useResetPassword();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenValue = urlParams.get('token');
    setToken(tokenValue);

    console.log(token);
  }, []);

  const handleSubmit = async () => {
    const resetPassowrdCredentials = {
      password: newPassword,
      token: token as string,
    };

    if (newPassword === confrmPassword) {
      try {
        resetPasswordChangeAction(resetPassowrdCredentials, {
          onSuccess: (data) => {
            navigate('/login');
          },
          onError: (data) => {
            console.log('err', data);
          },
        });

        setnewPassword('');
        setconfirmPassword('');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('confrim password is not equal to new password');
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit()}
              >
                Reset Passowrd
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPassword;
