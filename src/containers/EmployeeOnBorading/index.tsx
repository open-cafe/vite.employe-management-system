import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
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

  //eta herne
  const handleDesignation = (event: SelectChangeEvent) => {
    setDesignation(event.target.value as string);
  };
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: '100vh' }}
      >
        <Container
          component="main"
          maxWidth="sm"

          /* sx={{ mb: 4 }} */
        >
          <Paper
            variant="outlined"
            sx={{ my: { xs: 4, md: 6 }, p: { xs: 2, md: 3 } }}
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
                  <MenuItem value="Frontend Developer">
                    Frontend Developer
                  </MenuItem>
                  <MenuItem value="Backend Developer">
                    Backend Developer
                  </MenuItem>
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
            </Box>

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
      </Grid>
    </MainLayout>
  );
};

export default AddEmployee;
