import { LockOutlined, Password } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { setCookie } from '../../utils/authCookies';
import axios from '../../config/axios';

import { cookieName } from '../../constants/environment';
import { useState, useContext } from 'react';
import LoginLayout from '@/layout/LoginLayout';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { loginAction, loginLoading } = useAuth();
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const handleSubmit = async () => {
    const loginCredentials = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      loginAction(loginCredentials, {
        onSuccess: (data) => {
          if (data) {
            setCookie(cookieName, data.data.data.access_token);
            navigate(`/`);
          }
        },
        onError: (data) => {
          console.log('err', data);
        },
      });
      setEnteredEmail('');
      setEnteredPassword('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginLayout>
      <Grid item xs={2} sm={3} md={4} lg={4.5}></Grid>
      <Grid item xs={8} sm={6} md={4} lg={3}>
        <Card
          variant="outlined"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlined />
          </Avatar>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box>
                <TextField
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  value={enteredEmail}
                  onChange={(e) => setEnteredEmail(e.target.value)}
                  autoFocus
                  fullWidth
                  required
                />
                <TextField
                  margin="normal"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
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
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </LoginLayout>
  );
};

export default Login;
