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

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import useAddProject from '@/hooks/useAddProject';
import addProjectSchema from './addProjectSchema';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';

const options = [
  {
    id: '1',
    label: 'Active',
  },
  {
    id: '2',
    label: 'Completed',
  },
  {
    id: '3',
    label: 'Cancelled',
  },
  {
    id: '4',
    label: 'OnHold',
  },
];

const AddProject = () => {
  const form = useForm({
    defaultValues: {
      enteredProject: '',
      status: '',
      description: '',
    },
    resolver: yupResolver(addProjectSchema),
    mode: 'onChange',
  });

  const { register, control, formState, handleSubmit, reset, trigger } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { addProjectAction, addProjectLoading } = useAddProject();

  const [value, setValue] = useState<string | null>(options[0].id);
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

  const onSubmit = async (data: any) => {
    const projectStatus = options.find((x) => x.id === data.status)?.label;

    const projectDetails = {
      projectName: data.enteredProject,
      description: data.description,
      status: projectStatus,
    };
    if (data.enteredProject.length === 0) {
      setNameError(true);
    }
    if (data.description.length === 0) {
      setDescriptionError(true);
    }
    if (!(data.enteredProject.length === 0 || data.description.length === 0)) {
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
    reset();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              id="project"
              label="Project Name"
              autoComplete="Project"
              error={nameError}
              {...register('enteredProject')}
              fullWidth
              helperText={errors.enteredProject?.message}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => {
                const { onChange, value } = field;
                return (
                  <Autocomplete
                    value={options.find((option) => {
                      return value == option.id;
                    })}
                    sx={{ mt: 2, mb: 2 }}
                    disablePortal
                    id="projectstatus-combo-box"
                    options={options}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Status"
                        helperText={errors.status?.message}
                      />
                    )}
                    onChange={(event: any, newValue) => onChange(newValue?.id)}
                  />
                );
              }}
            />

            <TextField
              id="description"
              label="Description"
              multiline
              rows={5}
              error={descriptionError}
              fullWidth
              {...register('description')}
              helperText={errors.description?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Project
            </Button>
          </form>
        </Paper>
      </Container>
      <DevTool control={control} />
    </MainLayout>
  );
};

export default AddProject;
