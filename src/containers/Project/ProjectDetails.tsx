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
import { Employee, ProjectAndEmployee } from '../AddProjectAssignment';
import useAllEmployee from '@/hooks/useAllEmployee';
import { SyntheticEvent, useEffect, useState } from 'react';
import useAddProjectAssignment from '@/hooks/useAddProjectAssignment';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteProjectAssignment from '@/hooks/useDeleteProjectAssignment';
import ProjectAssignmentDetails from './ProjectAssignmentDetails';
import useDeleteProject from '@/hooks/useDeleteProject';
import ProjectDetailStyles from '@/style/ProjectDetails.styles';
import ProjectEdit from './ProjectEdit';
import CommonStyles from '@/style/Common.styles';
import useProjectById from '@/hooks/useProjectById';
import { ForkRight } from '@mui/icons-material';
import useCurrentUser from '@/hooks/useCurrentUser';

interface ProjectAssignments {
  projectAssignmentId: string;
  employee: {
    name: string;
    employeeId: string;
  };
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
const projectDetail = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const { currentUserData, currentUserLoading } = useCurrentUser();
  const {
    projectAssignmentLoading,
    projectAssignmentData,
    projectAssignmentError,
  } = useProjectAssignments(state.projectId, 1, 10);
  const { projectByIdData, projectByIdLoading, projectByIdError } =
    useProjectById(state.projectId);
  const navigate = useNavigate();
  const { allEmployeeData, allEmployeeDataLoading } = useAllEmployee();
  const { deleteProjectAssignmentAction } = useDeleteProjectAssignment();
  const { deleteProjectAction } = useDeleteProject();

  const { addProjectAssignmentAction } = useAddProjectAssignment();

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
    <>
      <Card sx={CommonStyles.paperAndCard}>
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
                        style={{ color: 'black' }}
                        onClick={() => {
                          const projectDetails = {
                            projectId: state.projectId,
                          };
                          deleteProjectAction(projectDetails, {
                            onSuccess: (data) => {
                              if (data) {
                                // add toast later
                                queryClient.invalidateQueries(['project']);
                                navigate(`/project`);
                                console.log('success', data);
                              }
                            },
                            onError: (data) => {
                              console.log('err', data);
                              setAlertSeverity('error');
                              setAlertMessage(
                                'Cannot Delete Project!! Employees are assigned to the project '
                              );
                              setAlertOpen(true);
                            },
                          });
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
                                    sx={{ color: 'black' }}
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
export default projectDetail;
