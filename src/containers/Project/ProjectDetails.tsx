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
  Stack,
  TextField,
} from '@mui/material';
import { Employee } from '../AddProjectAssignment';
import useAllEmployee from '@/hooks/useAllEmployee';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useSaveEmployeeAssign from '@/hooks/useSaveEmployeeAssign';

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

  const [allProjectAssignmentEmployees, setAllProjectAssignmentEmployees] =
    useState<any>([]);
  useEffect(() => {
    setAllProjectAssignmentEmployees(
      projectAssignmentData?.data?.data?.data?.map(
        (projectAssignment: ProjectAssignments) => {
          return {
            name: projectAssignment?.employee?.name,
            id: projectAssignment?.employee?.employeeId,
          };
        }
      )
    );
  }, [projectAssignmentData]);

  const { saveEmployeeAction } = useSaveEmployeeAssign();

  const handleEmployeeChange = (
    event: SyntheticEvent<Element, Event>,
    value: AddEmployee | null
  ) => {
    setAllProjectAssignmentEmployees(
      value
        ? [
            ...allProjectAssignmentEmployees,
            { name: value.label, id: value.id },
          ]
        : allProjectAssignmentEmployees
    );
  };

  const save = () => {
    const projectAssignmentDetails = {
      projectId: state.projectId,
      employeeId: allProjectAssignmentEmployees?.map(
        (employee: EmployeeData) => employee.id
      ),
    };
    saveEmployeeAction(projectAssignmentDetails, {
      onSuccess: (data) => {
        if (data) {
          // add toast later
          queryClient.invalidateQueries(['project-assignment']);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
    });
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
            {}
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
              isOptionEqualToValue={() => {
                return true;
              }}
            />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Employees Assigned to this Project:
            </Typography>
            <Stack direction="row" spacing={2}>
              {allProjectAssignmentEmployees?.map(
                (employeeData: EmployeeData) => (
                  <div key={employeeData.id}>
                    <Chip
                      label={employeeData.name}
                      onDelete={() => {
                        setAllProjectAssignmentEmployees(
                          allProjectAssignmentEmployees.filter(
                            (employee: EmployeeData) =>
                              employee !== employeeData
                          )
                        );
                      }}
                    />
                  </div>
                )
              )}
            </Stack>
            <Button
              variant="contained"
              onClick={() => {
                save();
              }}
              sx={{ mt: 2 }}
            >
              Save
            </Button>
          </CardContent>
        )}
    </Card>
  );
};
export default projectDetail;
