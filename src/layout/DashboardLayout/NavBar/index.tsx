import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cookieName } from '@/constants/environment';
import { deleteCookie } from '@/utils/authCookies';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import PersonIcon from '@mui/icons-material/Person';
import NavbarStyles from '@/style/Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import useSidebarContext from '@/context/sidebar/useSidebarContext';

export default function NavBar() {
  const navigate = useNavigate();

  const routeChange = async () => {
    // const res = await axios.post('http://localhost:3000/user/logout');
    deleteCookie(cookieName);
    navigate(`login`);
  };

  const toggleSidebar = useSidebarContext();
  const [state, action] = toggleSidebar;
  console.log(state, action);

  return (
    <Box sx={{ position: 'relative', flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={NavbarStyles.navbarHeight} variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, alignContent: 'items-center' }}
            onClick={() => {
              action?.setShowSidebar(!state.showSidebar);
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
                  <MenuItem onClick={popupState.close}>Profile</MenuItem>
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
