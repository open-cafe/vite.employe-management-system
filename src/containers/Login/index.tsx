import { LockOutlined, Password } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
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
import { AuthContext } from '@/context/authContext';

const Login = () => {
  const { token, setAuthToken } = useContext(AuthContext);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event: any
  ) => {
    setEnteredPassword(event.target.value);
  };

  const rememberMeChangeHandler = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const loginCredentials = {
      email: enteredEmail,
      password: enteredPassword,
      rememberMe: rememberMe,
    };
    console.log(loginCredentials);
    try {
      const response = await axios.post('/user/login', loginCredentials);
      // setCookie(cookieName, response.data.data.access_token);
      setAuthToken(response.data.data.access_token);

      console.log(response);
      setEnteredEmail('');
      setEnteredPassword('');
      setRememberMe(false);
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
              <Box
                component="form"
                sx={{ mt: 1 }}
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
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
                  onChange={passwordChangeHandler}
                  fullWidth
                  required
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  onChange={rememberMeChangeHandler}
                  value={rememberMe}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
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
