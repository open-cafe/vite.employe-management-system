import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import useProjectAssignments from '@/hooks/useProjectAssignments';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
} from '@mui/material';
import { Employee, ProjectAndEmployee } from '../AddProjectAssignment';
import useAllEmployee from '@/hooks/useAllEmployee';
import { SyntheticEvent, useState } from 'react';
import useAddProjectAssignment from '@/hooks/useAddProjectAssignment';
import { useQueryClient } from '@tanstack/react-query';

interface ProjectAssignments {
  projectAssignmentId: string;
  employee: {
    name: string;
  };
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

  const { addProjectAssignmentAction } = useAddProjectAssignment();

  const [enteredEmployee, setEnteredEmployee] = useState<string | null>('');

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
  console.log('state', state);

  return (
    <Card sx={{ minWidth: 275, height: '100%' }}>
      {projectAssignmentLoading || allEmployeeDataLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          margin="auto"
        >
          <CircularProgress />
        </Box>
      ) : projectAssignmentError ? (
        <div>Error...=</div>
      ) : (
        <CardContent>
          <Typography
            sx={{ fontSize: 25, fontFamily: 'monospace', fontWeight: 'bold' }}
            color="text.secondary"
            gutterBottom
          >
            Name : {state.projectName}
          </Typography>
          <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
            Status : {state.status}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Description : {state.description}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Emoloyees Assigned to this Project:
          </Typography>
          <Autocomplete
            sx={{ mt: 2, width: 300, mb: 2 }}
            disablePortal
            id="employee-combo-box"
            options={employeeName}
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Employee" value={params.id} />
            )}
            onChange={handleEmployeeChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />
          <Button
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Add Employee
          </Button>
          <div>
            {projectAssignmentData?.data?.data?.data?.map(
              (projectAssignment: ProjectAssignments) => (
                <div key={projectAssignment.projectAssignmentId}>
                  <div>{projectAssignment?.employee?.name}</div>
                </div>
              )
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
export default projectDetail;
