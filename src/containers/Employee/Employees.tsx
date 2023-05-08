import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { TableFooter, TableHead } from '@mui/material';



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
  employeeId:string;
  name: string;
  designation: string;
  phone:string;
  hireDate:Date;
}


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMDdmMTJiNS1kYTZlLTQyYTEtODk0OC1mZDE5MWFmY2UxYjIiLCJpYXQiOjE2ODM0NjI0MDIsImV4cCI6MTY4MzU0ODgwMn0.hr4a7qIn_rRnTHCU_QN9zl7B2OVKBWjRSJVj8Q5sSPI';
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const fetchEmployees=() =>{
  console.log(config)
  return axios
  .get(`http://localhost:3000/employees`,config)
  .then(({ data }) => data)
  .catch(err => console.error(err));

}



const Employees:any= ()=> {
  const  {isSuccess, data, isLoading, isError}=useQuery(
    ['employees'],
  
  
    fetchEmployees) 
    if (isSuccess) {
      const employeeDetail=data.data.data
  
      return (
        <Paper >
          <TableContainer sx={{ }}>
            <Table stickyHeader aria-label="sticky table">            
          
            <TableHead>
              
            <TableRow>
              <TableCell align="center" >
                Employee Details
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
             
              {employeeDetail
              .map((employees:Employees) => {
                
                return (
                  <TableRow hover role="checkbox"  key={employees.employeeId}>
                    <TableCell sx={{minWidth:170}}>
                    {employees?.name}
                    </TableCell>
                    <TableCell sx={{minWidth:100}}>
                    {employees?.designation}
                    </TableCell>
                    <TableCell align='right' sx={{minWidth:170}}>
                    {employees?.phone}
                    </TableCell>
                    <TableCell align='right' sx={{minWidth:170}}>
                    {employees?.hireDate?.toLocaleString().slice(0,10)}
                    </TableCell>
                    
                  </TableRow>
                );
              })}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
          
        </Paper>
      );

     
    }

  
}

export default Employees