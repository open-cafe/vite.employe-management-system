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

export default function NavBar() {
  const routeChange = () => {
    deleteCookie(cookieName);
    navigate(`login`);
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ position: 'relative' }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid container>
            <Grid item xs={1} sm={11} md={11} lg={11} xl={11}>
              <Typography variant="h6" color="inherit" component="div">
                Employee Management System
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1} md={1} lg={1} xl={1}>
              <IconButton style={{ color: 'black' }} onClick={routeChange}>
                <LogoutOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
