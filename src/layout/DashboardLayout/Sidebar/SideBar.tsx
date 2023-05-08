import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

export const mainListItems = <React.Fragment></React.Fragment>;

const SideBar = () => {
  const navigate = useNavigate();
  return (
    <List component="nav" sx={{ backgroundColor: 'darkcyan', height: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 8 }}
      />
      <Grid item xs={6}>
        <ListItemButton onClick={() => navigate('employee')}>
          <ListItemText primary="Employees" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('leave')}>
          <ListItemText primary="Leave" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('project')}>
          <ListItemText primary="Project" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate('checkinout')}>
          <ListItemText primary="CheckInOut" />
        </ListItemButton>
      </Grid>
    </List>
  );
};

export default SideBar;
