import { cookieName } from '@/constants/environment';
import { deleteCookie } from '../../utils/authCookies';
import useChangePassword from '@/hooks/useChangePassword';

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

import { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confrmPassword, setconfirmPassword] = useState('');
  const { passwordChangeAction, passwordchangeLoading } = useChangePassword();

  const handleSubmit = async () => {
    const changePassowrdCredentials = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    if (newPassword === confrmPassword) {
      try {
        passwordChangeAction(changePassowrdCredentials, {
          onSuccess: (data) => {
            if (data) {
              deleteCookie(cookieName);
            }
          },
          onError: (data) => {
            console.log('err', data);
          },
        });
        setoldPassword('');
        setnewPassword('');
        setconfirmPassword('');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('confrim password is not equal to new password');
    }
  };
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
              Change password
            </Typography>
            <Box>
              <TextField
                margin="normal"
                id="oldpassword"
                name="oldpassword"
                label="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => setoldPassword(e.target.value)}
                fullWidth
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
                Change Passowrd
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default ChangePassword;
