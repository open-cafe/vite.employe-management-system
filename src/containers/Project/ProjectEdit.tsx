import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  FormControl,
  Autocomplete,
  TextField,
  DialogActions,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import useUpdateProject from '@/hooks/useUpdateProject';
import CommonStyles from '@/style/Common.styles';

const ProjectEdit = ({
  projectName,
  status,
  description,
  projectId,
}: {
  projectName: string;
  status: string;
  description: string;
  projectId: string;
}) => {
  const queryClient = useQueryClient();
  const { updateProjectAction, updateProjectLoading } = useUpdateProject();
  const [open, setOpen] = useState(false);
  const [nameValue, setNameValue] = useState(projectName);
  const [statusValue, setStatusValue] = useState(status);
  const [descriptionValue, setDescriptionValue] = useState(description);

  useEffect(() => {
    setNameValue(projectName);
    setStatusValue(status);
    setDescriptionValue(description);
  }, [projectName, status, description]);

  const handleSubmit = async () => {
    const projectDetails = {
      projectName: nameValue,
      description: descriptionValue,
      status: statusValue,
      projectId,
    };

    updateProjectAction(projectDetails, {
      onSuccess: (data) => {
        if (data) {
          queryClient.invalidateQueries(['projectById']);

          setOpen(false);
        }
      },
      onError: (data) => {
        console.log('err', data);
      },
    });
  };
  return (
    <>
      <IconButton style={{ color: 'black' }} onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle sx={CommonStyles.dialogBoxHeading}>
          Edit Project Details
        </DialogTitle>
        <DialogContent>
          <Box noValidate component="form" sx={{}}>
            <FormControl sx={{ mt: 2, minWidth: 500 }}>
              <TextField
                id="projectName"
                name="projectName"
                label="Project Name"
                value={nameValue}
                onChange={(newValue) => setNameValue(newValue.target.value)}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <Autocomplete
                sx={{ mb: 2 }}
                disablePortal
                id="status-combo-box"
                options={['Active', 'Completed', 'Cancelled', 'OnHold']}
                fullWidth
                value={statusValue}
                renderInput={(params) => (
                  <TextField {...params} label="Status" />
                )}
                onChange={(event, value) => setStatusValue(value as string)}
                isOptionEqualToValue={() => true}
              />
              <TextField
                id="projectDescription"
                name="projectDescription"
                label="Project Description"
                value={descriptionValue}
                onChange={(newValue) =>
                  setDescriptionValue(newValue.target.value)
                }
                fullWidth
                required
                multiline
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleSubmit()}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectEdit;