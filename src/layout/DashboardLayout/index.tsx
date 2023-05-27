import React, { ReactChildren, ReactNode, useEffect } from 'react';
import NavBar from './NavBar';
import MainLayout from '../MainLayout';
import SideBar from './Sidebar';

import Grid from '@mui/material/Grid';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

interface DashboardLayoutPops {
  children: ReactNode;
}

const DashboardLayout = () => {
  return (
    <MainLayout>
      <NavBar />
      <SideBar />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Grid item xs={3} md={1}> */}
        {/* </Grid> */}
        <Box sx={{ width: '80vw' }}>
          <Outlet />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default DashboardLayout;
