import {
  Autocomplete,
  Button,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';
import useProject from '@/hooks/useProject';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import ProjectStyles from '@/style/Project.styles';
import useAddProject from '@/hooks/useAddProject';

const AddProject = () => {
  const navigate = useNavigate();
  const { addProjectAction, addProjectLoading } = useProject();

  const [description, setDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [enteredProject, setEnteredProject] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [formValues, setFormValues] = useState({
    name: {
      errorMessage: 'You must enter a name',
    },
    description: {
      errorMessage: 'You must enter the description',
    },
  });
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    setDescriptionError(false);
  };

  const handleSubmit = async () => {
    const projectDetails = {
      projectName: enteredProject,
      description: description,
      status: projectStatus,
    };
    if (enteredProject.length === 0) {
      setNameError(true);
    }
    if (description.length === 0) {
      setDescriptionError(true);
    }
    if (!(enteredProject.length === 0 || description.length === 0)) {
      addProjectAction(projectDetails, {
        onSuccess: (data) => {
          if (data) {
            navigate(`/project`);
          }
        },
        onError: (data) => {
          console.log('err', data);
        },
      });
    }
    setEnteredProject('');
    setDescription('');
    setProjectStatus('');
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={ProjectStyles.container}>
          <Typography component="h1" variant="h4" align="center">
            Add Project
          </Typography>
          <TextField
            margin="normal"
            id="project"
            name="project"
            label="Project Name"
            autoComplete="Project"
            value={enteredProject}
            onChange={(e) => {
              setEnteredProject(e.target.value);
              setNameError(false);
            }}
            error={nameError}
            helperText={nameError && formValues.name.errorMessage}
            fullWidth
            required
          />
          <Autocomplete
            sx={{ my: 2 }}
            // disablePortal
            id="projectstatus-combo-box"
            options={['Active', 'Completed', 'Cancelled', 'OnHold']}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Status" />}
            onChange={(event, value) => setProjectStatus(value as string)}
          />

          <TextField
            id="description"
            value={description}
            label="Description"
            multiline
            rows={5}
            error={descriptionError}
            helperText={descriptionError && formValues.description.errorMessage}
            onChange={handleDescriptionChange}
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSubmit()}
          >
            Add Project
          </Button>
        </Paper>
      </Container>
    </MainLayout>
  );
};

export default AddProject;
