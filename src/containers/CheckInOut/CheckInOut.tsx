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
  id: 'name' |  'phone' | 'check_in_time' | 'check_out_time' | 'current_date';
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

interface CheckInOut{
  
  name: string;
  phone:string;
  checkInTime:Date;
  checkOutTime:Date;
  timeId:string
  
}


const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiMDdmMTJiNS1kYTZlLTQyYTEtODk0OC1mZDE5MWFmY2UxYjIiLCJpYXQiOjE2ODM0NjI0MDIsImV4cCI6MTY4MzU0ODgwMn0.hr4a7qIn_rRnTHCU_QN9zl7B2OVKBWjRSJVj8Q5sSPI';
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

const fetchCheckInOut=() =>{
  console.log(config)
  return axios
  .get(`http://localhost:3000/checkinout`,config)
  .then(({ data }) => data)
  .catch(err => console.error(err));

}



const CheckInOut:any= ()=> {
  const  {isSuccess, data, isLoading, isError}=useQuery(
    ['checkinout'],
    fetchCheckInOut) 

    if (isSuccess) {
      const checkinoutDetail=data.data.data
      console.log(checkinoutDetail[0])
   
     
    
      return (
        <Paper >
          <TableContainer sx={{ }}>
            <Table stickyHeader aria-label="sticky table">            
          
            <TableHead>
              
            <TableRow>
              <TableCell align="center" >
                Checkinout Details
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
             
              {checkinoutDetail
              .map((check:any) => {
                
                return (
                  <TableRow hover role="checkbox"  key={check.timeId}>
                    <TableCell sx={{minWidth:170}}>
                    {check?.employee.name}
                    </TableCell>
                    <TableCell sx={{minWidth:100}}>
                    {check?.employee.phone}
                    </TableCell>
                    <TableCell align='right' sx={{minWidth:170}}>
                    {check?.checkinTime.toLocaleString().slice(11,19)}
                    </TableCell>
                    <TableCell align='right' sx={{minWidth:170}}>
                    {check?.checkoutTime.toLocaleString().slice(11,19)}
                    </TableCell>
                    <TableCell align='right' sx={{minWidth:170}}>
                    {check?.currenDate.toLocaleString().slice(0,10)}
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

export default CheckInOut