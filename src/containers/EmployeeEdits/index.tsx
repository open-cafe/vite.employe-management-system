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
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import schema from './employeeEditSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const EmployeeEdits = () => {
  type formValues = {
    employeeName: string;
    phoneNumber: string;
  };

  const navigate = useNavigate();
  const { employeeByIdData } = useEmployeeById();
  const employeeData = employeeByIdData?.data.data;
  //   const employeeId = employeeData?.employeeId;
  const [isEmployeeClicked, setIsEmployeeClicked] = useState(false);
  const [isPhoneClicked, setIsPhoneClicked] = useState(false);

  const name = employeeData?.name;
  const designation = employeeData?.designation;
  const phone = employeeData?.phone;

  const { updateEmployeeAction } = useUpdateEmployee();
  //herne
  const [nameValue, setNameValue] = useState('');
  const [designationValue, setDesignationValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  useEffect(() => {
    setNameValue(name);
    setDesignationValue(designation);
    setPhoneValue(phone);
  }, [name, designation, phone]);

  console.log(nameValue);

  const form = useForm<formValues>({
    defaultValues: {
      employeeName: '',
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

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
  const onSubmit = async (data: formValues) => {
    const employeeDetails = {
      name: data.employeeName,
      designation: designationValue,
      phone: data.phoneNumber,
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

  const handleTextFieldClick = () => {
    setIsEmployeeClicked(true);
  };

  const handlePhoneFieldClick = () => {
    setIsPhoneClicked(true);
  };

  return (
    <MainLayout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '95vh' }}
      >
        <Container component="main" maxWidth="sm">
          <Paper variant="outlined" sx={EmployeeOnboardingStyles.container}>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Typography component="h1" variant="h4" align="center">
                Employee Details
              </Typography>
              <TextField
                margin="normal"
                id="employee"
                label={isEmployeeClicked ? 'Enter Employee Name' : name}
                onClick={handleTextFieldClick}
                placeholder={name}
                autoComplete="employee"
                fullWidth
                {...register('employeeName')}
                helperText={errors.employeeName?.message}
              />

              {/* <Box /* sx={{ minWidth: 120 }} */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Designation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={designationValue}
                  label="Designation"
                  onChange={handleDesignation}
                  required
                >
                  <MenuItem value="Frontend">Frontend</MenuItem>
                  <MenuItem value="Backend ">Backend</MenuItem>
                  <MenuItem value="Fullstack">Fullstack</MenuItem>
                  <MenuItem value="Designer">Designer</MenuItem>
                  <MenuItem value="ProductManager">ProductManager</MenuItem>
                  <MenuItem value="ProjectManager">ProjectManager</MenuItem>
                  <MenuItem value="SEO">SEO</MenuItem>
                </Select>
              </FormControl>
              {/* </Box> */}

              <TextField
                margin="normal"
                id="phone"
                label={isPhoneClicked ? 'Enter Phone Number' : phone}
                placeholder={phone}
                onClick={handlePhoneFieldClick}
                variant="outlined"
                fullWidth
                {...register('phoneNumber')}

                required
                helperText={errors.phoneNumber?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update employee
              </Button>
            </form>
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
      <DevTool control={control} />
    </MainLayout>
  );
};

export default EmployeeEdits;
