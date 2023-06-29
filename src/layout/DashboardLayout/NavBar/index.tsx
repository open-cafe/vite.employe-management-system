import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cookieName } from '@/constants/environment';
import { deleteCookie } from '@/utils/authCookies';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PersonIcon from '@mui/icons-material/Person';
import NavbarStyles from '@/style/Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import useSidebarContext from '@/context/sidebar/useSidebarContext';
import AddCheckInOut from '@/containers/AddCheckInOut';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useQueryClient } from '@tanstack/react-query';

export default function NavBar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { currentUserData } = useCurrentUser();
  const role = currentUserData?.data?.data?.role;

  let isEmployee = false;
  if (role === 'Employee') {
    isEmployee = true;
  }

  const routeChange = async () => {
    await axios.post('http://localhost:3000/user/logout');
    queryClient.removeQueries(['currentUser']);
    deleteCookie(cookieName);
    localStorage.clear();
    navigate(`login`);
  };

  const toggleSidebar = useSidebarContext();
  const [state, action] = toggleSidebar;

  return (
    <Box sx={{ position: 'relative', flexGrow: 1, zIndex: 999 }}>
      <AppBar position="static">
        <Toolbar sx={NavbarStyles.navbarHeight} variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, alignContent: 'items-center' }}
            onClick={() => {
              if (state) {
                action?.setShowSidebar &&
                  action?.setShowSidebar(!state.showSidebar);
              }
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Employee Management System
          </Typography>

          {/* <Grid item xs={12} sm={1} md={1} lg={1} xl={1}> */}
          {isEmployee && <AddCheckInOut />}

          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <IconButton
                  {...bindTrigger(popupState)}
                  style={{ color: 'white', background: 'black' }}
                >
                  <PersonIcon />
                </IconButton>

                <Menu {...bindMenu(popupState)}>
                  {isEmployee && (
                    <MenuItem onClick={() => navigate('employeeedit')}>
                      Profile
                    </MenuItem>
                  )}

                  <MenuItem onClick={() => navigate('changepassword')}>
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={routeChange}>Logout</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
          {/* </Grid>
          </Grid> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
