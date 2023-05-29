import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PrivateRoutes from '@/components/PrivateRoutes';
import PublicRoutes from '@/components/PublicRoutes';
import Dashboard from './Dashboard';
import DashboardLayout from '@/layout/DashboardLayout';
import Employees from './Employee';
import Leave from './Leave';
import Project from './Project';

import LeaveDetails from './Leave/Details';
import CheckInOut from './CheckInOut';

import Login from './Login/index';
import AddUser from './AddUser';
import ChangePassword from './ChangePassword';
import AddProject from './AddProject';

import LeaveAdd from './LeaveAdd';
import ResetPasswordMailForm from './ResetPassowrdMailForm/resetPasswordMailForm';
import ResetPassword from './ResetPassword';
import AddProjectAssignment from './AddProjectAssignment';
import ProjectDetails from './Project/ProjectDetails';
import EmployeeOnBoarding from './EmployeeOnBorading';

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/employeeonboarding" element={<EmployeeOnBoarding />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<Employees />} />
          <Route path="leave" element={<Leave />} />
          <Route path="project" element={<Project />} />
          <Route path="leavedetail" element={<LeaveDetails />} />
          <Route path="checkinout" element={<CheckInOut />} />
          <Route path="adduser" element={<AddUser />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route path="projectdetail" element={<ProjectDetails />} />
          <Route path="addproject" element={<AddProject />} />
          {/* <Route path="addleave" element={<AddLeave />} /> */}
          <Route path="leaveadd" element={<LeaveAdd />} />
          <Route
            path="addprojectassignment"
            element={<AddProjectAssignment />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/sendresetpasswordmail"
          element={<ResetPasswordMailForm />}
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default Router;
