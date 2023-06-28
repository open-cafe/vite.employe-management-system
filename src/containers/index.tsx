import { FC, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

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
import ResetPassowrdMailForm from './ResetPassowrdMailForm';
import ResetPassword from './ResetPassword';
import AddProjectAssignment from './AddProjectAssignment';
import ProjectDetails from './Project/ProjectDetails';
import EmployeeOnBoarding from './EmployeeOnBorading';
import EmployeeProjects from './EmployeeProjects';
import EmployeeEdits from './EmployeeEdits';
import AddCheckInOut from './AddCheckInOut';

const Router: FC = () => {
  const location = useLocation();
  useEffect(() => {
    // Update document title on initial render
    document.title = 'EMS: '.concat(getPageTitle(location.pathname));
  }, [location.pathname]);

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
        return 'Welcome to EMS';
      case '/login':
        return 'Login';
      case '/leave':
        return 'Leave Details';
      case '/employeeonboarding':
        return 'Employee Details';
      case '/employeeedit':
        return 'Employee Profile';
      case '/employee':
        return 'Employee Details';
      case '/project':
        return 'Project List';
      case '/leavedetail/:leaveId':
        return 'Leave Details';
      case '/adduser':
        return 'Add User';
      case '/changepassword':
        return 'Change Password';
      case '/projectdetail':
        return 'Project Details';
      case '/addproject':
        return 'Add Project';
      case '/leaveadd':
        return 'Apply Leave';
      case '/employeeprojects':
        return 'My Project List';
      case '/checkinout':
        return 'Checkinout Details';
      case '/resetpassword':
        return 'Reset Password';
      default:
        return 'EMS';
    }
  };
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/employeeonboarding" element={<EmployeeOnBoarding />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route path="/employeeedit" element={<EmployeeEdits />} />
          <Route index element={<Dashboard />} />
          <Route path="/employee" element={<Employees />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/project" element={<Project />} />
          <Route path="/leavedetail/:leaveId" element={<LeaveDetails />} />
          <Route path="/checkinout" element={<CheckInOut />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/projectdetail" element={<ProjectDetails />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/addcheckinout" element={<AddCheckInOut />} />

          <Route path="/leaveadd" element={<LeaveAdd />} />
          <Route
            path="/addprojectassignment"
            element={<AddProjectAssignment />}
          />
          <Route path="/employeeprojects" element={<EmployeeProjects />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route
          path="/sendresetpasswordmail"
          element={<ResetPassowrdMailForm />}
        />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default Router;
