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
  id: 'project_name' | 'description';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'project_name', label: 'Project Name', minWidth: 170 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
  },
];

const token1 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5ZTQyZmQyYS02NTNlLTQ3MjMtYmM4Yi1jNTQyMWJmZDFkYTUiLCJpYXQiOjE2ODM1Mjc0MzAsImV4cCI6MTY4MzYxMzgzMH0.wvqdrF9YDAIR6NRSkrlqd242o39aoq0KMEVUNCvoNAY.eyJ1c2VySWQiOiJiMDdmMTJiNS1kYTZlLTQyYTEtODk0OC1mZDE5MWFmY2UxYjIiLCJpYXQiOjE2ODM0NjI0MDIsImV4cCI6MTY4MzU0ODgwMn0.hr4a7qIn_rRnTHCU_QN9zl7B2OVKBWjRSJVj8Q5sSPI';
const config = {
  headers: { Authorization: `Bearer ${token1}` },
};

interface Project {
  project_name: string;
  description: string;
}

const fetchProject = (): Promise<Project[]> => {
  return axios
    .get(`http://localhost:3000/project`, config)
    .then(({ data }) => data);
};

const Project = () => {
  const { isSuccess, data, isLoading, isError } = useQuery(
    ['project'],

    fetchProject
  );
  if (isSuccess) {
    console.log(data[0]);
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
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Project;
