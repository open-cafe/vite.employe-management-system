import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  FormControl,
  DialogActions,
  Button,
  Autocomplete,
  TextField,
  Chip,
  Snackbar,
  Alert,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { SyntheticEvent, useState } from 'react';
import { AddEmployeeOrTag } from './ProjectDetails';
import useProjectDesignationByAssignment from '@/hooks/useProjectDesignationByAssignment';
import useTag from '@/hooks/useTag';
import ProjectAssignmentStyles from '@/style/ProjectAssignment.styles';
import { returnTagColor } from '@/utils/commonUtils';
import CommonStyles from '@/style/Common.styles';

interface Tag {
  tagId: string;
  tagName: string;
}

interface ProjectDesignation {
  projectDesignationId: string;
  tag: Tag;
  projectAssignmentId: string;
}

const ProjectAssignmentDetails = ({
  projectAssignmentId,
  isAdmin,
}: {
  projectAssignmentId: string;
  isAdmin: boolean;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [enteredTag, setEnteredTag] = useState<string | null>('');
  const projectDesignationByAssignmentProps = {
    projectAssignmentId,
    page: 1,
    limit: 10,
  };
  const {
    projectDesignationData,
    projectDesignationLoading,
    addProjectDesignationByAssignmentAction,
    deleteProjectDesignationByAssignmentAction,
  } = useProjectDesignationByAssignment(projectDesignationByAssignmentProps);

  const { tagData, istagLoading } = useTag();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleProjectDesignationChange = (
    event: SyntheticEvent<Element, Event>,
    value: any
  ) => {
    if (value) setEnteredTag(value.id);
    else setEnteredTag('');
  };
  const handleSubmit = async () => {
    const projectDesignationDetails = {
      projectAssignmentId: projectAssignmentId,
      tagId: enteredTag || '',
    };

    addProjectDesignationByAssignmentAction(projectDesignationDetails, {
      onSuccess: (data) => {
        if (data) {
          setAlertSeverity('success');
          setAlertMessage('Added Project Designation Successfully!');
          setAlertOpen(true);
          queryClient.invalidateQueries(['project-designation']);
        }
      },
      onError: () => {
        setAlertSeverity('error');
        setAlertMessage('Error Adding Project Designation!');
        setAlertOpen(true);
      },
    });
    setOpen(false);
    setEnteredTag('');
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const tagNames = tagData?.data?.data?.data?.map((tag: Tag) => {
    return { label: tag.tagName, id: tag.tagId };
  });

  return (
    <div>
      {!istagLoading && isAdmin && (
        <>
          <Button variant="outlined" onClick={handleClickOpen} size="small">
            Add Tags
          </Button>
          <Dialog open={open} sx={CommonStyles.dialogBoxHeading}>
            <DialogTitle>Add Tags</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can add one Tag at a time
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={ProjectAssignmentStyles.form}
              >
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                  <Autocomplete
                    sx={ProjectAssignmentStyles.autoComplete}
                    disablePortal
                    id="tag-combo-box"
                    options={tagNames.filter(
                      (tag: AddEmployeeOrTag) =>
                        !projectDesignationData?.data?.data?.data?.some(
                          (projectDesignation: ProjectDesignation) =>
                            projectDesignation?.tag?.tagName === tag.label
                        )
                    )}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Tags" value={params.id} />
                    )}
                    onChange={handleProjectDesignationChange}
                    isOptionEqualToValue={() => true}
                  />
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => handleSubmit()}>Add</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {!projectDesignationLoading && projectDesignationData && (
        <Box sx={ProjectAssignmentStyles.box}>
          {projectDesignationData?.data?.data?.data?.map(
            (projectDesignation: ProjectDesignation, i: number) => {
              const tagName: string = projectDesignation?.tag?.tagName?.trim();

              return (
                <div key={i}>
                  {isAdmin ? (
                    <Chip
                      sx={
                        ProjectAssignmentStyles.chip(returnTagColor(tagName))
                          .tag
                      }
                      label={projectDesignation?.tag?.tagName}
                      onDelete={() => {
                        const projectDesignationDetails = {
                          projectDesignationId:
                            projectDesignation?.projectDesignationId,
                        };

                        deleteProjectDesignationByAssignmentAction(
                          projectDesignationDetails,
                          {
                            onSuccess: (data) => {
                              if (data) {
                                setAlertSeverity('success');
                                setAlertMessage(
                                  'Deleted Project Designation Successfully!'
                                );
                                setAlertOpen(true);
                                queryClient.invalidateQueries([
                                  'project-designation',
                                ]);
                              }
                            },
                            onError: () => {
                              setAlertSeverity('error');
                              setAlertMessage(
                                'Cannot Add Project Assigment. Please try again later'
                              );
                              setAlertOpen(true);
                            },
                          }
                        );
                      }}
                    />
                  ) : (
                    <Chip
                      sx={
                        ProjectAssignmentStyles.chip(returnTagColor(tagName))
                          .tag
                      }
                      label={projectDesignation?.tag?.tagName}
                    />
                  )}
                </div>
              );
            }
          )}
        </Box>
      )}
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
    </div>
  );
};

export default ProjectAssignmentDetails;
