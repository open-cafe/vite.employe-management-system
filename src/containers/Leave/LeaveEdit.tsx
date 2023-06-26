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
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import dayjs, { Dayjs } from 'dayjs';
import useLeave from '@/hooks/useLeave';
import CommonStyles from '@/style/Common.styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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

  const today = dayjs();
  const yesterday = dayjs().add(365, 'day');
  const { updateLeaveAction, updateLeaveLoading } = useLeave();

  const handleSubmit = async () => {
    const leaveDetails = {
      leaveType: leaveTypeValue,
      startDate: startDateValue,
      endDate: endDateValue,
      reason: reasonValue,
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
        <DialogTitle>Update Leave</DialogTitle>
        <DialogContent>
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                margin="dense"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={leaveTypeValue}
                label="Leave Type"
                onChange={(newValue) =>
                  setLeaveTypeValue(newValue.target.value)
                }
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
            value={reasonValue}
            label="Reason"
            multiline
            rows={5}
            onChange={(newValue) => setReasonValue(newValue.target.value)}
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
                  value={startDateValue}
                  onChange={(newVal) => setStartDateValue(newVal)}
                />
              </DemoItem>
              <DemoItem component="DatePicker">
                <DatePicker
                  label="End Date"
                  minDate={today}
                  maxDate={yesterday}
                  value={endDateValue}
                  onChange={(newVal) => setEndDateValue(newVal)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveEdit;
