import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import useProjectAssignments from '@/hooks/useProjectAssignments';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Employee, ProjectAndEmployee } from '../AddProjectAssignment';
import useAllEmployee from '@/hooks/useAllEmployee';
import { SyntheticEvent, useEffect, useState } from 'react';
import useAddProjectAssignment from '@/hooks/useAddProjectAssignment';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteProjectAssignment from '@/hooks/useDeleteProjectAssignment';
import useProject from '@/hooks/useProject';
import useProjectDesignationByAssignment from '@/hooks/useProjectDesignationByAssignment';

interface ProjectAssignments {
  projectAssignmentId: string;
  employee: {
    name: string;
    employeeId: string;
  };
}

interface AddEmployee {
  id: string;
  label: string;
}
interface EmployeeData {
  name: string;
  id: string;
  projectAssignmentId: string;
}
const projectDetail = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const {
    projectAssignmentLoading,
    projectAssignmentData,
    projectAssignmentError,
  } = useProjectAssignments(state.projectId, 1, 10);
  const { allEmployeeData, allEmployeeDataLoading } = useAllEmployee();
  const { deleteProjectAssignmentAction } = useDeleteProjectAssignment();

  const { addProjectAssignmentAction } = useAddProjectAssignment();

  const [enteredEmployee, setEnteredEmployee] = useState<string | null>('');

  const [allProjectAssignmentEmployees, setAllProjectAssignmentEmployees] =
    useState<any>([]);

  useEffect(() => {
    setAllProjectAssignmentEmployees(
      projectAssignmentData?.data?.data?.data?.map(
        (projectAssignment: ProjectAssignments) => {
          return {
            name: projectAssignment?.employee?.name,
            id: projectAssignment?.employee?.employeeId,
            projectAssignmentId: projectAssignment?.projectAssignmentId,
          };
        }
      )
    );
  }, [projectAssignmentData]);

  const handleEmployeeChange = (
    event: SyntheticEvent<Element, Event>,
    value: ProjectAndEmployee | null
  ) => {
    if (value) setEnteredEmployee(value.id);
    else setEnteredEmployee('');
  };

  const handleSubmit = async () => {
    const projectAssignmentDetails = {
      projectId: state.projectId,
      employeeId: enteredEmployee || '',
    };

    addProjectAssignmentAction(projectAssignmentDetails, {
      onSuccess: (data) => {
        if (data) {
          // add toast later
          queryClient.invalidateQueries(['project-assignment']);
          console.log('success', data);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
    });
    setEnteredEmployee('');
  };

  const employeeName = allEmployeeData?.data?.data.map((employee: Employee) => {
    return { label: employee.name, id: employee.employeeId };
  });

  return (
    <Card sx={{ minWidth: 275, height: '100%' }}>
      {projectAssignmentError && <div>Error...=</div>}
      {!projectAssignmentError && projectAssignmentLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
        >
          <CircularProgress />
        </Box>
      )}
      {!projectAssignmentError &&
        !projectAssignmentLoading &&
        !allEmployeeDataLoading &&
        projectAssignmentData && (
          <CardContent>
            <Typography
              sx={{ fontSize: 25, fontFamily: 'monospace', fontWeight: 'bold' }}
              color="text.secondary"
              gutterBottom
            >
              Name : {state.projectName}
            </Typography>
            <Typography
              sx={{ fontSize: 18 }}
              color="text.secondary"
              gutterBottom
            >
              Status : {state.status}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Description : {state.description}
            </Typography>

            <Autocomplete
              sx={{ mt: 2, width: 300, mb: 2 }}
              disablePortal
              id="employee-combo-box"
              options={employeeName?.filter(
                (item: AddEmployee) =>
                  !allProjectAssignmentEmployees?.some((obj: EmployeeData) => {
                    return obj.name === item.label;
                  })
              )}
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="Employee" value={params.id} />
              )}
              onChange={handleEmployeeChange}
              isOptionEqualToValue={() => true}
            />
            <Button
              variant="contained"
              onClick={() => {
                handleSubmit();
              }}
              sx={{ mb: 2 }}
            >
              Add Employee
            </Button>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Employees Assigned to this Project:
            </Typography>

            <Box
              sx={{
                direction: 'row',
                spacing: 2,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              {allProjectAssignmentEmployees?.map(
                (employeeData: EmployeeData) => (
                  <div key={employeeData.id}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                            <Typography
                              sx={{ fontSize: 22 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              {employeeData.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                            <IconButton
                              style={{ color: 'black' }}
                              onClick={() => {
                                const projectAssignmentDetails = {
                                  projectAssignmentId:
                                    employeeData.projectAssignmentId,
                                };
                                deleteProjectAssignmentAction(
                                  projectAssignmentDetails,
                                  {
                                    onSuccess: (data) => {
                                      if (data) {
                                        // add toast later
                                        queryClient.invalidateQueries([
                                          'project-assignment',
                                        ]);
                                        console.log('success', data);
                                      }
                                    },
                                    onError: (data) => {
                                      console.log('err', data);
                                    },
                                  }
                                );
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>

                        {/* add the project designation tags here */}
                      </CardContent>
                    </Card>
                  </div>
                )
              )}
            </Box>
          </CardContent>
        )}
    </Card>
  );
};
export default projectDetail;
