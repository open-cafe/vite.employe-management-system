import DashboardLayout from '@/layout/DashboardLayout';
import { grey } from '@mui/material/colors';

const Dashboard = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          height: '90vh',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1
          style={{
            color: grey[900],
          }}
        >
          Welcome to Employee Management System
        </h1>
        ;
      </div>
    </>
  );
};

export default Dashboard;
