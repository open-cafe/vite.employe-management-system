import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoutes from '@/components/PrivateRoutes';
import PublicRoutes from '@/components/PublicRoutes';
import Dashboard from './Dashboard';
import Login from './Login';
import DashboardLayout from '@/layout/DashboardLayout';
import Employees from './Employees';
import Leave from './Leave';
import Project from './Project';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Router: FC = () => {
  // Add Routes for different pages
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="employee" element={<Employees />} />
        <Route path="leave" element={<Leave />} />
        <Route path="project" element={<Project />} />
      </Route>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Router;
