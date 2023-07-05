import * as yup from 'yup';

const addProjectSchema = yup.object().shape({
  enteredProject: yup.string().required('Project Name is required'),
  status: yup.string().when('enteredProject', {
    is: (project: string) => project.length > 0,
    then: () => yup.string().required('Enter Project Status'),
    otherwise: () => yup.string().optional(),
  }),
  description: yup.string().required('Project Description is required'),
});

export default addProjectSchema;
