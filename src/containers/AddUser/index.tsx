import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddUser from '@/hooks/useAddUser';
import useAllRole from '@/hooks/useAllRole';

const AddUser = () => {
  const { allRoleData, allRoleDataLoading } = useAllRole();
  const roles = allRoleData?.data.data.data;
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
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
          setAlertSeverity('error');
          setAlertMessage('user already exists');
          setAlertOpen(true);
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
            {roles &&
              roles.map((Role: any) => {
                return (
                  <MenuItem value={Role.roleId} key={Role.roleId}>
                    {Role.role}
                  </MenuItem>
                );
              })}
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
    </MainLayout>
  );
};

export default AddUser;
