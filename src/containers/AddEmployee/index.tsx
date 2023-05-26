import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddEmployee from '@/hooks/useAddEmployee';

const AddEmployee = () => {
  const navigate = useNavigate();
  const { addEmployeeAction, addEmployeeLoading } = useAddEmployee();
  //herne
  const [designation, setDesignation] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [phone, setPhone] = useState('');
  // const [hireDate, setHireDate] = useState('');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // setEnteredName(event.target.value);
  // setDesignation(event.target.value);
  // setPhone(event.target.value);
  // setHireDate(event.target.value);
  // };
  //eta herne
  const handleSubmit = async () => {
    const employeeDetails = {
      name: enteredName,
      designation: designation,
      phone: phone,
      // hireDate: hireDate,
    };

    addEmployeeAction(employeeDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/employee`);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
    });
    setEnteredName('');
    setDesignation('');
    setPhone('');
    // setHireDate('');
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Employee Details
          </Typography>
          <TextField
            margin="normal"
            id="employee"
            name="employee"
            label="Employee Name"
            autoComplete="employee"
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            id="designation"
            value={designation}
            label="Designation"
            onChange={(e) => setDesignation(e.target.value)}
            fullWidth
            required
          />
          {/* <Grid container spacing={4}>
            <Grid item xs={6}> */}
          <TextField
            margin="normal"
            id="phone"
            name="phone"
            label="Phone Number "
            value={phone}
            placeholder="+977"
            onChange={(e) => setPhone(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          {/* </Grid> */}
          {/* <Grid item xs={6}>
              <TextField
                margin="normal"
                name="hireDate"
                type="date"
                label="Hire Date"
                value={hireDate}
                onChange={(e) => setHireDate(e.target.value)}
                defaultValue={'new Date()'}
                fullWidth
                required
              />
            </Grid> */}
          {/* </Grid> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Add employee
          </Button>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default AddEmployee;
