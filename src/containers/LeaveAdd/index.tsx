import {
  Alert,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  //   FormControl,
  //   InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  //   Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddLeave from '@/hooks/useAddLeave';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AxiosError } from 'axios';

// interface ErrorData {
//   errorObj: {
//     message: string;
//     // other properties, if applicable
//   };
// }

const LeaveAdd = () => {
  const navigate = useNavigate();
  const { addLeaveAction, addLeaveLoading } = useAddLeave();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const today = dayjs();
  const yesterday = dayjs().add(365, 'day');

  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
    console.log('error in reason');
    if (reason.trim() === '') {
      setAlertOpen(true);
      setAlertMessage('Please enter a reason');
    } else {
      setAlertOpen(false);
      setAlertMessage('');
    }
  };
  const handleLeaveChange = (event: SelectChangeEvent) => {
    setLeaveType(event.target.value as string);
    if (leaveType === '') {
      // setAlertOpen(true);
      console.log('error in leavetype');
      setAlertMessage('Please select a leave type.');
    } else {
      setAlertOpen(false);
      setAlertMessage('');
    }
  };

  const handleSubmit = async () => {
    console.log('asdf', dayjs());
    const start = startDate; /* .toISOString() */
    const end = endDate; /* .toISOString() */
    console.log('start date', start, end);
    const leaveDetails = {
      leaveType: leaveType,
      reason: reason,
      startDate: start || dayjs(),
      endDate: end || dayjs(),
    };

    addLeaveAction(leaveDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/leave`);
        }
      },
      onError: (data) => {
        // console.log('err', data);
        if (data !== null) {
          console.log('Data are present', data);
          setAlertSeverity('error');
          setAlertOpen(true);
          if (reason.trim() === '') {
            setAlertMessage('Please enter a reason');
          }
          if (leaveType === '') {
            setAlertMessage('Please select a leave type.');
          }
          if (startDate !== null && endDate !== null) {
            if (startDate > endDate) {
              setAlertMessage('Start date cannot be greater Than End date');
            }
          } else {
            setAlertMessage('Fill in the date fields');
          }
        } /* else { */
        console.log('Data are not present');

        setAlertSeverity('error');
        setAlertMessage('Fill in all the fields');
        setAlertOpen(true);
        // }
      },
      // onError: (error) => {
      //   const axiosError = error as AxiosError;

      //   setAlertSeverity('error');
      //   setAlertMessage(
      //     (axiosError.response?.data as ErrorData)?.errorObj?.message
      //   );
      //   setAlertOpen(true);
      // },
    });
    setLeaveType('');
    setReason('');
    setStartDate(null);
    setEndDate(null);
  };
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  return (
    <>
      <MainLayout>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Apply Leave
            </Typography>

            <Box /* sx={{ minWidth: 120 }} */>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={leaveType}
                  label="Leave Type"
                  onChange={handleLeaveChange}
                  required
                >
                  <MenuItem value="SICK">SICK</MenuItem>
                  <MenuItem value="PERSONAL">PERSONAL</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* <Grid item spacing={6}> */}
            <TextField
              margin="normal"
              id="reason"
              value={reason}
              label="Reason"
              multiline
              rows={5}
              onChange={handleChange}
              fullWidth
              required
            />
            {/* </Grid> */}

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ my: 1 }}>
                <DemoItem component="DatePicker">
                  <DatePicker
                    label="Start Date"
                    minDate={today}
                    maxDate={yesterday}
                    value={startDate}
                    // editable= {false}
                    // onChange={handleDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoItem>
                <DemoItem component="DatePicker">
                  <DatePicker
                    label="End Date"
                    minDate={today}
                    maxDate={yesterday}
                    value={endDate}
                    // onBeforeInput={(e) => e.preventDefault()}
                    onChange={(newVal) => setEndDate(newVal)}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleSubmit()}
            >
              Add Leave
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
    </>
  );
};
export default LeaveAdd;
