import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import {
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Drawer,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/hooks/useCurrentUser';
import SideBarStyles from '@/style/SideBar.styles';
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
            onClick={() =>
              action?.setShowSidebar && action?.setShowSidebar(false)
            }
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <Typography fontSize={17} sx={{ marginLeft: -3, color: 'white' }}>
              Back
            </Typography>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('employee');
              action?.setShowSidebar && action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={SideBarStyles.listTextStyle}
              primary="Employees"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('leave');
              action?.setShowSidebar && action?.setShowSidebar(false);
            }}
          >
            <ListItemText sx={SideBarStyles.listTextStyle} primary="Leave" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('project');
              action?.setShowSidebar && action?.setShowSidebar(false);
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
              action?.setShowSidebar && action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={SideBarStyles.listTextStyle}
              primary="CheckInOut"
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('adduser');
              action?.setShowSidebar && action?.setShowSidebar(false);
            }}
          >
            <ListItemText sx={SideBarStyles.listTextStyle} primary="AddUser" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate('addproject');
              action?.setShowSidebar && action?.setShowSidebar(false);
            }}
          >
            <ListItemText
              sx={SideBarStyles.listTextStyle}
              primary="AddProject"
            />
          </ListItemButton>
        </Box>
      );
    } else if (role === 'Employee') {
      return (
        <Box>
          <ListItemButton
            sx={SideBarStyles.listButtonStyle}
            onClick={() =>
              action?.setShowSidebar && action?.setShowSidebar(false)
            }
          >
            <ListItemIcon sx={{ color: 'white' }}>
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </ListItemIcon>
            <Typography fontSize={18} sx={{ marginLeft: -3, color: 'white' }}>
              Back
            </Typography>
          </ListItemButton>
          <ListItemButton sx={SideBarStyles.listButtonStyle}>
            <ListItemText
              sx={SideBarStyles.listTextStyle}
              primary="ApplyLeave"
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemText sx={SideBarStyles.listTextStyle} primary="Project" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText
              sx={SideBarStyles.listTextStyle}
              primary="CheckInOut"
            />
          </ListItemButton>
        </Box>
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
        open={state?.showSidebar ?? false}
        onClose={() => {
          action?.setShowSidebar && action.setShowSidebar(false);
        }}
      >
        {renderSidebarItems()}
      </Drawer>
    </Box>
  );
};

export default SideBar;
