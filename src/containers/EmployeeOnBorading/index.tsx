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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddEmployee from '@/hooks/useAddEmployee';
import EmployeeOnboardingStyles from '@/style/EmployeeOnboarding.styles';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import schema from './onboardingSchema';
import { yupResolver } from '@hookform/resolvers/yup';

const EmployeeOnboarding = () => {
  type formValues = {
    employeeName: string;
    phoneNumber: string;
  };

  const form = useForm<formValues>({
    defaultValues: {
      employeeName: '',
      phoneNumber: '+977',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isValid } = formState;

  const navigate = useNavigate();
  const { addEmployeeAction, addEmployeeLoading } = useAddEmployee();
  //herne
  const [designation, setDesignation] = useState('');

  // const [hireDate, setHireDate] = useState('');

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
    setDesignation(event.target.value as string);
    if (designation == null) {
      setAlertMessage('Add Designation');
    }
  };
  const onSubmit = async (data: formValues) => {
    const employeeDetails = {
      name: data.employeeName,
      designation: designation,
      phone: data.phoneNumber,
      // hireDate: hireDate,
    };

    addEmployeeAction(employeeDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/`);
        }
      },
      onError: (data) => {
        console.log('err', data);
        setAlertSeverity('error');
        setAlertMessage('Fill in all the fields');
        setAlertOpen(true);
      },
    });
    reset();
    setDesignation('');
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Typography component="h1" variant="h4" align="center">
                Employee Details
              </Typography>
              <TextField
                margin="normal"
                id="employee"
                label="Employee Name"
                placeholder="George Bush"
                autoComplete="employee"
                fullWidth
                {...register('employeeName')}
                helperText={errors.employeeName?.message}

                // required
              />

              <Box /* sx={{ minWidth: 120 }} */>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={designation}
                    label="Designation"
                    onChange={handleDesignation}
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
              </Box>

              <TextField
                margin="normal"
                id="phone"
                label="Phone Number "
                placeholder="+977(10 digit numbers)"
                variant="outlined"
                fullWidth
                {...register('phoneNumber')}
                helperText={errors.phoneNumber?.message}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={() => handleSubmit()}
              >
                Add employee
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

export default EmployeeOnboarding;
