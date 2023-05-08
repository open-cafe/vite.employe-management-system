import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from '../../config/axios';
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
    minWidth: 150,
  },
];

interface Project {
  project_name: string;
  description: string;
}

const fetchProject = (): Promise<Project[]> => {
  return axios
    .get(`http://localhost:3000/project`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

const Project = () => {
  const { isSuccess, data, isLoading, isError } = useQuery(
    ['project'],

    fetchProject
  );
  if (isSuccess) {
    console.log(data);
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
