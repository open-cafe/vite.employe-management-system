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
import useLeave from '@/hooks/useLeave';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AxiosError } from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import schema from './leaveAddSchema';
import { yupResolver } from '@hookform/resolvers/yup';

// interface ErrorData {
//   errorObj: {
//     message: string;
//     // other properties, if applicable
//   };
// }

const LeaveAdd = () => {
  type formValues = {
    type: String;
    reason: String;
    startDate: Object;
    endDate: Object;
  };

  const form = useForm<formValues>({
    defaultValues: {
      type: '',
      reason: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isValid } = formState;
  const navigate = useNavigate();
  const { addLeaveAction, addLeaveLoading } = useLeave();

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
  };
  const handleLeaveChange = (event: SelectChangeEvent) => {
    setLeaveType(event.target.value as string);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    const leaveDetails = {
      leaveType: data.type,
      reason: data.reason,
      startDate: data.startDate || dayjs(),
      endDate: data.endDate || dayjs(),
    };

    addLeaveAction(leaveDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/leave`);
        }
      },
      onError: (data) => {
        if (data !== null) {
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
        } else {
          setAlertSeverity('error');
          // setAlertMessage('Fill in all the fields');
          setAlertOpen(true);
        }
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
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Typography component="h1" variant="h4" align="center">
                Apply Leave
              </Typography>

              <Box /* sx={{ minWidth: 120 }} */>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Leave Type"
                    required
                    {...register('type')}
                  >
                    <MenuItem value="SICK">SICK</MenuItem>
                    <MenuItem value="PERSONAL">PERSONAL</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant="h6"
                  sx={{ fontSize: '11px', color: 'red' }}
                >
                  {errors.type?.message}
                </Typography>
              </Box>

              {/* <Grid item spacing={6}> */}
              <TextField
                margin="normal"
                id="reason"
                label="Reason"
                multiline
                rows={5}
                fullWidth
                {...register('reason')}
                helperText={errors.reason?.message}
              />
              {/* </Grid> */}

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} sx={{ my: 1 }}>
                  <DemoItem component="DatePicker">
                    <Controller
                      control={control}
                      name="startDate"
                      render={({ field }) => (
                        <DatePicker
                          label="Start Date"
                          minDate={today}
                          maxDate={yesterday}
                          value={field.value}
                          onChange={(newValue) => field.onChange(newValue)}
                        />
                      )}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '11px', color: 'red' }}
                    >
                      {errors.startDate?.message}
                    </Typography>
                  </DemoItem>
                  <DemoItem component="DatePicker">
                    <Controller
                      control={control}
                      name="endDate"
                      render={({ field }) => (
                        <DatePicker
                          label="End Date"
                          minDate={today}
                          maxDate={yesterday}
                          value={field.value}
                          onChange={(newVal) => field.onChange(newVal)}
                        />
                      )}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '11px', color: 'red' }}
                    >
                      {errors.endDate?.message}
                    </Typography>

                    {/* <DatePicker
                    label="End Date"
                    minDate={today}
                    maxDate={yesterday}
                    value={endDate}
                    // onBeforeInput={(e) => e.preventDefault()}
                    onChange={(newVal) => setEndDate(newVal)}
                  /> */}
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={() => onSubmit()}
              >
                Add Leave
              </Button>
            </form>
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
        <DevTool control={control} />
      </MainLayout>
    </>
  );
};
export default LeaveAdd;
