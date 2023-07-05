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
import ResetPassowrdMailForm from './ResetPassowrdMailForm';
import ResetPassword from './ResetPassword';
import AddProjectAssignment from './AddProjectAssignment';
import ProjectDetails from './Project/ProjectDetails';
import EmployeeOnBoarding from './EmployeeOnBorading';
import EmployeeProjects from './EmployeeProjects';
import EmployeeEdits from './EmployeeEdits';
import AddCheckInOut from './AddCheckInOut';
import Page from './Page';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route
          path="/employeeonboarding"
          element={
            <Page component={EmployeeOnBoarding} title="Employee Details" />
          }
        />

        <Route
          path="/"
          element={<Page component={DashboardLayout} title="Welcome" />}
        >
          <Route
            path="/employeeedit"
            element={
              <Page component={EmployeeEdits} title="Employee Profile" />
            }
          />
          <Route
            index
            element={<Page component={Dashboard} title="Dashboard" />}
          />
          <Route
            path="/employee"
            element={<Page component={Employees} title="Employee List" />}
          />
          <Route
            path="/leave"
            element={<Page component={Leave} title="Leave Details" />}
          />
          <Route
            path="/project"
            element={<Page component={Project} title="Project List" />}
          />
          <Route
            path="/leavedetail/:leaveId"
            element={<Page component={LeaveDetails} title="Leave Verify" />}
          />
          <Route
            path="/checkinout"
            element={<Page component={CheckInOut} title="Checkinout Details" />}
          />
          <Route
            path="/adduser"
            element={<Page component={AddUser} title="Add User" />}
          />
          <Route
            path="/changepassword"
            element={
              <Page component={ChangePassword} title="Change Password" />
            }
          />
          <Route
            path="/projectdetail"
            element={
              <Page component={ProjectDetails} title="Project Details" />
            }
          />
          <Route
            path="/addproject"
            element={<Page component={AddProject} title="Add Project" />}
          />
          <Route
            path="/addcheckinout"
            element={<Page component={AddCheckInOut} title="Checkinout" />}
          />

          <Route
            path="/leaveadd"
            element={<Page component={LeaveAdd} title="Leave Apply" />}
          />
          <Route
            path="/addprojectassignment"
            element={
              <Page
                component={AddProjectAssignment}
                title="Add Projectassignment"
              />
            }
          />
          <Route
            path="/employeeprojects"
            element={
              <Page component={EmployeeProjects} title="My Project List" />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/" element={<PublicRoutes />}>
        <Route
          path="/login"
          element={<Page component={Login} title="Login" />}
        />
        <Route
          path="/sendresetpasswordmail"
          element={
            <Page
              component={ResetPassowrdMailForm}
              title="Reset password Form"
            />
          }
        />
        <Route
          path="/resetpassword"
          element={<Page component={ResetPassword} title="Reset Password" />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
