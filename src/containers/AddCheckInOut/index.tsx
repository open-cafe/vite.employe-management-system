import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import useCheckInOut from '@/hooks/useCheckinout';
import useCurrentUser from '@/hooks/useCurrentUser';

const AddCheckInOut = () => {
  const { currentUserData } = useCurrentUser();
  const role = currentUserData?.data?.data?.role;
  let isEmployee = false;
  if (role === 'Employee') {
    isEmployee = true;
  }
  const employee = { isEmployee };
  const { latestCheckinData, addCheckInAction, updateCheckInAction } =
    useCheckInOut(employee);
  const latestCheckOutTime =
    latestCheckinData?.data?.data?.latestData?.checkoutTime;

  const [switchState, setSwitchState] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchState(event.target.checked);

    if (event.target.checked) {
      addCheckInAction(undefined, {
        onSuccess: (data) => {
          if (data) {
            console.log('Employee checked in');
            setStatus('Checked-in');
          }
        },
        onError: (data) => {
          console.log('err', data);
          console.log('Unable to Check In');
          if (data !== null) {
            console.log('Data are present', data);
          }
        },
      });
    } else {
      updateCheckInAction(undefined, {
        onSuccess: (data) => {
          if (data) {
            console.log('Employee checked out');
            setStatus('Checked-out');
          }
        },
        onError: (data) => {
          console.log('err', data);
          console.log('Unable to Check out');
          if (data !== null) {
            console.log('Data are present', data);
          }
        },
      });
    }
  };
  const [status, setStatus] = useState('Checked-in');
  useEffect(() => {
    if (latestCheckOutTime === null) {
      setSwitchState(true);
      setStatus('Checked-in');
    } else {
      setSwitchState(false);
      setStatus('Checked-out');
    }
  }, [latestCheckOutTime]);

  return (
    <Box>
      {isEmployee && (
        <FormControlLabel
          sx={{
            display: 'block',
            alignContent: 'center',
            // color: status === 'Checked-in' ? 'green' : 'white',
          }}
          label={status}
          control={
            <Switch
              checked={switchState}
              onChange={handleSwitchChange}
              name="checkin"
              color="success"
            />
          }
        />
      )}
    </Box>
  );
};
export default AddCheckInOut;
