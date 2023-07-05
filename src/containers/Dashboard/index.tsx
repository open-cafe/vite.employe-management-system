import useAdminDashboard from '@/hooks/useAdminDashboard';
import useCurrentUser from '@/hooks/useCurrentUser';
import DashboardStyles from '@/style/Dashboard.styles';
import {
  Paper,
  useMediaQuery,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CommonStyles from '@/style/Common.styles';
import { returnCardColor } from '@/utils/commonUtils';
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
  const navigate = useNavigate();
  const isWidthLessThan1585 = useMediaQuery('(max-width: 1585px)');
  const isWidthLessThan1462 = useMediaQuery('(max-width: 1462px)');
  const isWidthLessThan1328 = useMediaQuery('(max-width: 1328px)');
  const isWidthLessThan1200 = useMediaQuery('(max-width: 1200px)');
  const isWidthLessThan1073 = useMediaQuery('(max-width: 1073px)');
  const { currentUserData } = useCurrentUser();
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

  const projectBystatusDatas = projectBystatusData?.data?.data;

  return (
    <>
      {role === 'SuperAdmin' || role === 'Admin' ? (
        <Paper sx={CommonStyles.paperAndCard}>
          <Grid
            container
            direction={'row'}
            spacing={3}
            sx={{
              marginTop: '10px',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {projectBystatusDatas &&
              projectBystatusDatas.map((project: any) => {
                return (
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={
                      (isWidthLessThan1200 ? 3 : 2) &&
                      (isWidthLessThan1073 ? 4 : 3)
                    }
                    lg={
                      (isWidthLessThan1462 ? 2.4 : 2) &&
                      (isWidthLessThan1328 ? 3 : 2.4)
                    }
                    xl={isWidthLessThan1585 ? 2.4 : 2}
                    key={project.status}
                  >
                    <Card
                      sx={
                        DashboardStyles.cardColor(
                          returnCardColor(project.status)
                        ).card
                      }
                      onClick={() => {
                        navigate(`project`);
                      }}
                    >
                      <CardContent sx={{ width: '100%' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={DashboardStyles.dashboardCardTextStyle}
                          >
                            {project.count}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={DashboardStyles.fontStyles}
                          >
                            {project.status}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          <Grid
            container
            direction={'row'}
            spacing={3}
            sx={{
              padding: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Grid
              item
              xs={6}
              sm={6}
              md={
                (isWidthLessThan1200 ? 3 : 2) && (isWidthLessThan1073 ? 4 : 3)
              }
              lg={
                (isWidthLessThan1462 ? 2.4 : 2) &&
                (isWidthLessThan1328 ? 3 : 2.4)
              }
              xl={isWidthLessThan1585 ? 2.4 : 2}
            >
              <Card
                sx={{
                  display: 'flex',
                  height: '135px',
                  backgroundColor: '#9c27b0',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate(`employee`);
                }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={DashboardStyles.dashboardCardTextStyle}
                    >
                      {employeeCountDatas?.totalEmployees}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={DashboardStyles.fontStyles}
                    >
                      Total Employees
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid
              item
              xs={6}
              sm={6}
              md={
                (isWidthLessThan1200 ? 3 : 2) && (isWidthLessThan1073 ? 4 : 3)
              }
              lg={
                (isWidthLessThan1462 ? 2.4 : 2) &&
                (isWidthLessThan1328 ? 3 : 2.4)
              }
              xl={isWidthLessThan1585 ? 2.4 : 2}
            >
              <Card
                sx={{
                  display: 'flex',
                  height: '135px',
                  backgroundColor: '#4caf50',
                }}
                onClick={() => {
                  navigate(`employee`);
                }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={DashboardStyles.dashboardCardTextStyle}
                    >
                      {employeeCountDatas?.totalemployeesCheckin}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={DashboardStyles.fontStyles}
                    >
                      Present
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              md={
                (isWidthLessThan1200 ? 3 : 2) && (isWidthLessThan1073 ? 4 : 3)
              }
              lg={
                (isWidthLessThan1462 ? 2.4 : 2) &&
                (isWidthLessThan1328 ? 3 : 2.4)
              }
              xl={isWidthLessThan1585 ? 2.4 : 2}
            >
              <Card
                sx={{
                  display: 'flex',
                  height: '135px',
                  backgroundColor: '#e7413c',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate(`employee`);
                }}
              >
                <CardContent sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={DashboardStyles.dashboardCardTextStyle}
                    >
                      {employeeCountDatas?.totalEmployees -
                        employeeCountDatas?.totalemployeesCheckin || 0}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={DashboardStyles.fontStyles}
                    >
                      Absent
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid
            container
            direction={'row'}
            spacing={3}
            sx={{
              marginTop: '10px',
              padding: '10px',
            }}
          >
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <TableContainer sx={DashboardStyles.tableContainer}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={4}>
                            Employee who apply leave today
                          </TableCell>
                        </TableRow>
                        <TableRow>
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

            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <TableContainer sx={DashboardStyles.tableContainer}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center" colSpan={4}>
                            Employee on leave today
                          </TableCell>
                        </TableRow>
                        <TableRow>
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
        </Paper>
      ) : (
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
      )}
    </>
  );
};

export default Dashboard;
