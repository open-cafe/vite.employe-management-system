import {
  Button,
  //   Grid,
  //   FormControl,
  //   InputLabel,
  MenuItem,
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

// import DatePicker from 'react-datepicker';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const LeaveAdd = () => {
  const navigate = useNavigate();
  const { addLeaveAction, addLeaveLoading } = useAddLeave();

  const today = dayjs();
  const yesterday = dayjs().add(365, 'day');

  const [leaveType, setLeaveType] = useState('');
  const [reason, setReason] = useState('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeaveType(event.target.value);
  };

  // console.log('111', today);
  // const handleDate = () => {
  //   onbeforeinput={(e) => {
  //     e.preventDefault();
  //   }}
  // };

  const handleSubmit = async () => {
    const leaveDetails = {
      leaveType: leaveType,
      reason: reason,
      startDate: startDate || dayjs(),
      endDate: endDate || dayjs(),
    };

    addLeaveAction(leaveDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/employees/:employeeId/leaves`);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
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

            <TextField
              select
              margin="normal"
              name="leavetype"
              value={leaveType}
              // onChange={handleInputChange}
              label="Leave Type"
              variant="outlined"
              fullWidth
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">SICK</MenuItem>
              <MenuItem value="2">PERSONAL</MenuItem>
            </TextField>

            <TextField
              id="reason"
              value={reason}
              label="Reason"
              multiline
              rows={2}
              // onChange={handleChange}
              fullWidth
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
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
      </MainLayout>
    </>
  );
};
export default LeaveAdd;
