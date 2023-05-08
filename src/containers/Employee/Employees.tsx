import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
//import axios from 'axios';
import axios from '../../config/axios';
import { useQuery } from '@tanstack/react-query';
import { TableFooter, TableHead } from '@mui/material';
import useEmployee from '@/hooks/useEmployee';

interface Column {
  id: 'name' | 'designation' | 'phone' | 'hireDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'designation', label: 'Designation', minWidth: 100 },
  {
    id: 'phone',
    label: 'Contct Number',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'hireDate',
    label: 'Hire Date',
    minWidth: 170,
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

const Employees = () => {
  const { isSuccess, data, employeeLoading } = useEmployee();

  if (isSuccess) {
    const employeeDetail = data?.data.data.data;

    return (
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Employee Details</TableCell>
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
              {employeeDetail.map((employees: Employees) => {
                return (
                  <TableRow hover role="checkbox" key={employees.employeeId}>
                    <TableCell sx={{ minWidth: 170 }}>
                      {employees?.name}
                    </TableCell>
                    <TableCell sx={{ minWidth: 100 }}>
                      {employees?.designation}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {employees?.phone}
                    </TableCell>
                    <TableCell align="right" sx={{ minWidth: 170 }}>
                      {employees?.hireDate?.toLocaleString().slice(0, 10)}
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

export default Employees;
