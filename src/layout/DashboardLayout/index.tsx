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
      <Box
        sx={{
          display: 'flex',
          height: 'calc(100vh - 60px)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '75vw' }}>
          <Outlet />
        </Box>
      </Box>
    </MainLayout>
  );
};

export default DashboardLayout;
