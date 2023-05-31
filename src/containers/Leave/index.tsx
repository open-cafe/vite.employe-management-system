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
  Box,
  CircularProgress,
  TableHead,
  TablePagination,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useLeave from '@/hooks/useLeave';
import { useEffect, useState } from 'react';

import { Dayjs } from 'dayjs';
import useCurrentUser from '@/hooks/useCurrentUser';

interface Column {
  id: 'reason' | 'leaveType' | 'startDate' | 'endDate';
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
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

interface Leave {
  leaveId: string;
  leaveType: string;
  startDate: Dayjs;
  reason: string;
  endDate: Dayjs;
}

const Leave: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserError, data, currentUserLoading } = useCurrentUser();
  const role = data?.data?.data?.getCurrentUser.role;
  console.log(role);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    setLeaveDetail(leaveData?.data.data.data);
  }, [data]);

  const total = leaveData?.data.data;

  return (
    <Paper sx={{ width: '100%' }}>
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
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Leave Details
                  </TableCell>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {leaveDetail &&
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
                              <TableCell sx={{ minWidth: 100 }}>
                                {leave.leaveType}
                              </TableCell>
                              <TableCell align="left" sx={{ minWidth: 170 }}>
                                {leave.startDate.toLocaleString().slice(0, 10)}
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
                        <TableCell sx={{ minWidth: 100 }}>
                          {leave.leaveType}
                        </TableCell>
                        <TableCell align="left" sx={{ minWidth: 170 }}>
                          {leave.startDate.toLocaleString().slice(0, 10)}
                        </TableCell>
                        <TableCell align="left" sx={{ minWidth: 170 }}>
                          {leave.endDate.toLocaleString().slice(0, 10)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        </>
      )}
    </Paper>
  );
};

export default Leave;
