import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  TextField,
  DialogActions,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import useLeave from '@/hooks/useLeave';
import CommonStyles from '@/style/Common.styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import schema from './LeaveEditSchema';
import { yupResolver } from '@hookform/resolvers/yup';

interface LeaveEditProps {
  leaveId: string;
  leaveType: string;
  reason: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}
const LeaveEdit = ({
  leaveId,
  leaveType,
  reason,
  startDate,
  endDate,
}: LeaveEditProps) => {
  type formValues = {
    type: String;
    reason: String;
    startDate: dayjs.Dayjs | null;
    endDate: dayjs.Dayjs | null;
  };

  const form = useForm<formValues>({
    defaultValues: {
      type: leaveType,
      reason: '',
      startDate: startDate,
      endDate: endDate,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const { register, control, handleSubmit, formState, reset } = form;
  const { errors, isSubmitting, isValid } = formState;
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [leaveTypeValue, setLeaveTypeValue] = useState(leaveType);

  const [reasonValue, setReasonValue] = useState(reason);
  const [startDateValue, setStartDateValue] = useState<dayjs.Dayjs | null>(
    dayjs(startDate)
  );
  const [endDateValue, setEndDateValue] = useState<dayjs.Dayjs | null>(
    dayjs(endDate)
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const today = dayjs().add(1, 'day');
  const yesterday = dayjs().add(365, 'day');
  const { updateLeaveAction, updateLeaveLoading } = useLeave();

  const onSubmit = async (data: any) => {
    const leaveDetails = {
      leaveType: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      reason: data.reason,
      leaveId,
    };

    updateLeaveAction(leaveDetails, {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(['leaves']);
          console.log('successful update leave');
          setOpen(false);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogTitle>Update Leave</DialogTitle>
          <DialogContent>
            <Box paddingTop={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {leaveType}
                </InputLabel>
                <Select
                  margin="dense"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register('type')}
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
              label={reason}
              multiline
              rows={5}
              fullWidth
              placeholder="Add Your Leave Reason"
              {...register('reason')}
              required
            />

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
                        value={startDateValue}
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
                        value={endDateValue}
                        onChange={(newValue) => field.onChange(newValue)}
                      />
                    )}
                  />
                  <Typography
                    variant="h6"
                    sx={{ fontSize: '11px', color: 'red' }}
                  >
                    {errors.endDate?.message}
                  </Typography>
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
        <DevTool control={control} />
      </Dialog>
    </>
  );
};

export default LeaveEdit;
