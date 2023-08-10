import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import useProjectAssignments from '@/hooks/useProjectAssignments';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAllEmployee from '@/hooks/useAllEmployee';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ProjectAssignmentDetails from './ProjectAssignmentDetails';
import useProject from '@/hooks/useProject';
import ProjectDetailStyles from '@/style/ProjectDetails.styles';
import ProjectEdit from './ProjectEdit';
import CommonStyles from '@/style/Common.styles';
import useCurrentUser from '@/hooks/useCurrentUser';

interface ProjectAssignments {
  projectAssignmentId: string;
  employee: {
    name: string;
    employeeId: string;
  };
}
interface Employee {
  employeeId: string;
  name: string;
  designation: string;
  phone: string;
}
interface ProjectAndEmployee {
  id: string;
  name: string;
}
export interface AddEmployeeOrTag {
  id: string;
  label: string;
}
interface EmployeeData {
  name: string;
  id: string;
  projectAssignmentId: string;
}
const ProjectDetail = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { currentUserData, currentUserLoading } = useCurrentUser();
  const projectAssignmentProps = {
    projectId: state.projectId,
    page: 1,
    limit: 10,
  };
  const {
    projectAssignmentLoading,
    projectAssignmentData,
    projectAssignmentError,
    addProjectAssignmentAction,
    deleteProjectAssignmentAction,
  } = useProjectAssignments(projectAssignmentProps);

  const navigate = useNavigate();
  const { allEmployeeData, allEmployeeDataLoading } = useAllEmployee();
  const projectProps = {
    projectId: state.projectId,
  };
  const { deleteProjectAction, projectByIdData } = useProject(projectProps);

  const [enteredEmployee, setEnteredEmployee] = useState<string | null>('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

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
  const Role = currentUserData?.data?.data?.role;
  let isAdmin = false;
  if (Role === 'SuperAdmin' || Role === 'Admin') {
    isAdmin = true;
  }

  const handleSubmit = async () => {
    const projectAssignmentDetails = {
      projectId: state.projectId,
      employeeId: enteredEmployee || '',
    };

    addProjectAssignmentAction(projectAssignmentDetails, {
      onSuccess: (data) => {
        if (data) {
          setAlertSeverity('success');
          setAlertMessage('Employee Added Successfully!!');
          setAlertOpen(true);
          queryClient.invalidateQueries(['project-assignment']);
        }
      },
      onError: () => {
        setAlertSeverity('error');
        setAlertMessage(
          'Cannot Add Project Assigment!! Please try again later'
        );
        setAlertOpen(true);
      },
    });
    setEnteredEmployee('');
  };

  const handleDeleteProject = async () => {
    const projectDetails = {
      projectId: state.projectId,
    };
    deleteProjectAction(projectDetails, {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(['project']);
          navigate(`/project`);
        }
      },
      onError: (data) => {
        setAlertSeverity('error');
        setAlertMessage(
          'Cannot Delete Project!! Employees are assigned to the project '
        );
        setAlertOpen(true);
      },
    });
  };

  const handleDeleteProjectAssignment = async (projectAssignmentId: string) => {
    const projectAssignmentDetails = {
      projectAssignmentId,
    };
    deleteProjectAssignmentAction(projectAssignmentDetails, {
      onSuccess: (data) => {
        if (data) {
          setAlertSeverity('success');
          setAlertMessage('Project Assignment Deleted Successfully');
          setAlertOpen(true);
          queryClient.invalidateQueries(['project-assignment']);
        }
      },
      onError: () => {
        setAlertSeverity('error');
        setAlertMessage(
          'Cannot Delete Project Assignment!! Please try again later'
        );
        setAlertOpen(true);
      },
    });
  };

  const employeeName = allEmployeeData?.data?.data.map((employee: Employee) => {
    return { label: employee.name, id: employee.employeeId };
  });

  return (
    <>
      <Card sx={CommonStyles.paperAndCard}>
        {projectAssignmentError && <div>Something went wrong ! </div>}
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
              <Card sx={ProjectDetailStyles.detailsCard}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <Typography
                      variant="h4"
                      sx={ProjectDetailStyles.nameText}
                      gutterBottom
                    >
                      {projectByIdData?.data?.data.projectName}
                    </Typography>
                  </div>
                  {isAdmin && (
                    <div style={{ marginLeft: 'auto' }}>
                      <ProjectEdit
                        projectName={projectByIdData?.data?.data?.projectName}
                        description={projectByIdData?.data?.data?.description}
                        status={projectByIdData?.data?.data?.status}
                        projectId={state.projectId}
                      />
                      <IconButton
                        data-testid="delete-project"
                        style={{ color: 'black' }}
                        onClick={() => {
                          handleDeleteProject();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
                <Typography
                  variant="h5"
                  sx={ProjectDetailStyles.text}
                  gutterBottom
                >
                  Status:{' '}
                  <Typography
                    display="inline"
                    sx={ProjectDetailStyles.text}
                    gutterBottom
                  >
                    {projectByIdData?.data?.data.status}
                  </Typography>
                </Typography>
                <Typography variant="h5" sx={ProjectDetailStyles.text}>
                  Description:
                </Typography>
                <Typography
                  sx={{
                    mt: 1,
                    mb: 1.5,
                  }}
                  color="text.secondary"
                >
                  {projectByIdData?.data?.data.description}
                </Typography>
              </Card>
              <Card sx={ProjectDetailStyles.employeeAddCard}>
                {isAdmin && (
                  <>
                    <Autocomplete
                      sx={{ mt: 2, width: 300, mb: 2 }}
                      disablePortal
                      id="employee-combo-box"
                      options={employeeName?.filter(
                        (item: AddEmployeeOrTag) =>
                          !allProjectAssignmentEmployees?.some(
                            (obj: EmployeeData) => {
                              return obj.name === item.label;
                            }
                          )
                      )}
                      fullWidth
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee"
                          value={params.id}
                        />
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
                  </>
                )}
                <Typography variant="h6" sx={{ mb: 1.5 }}>
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
                        <Card sx={{ backgroundColor: '#edf2ef' }}>
                          <CardContent>
                            <Grid container spacing={2}>
                              <Grid
                                item
                                xs={10}
                                sm={10}
                                md={10}
                                lg={10}
                                xl={10}
                              >
                                <Typography
                                  sx={{ fontSize: 22 }}
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  {employeeData.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                {isAdmin && (
                                  <IconButton
                                    data-testid="delete-project-assignment"
                                    sx={{ color: 'black' }}
                                    onClick={() => {
                                      handleDeleteProjectAssignment(
                                        employeeData.projectAssignmentId
                                      );
                                    }}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Grid>
                            </Grid>
                            <ProjectAssignmentDetails
                              projectAssignmentId={
                                employeeData.projectAssignmentId
                              }
                              isAdmin={isAdmin}
                            />
                          </CardContent>
                        </Card>
                      </div>
                    )
                  )}
                </Box>
              </Card>
            </CardContent>
          )}
      </Card>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ProjectDetail;
