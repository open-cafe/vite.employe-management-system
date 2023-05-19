import React, { ReactChildren, ReactNode } from 'react';
import NavBar from './NavBar/NavBar';
import MainLayout from '../MainLayout';
import SideBar from './Sidebar/SideBar';

import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

interface DashboardLayoutPops {
  children: ReactNode;
}

const DashboardLayout = () => {
  return (
    <MainLayout>
      <Grid container>
        <Grid item xs={6} md={1}>
          <SideBar />
        </Grid>
        <Grid item xs={6} md={11}>
          <NavBar />
          <Box sx={{ height: `calc(100% - 48px)` }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default DashboardLayout;
