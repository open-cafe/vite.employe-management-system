import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import axios from '../../config/axios';
import { useQuery } from '@tanstack/react-query';
import { TableHead } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'reason' | 'leaveType' | 'startDate' | 'endDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'reason', label: 'Reason', minWidth: 170 },
  { id: 'leaveType', label: 'Leave Type', minWidth: 100 },
  {
    id: 'startDate',
    label: 'Start Date',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'endDate',
    label: 'End Date',
    minWidth: 170,
    align: 'right',
  },
];

interface Leave {
  leaveId: string;
  leaveType: string;
  startDate: Date;
  reason: string;
  endDate: Date;
}

const fetchLeaves = () => {
  return axios.get(`http://localhost:3000/leave`).then(({ data }) => data);
};

const Leave = () => {
  const navigate = useNavigate();
  const navigateToConfirmed = (leave: Leave) => {
    navigate(`/leavedetail`, { state: leave });
  };

  const { isSuccess, data, isLoading, isError } = useQuery(
    ['leaves'],
    fetchLeaves
  );

  if (isSuccess) {
    const leaveDetail = data.data.data;

    return (
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
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
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {leave.startDate.toLocaleString().slice(0, 10)}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {leave.endDate.toLocaleString().slice(0, 10)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
};

export default Leave;
