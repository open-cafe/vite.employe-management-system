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
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { setCookie } from '../../utils/authCookies';

import { cookieName } from '../../constants/environment';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddUser from '@/hooks/useAddUser';

const AddUser = () => {
  const navigate = useNavigate();
  const { addUserAction, addUserLoading } = useAddUser();

  const [role, setRole] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };

  const handleSubmit = async () => {
    const userDetails = {
      email: enteredEmail,
      roleId: role,
    };
    try {
      addUserAction(userDetails, {
        onSuccess: (data) => {
          if (data) {
            navigate(`/`);
          }
        },
        onError: (data) => {
          console.log('err', data);
        },
      });
      setEnteredEmail('');
      setRole('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Add User
          </Typography>
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
            select
            value={role}
            label="Role"
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'6c037523-af42-4b8b-a03d-a2665578ae04'}>
              Admin
            </MenuItem>
            <MenuItem value={'67ef1f80-3f74-432d-954c-ed1d9b5452c8'}>
              Employee
            </MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Add User
          </Button>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default AddUser;
