import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useProject from '@/hooks/useProject';
// import axios from '../../config/axios';
// import { useQuery } from '@tanstack/react-query';

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
  projectId: string;
  projectName: string;
  description: string;
}

const Project = () => {
  const { isSuccess, data /*, isLoading, isError */ } = useProject();

  if (isSuccess) {
    const projectDetail = data?.data.data.data;
    console.log('datas');

    return (
      <Paper /* sx={{ width: '100%' }} */>
        <TableContainer /* sx={{ maxHeight: 440 }} */>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableCell align="center">Project Details</TableCell>
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
              {projectDetail.map((project: Project) => {
                return (
                  <TableRow hover role="checkbox" key={project.projectId}>
                    <TableCell sx={{ minWidth: 170 }}>
                      {project?.projectName}
                    </TableCell>
                    <TableCell sx={{ minWidth: 170 }}>
                      {project?.description}
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

export default Project;
