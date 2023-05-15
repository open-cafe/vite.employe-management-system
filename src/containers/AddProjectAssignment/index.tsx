import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddProjectAssignment from '@/hooks/useAddProjectAssignment';
import useAllProject from '@/hooks/useAllProject';
import useAllEmployee from '@/hooks/useAllEmployee';

interface ProjectAndEmployee {
  id: string;
  name: string;
}

interface Project {
  projectId: string;
  projectName: string;
  description: string;
  status: string;
}

interface Employee {
  employeeId: string;
  name: string;
  designation: string;
  phone: string;
}

const AddProjectAssignment = () => {
  const navigate = useNavigate();
  const { addProjectAssignmentAction, addProjectLoading } =
    useAddProjectAssignment();
  const { allProjectData, allProjectDataLoading } = useAllProject();
  const { allEmployeeData, allEmployeeDataLoading } = useAllEmployee();

  const [enteredEmployee, setEnteredEmployee] = useState<string | null>('');
  const [enteredProject, setEnteredProject] = useState<string | null>('');

  const handleProjectChange = (
    event: SyntheticEvent<Element, Event>,
    value: ProjectAndEmployee | null
  ) => {
    if (value) setEnteredProject(value.id);
    else setEnteredProject('');
  };

  const handleEmployeeChange = (
    event: SyntheticEvent<Element, Event>,
    value: ProjectAndEmployee | null
  ) => {
    if (value) setEnteredEmployee(value.id);
    else setEnteredEmployee('');
  };

  const handleSubmit = async () => {
    const projectAssignmentDetails = {
      projectId: enteredProject as string,
      employeeId: enteredEmployee as string,
    };

    addProjectAssignmentAction(projectAssignmentDetails, {
      onSuccess: (data) => {
        if (data) {
          navigate(`/project`);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
    });
    setEnteredProject('');
    setEnteredEmployee('');
  };
  const projectName = allProjectData?.data?.data.map((project: Project) => {
    return { label: project.projectName, id: project.projectId };
  });

  const employeeName = allEmployeeData?.data?.data.map((employee: Employee) => {
    return { label: employee.name, id: employee.employeeId };
  });

  return (
    <MainLayout>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          {allProjectDataLoading || allEmployeeDataLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              margin="auto"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography component="h1" variant="h4" align="center">
                Assign Project
              </Typography>

              <Autocomplete
                sx={{ mt: 2 }}
                disablePortal
                id="project-combo-box"
                options={projectName}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="Project" />
                )}
                onChange={handleProjectChange}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <Autocomplete
                sx={{ mt: 2 }}
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
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit()}
              >
                Assign Project
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default AddProjectAssignment;
