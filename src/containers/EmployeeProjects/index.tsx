import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useProjectAssignmentByEmployee from '@/hooks/useProjectAssignmentByEmployee';

// import useProject from '@/hooks/useProject';
import {
  CircularProgress,
  TablePagination,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCurrentUser from '@/hooks/useCurrentUser';

interface Column {
  id: 'project_name' | 'description' | 'status';
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
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
  },
];

interface Project {
  projectId: string;
  projectName: string;
  description: string;
  status: string;
}

const EmployeeProjects: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserError, currentUserData, currentUserLoading } =
    useCurrentUser();
  const role = currentUserData?.data?.data?.getCurrentUser.role;
  console.log(role);
  const navigateToConfirmed = (project: Project) => {
    if (role !== 'Employee') {
      navigate(`/projectdetail`, { state: project });
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { projectLoading, projectData, projectError } =
    useProjectAssignmentByEmployee(page + 1, rowsPerPage);
  console.log('projectData employee', projectData);
  // const { projectLoading, projectData, projectError } = useProject(
  //   page + 1,
  //   rowsPerPage
  // );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const total = projectData?.data?.data;
  const projectDetail = projectData?.data?.data?.projects;
  console.log('projectDetail employee', projectDetail);

  return (
    <Paper /* sx={{ width: '100%' }} */>
      {projectLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
        >
          <CircularProgress />
        </Box>
      ) : projectError ? (
        <div>{projectError}</div>
      ) : (
        <>
          <div>
            <Typography
              sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
              variant="h4"
              color="inherit"
              align="center"
            >
              Project List
            </Typography>
          </div>
          <TableContainer sx={{ height: '85vh' }}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ height: 'max-content' }}
            >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {projectDetail.length ? (
                  projectDetail.map((project: Project) => {
                    return (
                      <TableRow
                        onClick={() => navigateToConfirmed(project)}
                        hover
                        role="checkbox"
                        key={project.projectId}
                      >
                        <TableCell sx={{ minWidth: 170 }}>
                          {project?.projectName}
                        </TableCell>
                        <TableCell sx={{ minWidth: 100 }}>
                          {project?.description}
                        </TableCell>
                        <TableCell sx={{ minWidth: 100 }}>
                          {project?.status}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      No Project Found
                    </TableCell>
                  </TableRow>
                )}
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
        </>
      )}
    </Paper>
  );
};

export default EmployeeProjects;
