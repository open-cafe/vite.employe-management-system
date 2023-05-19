import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
// import axios from '../../config/axios';
// import { useQuery } from '@tanstack/react-query';
import { TableHead, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useLeave from '@/hooks/useLeave';
import { Dayjs } from 'dayjs';

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
  const navigateToConfirmed = (leave: Leave) => {
    navigate(`/leavedetail`, { state: leave });
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { isSuccess, data, leaveLoading } = useLeave(page + 1, rowsPerPage);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isSuccess) {
    const leaveDetail = data?.data.data.data;

    return (
      <Paper sx={{ width: '100%' }}>
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
              {leaveDetail.map((leave: Leave) => {
                return (
                  <TableRow
                    onClick={() => navigateToConfirmed(leave)}
                    hover
                    role="checkbox"
                    key={leave.leaveId}
                  >
                    <TableCell sx={{ minWidth: 170 }}>{leave.reason}</TableCell>
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
          count={leaveDetail.leaveDetail}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  } else {
    return <></>;
  }
};

export default Leave;
