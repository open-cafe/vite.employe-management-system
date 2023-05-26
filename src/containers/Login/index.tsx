import { LockOutlined, Password } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Snackbar,
  Alert,
  CardContent,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { setCookie } from '../../utils/authCookies';

import { cookieName } from '../../constants/environment';
import { useState, useContext } from 'react';
import LoginLayout from '@/layout/LoginLayout';
import useAuth from '@/hooks/useAuth';
import useCurrentUser from '@/hooks/useCurrentUser';

const Login = () => {
  const navigate = useNavigate();
  const { loginAction, loginLoading } = useAuth();

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
  const handleSubmit = async () => {
    const loginCredentials = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      loginAction(loginCredentials, {
        onSuccess: (data) => {
          if (data) {
            setCookie(cookieName, data?.data?.data?.access_token);
            if (data?.data?.data?.role === 'Employee') {
              if (data?.data?.data?.employeeDetail) {
                navigate(`/`);
              } else {
                navigate('/employeeonboarding');
              }
            } else {
              navigate(`/`);
            }
          }
        },
        onError: (data) => {
          setAlertSeverity('error');
          setAlertMessage('email or password is incorrect');
          setAlertOpen(true);
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
      <Card
        variant="outlined"
        sx={{
          m: 'auto',
          mt: '10%',
          maxWidth: '400px',
          borderRadius: '20px',
          p: '30px',
        }}
      >
        <Box>
          <Avatar sx={{ m: 'auto', background: '#FFA086' }}>
            <LockOutlined />
          </Avatar>
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
                    <Link to="/sendresetpasswordmail">Forgot password?</Link>
                  </Grid>
                </Grid>
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

export default Login;
