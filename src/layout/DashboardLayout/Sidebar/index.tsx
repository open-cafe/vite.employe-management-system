import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/hooks/useCurrentUser';
import SideBarStyles from '@/style/SideBar.styles';

export const mainListItems = <React.Fragment></React.Fragment>;

const SideBar = () => {
  const navigate = useNavigate();
  const { currentUserError, data, currentUserLoading } = useCurrentUser();
  const role = data?.data?.data?.getCurrentUser.role;
  // console.log(role);

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
          <ListItemButton onClick={() => navigate('leaveadd')}>
            <ListItemText primary="ApplyLeave" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('projectassignmentbyempid')}>
            <ListItemText primary="Project" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('leave')}>
            <ListItemText primary="Leave" />
          </ListItemButton>
          {/* <ListItemButton>
            <ListItemText primary="CheckInOut" />
          </ListItemButton> */}
        </>
      );
    }
  };

  return (
    <List component="nav" sx={SideBarStyles.sidebarlist}>
      <Grid sx={SideBarStyles.sidebarGrid}>
        <Grid item xs={6}>
          {renderSidebarItems()}
        </Grid>
      </Grid>
    </List>
  );
};

export default SideBar;
