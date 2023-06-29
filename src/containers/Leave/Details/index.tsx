import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import useLeave from '@/hooks/useLeave';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function LeaveDetails() {
  const { leaveId } = useParams();
  const { currentUserData } = useCurrentUser();
  const role = currentUserData?.data?.data?.role;

  let isEmployee = false;
  if (role === 'Employee') {
    isEmployee = true;
  }

  const navigate = useNavigate();
  const leaveIds = { leaveId };
  const { leaveByIdData } = useLeave(leaveIds);
  const leaveData = leaveByIdData?.data?.data;

  const statusValue = leaveData?.status;
  const { updateLeaveStatusAction } = useLeave();

  const handleAccept = () => {
    handleOnClick('Accepted');
  };

  const handleReject = () => {
    handleOnClick('Rejected');
  };
  const handleOnClick = (status: string) => {
    const leaveDetails = {
      status: status,
      leaveId: leaveId as string,
    };

    updateLeaveStatusAction(leaveDetails, {
      onSuccess: (response) => {
        if (response) {
          navigate(`/leave`);
          console.log('successful update leave status', response.data?.status);
        }
      },
      onError: (response) => {
        console.log('err', response);
      },
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '90vh' }}
    >
      {!isEmployee && (
        <Card sx={{ maxWidth: 800, mx: { ml: 20 } }}>
          <CardContent sx={{ textAlign: 'left' }}>
            <CardContent>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                Name : {leaveData?.employee?.name}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
                Contact Number : {leaveData?.employee?.phone}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Designation : {leaveData?.employee?.designation}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Startdate : {leaveData?.startDate.toLocaleString().slice(0, 10)}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                EndDate : {leaveData?.endDate.toLocaleString().slice(0, 10)}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Leave Type : {leaveData?.leaveType}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Reason : {leaveData?.reason}
              </Typography>
            </CardContent>
            {!['Accepted', 'Rejected'].includes(statusValue) && (
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                ml={2}
              >
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAccept}
                  >
                    Accept
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleReject}
                  >
                    Reject
                  </Button>
                </Grid>
              </Grid>
            )}
            {statusValue == 'Accepted' && (
              <div style={{ textAlign: 'center' }}>
                <span>You have accepted the leave. </span>
              </div>
            )}
            {statusValue == 'Rejected' && (
              <div style={{ textAlign: 'center' }}>
                <span>You have rejected the leave. </span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {isEmployee && (
        <div style={{ textAlign: 'center' }}>
          <span>Sorry not allowed. </span>
        </div>
      )}
    </Grid>
  );
}
