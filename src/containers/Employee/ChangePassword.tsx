import { cookieName } from '@/constants/environment';
import { deleteCookie } from '../../utils/authCookies';
import useChangePassword from '@/hooks/useChangePassword';
import CommonStyles from '@/style/Common.styles';

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confrmPassword, setconfirmPassword] = useState('');
  const { passwordChangeAction, passwordchangeLoading } = useChangePassword();

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
        onError: (data) => {
          console.log('err', data);
        },
      });
      setoldPassword('');
      setnewPassword('');
      setconfirmPassword('');
    } else {
      console.log('confrim password is not equal to new password');
    }
  };
  return (
    <>
      <Card variant="outlined" sx={CommonStyles.cardandbutton}>
        <CardContent>
          <Box sx={CommonStyles.cardandbutton}>
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
                sx={CommonStyles.button}
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
