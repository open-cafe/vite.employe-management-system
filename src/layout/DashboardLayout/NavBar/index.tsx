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

export default function NavBar() {
  const navigate = useNavigate();

  const routeChange = async () => {
    // const res = await axios.post('http://localhost:3000/user/logout');
    deleteCookie(cookieName);
    navigate(`login`);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container>
            <Grid item xs={1} sm={11} md={11} lg={11} xl={11}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold' }}
                color="inherit"
                component="div"
              >
                Employee Management System
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState: any) => (
                  <React.Fragment>
                    <IconButton {...bindTrigger(popupState)}>
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
