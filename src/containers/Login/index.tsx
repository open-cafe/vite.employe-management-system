import {
  Avatar,
  Box,
  Button,
  Container,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Grid,
  Link,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const Login = () => {
  const handleSubmit = () => {};
  return (
    <Container component="main" maxWidth="xs">
      <Box
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
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            fullWidth
            required
          />
          <TextField
            margin="normal"
            id="password"
            color="primary"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            fullWidth
            required
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" color="#000" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
