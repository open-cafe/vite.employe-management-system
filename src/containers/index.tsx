import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoutes from '@/components/PrivateRoutes';
import PublicRoutes from '@/components/PublicRoutes';
import Dashboard from './Dashboard';
import DashboardLayout from '@/layout/DashboardLayout';
import Employees from './Employee/Employees';
import Leave from './Leave/Leave';
import LeaveDetails from './Leave/LeaveDetails';
import CheckInOut from './CheckInOut/CheckInOut';

import Login from './Login/index';
import AddUser from './AddUser';
import ChangePassword from './Employee/ChangePassword';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<Employees />} />
          <Route path="leave" element={<Leave />} />
          <Route path="leavedetail" element={<LeaveDetails />} />
          <Route path="checkinout" element={<CheckInOut />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="changepassword" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default Router;
