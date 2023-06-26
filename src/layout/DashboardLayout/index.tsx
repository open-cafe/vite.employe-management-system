import React, { ReactChildren, ReactNode, useEffect } from 'react';
import NavBar from './NavBar';
import MainLayout from '../MainLayout';
import SideBar from './Sidebar';

import Grid from '@mui/material/Grid';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

interface DashboardLayoutPops {
  children: ReactNode;
}

const DashboardLayout = () => {
  const location = useLocation();

  let leaveId = localStorage.getItem('leaveId');

  const navigate = useNavigate();

  useEffect(() => {
    leaveId && navigate(`leavedetail/${leaveId}`);
    leaveId = null;
  }, [leaveId]);

  return (
    <MainLayout>
      <NavBar />
      <SideBar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {location.pathname === '/changepassword' ? (
          <Box sx={{ width: '35vw' }}>
            <Outlet />
          </Box>
        ) : (
          <Box sx={{ width: '70vw' }}>
            <Outlet />
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};

export default DashboardLayout;
