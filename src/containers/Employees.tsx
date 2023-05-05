import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

interface Column {
  id: 'name' | 'designation' | 'phone' | 'hireDate' ;
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

interface Employees{
  name: string;
  designation: string;
  phone:string;
  hireDate:Date;
}

const fetchEmployees=():Promise<Employees[]> =>{
  return axios
  .get(`http://localhost:3000/employees`)
  .then(({ data }) => data);

}



const Employees= ()=> {
  const  {isSuccess, data, isLoading, isError}=useQuery(
    ['employees'],
  
  
    fetchEmployees) 
    if (isSuccess) {
     console.log(data[0])
    }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">            
          <TableHead>
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
            
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
  );
}

export default Employees