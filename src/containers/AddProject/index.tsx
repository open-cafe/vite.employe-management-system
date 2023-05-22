import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/layout/MainLayout';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddProject from '@/hooks/useAddProject';

const AddProject = () => {
  const navigate = useNavigate();
  const { addProjectAction, addProjectLoading } = useAddProject();

  const [description, setDescription] = useState('');
  const [projectStatus, setProjectStatus] = useState('');
  const [enteredProject, setEnteredProject] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const projectDetails = {
      projectName: enteredProject,
      description: description,
      status: projectStatus,
    };

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
    setEnteredProject('');
    setDescription('');
    setProjectStatus('');
  };

  return (
    <MainLayout>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
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
            onChange={(e) => setEnteredProject(e.target.value)}
            fullWidth
            required
          />
          <Autocomplete
            sx={{ mt: 2, mb: 2 }}
            disablePortal
            id="projectstatus-combo-box"
            options={['Active', 'Completed', 'Cancelled', 'OnHold']}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Project" />}
            onChange={(event, value) => setProjectStatus(value as string)}
          />

          <TextField
            id="description"
            value={description}
            label="Description"
            multiline
            rows={5}
            onChange={handleChange}
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
