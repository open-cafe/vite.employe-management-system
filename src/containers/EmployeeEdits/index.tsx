import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import useEmployeeById from '@/hooks/useEmployeeeById';

import useUpdateEmployee from '@/hooks/useUpdateEmployee';
import EmployeeOnboardingStyles from '@/style/EmployeeOnboarding.styles';

const EmployeeEdits = () => {
  const navigate = useNavigate();
  const { employeeByIdData, employeeByIdLoading, employeeByIdError } =
    useEmployeeById();
  const employeeData = employeeByIdData?.data.data;
  //   const employeeId = employeeData?.employeeId;
  const name = employeeData?.name;
  const designation = employeeData?.designation;
  const phone = employeeData?.phone;

  const { updateEmployeeAction, updateEmployeeLoading } = useUpdateEmployee();
  //herne
  const [nameValue, setNameValue] = useState('');
  const [designationValue, setDesignationValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  useEffect(() => {
    setNameValue(name);
    setDesignationValue(designation);
    setPhoneValue(phone);
  }, [name, designation, phone]);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  //eta herne
  const handleDesignation = (event: SelectChangeEvent) => {
    setDesignationValue(event.target.value as string);
    if (designationValue == null) {
      setAlertMessage('Add Designation');
    }
  };
  const handleSubmit = async () => {
    const employeeDetails = {
      name: nameValue,
      designation: designationValue,
      phone: phoneValue,
    };

    updateEmployeeAction(employeeDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/`);
        }
        setAlertSeverity('success');
        setAlertMessage('Updated Successfully!!!');
        setAlertOpen(true);
      },
      onError: (data) => {
        console.log('err', data);
        setAlertSeverity('error');
        setAlertMessage('Fill in all the fields');
        setAlertOpen(true);
      },
    });
  };

  return (
    <MainLayout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Container component="main" maxWidth="sm">
          <Paper variant="outlined" sx={EmployeeOnboardingStyles.container}>
            <Typography component="h1" variant="h4" align="center">
              Employee Details
            </Typography>
            <TextField
              margin="normal"
              id="employee"
              name="employee"
              label="Employee Name"
              placeholder="George Bush"
              autoComplete="employee"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              fullWidth
              required
            />

            {/* <Box /* sx={{ minWidth: 120 }} */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={designationValue ?? ''}
                label="Designation"
                onChange={handleDesignation}
              >
                <MenuItem value="Frontend Developer">
                  Frontend Developer
                </MenuItem>
                <MenuItem value="Backend Developer">Backend Developer</MenuItem>
                <MenuItem value="Fullstack Developer">
                  Fullstack Developer
                </MenuItem>
                <MenuItem value="Designer">Designer</MenuItem>
                <MenuItem value="Product Manager">Product Manager</MenuItem>
                <MenuItem value="SEO">SEO</MenuItem>
                <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
                <MenuItem value="UI Designer">UI Designer</MenuItem>
                <MenuItem value="UX Designer">UX Designer</MenuItem>
              </Select>
            </FormControl>
            {/* </Box> */}

            <TextField
              margin="normal"
              id="phone"
              name="phone"
              label="Phone Number "
              value={phoneValue}
              //   placeholder="+977(10 digit numbers)"
              onChange={(e) => setPhoneValue(e.target.value)}
              variant="outlined"
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
              Update employee
            </Button>
          </Paper>
        </Container>
      </Grid>
      <Snackbar
        open={alertOpen}
        autoHideDuration={1500}
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

export default EmployeeEdits;
