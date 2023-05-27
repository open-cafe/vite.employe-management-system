import List from '@mui/material/List';
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItemText, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/hooks/useCurrentUser';
import SideBarStyles from '@/style/SideBar.styles';
import { Box, Button, Drawer } from '@mui/material';
import useSidebarContext from '@/context/sidebar/useSidebarContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const mainListItems = <React.Fragment></React.Fragment>;

const SideBar = () => {
  const navigate = useNavigate();
  const { currentUserError, data, currentUserLoading } = useCurrentUser();
  const role = data?.data?.data?.getCurrentUser.role;
  const toggleSidebar = useSidebarContext();

  const [state, action] = toggleSidebar;

  const renderSidebarItems = () => {
    if (role === 'SuperAdmin') {
      return (
        <Box>
          <ListItemButton
            sx={SideBarStyles.listButtonStyle}
            onClick={() => action?.setShowSidebar(false)}
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText sx={{ margin: -3, color: 'white' }} primary="Back" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('employee');
              action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={{ width: 200, color: 'white' }}
              primary="Employees"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('leave');
              action?.setShowSidebar(false);
            }}
          >
            <ListItemText sx={{ width: 200, color: 'white' }} primary="Leave" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('project');
              action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={{ width: 200, color: 'white' }}
              primary="Project"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('checkinout');
              action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={{ width: 200, color: 'white' }}
              primary="CheckInOut"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('adduser');
              action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={{ width: 200, color: 'white' }}
              primary="AddUser"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('addproject');
              action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={{ width: 200, color: 'white' }}
              primary="AddProject"
            />
          </ListItemButton>
        </Box>
      );
    } else if (role === 'Employee') {
      return (
        <>
          <ListItemButton>
            <ListItemText primary="ApplyLeave" />
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
    <Box>
      {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: '#36454f',
          },
        }}
        anchor={'left'}
        open={state.showSidebar}
        onClose={() => action?.setShowSidebar(false)}
      >
        {renderSidebarItems()}
      </Drawer>
    </Box>
  );
};

export default SideBar;
