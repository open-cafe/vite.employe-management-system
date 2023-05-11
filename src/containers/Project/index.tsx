import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useProject from '@/hooks/useProject';
import { TablePagination, TableSortLabel } from '@mui/material';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isSuccess, data } = useProject(page + 1, rowsPerPage);

  const [projectDetail, setProjectDetail] = useState(data?.data.data.data);
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
    setProjectDetail(data?.data.data.data);
  }, [data]);

  if (isSuccess) {
    const total = data?.data.data;

    return (
      <Paper /* sx={{ width: '100%' }} */>
        <TableContainer /* sx={{ maxHeight: 440 }} */>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Project Details</TableCell>
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
              {projectDetail &&
                projectDetail.map((project: Project) => {
                  return (
                    <TableRow hover role="checkbox" key={project.projectId}>
                      <TableCell sx={{ minWidth: 170 }}>
                        {project?.projectName}
                      </TableCell>
                      <TableCell sx={{ minWidth: 100 }}>
                        {project?.description}
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

export default Project;
