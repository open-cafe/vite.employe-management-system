import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

export default function leaveDetail() {
  const { state } = useLocation();
  // console.log('states', state);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '90vh' }}
    >
      <Card sx={{ maxWidth: 800, mx: { ml: 20 } }}>
        <CardContent sx={{ textAlign: 'left' }}>
          <CardContent>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
              Name : {state.employee.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" gutterBottom>
              Contact Number : {state.employee.phone}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Designation : {state.employee.designation}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Startdate : {state.startDate.toLocaleString().slice(0, 10)}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              EndDate : {state.endDate.toLocaleString().slice(0, 10)}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Leave Type : {state.leaveType}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Reason : {state.reason}
            </Typography>
          </CardContent>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            ml={2}
          >
            <Grid item xs={6}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Accept
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Reject
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
