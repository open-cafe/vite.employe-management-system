import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/hooks/useCurrentUser';

export const mainListItems = <React.Fragment></React.Fragment>;

const SideBar = () => {
  const navigate = useNavigate();
  const { currentUserError, data, currentUserLoading } = useCurrentUser();
  const role = data?.data.data.getCurrentUser.role;

  const renderSidebarItems = () => {
    if (role === 'SuperAdmin') {
      return (
        <>
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
          <ListItemButton onClick={() => navigate('adduser')}>
            <ListItemText primary="AddUser" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('addproject')}>
            <ListItemText primary="AddProject" />
          </ListItemButton>
        </>
      );
    } else if (role === 'Employee') {
      return (
        <>
          <ListItemButton>
            <ListItemText primary="Apply Leave" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Project" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="CheckInOut" />
          </ListItemButton>
        </>
      );
    }
  };

  return (
    <List component="nav" sx={{ backgroundColor: '#ED81AD', height: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 8 }}
      >
        <Grid item xs={6}>
          {renderSidebarItems()}
        </Grid>
      </Grid>
    </List>
  );
};

export default SideBar;
