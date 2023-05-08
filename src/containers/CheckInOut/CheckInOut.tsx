import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import axios from '../../config/axios';
import { useQuery } from '@tanstack/react-query';
import { TableFooter, TableHead } from '@mui/material';
import useCheckInOut from '@/hooks/useCheckinout';

interface Column {
  id: 'name' | 'phone' | 'check_in_time' | 'check_out_time' | 'current_date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 125 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
  {
    id: 'check_in_time',
    label: 'Checkin Time',
    minWidth: 125,
    align: 'right',
  },
  {
    id: 'check_out_time',
    label: 'Checkout Time',
    minWidth: 125,
    align: 'right',
  },
  {
    id: 'current_date',
    label: 'Current Date',
    minWidth: 135,
    align: 'right',
  },
];
interface Employees {
  employeeId: string;
  name: string;
  designation: string;
  phone: string;
  hireDate: Date;
}

interface CheckInOut {
  name: string;
  phone: string;
  checkinTime: Date;
  checkoutTime: Date;
  timeId: string;
  employee: Employees;
  currenDate: Date;
}

const CheckInOut = () => {
  const { isSuccess, data, checkinoutLoading } = useCheckInOut();

  if (isSuccess) {
    const checkinoutDetail = data?.data.data.data;

    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Checkinout Details</TableCell>
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
              {checkinoutDetail.map((check: CheckInOut) => {
                return (
                  <TableRow hover role="checkbox" key={check.timeId}>
                    <TableCell sx={{ minWidth: 170 }}>
                      {check?.employee.name}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {check?.employee.phone}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {check?.checkinTime.toLocaleString().slice(11, 16)}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {check?.checkoutTime.toLocaleString().slice(11, 16)}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {check?.currenDate.toLocaleString().slice(0, 10)}
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

export default CheckInOut;
