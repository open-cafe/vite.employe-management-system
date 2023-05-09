import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
//import axios from 'axios';
import { TableHead, TablePagination } from '@mui/material';
import useEmployee from '@/hooks/useEmployee';
import { useEffect, useState } from 'react';

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

const Employees: any = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { isSuccess, data, employeeLoading } = useEmployee(
    page + 1,
    rowsPerPage
  );
  const [employeeDetail, setEmployeeDetail] = useState(data?.data.data.data);

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
    setEmployeeDetail(data?.data.data.data);
  }, [data]);

  if (isSuccess) {
    const total = data?.data.data;

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
              {employeeDetail &&
                employeeDetail.map((employees: Employees) => {
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
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={total.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
};

export default Employees;
