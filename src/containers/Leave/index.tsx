import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
// import axios from '../../config/axios';
// import { useQuery } from '@tanstack/react-query';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TableHead,
  TablePagination,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import useLeave from '@/hooks/useLeave';
import { useEffect, useState } from 'react';

import { Dayjs } from 'dayjs';
import useCurrentUser from '@/hooks/useCurrentUser';
import CommonStyles from '@/style/Common.styles';

import useDeleteLeave from '@/hooks/useDeleteLeave';
import { useQueryClient } from '@tanstack/react-query';
import LeaveEdit from './LeaveEdit';

interface Column {
  id: 'reason' | 'leaveType' | 'startDate' | 'endDate' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
  format?: (value: number) => string;
}

interface Leave {
  leaveId: string;
  leaveType: string;
  startDate: Dayjs;
  reason: string;
  endDate: Dayjs;
}

const Leave: React.FC = () => {
  const { currentUserError, currentUserData, currentUserLoading } =
    useCurrentUser();
  const role = currentUserData?.data?.data?.getCurrentUser.role;

  let isEmployee = false;
  if (role === 'Employee') {
    isEmployee = true;
  }
  const columns: Column[] = [
    { id: 'reason', label: 'Reason', minWidth: 170 },
    { id: 'leaveType', label: 'Leave Type', minWidth: 100 },
    {
      id: 'startDate',
      label: 'Start Date',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'endDate',
      label: 'End Date',
      minWidth: 170,
      align: 'left',
    },
  ];

  if (role === 'Employee') {
    columns.push({
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'center',
    });
  }

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { deleteLeaveAction } = useDeleteLeave();
  const { state } = useLocation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  // console.log('leave all datas leaveById', leaveByIdData);
  const navigateToConfirmed = (leave: Leave) => {
    if (role !== 'Employee') {
      navigate(`/leavedetail`, { state: leave });
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { leaveError, leaveData, leaveLoading } = useLeave(
    page + 1,
    rowsPerPage
  );
  const [leaveDetail, setLeaveDetail] = useState(leaveData?.data.data.data);
  useEffect(() => {
    setLeaveDetail(leaveData?.data.data.data);
  }, [leaveData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // const handleDelete = () => {
  //   const leaveDetails = {
  //     // leaveId: leaveDetail.leaveId,
  //   };
  //   console.log('Delete leave', total.data.leaveId);
  // };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const total = leaveData?.data.data;
  // const handleClick = () => {
  //   console.log('datas of leave');
  //   const data = printValue();
  //   console.log('datas of leave', data);
  // };

  return (
    <Paper sx={CommonStyles.paperLayout}>
      {leaveLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
        >
          <CircularProgress />
        </Box>
      ) : leaveError ? (
        <div>{leaveError}</div>
      ) : (
        <>
          <TableContainer sx={{ height: '80vh' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <h2>Leave Details</h2>
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 57,
                        minWidth: column.minWidth,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  /* leaveDetail.length ? ( */
                  leaveDetail &&
                    leaveDetail.map((leave: Leave) => {
                      <TableBody>
                        {leaveDetail &&
                          leaveDetail.map((leave: Leave) => {
                            return (
                              <TableRow
                                onClick={() => navigateToConfirmed(leave)}
                                hover
                                role="checkbox"
                                key={leave.leaveId}
                              >
                                <TableCell sx={{ minWidth: 170 }}>
                                  {leave.reason}
                                </TableCell>
                                <TableCell sx={{ minWidth: 170 }}>
                                  {leave.leaveType}
                                </TableCell>
                                <TableCell align="left" sx={{ minWidth: 170 }}>
                                  {leave.startDate
                                    .toLocaleString()
                                    .slice(0, 10)}
                                </TableCell>
                                <TableCell align="left" sx={{ minWidth: 170 }}>
                                  {leave.endDate.toLocaleString().slice(0, 10)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>;

                      return (
                        <TableRow
                          onClick={() => navigateToConfirmed(leave)}
                          hover
                          role="checkbox"
                          key={leave.leaveId}
                        >
                          <TableCell sx={{ minWidth: 170 }}>
                            {leave.reason}
                          </TableCell>
                          <TableCell sx={{ minWidth: 170 }}>
                            {leave.leaveType}
                          </TableCell>
                          <TableCell align="left" sx={{ minWidth: 170 }}>
                            {leave.startDate.toLocaleString().slice(0, 10)}
                          </TableCell>
                          <TableCell align="left" sx={{ minWidth: 170 }}>
                            {leave.endDate.toLocaleString().slice(0, 10)}
                          </TableCell>
                          {isEmployee && (
                            <TableCell>
                              <Grid
                                container
                                spacing={2}
                                justifyContent="center"
                              >
                                <Grid item>
                                  <LeaveEdit
                                    leaveId={leave.leaveId}
                                    leaveType={leave.leaveType}
                                    reason={leave.reason}
                                    startDate={leave.startDate}
                                    endDate={leave.endDate}
                                  />
                                </Grid>
                                <Grid item>
                                  <Button
                                    variant="contained"
                                    onClick={() => {
                                      const leaveDetails = {
                                        leaveId: leave.leaveId,
                                      };
                                      deleteLeaveAction(leaveDetails, {
                                        onSuccess: (data) => {
                                          if (data) {
                                            // add toast later

                                            queryClient.invalidateQueries([
                                              'leaves',
                                            ]);
                                            navigate(`/leave`);
                                            setAlertSeverity('success');
                                            setAlertMessage('Leave Deleted ');
                                            setAlertOpen(true);
                                          }
                                        },
                                        onError: () => {
                                          setAlertSeverity('error');
                                          setAlertMessage(
                                            'Cannot Delete Leave!! Error '
                                          );
                                          setAlertOpen(true);
                                        },
                                      });
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </Grid>
                              </Grid>
                            </TableCell>
                          )}

                          {/* } */}
                        </TableRow>
                      );
                    })
                  // ) : (
                  //   <TableRow>
                  //     <TableCell align="center" colSpan={6}>
                  //       No Leave Found
                  //     </TableCell>
                  //   </TableRow>
                  // )
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={total.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Snackbar
            open={alertOpen}
            autoHideDuration={6000}
            onClose={handleAlertClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert onClose={handleAlertClose} severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </>
      )}
    </Paper>
  );
};

export default Leave;
