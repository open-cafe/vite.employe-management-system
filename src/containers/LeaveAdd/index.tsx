import {
  Alert,
  Box,
  Button,
  FormControl,
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
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useLeave from '@/hooks/useLeave';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LeaveStyles from '@/style/LeaveStyles';

const LeaveAdd = () => {
  const navigate = useNavigate();
  const { addLeaveAction } = useLeave();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const today = dayjs().add(1, 'day');
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
    const leaveDetails = {
      leaveType: leaveType,
      reason: reason,
      startDate: startDate || dayjs(),
      endDate: endDate || dayjs(),
    };

    addLeaveAction(leaveDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/leave`);
        }
      },
      onError: (data) => {
        setAlertMessage('Already a leave in pending. ');
        setAlertSeverity('error');
        setAlertOpen(true);
      },
    });
    setLeaveType('');
    setReason('');
    setStartDate(null);
    setEndDate(null);
  };
  return (
    <>
      <MainLayout>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper variant="outlined" sx={LeaveStyles.container}>
            <Typography component="h1" variant="h4" align="center">
              Apply Leave
            </Typography>

            <Box>
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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{ my: 1 }}>
                <DemoItem component="DatePicker">
                  <DatePicker
                    label="Start Date"
                    minDate={today}
                    maxDate={yesterday}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                  />
                </DemoItem>
                <DemoItem component="DatePicker">
                  <DatePicker
                    label="End Date"
                    minDate={today}
                    maxDate={yesterday}
                    value={endDate}
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
