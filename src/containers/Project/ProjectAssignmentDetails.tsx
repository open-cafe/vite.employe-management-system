import useAddProjectDesignationByAssignment from '@/hooks/useAddProjectDesignationByAssignment';
import useDeleteProjectDesignationByAssignment from '@/hooks/useDeleteProjectDesignationByAssignment';
import useProjectDesignationByAssignment from '@/hooks/useProjectDesignationByAssignment';
import useTag from '@/hooks/useTag';
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
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { SyntheticEvent, useState } from 'react';
import { AddEmployeeOrTag } from './ProjectDetails';
import ProjectAssignmentStyles from '@/style/ProjectAssignment.styles';
import { returnTagColor } from '@/utils/commonUtils';

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
}: {
  projectAssignmentId: string;
}) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [enteredTag, setEnteredTag] = useState<string | null>('');

  const { projectDesignationData, projectDesignationLoading } =
    useProjectDesignationByAssignment(projectAssignmentId, 1, 10);
  const { tagData, istagLoading } = useTag();
  const { addProjectDesignationByAssignmentAction } =
    useAddProjectDesignationByAssignment();
  const { deleteProjectDesignationByAssignmentAction } =
    useDeleteProjectDesignationByAssignment();

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
          // add toast later
          queryClient.invalidateQueries(['project-designation']);
          console.log('success', data);
        }
      },
      onError: (data) => {
        console.log('err', data);
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
      {!istagLoading && (
        <>
          <Button variant="outlined" onClick={handleClickOpen} size="small">
            Add Tags
          </Button>
          <Dialog open={open}>
            <DialogTitle>Add Tags</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You can add one Tag at a time
              </DialogContentText>
              <Box
                noValidate
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  m: 'auto',
                  width: 'fit-content',
                }}
              >
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                  <Autocomplete
                    sx={{ mt: 2, width: 300, mb: 2 }}
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            mb: 2,
            flexWrap: 'wrap',
            width: '275px',
            height: '75px',
          }}
        >
          {projectDesignationData?.data?.data?.data?.map(
            (projectDesignation: ProjectDesignation, i: number) => {
              const tagColor = '';
              const tagName: string = projectDesignation?.tag?.tagName.trim();

              return (
                <div key={i}>
                  <Chip
                    sx={
                      ProjectAssignmentStyles.chip(returnTagColor(tagName)).tag
                    }
                    label={projectDesignation?.tag?.tagName}
                    onDelete={() => {
                      console.log(tagColor);
                      const projectDesignationDetails = {
                        projectDesignationId:
                          projectDesignation?.projectDesignationId,
                      };

                      deleteProjectDesignationByAssignmentAction(
                        projectDesignationDetails,
                        {
                          onSuccess: (data) => {
                            if (data) {
                              // add toast later
                              queryClient.invalidateQueries([
                                'project-designation',
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
                  />
                </div>
              );
            }
          )}
        </Box>
      )}
    </div>
  );
};

export default ProjectAssignmentDetails;
