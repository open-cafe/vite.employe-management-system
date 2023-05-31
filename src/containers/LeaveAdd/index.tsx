import {
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
    setReason(event.target.value);
  };
  const handleLeaveChange = (event: SelectChangeEvent) => {
    setLeaveType(event.target.value as string);
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

            <Box /* sx={{ minWidth: 120 }} */>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={leaveType}
                  label="Leave Type"
                  onChange={handleLeaveChange}
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
      </MainLayout>
    </>
  );
};
export default LeaveAdd;
