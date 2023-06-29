import useAdminDashboard from '@/hooks/useAdminDashboard';
import useCurrentUser from '@/hooks/useCurrentUser';
import DashboardLayout from '@/layout/DashboardLayout';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

interface employeesLeaveToday {
  name?: string;
  status?: string;
  leaveId?: string;
}

interface employeesOnLeaveToday {
  leaveId?: string;
  name?: string;
  Contact?: string;
}

const Dashboard = () => {
  const { currentUserError, currentUserData, currentUserLoading } =
    useCurrentUser();
  const role = currentUserData?.data?.data?.role;
  const {
    employeeApplyLeaveTodayData,
    employeeOnLeaveTodayData,
    employeeCountData,
    projectBystatusData,
  } = useAdminDashboard();

  const employeeCountDatas = employeeCountData?.data?.data;
  const employeeApplyLeaveTodayDatas =
    employeeApplyLeaveTodayData?.data?.data.filteredData;

  const employeeOnLeaveTodayDatas =
    employeeOnLeaveTodayData?.data?.data.filteredData;

  const projectBystatusDatas = projectBystatusData?.data.data.data;

  return (
    <>
      {role === 'SuperAdmin' || role === 'Admin' ? (
        <Grid
          container
          spacing={2}
          sx={{
            marginTop: '10px',
            padding: '10px',
          }}
        >
          <Grid item xs={6}>
            <Card
              sx={{
                display: 'flex',
                height: '135px',
                backgroundColor: '#ED8477',
              }}
            >
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Total Employee: {employeeCountDatas?.totalEmployees}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Total Employees Checked In :{' '}
                  {employeeCountDatas?.totalemployeesCheckin}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card
              sx={{
                display: 'flex',
                height: '135px',
                backgroundColor: '#6EC1E5',
              }}
            >
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Total Project : {projectBystatusData?.data?.data.total}
                </Typography>

                {projectBystatusDatas &&
                  projectBystatusDatas.map((project: any) => {
                    return (
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        key={project.status}
                      >
                        {project.status}: {project.count}
                      </Typography>
                    );
                  })}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#D1CD68' }}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ borderBottom: '2px solid #8c871b' }}>
                        <TableCell align="center" colSpan={4}>
                          Employee who apply leave today
                        </TableCell>
                      </TableRow>
                      <TableRow></TableRow>
                      <TableRow sx={{ borderBottom: '2px solid #8c871b' }}>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Leave status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeApplyLeaveTodayDatas &&
                        employeeApplyLeaveTodayDatas.map(
                          (employees: employeesLeaveToday) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                key={employees.leaveId}
                                sx={{ borderBottom: '2px solid #8c871b' }}
                              >
                                <TableCell sx={{ minWidth: 170 }}>
                                  {employees?.name}
                                </TableCell>
                                <TableCell sx={{ minWidth: 100 }}>
                                  {employees?.status}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ backgroundColor: '#62DA9A' }}>
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ borderBottom: '2px solid #3b8a50' }}>
                        <TableCell align="center" colSpan={4}>
                          Employee on leave today
                        </TableCell>
                      </TableRow>
                      <TableRow></TableRow>
                      <TableRow sx={{ borderBottom: '2px solid #3b8a50' }}>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Contact</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeOnLeaveTodayDatas &&
                        employeeOnLeaveTodayDatas.map(
                          (employees: employeesOnLeaveToday) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                key={employees.leaveId}
                                sx={{ borderBottom: '2px solid #3b8a50' }}
                              >
                                <TableCell sx={{ minWidth: 170 }}>
                                  {employees?.name}
                                </TableCell>
                                <TableCell sx={{ minWidth: 100 }}>
                                  {employees?.Contact}
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <h1>hello</h1>
      )}
    </>
  );
};

export default Dashboard;
