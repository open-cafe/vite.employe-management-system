import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Grid } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '@/context/authContext';

export default function NavBar() {
  const { clearAuthToken } = useContext(AuthContext);
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
              <Button
                color="secondary"
                variant="contained"
                style={{ color: 'black' }}
                onClick={clearAuthToken}
              >
                Log out
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
