
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation} from "react-router-dom";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function leaveDetail() {
    const {state} = useLocation();

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Name:{state.employee.name}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Contact Number:{state.employee.phone}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Designation:{state.employee.designation}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Startdate:{state.startDate.toLocaleString().slice(0,10)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        EndDate:{state.endDate.toLocaleString().slice(0,10)}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Leave Type:{state.leaveType}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        reason:{state.reason}
        </Typography>
        
      </CardContent>
     
    </Card>
  );
}