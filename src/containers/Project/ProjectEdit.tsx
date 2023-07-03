import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  Autocomplete,
  TextField,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import EditIcon from '@mui/icons-material/Edit';
import useProject from '@/hooks/useProject';
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
  const { updateProjectAction } = useProject();
  const [open, setOpen] = useState(false);
  const [nameValue, setNameValue] = useState(projectName);
  const [statusValue, setStatusValue] = useState(status);
  const [descriptionValue, setDescriptionValue] = useState(description);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlertClose = () => {
    setAlertOpen(false);
  };
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
          setAlertSeverity('success');
          setAlertMessage('Project Updated Successfully!!');
          setAlertOpen(true);
          queryClient.invalidateQueries(['projectById']);

          setOpen(false);
        }
      },
      onError: () => {
        setAlertSeverity('error');
        setAlertMessage('Cannot Edit Project!! Please try again later');
        setAlertOpen(true);
        setOpen(false);
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

export default ProjectEdit;
